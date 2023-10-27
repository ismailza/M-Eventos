import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper";

const HomeBannerSlider = () => {
  const data = [
    "img/intro_01.webp",
    "img/intro_02.webp",
    "img/intro_03.webp",
    "img/intro_04.webp",
    "img/intro_05.webp",
  ];
  return (
    <>
      <Swiper
        slidesPerView={1}
        // pagination={{
        //   clickable: true,
        // }}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        modules={[
          // Pagination,
          Autoplay,
          EffectFade,
        ]}
        autoplay={{
          waitForTransition: true,
          // delay: 1500,
          delay: 3000,
          disableOnInteraction: false,
        }}
        speed={4000}
      >
        {data?.map((item, i) => {
          return (
            <SwiperSlide>
              <img src={item} alt="" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default HomeBannerSlider;
