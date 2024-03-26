import React from "react";

interface TagsProps {
  message: string;
  colorFont: string;
  colorBackground: string;
}

const Tags: React.FC<TagsProps> = ({ message, colorFont, colorBackground }) => {
  return (
    <span
      className={`${colorFont} ${colorBackground} py-2 px-2 rounded-md text-[10px] w-fit`}
    >
      {message}
    </span>
  );
};

export default Tags;
