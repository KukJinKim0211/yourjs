// 공통으로 사용할 항목을 관리하는 js 파일

const scheduleList = [
  '서류제출',
  '서류발표',
  '코딩테스트',
  '코딩테스트발표',
  '1차면접',
  '1차면접발표',
  '2차면접',
  '2차면접발표',
  '최종발표',
  '기타',
];

const progressList = [
  '등록',
  '진행중',
  '서류탈락',
  '코딩테스트탈락',
  '면접탈락',
  '최종합격',
];

const getScheduleList = scheName => {
  switch (scheName) {
    case '서류제출':
      return 1;
    case '서류발표':
      return 2;
    case '코딩테스트':
      return 3;
    case '코딩테스트발표':
      return 4;
    case '1차면접':
      return 5;
    case '1차면접발표':
      return 6;
    case '2차면접':
      return 7;
    case '2차면접발표':
      return 8;
    case '최종발표':
      return 9;
    case '기타':
      return 10;
    default:
      return 0;
  }
};

export { scheduleList, getScheduleList };
