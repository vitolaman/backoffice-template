import React, { useState } from "react";
import ContentContainer from "components/container";
import { useNavigate } from "react-router-dom";
import ActiveUserPage from "components/user-management/ActiveUser";
import PendingUserPage from "components/user-management/PendingUser";


export const userRouteName = "user";
const UserPage: React.FC = () => {
  const navigate = useNavigate();

  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleTabChange = (index: number) => {
    setTabIndex(index);
  };

  return (
    <ContentContainer>
      <div className="flex">
        <div
          className={`py-2 px-6 cursor-pointer ${tabIndex === 0 ? 'border-b-2 border-san-juan' : ''}`}
          onClick={() => handleTabChange(0)}
        >
          Active User
        </div>
        {/* <div
          className={`py-2 px-6 cursor-pointer ${tabIndex === 1 ? 'border-b-2 border-san-juan' : ''}`}
          onClick={() => handleTabChange(1)}
        >
          Pending User
        </div> */}
      </div>
      {tabIndex === 0 && <ActiveUserPage />}
      {tabIndex === 1 && <PendingUserPage />}
    </ContentContainer>
  );
};

export default UserPage;
