import ButtonManual from "@/components/ui/ButtonManual/index";
import { useRouter } from "next/router";
import React from "react";

const SuccessView = () => {
  const { push } = useRouter();
  return (
    <div className="flex flex-col justify-center items-center h-[100vh]">
      <h1 className="mb-5 text-3xl font-semibold">Payment Success</h1>
      <ButtonManual
        type="button"
        classname="bg-gray-900 hover:bg-gray-800"
        onClick={() => push("/member/orders")}
      >
        Check Your Order Here
      </ButtonManual>
    </div>
  );
};

export default SuccessView;
