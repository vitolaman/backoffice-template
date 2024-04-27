import ContentContainer from "components/container";
import React, { useEffect, useState } from "react";
import { Button } from "react-daisyui";
import { useNavigate, useParams } from "react-router-dom";
import { useUserDetailQuery, useVerifyUserMutation } from "services/modules/user-management";
import moment from "moment";


interface DetailUserPageProps {}

export const detailUserRouteName = "user/:id";
const DetailUserPage: React.FC<DetailUserPageProps> = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useUserDetailQuery({id: id!});

  return (
    <ContentContainer>
      <div className="flex flex-row justify-between">
        <h3 className="text-2xl text-[#262626] font-bold">Detail User</h3>
      </div>
      <div>
      <div className="mt-6 flex items-center">
          <label htmlFor="name" className="mr-2 font-semibold flex-shrink-0 w-48">Name</label>
          <p>{data?.data.data.name}</p>
        </div>
        <div className="mt-6 flex items-center">
          <label htmlFor="email" className="mr-2 font-semibold flex-shrink-0 w-48">Email</label>
          <p>{data?.data.data.email}</p>
        </div>
        <div className="mt-6 flex items-center">
          <label htmlFor="gender" className="mr-2 font-semibold flex-shrink-0 w-48">Gender</label>
          <p>{data?.data.data.gender === 'l' ? 'male' : 'female'}</p>
        </div>
        <div className="mt-6 flex items-center">
            <label htmlFor="dob" className="mr-2 font-semibold flex-shrink-0 w-48">Date of Birth</label>
            <p>{moment(data?.data.data.dob).format("DD MMM YYYY")}</p>
        </div> 
      </div>
    </ContentContainer>
  );
};

export default DetailUserPage;
