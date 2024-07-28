import AuthLayout from "@/components/layouts/AuthLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";

type PropsType = {
  setToaster: Dispatch<SetStateAction<{}>>;
};

const LoginView = ({ setToaster }: PropsType) => {
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
        <Button type="submit">{isLoading ? "Loading..." : "Login"}</Button>
      </form>
      <hr className="border-gray-300" />
      <div>
        <Button
          type="button"
          onClick={() => signIn("google", { callbackUrl, redirect: false })}
          classname="flex justify-center items-center "
        >
          <i className="bx bxl-google mr-1 text-[18px]" />
          Login With Google
        </Button>
      </div>
    </AuthLayout>
  );
};

export default LoginView;
