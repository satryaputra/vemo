import * as React from "react";

import gradient from "@/assets/dashboard/linear-gradient.svg";

interface Props {
  image: string;
  title: string;
}

const FeatureCard: React.FC<Props> = ({ image, title }: Props) => {
  return (
    <div className="relative w-1/2">
      <img
        src={image}
        alt=""
        className="rounded-3xl shadow-[4px_4px_7px_#00000040] w-full cursor-pointer"
      />
      <img src={gradient} alt="" className="absolute -bottom-1 w-full cursor-pointer" />
      <h1 className="font-bold text-4xl absolute px-1 w-[80%] bottom-10 left-10 text-white cursor-pointer">
        {title}
      </h1>
    </div>
  );
};

export default FeatureCard;