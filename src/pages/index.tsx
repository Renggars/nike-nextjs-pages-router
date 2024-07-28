import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Button from "@/components/ui/Button";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data } = useSession();
  return (
    <div
      className={`flex min-h-screen flex-col items-center mt-28 ${inter.className}`}
    >
      <h1 className="text-4xl font-medium">Home Page</h1>
      <div className="flex justify-center items-center gap-5 mt-5">
        <Link href={"/admin"}>
          <Button type="button" classname="w-28">
            Admin
          </Button>
        </Link>
        <Link href={"/member"}>
          <Button type="button" classname="w-28">
            Member
          </Button>
        </Link>
      </div>
    </div>
  );
}
