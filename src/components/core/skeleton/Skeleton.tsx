import React from "react";

type SkeletonProps = {
  width: number;
  height: number;
  round?: "0" | "1" | "2" | "3" | "circle";
};

const Skeleton = ({ width, height, round = "0" }: SkeletonProps) => {
  return (
    <div className={`bg-light rounded-${round}`} style={{ width, height }} />
  );
};

export default Skeleton;
