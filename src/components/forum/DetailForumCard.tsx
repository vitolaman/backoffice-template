import React from "react";
import { Card, Avatar } from "@material-tailwind/react";
import { Like } from "assets/images";
import { useParams } from "react-router-dom";
import { useForumDetailQuery } from "services/modules/forum";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

export default function DetailForumCard(): React.ReactElement {
  const { id } = useParams();
  const { data } = useForumDetailQuery({ id: id as string });

  return (
    <Card placeholder={""} className="flex mb-6 mx-5 p-5">
      <div className="flex">
        <img
          src={data?.data.image}
          alt="image"
          className="w-[250px] h-[170px] rounded-xl border-2 border-black p-1"
        />
        <div className="flex flex-col w-full pl-5 relative">
          <div className="flex flex-col gap-2">
            <p className="text-lg text-[#262626]" style={{ fontWeight: 700 }}>
              {data?.data.title}
            </p>
            <p className="text-sm text-[#92929D] font-normal">
              {data?.data.description !== undefined &&
                (data.data.description.length > 255
                  ? data?.data.description.slice(0, 250) + "..."
                  : data?.data.description)}
            </p>
          </div>
          <div className="flex justify-between w-full items-center absolute bottom-0 pr-8">
            <div className="flex gap-4">
              <Avatar
                placeholder={""}
                src="https://docs.material-tailwind.com/img/face-2.jpg"
                alt="avatar"
                variant="circular"
              />
              <div className="flex flex-col">
                <p className="text-lg font-semibold text-black">Moderator</p>
                <p className="text-sm font-medium">{data?.data.moderator}</p>
              </div>
            </div>
            <div className="flex ml-2 items-center gap-4">
              <div className="flex gap-2 items-center">
                <img src={Like} alt="like" />
                <p className="font-semibold">{data?.data.likes}</p>
              </div>
              <IoChatbubbleEllipsesOutline size={24} />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
