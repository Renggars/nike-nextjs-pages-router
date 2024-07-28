import LoginView from "@/components/views/auth/Login";
import React, { Dispatch, SetStateAction } from "react";

type PropsType = {
  setToaster: Dispatch<SetStateAction<{}>>;
};

const RegisterPage = ({ setToaster }: PropsType) => {
  return (
    <>
      <LoginView setToaster={setToaster} />
    </>
  );
};

export default RegisterPage;
