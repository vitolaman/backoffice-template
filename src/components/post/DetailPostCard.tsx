import React from "react";
import { Card, Avatar } from "@material-tailwind/react";
import moment from "moment";
import { Like } from "assets/images";
import { PostList } from "_interfaces/post.interface";

export const detailPostRouteName = "post/:id";
export default function DetailPostCard({
  postDetail,
}: {
  postDetail: PostList;
}): React.ReactElement {
  return (
    <Card placeholder={""} className="flex flex-col mb-6 mx-5 p-5">
      <div className="flex gap-4 mb-4">
        <Avatar
          placeholder={""}
          src="https://docs.material-tailwind.com/img/face-2.jpg"
          alt="avatar"
          variant="circular"
        />
        <div className="flex flex-col">
          <p className="text-lg font-semibold text-black">
            {postDetail.owner.name}
          </p>
          <p className="text-sm font-medium">
            {moment(postDetail?.created_at).fromNow()}
          </p>
        </div>
      </div>
      {postDetail.images.length > 0 && (
        <div className="flex justify-around gap-4">
          {postDetail.images.map((el: string, i: number) => {
            return (
              <img
                key={i}
                src={el}
                alt="images"
                className={`w-full ${
                  postDetail.images.length > 1 ? "max-w-[20vw]" : ""
                } max-h-[20vh] object-cover rounded-xl`}
              />
            );
          })}
        </div>
      )}
      <div className="flex text-sm font-medium mt-4">{postDetail.text}</div>
      <div className="flex mt-4 ml-2">
        <div className="flex gap-2">
          <img src={Like} alt="like" />
          {postDetail.likes}
        </div>
      </div>
    </Card>
  );
}
