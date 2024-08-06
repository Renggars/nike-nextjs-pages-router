import Button from "@/components/ui/Button";
import React from "react";

const SuccessView = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[100vh]">
      <h1 className="mb-5 text-3xl font-semibold">Payment Success</h1>
      <Button type="button" classname="bg-gray-900 hover:bg-gray-800">
        Check Your Order Here
      </Button>
    </div>
  );
};

export default SuccessView;
