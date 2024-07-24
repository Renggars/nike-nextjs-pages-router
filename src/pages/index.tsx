import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div
      className={`flex min-h-screen flex-col items-center mt-16 ${inter.className}`}
    >
      <h1 className="mb-8 text-4xl font-medium">Home Page</h1>

      <Link
        href={"/auth/login"}
        className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 rounded-full h-10 w-28 font-medium mb-5 "
      >
        <span className="text-white">Login</span>
      </Link>
      <Link
        href={"/auth/register"}
        className="flex items-center justify-center bg-blue-600  hover:bg-blue-700 rounded-full h-10 w-28 font-medium"
      >
        <span className="text-white">Register</span>
      </Link>
    </div>
  );
}
