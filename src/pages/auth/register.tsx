import RegisterView from "@/components/views/auth/Register";
import React, { Dispatch, SetStateAction } from "react";

type PropsType = {
  setToaster: Dispatch<SetStateAction<{}>>;
};

const RegisterPage = ({ setToaster }: PropsType) => {
  return (
    <>
      <RegisterView setToaster={setToaster} />
    </>
  );
};

export default RegisterPage;
