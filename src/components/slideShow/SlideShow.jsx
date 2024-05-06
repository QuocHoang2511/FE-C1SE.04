import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import OutstandStudents from "../outstandStudents/Outstandstudents";
import TitlePart from "../titlePart/TitlePart";


const SlideShow = ({typeSlide = "healthNews" , titlePart ,subTitle, subDesc, background = false}) => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 200,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        cssEase: 'linear',
        touchThreshold: 100,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const renderSlides = () => {
        if (typeSlide === "healthNews") {
            return [
                
               
                
            ]
        } else if (typeSlide === "outstandStudents") {
            return [
                <OutstandStudents key={7}/>,
                <OutstandStudents key={8}/>,
                <OutstandStudents key={9}/>,
                <OutstandStudents key={10}/>,
                <OutstandStudents key={11}/>,
                <OutstandStudents key={12}/>,
            ];
        } else {
            // Một xử lý mặc định nếu typeSlide không phải là "space" hoặc "feedback"
            return [];
        }
    }


    return (
        <div className="">
            <TitlePart title={titlePart} subTitle={subTitle}
                       subDesc={subDesc} />
            <div className="max-w-[1200px] mx-auto my-9 px-10">
                <Slider {...settings}>
                    {renderSlides()}
                </Slider>
            </div>
        </div>
    )
}

export default SlideShow