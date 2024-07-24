import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";

const LoginView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push, query } = useRouter();

  const callbackUrl: any = query.callbackUrl || "/";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    const form = event.target as HTMLFormElement;
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email.value,
        password: form.password.value,
        callbackUrl,
      });

      if (!res?.error) {
        setIsLoading(false);
        form.reset();
        push(callbackUrl);
      } else {
        setIsLoading(false);
        setError("Email or password is incorrect");
      }
    } catch (error) {
      setIsLoading(false);
      setError("Email or password is incorrect");
    }
  };

  return (
    <div className="bg-gray-50 mt-24 md:mt-0">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Login
            </h1>
            {error && <p className="text-red-600 font-medium">{error}</p>}
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
              <Button type="submit">
                {isLoading ? "Loading..." : "Login"}
              </Button>
            </form>
            <hr className="border-gray-300" />
            <div>
              <Button
                type="button"
                onClick={() =>
                  signIn("google", { callbackUrl, redirect: false })
                }
                classname="flex justify-center items-center"
              >
                <i className="bx bxl-google mr-1 text-[18px]" />
                Login With Google
              </Button>
            </div>
            <p>
              Don{"'"}t have an account? Register{" "}
              <Link
                href={"/auth/register"}
                className="text-blue-700 font-medium cursor-pointer hover:underline"
              >
                here
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
