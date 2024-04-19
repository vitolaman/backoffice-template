import ContentContainer from "components/container";
import moment from "moment";
import React from "react";
import { Button } from "react-daisyui";
import { FaDotCircle } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useEventDetailQuery } from "services/modules/event-calendar";
import MarkdownPreview from "@uiw/react-markdown-preview";

interface DetailEventPageProps {}

export const detailEventRouteName = "event/:id";
const DetailEventPage: React.FC<DetailEventPageProps> = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data } = useEventDetailQuery({ id: id! });

  return (
    <ContentContainer>
      <div className="flex flex-row justify-between">
        <h3 className="text-2xl text-[#262626] font-bold">Detail Event</h3>
        <Button
          onClick={() => {
            navigate(-1);
          }}
          className="rounded-full px-6 py-2"
        >
          Close
        </Button>
      </div>
      <div className="mt-6">
        <img
          className="flex mx-auto mb-6 w-full h-48 object-cover"
          src={data?.data.banner}
          alt=""
        />
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-row items-center gap-2">
          <p className="font-bold">{data?.data.title}</p>
          <FaDotCircle size={10} />
          <p className="font-semibold text-gray-700">{data?.data.location}</p>
          <FaDotCircle size={10} />
          <p className="font-semibold text-gray-400">
            {moment(data?.data.date).format("MMM Do, YYYY")}
          </p>
        </div>
      </div>
      <MarkdownPreview
        source={data?.data.description}
        wrapperElement={{
          "data-color-mode": "light",
        }}
      />
      <div className="grid grid-cols-3 gap-4 mt-4">
        {data?.data.link.map((item, i) => (
          <div key={i}>
            <label
              htmlFor="link"
              className="block font-semibold mb-1"
            >
              {item.title}
            </label>
            <a
              href={item.link}
              target="__blank"
              className="underline cursor-pointer"
            >
              {item.link}
            </a>
          </div>
        ))}
      </div>
    </ContentContainer>
  );
};

export default DetailEventPage;
