/* pipeline 변수 설정 */
def DOCKER_IMAGE_NAME = "pudingles94/project"           // 생성하는 Docker repo 이름
def DOCKER_IMAGE_TAGS = "yourjs"  // 생성하는 Docker image 태그
def NAMESPACE = "ns-yourjs"
def VERSION = "${env.BUILD_NUMBER}"
def DATE = new Date();
def DISCORD_CHANNEL = "https://discord.com/api/webhooks/1037265817961762867/1F_aOmpyEQlrAR31NutODRZmPBF-UFfaRKl4G4IsE7IniPlrofjOT2-XufAlKzZ7Gb6i";

/* Discord 시작 알람 함수 */
def notifyStarted(discord_channel) {
    discordSend (webhookURL: "${discord_channel}", title: "${JOB_NAME}", result: "SUCCESS" , link: "${BUILD_URL}", description: "Build Started")
}
/* Discord 결과 알람 함수 */
def notifyResult(discord_channel) {
    discordSend (webhookURL: "${discord_channel}", title: "${JOB_NAME}", result: currentBuild.currentResult, link: "${BUILD_URL}", description: "Build ${currentBuild.currentResult}")
}

podTemplate(label: 'builder',
        containers: [
                containerTemplate(name: 'docker', image: 'docker', command: 'cat', ttyEnabled: true),
                containerTemplate(name: 'kubectl', image: 'lachlanevenson/k8s-kubectl:v1.25.0', command: 'cat', ttyEnabled: true)
        ],
        volumes: [
                hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock'),
                hostPathVolume(mountPath: '/etc/spring/properties', hostPath: '/home/ubuntu/env'),
                //hostPathVolume(mountPath: '/usr/bin/docker', hostPath: '/usr/bin/docker')
        ]) {
    node('builder') {
        stage('Start'){
            notifyStarted(${DISCORD_CHANNEL});
        }
        stage('Checkout') {
            checkout scm   // gitlab으로부터 소스 다운
            sh "cp -r /etc/spring/properties ./src/main/resources/properties"
        }
        stage('Docker build') {
            container('docker') {
                withCredentials([usernamePassword(
                        credentialsId: 'docker_hub_auth',
                        usernameVariable: 'USERNAME',
                        passwordVariable: 'PASSWORD')]) {
                    /* 도커 빌드를 수행한다 */
                    sh "docker build -t ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAGS} ."
                    sh "docker login -u ${USERNAME} -p ${PASSWORD}"
                    sh "docker push ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAGS}-back"
                }
            }
        }
        stage('Run kubectl') {
            container('kubectl') {
                withCredentials([usernamePassword(
                        credentialsId: 'docker_hub_auth',
                        usernameVariable: 'USERNAME',
                        passwordVariable: 'PASSWORD')]) {
                    /* namespace 존재여부 확인. 미존재시 namespace 생성 */
                    sh "kubectl get ns ${NAMESPACE}|| kubectl create ns ${NAMESPACE}"

                    /* docker secret 존재여부 확인. 미존재시 secret 생성 */
                    sh """
                            kubectl get secret my-secret -n ${NAMESPACE} || \
                            kubectl create secret docker-registry my-secret \
                            --docker-server=https://index.docker.io/v1/ \
                            --docker-username=${USERNAME} \
                            --docker-password=${PASSWORD} \
                            --docker-email=pudingles@gmail.com \
                            -n ${NAMESPACE}
                        """

                    /* k8s-deployment.yaml 의 env값을 수정해준다(DATE로). 배포시 수정을 해주지 않으면 변경된 내용이 정상 배포되지 않는다. */
                    /*sh "echo ${VERSION}"
                    sh "sed -i.bak 's#VERSION_STRING#${VERSION}#' ./k8s/k8s-deployment.yaml"*/
                    sh "echo ${DATE}"
                    sh "sed -i.bak 's#DATE_STRING#${DATE}#' ./k8s/yourjs-back-deployment.yaml"

                    /* yaml파일로 배포를 수행한다 */
                    sh "kubectl apply -f ./k8s/yourjs-back-deployment.yaml -n ${NAMESPACE}"
                    sh "kubectl apply -f ./k8s/yourjs-back-service.yaml -n ${NAMESPACE}"
                    sh "kubectl apply -f ./k8s/yourjs-back-ingress.yaml"
                }
            }
            notifyResult(${DISCORD_CHANNEL});
        }
    }
}