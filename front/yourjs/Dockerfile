FROM node:16.17.0

WORKDIR /usr/src/app

COPY package.json yarn.lock /usr/src/app/
RUN yarn install

COPY . /usr/src/app
RUN yarn build

EXPOSE 3000

CMD ["yarn","start"]
