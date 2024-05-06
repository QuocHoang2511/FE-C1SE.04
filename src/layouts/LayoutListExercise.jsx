import React from "react";
import Exercise from "../components/exercise/Exercise";
// import Space from "../pages/spaceDetail/SpaceDetail";
import Pagination from "../components/pagination/Pagination";

const LayoutListExercise = ({ type = "none", exerciseList = [] }) => {
  return (
    <div className="max-w-[1200px] mx-auto grid grid-cols-12 gap-5   px-10">
      <div className=" md:col-span-12">
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {exerciseList.length > 0 &&
            exerciseList.map((exercise) => {
              return (
                <Exercise
                  key={exercise?.id}
                  typeExercise={type}
                  exercise={exercise}
                />
              );
            })}
          {/* {exerciseList.length > 0 ? (
            exerciseList.map((exercise) => {
              return (
                <Exercise
                  key={exercise?.id}
                  typeExercise={type}
                  exerciseValue={exercise}
                />
              );
            })
          ) : (
            <>
              <Exercise typeSpace="healthExercises" />
              <Exercise typeSpace="healthExercises" />
              <Exercise typeSpace="healthExercises" />
              <Exercise typeSpace="healthExercises" />
              <Exercise typeSpace="healthExercises" />
              <Exercise typeSpace="healthExercises" />
            </>
          )} */}
        </div>
      </div>
      {/*pagination*/}
      {/* <Pagination /> */}
    </div>
  );
};

export default LayoutListExercise;
