
import React from "react";
import {Link} from "react-router-dom";

const Outstandstudents = () => {
    return (
        <div className="py-4">
            <Link to="/">
                <div
                    className="w-auto mx-3 bg-white text-center shadow p-4 rounded-xl hover:shadow-xl transform transition-all translate-y-0 hover:-translate-y-2 ">
                    {/* <div className="text-primaryColor text-4xl mb-3">
                        <FontAwesomeIcon className="mr-3" icon={faQuoteLeft}/>
                        <FontAwesomeIcon className="" icon={faQuoteRight}/>
                    </div> */}
                    <img className="w-[200px] h-[200px]  mx-auto mb-3"
                         src="https://duytan.edu.vn/news/uploads/images/21-11-2018-15-47-54-50.png"
                         alt="customer"></img>
                    
                    <p className="px-2">Đoàn Thị Thu Hà (trái) - K21EVT - Giải "Women in Business" toàn cầu của cuộc thi Giải pháp xanh cho thành phố 2018 (Go Green in the City 2018)</p>
                    
                    <h4 className="mt-3 text-md font-semibold leading-6">Đoàn Thị Thu Hà</h4>
                    <h2 className="text-md  mb-8 font-semibold leading-10 tracking-[2px] ">26211100093</h2>
                </div>
            </Link>
            
        </div>
    )
}

export default Outstandstudents