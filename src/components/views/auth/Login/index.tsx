import AuthLayout from "@/components/layouts/AuthLayout";
import ButtonManual from "@/components/ui/ButtonManual/index";
import Input from "@/components/ui/Input";
import { ToasterContext } from "@/contexts/ToasterContext";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { FormEvent, useContext, useState } from "react";

const LoginView = () => {
  const { setToaster } = useContext(ToasterContext);
  const [isLoading, setIsLoading] = useState(false);
  const { push, query } = useRouter();

  const callbackUrl: any = query.callbackUrl || "/";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form = event.target as HTMLFormElement;
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email.value,
        password: form.password.value,
        callbackUrl: callbackUrl,
      });

      if (!res?.error) {
        setIsLoading(false);
        form.reset();
        push(callbackUrl);
        setToaster({
          variant: "success",
          message: "Login Success",
        });
      } else {
        setIsLoading(false);
        setToaster({
          variant: "danger",
          message: "Email or password is incorrect",
        });
      }
    } catch (error) {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Login Failed, please call support",
      });
    }
  };

  return (
    <AuthLayout
      title="Login"
      link="/auth/register"
      linkText="Don't have an account? Register "
    >
      <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="name@company.com"
        />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="••••••••"
        />
        <ButtonManual type="submit">
          {isLoading ? "Loading..." : "Login"}
        </ButtonManual>
      </form>
      <hr className="border-gray-300" />
      <div>
        <ButtonManual
          type="button"
          onClick={() => signIn("google", { callbackUrl, redirect: false })}
          classname="flex justify-center items-center "
        >
          <i className="bx bxl-google mr-1 text-[18px]" />
          Login With Google
        </ButtonManual>
      </div>
    </AuthLayout>
  );
};

export default LoginView;
