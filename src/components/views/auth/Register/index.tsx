import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

const RegisterView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push } = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    const form = event.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      fullname: form.fullname.value,
      phone: form.phone.value,
      password: form.password.value,
    };

    const result = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (result.status === 200) {
      form.reset();
      setIsLoading(false);
      push("/auth/login");
    } else {
      setIsLoading(false);
      setError("Email is already registered");
    }
  };

  return (
    <div className="bg-gray-50 mt-24 md:mt-0">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Register account
            </h1>
            {error && <p className="text-red-600 font-medium">{error}</p>}
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <Input
                label="Email"
                type="email"
                name="email"
                placeholder="email@gmail.com"
              />
              <Input
                label="Fullname"
                type="text"
                name="fullname"
                placeholder="Insert name here"
              />
              <Input
                label="Phone"
                type="text"
                name="phone"
                placeholder="Insert phone here"
              />
              <Input
                label="Password"
                type="password"
                name="password"
                placeholder="••••••••"
              />
              <Button type="submit">
                {isLoading ? "Loading..." : "Register account"}
              </Button>
            </form>
            <p>
              Have an account? Login{" "}
              <Link
                href={"/auth/login"}
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

export default RegisterView;
