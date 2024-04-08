import React, { useState } from "react";
import { Card, Avatar } from "@material-tailwind/react";
import moment from "moment";
import { Like, PDF } from "assets/images";
import { usePostDetailQuery } from "services/modules/post";
import { useParams } from "react-router-dom";
import { Button } from "react-daisyui";
import PDFViewer from "./PDFViewer";

export default function DetailPostCard(): React.ReactElement {
  const { id } = useParams();
  const { data } = usePostDetailQuery({ id: id as string });
  const [modalPDF, setModalPDF] = useState<boolean>(false);

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
            {data?.data.by_admin ? "Admin" : "Personal"}
          </p>
          <p className="text-sm font-medium">
            {moment(data?.data.created_at).fromNow()}
          </p>
        </div>
      </div>
      {(data?.data.images?.length as number) > 0 && (
        <div className="flex justify-around gap-4">
          {data?.data.images.map((el: string, i: number) => {
            return (
              <img
                key={i}
                src={el}
                alt="images"
                className={`w-full ${
                  data.data.images.length > 1 ? "max-w-[20vw]" : ""
                } max-h-[20vh] object-contain rounded-xl`}
              />
            );
          })}
        </div>
      )}
      <div className="flex text-sm font-medium mt-4">{data?.data.text}</div>
      <div className="flex mt-4 ml-2">
        <div className="flex gap-2 items-center">
          <img src={Like} alt="like" />
          {data?.data.likes}
        </div>
        {typeof data?.data.file === "string" ? (
          <>
            <Button
              onClick={() => {
                setModalPDF(true);
              }}
              className="hover:bg-transparent border-none text-center"
            >
              <img src={PDF} alt="pdf" className="w-6 h-6" />
            </Button>
            <PDFViewer
              file={data?.data.file as string}
              isOpen={modalPDF}
              onClose={() => setModalPDF(false)}
            />
          </>
        ) : null}
      </div>
    </Card>
  );
}
