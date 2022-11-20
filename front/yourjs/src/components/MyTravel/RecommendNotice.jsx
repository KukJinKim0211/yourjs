import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import RecommendNoticeDetail from './RecommendNoticeDetail';
const settings = {
  dots: true,
  infinite: true,
  autoplay: true, // 자동으로 넘김
  autoplaySpeed: 2500, //자동으로 넘어가는 속도
  speed: 1000,
  slidesToShow: 4,
  centerPadding: '0px', // 0px 하면 슬라이드 끝쪽 이미지가 안잘림
  centerMode: true, // 중앙정렬
  arrows: false,
  touchMove: false,
};

const array = [
  {
    title: '카카오 모빌리티',
    content: '카카오모빌리티  신입/경력 개발공채',
    link: 'https://kamo-tech-recruit.com/?utm_source=22kamotech&utm_medium=jobkorea&utm_campaign=jobkorea_ads&utm_id=kamotech22',
    date: '2022-11-05 23:59:59',
  },
  {
    title: '카카오',
    content: 'post Server 2022 kakao Server 개발자 2차 대규모 영입',
    link: 'https://careers.kakao.com/jobs/P-12993',
    date: '2022-11-21 15:00:00',
  },
  {
    title: '엔씨소프트',
    content: '엔씨소프트 부문별 수시 채용',
    link: 'https://careers.ncsoft.com',
    date: '2022-11-05 23:59:59',
  },
  {
    title: '다우기술',
    content: '채용확정형 비전공자 금융IT 개발자 육성 과정 모집',
    link: 'https://recruit.daou.co.kr/',
    date: '2022-11-24 18:00:00',
  },
  {
    title: '펄어비스',
    content: '펄어비스 2023 PA 아트센터 채용형 현장실습',
    link: 'https://www.pearlabyss.com/ko-KR/Company/Careers/detail?_jobOpeningNo=268',
    date: '2022-11-27 23:59:59',
  },
  {
    title: '현대 모비스',
    content: '2022년 4분기 현대모비스 신입사원 채용',
    date: '2022-11-05 23:59:59',
  },
];
const RecommendNotice = () => {
  return (
    <div style={{ zIndex: 1 }}>
      <Slider {...settings}>
        {array.map((arr, index) => (
          <RecommendNoticeDetail key={index} data={arr} />
        ))}
      </Slider>
    </div>
  );
};

export default RecommendNotice;
