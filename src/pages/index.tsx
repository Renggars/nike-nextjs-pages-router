import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import Button from "@/components/ui/Button";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div
      className={`flex min-h-screen flex-col items-center mt-20 ${inter.className}`}
    >
      <div className="w-full min-h-14 h-auto flex justify-center bg-[#F5F5F5]">
        <div className="flex justify-center items-center text-[#111111] p-2">
          <div className="flex flex-col items-center gap-[1px]">
            <span className="text-lg">New Styles On Sale: Up To 40% Off</span>
            <div>
              <Link
                href="/products"
                className="underline font-semibold text-sm"
              >
                Shop All Our New Markdowns
              </Link>
            </div>
          </div>
          {/* <div className="flex flex-col items-center gap-[1px] hidden">
            <span className="text-lg">
              Move, shop, customise & celebrate with us
            </span>
            <p>
              No matter what you feel like doing today, It’s better as a Member.
            </p>
            <div>
              <Link href="/products" className="underline font-semibold">
                Join Us
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center gap-[1px] hidden">
            <span className="text-lg">Teachers & Students Get 10% Off</span>
            <div>
              <Link href="/products" className="underline font-semibold">
                Learn More
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center gap-[1px] hidden">
            <span className="text-lg">
              Free Standard Delivery & 30-Day Free Returns
            </span>
            <div>
              <Link href="/products" className="underline font-semibold">
                Join Now
              </Link>
              <Link href="/products" className="underline font-semibold">
                View Details
              </Link>
            </div>
          </div> */}
        </div>
      </div>

      {/* <div className="flex justify-center items-center gap-5 mt-5">
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
      </div> */}
      <div>
        <Image
          src={"/homePage/nike.jpg"}
          alt="nike-just-do-it"
          width={1824}
          height={1100}
          className="px-11"
        />
        <div className="mt-9 flex flex-col justify-center items-center">
          <h3 className="text-6xl font-bold">GIANNIS FREAK 6</h3>
          <p className="mt-1">Run ‘em down in the new Giannis Freak 6.</p>
          <Link href={"/products"} className="mt-5">
            <Button type="button" classname="w-28 bg-black hover:bg-gray-600">
              Shop
            </Button>
          </Link>
        </div>
      </div>
      <div className="mt-96"></div>
    </div>
  );
}
