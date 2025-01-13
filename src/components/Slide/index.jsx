import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper } from 'swiper/react';
import { Pagination } from 'swiper/modules';

export const SliderCard = ({ settings, children }) => {
  return (
    <Swiper
      {...settings}
      style={{
        '--swiper-pagination-color': '#000000',
      }}
      modules={[Pagination]}>
      {children}
    </Swiper>
  );
};
