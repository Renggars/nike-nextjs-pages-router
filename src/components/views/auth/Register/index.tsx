import AuthLayout from "@/components/layouts/AuthLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import authServices from "@/services/auth";
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

    try {
      const result = await authServices.registerAccount(data);

      if (result.status === 200) {
        form.reset();
        setIsLoading(false);
        push("/auth/login");
      } else {
        setIsLoading(false);
        setError("Email is already registered");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError("Email is already registered");
    }
  };

  return (
    <>
      <AuthLayout
        title="Register account"
        error={error}
        link="/auth/login"
        linkText="Already have an account? Login "
      >
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
      </AuthLayout>
    </>
  );
};

export default RegisterView;
