import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const winners = [
  {
    img: "/winners/user.png",
    name: "Mita Rahman",
    location: "Dhaka",
    amount: "5000",
  },
  {
    img: "/winners/user.png",
    name: "Shahnaz Akter",
    location: "Chittagong",
    amount: "1000",
  },
  {
    img: "/winners/user.png",
    name: "Rina Sultana",
    location: "Dhaka",
    amount: "2500",
  },
];

function QuizFooter() {
  return (
    <div className="absolute inset-x-0 bottom-0 rounded-t-[40px] bg-[#220350] px-6 pb-5 pt-9">
      {/* winners carousal */}
      <div className="mb-2 w-full">
        <p className="mb-4 text-center uppercase">Winners</p>
        <Swiper
          pagination={true}
          spaceBetween={12}
          modules={[Pagination]}
          className="mySwiper"
        >
          {winners.map((item, idx) => (
            <SwiperSlide key={idx}>
              <div className="flex items-center justify-between">
                {/* left */}
                <div className="flex items-center gap-3">
                  <div
                    style={{
                      backgroundImage: `url(${item.img})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                    className="size-14 rounded-full bg-white"
                  />
                  <div className="space-y-[1px]">
                    <p className="text-xl font-medium">{item.name}</p>
                    <p className="text-sm font-light">{item.location}</p>
                  </div>
                </div>
                <p className="font-semibold text-[#FCAE31]">
                  {item.amount + " TK"}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex flex-col gap-1 text-center text-xs">
        <p>
          Daily 3 Taka + Tax{" | "}
          <a
            className="underline"
            href="https://lankangamingpro.com/terms/Quiz.html"
            target="_blank"
          >
            Terms and Conditions
          </a>
          {" | "}
          <a
            className="underline"
            href="https://lankangamingpro.com/FAQ/sheet.html"
            target="_blank"
          >
            FAQs
          </a>
        </p>
      </div>
    </div>
  );
}

export default QuizFooter;
