import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper } from 'swiper/react';

export const SliderCard = ({ settings, children }) => {
  return <Swiper {...settings}>{children}</Swiper>;
};
