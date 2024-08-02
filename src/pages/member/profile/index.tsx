import ProfilMemberView from "@/components/views/member/Profile";
import React, { Dispatch, SetStateAction } from "react";

type PropsType = {
  setToaster: Dispatch<SetStateAction<{}>>;
};

const ProfilePage = ({ setToaster }: PropsType) => {
  return <ProfilMemberView setToaster={setToaster} />;
};

export default ProfilePage;
