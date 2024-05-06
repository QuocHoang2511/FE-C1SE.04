import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../apis";

const HealthNews = () => {
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const result = await api.get("/api/topic");
        setTopics(result.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div className=" max-w-[1200px] mx-auto  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-6 my-9 px-10">
      {topics.length > 0 &&
        topics.map((topic) => (
          <Link to={topic.url} target="_blank">
            <div className="h-[200px] shadow-md">
              <img
                className="h-full w-full object-cover rounded-lg "
                src={topic.thumnail}
                alt={topic.title}
              />
            </div>
            <div className="mt-2">
              <p>{topic.title}</p>
              <p>{topic.description}</p>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default HealthNews;
