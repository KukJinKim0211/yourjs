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
    title: '신세계 I&C',
    content: '하반기 신입/경력 공개채용',
    date: '2022-11-05 23:59:59',
  },
  {
    title: 'LG CNS',
    content: 'UI/UX 개발자 공개채용',
    date: '2022-11-05 23:59:59',
  },
  {
    title: 'SK C&C',
    content: 'SK C&C 개발자 공개채용',
    date: '2022-11-05 23:59:59',
  },
  {
    title: '삼성 SDS',
    content: '삼성 3급 신입사원 공개채용',
    date: '2022-11-05 23:59:59',
  },
  {
    title: '현대 오토에버',
    content: '2022년 4분기 현대오토에버 신입사원 채용',
    date: '2022-11-05 23:59:59',
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
