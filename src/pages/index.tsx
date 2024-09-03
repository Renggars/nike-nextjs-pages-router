import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import Button from "@/components/ui/ButtonLast";
import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Caraousel";

const inter = Inter({ subsets: ["latin"] });

const data = [
  {
    img: "/homePage/section1/1.jpg",
    title: "Find Your Max",
    desc: "Discover Air Max Styles",
    link: "Explore",
    href: "/products",
  },
  {
    img: "/homePage/section1/2.jpg",
    title: "Air Max 90",
    desc: "For Your 90s Vibes",
    link: "Explore",
    href: "/products",
  },
  {
    img: "/homePage/section1/3.jpg",
    title: "Air Max Koko",
    desc: "For Street Heat",
    link: "Explore",
    href: "/products",
  },
  {
    img: "/homePage/section1/4.jpg",
    title: "Air Max Plus",
    desc: "For An Eye-Catching Edge",
    link: "Explore",
    href: "/products",
  },
  {
    img: "/homePage/section1/5.jpg",
    title: "Air Max 1",
    desc: "For Leading With Style",
    link: "Explore",
    href: "/products",
  },
  {
    img: "/homePage/section1/6.jpg",
    title: "Amp Up Your Style",
    desc: "Discover the Air Max",
    link: "Explore",
    href: "/products",
  },
];

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
            <Button
              type="button"
              classname="w-28 bg-gray-950 hover:bg-gray-700"
            >
              Shop
            </Button>
          </Link>
        </div>
      </div>
      <section className="w-full max-w-[95rem] mt-24">
        <div className="flex justify-between">
          <h3 className="text-3xl">Featured</h3>
          <div className="flex justify-center items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
          </div>
        </div>
        <Carousel className="mt-3">
          <CarouselContent className="">
            {data.map((item, index) => (
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <Image
                        src={item.img}
                        alt={item.title}
                        width={800}
                        height={800}
                      ></Image>
                    </CardContent>
                    <div className="flex flex-col ml-7 mb-5">
                      <div className="font-semibold text-lg">{item.title}</div>
                      <div className="font-semibold text-xl">{item.desc}</div>
                      <div className="underline font-semibold mt-5">
                        <Link href={item.href}>{item.link}</Link>
                      </div>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
      <section className="w-full max-w-[95rem] mt-24">
        <div className="flex justify-between">
          <h3 className="text-3xl">Featured</h3>
          <div className="flex justify-center items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
          </div>
        </div>
        <Carousel className="mt-3">
          <CarouselContent className="">
            {data.map((item, index) => (
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <Image
                        src={item.img}
                        alt={item.title}
                        width={800}
                        height={800}
                      ></Image>
                    </CardContent>
                    <div className="flex flex-col ml-7 mb-5">
                      <div className="font-semibold text-lg">{item.title}</div>
                      <div className="font-semibold text-xl">{item.desc}</div>
                      <div className="underline font-semibold mt-5">
                        <Link href={item.href}>{item.link}</Link>
                      </div>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
      <section className="w-full max-w-[95rem] mt-24">
        <div className="flex justify-between">
          <h3 className="text-3xl">Featured</h3>
          <div className="flex justify-center items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
          </div>
        </div>
        <Carousel className="mt-3">
          <CarouselContent className="">
            {data.map((item, index) => (
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <Image
                        src={item.img}
                        alt={item.title}
                        width={800}
                        height={800}
                      ></Image>
                    </CardContent>
                    <div className="flex flex-col ml-7 mb-5">
                      <div className="font-semibold text-lg">{item.title}</div>
                      <div className="font-semibold text-xl">{item.desc}</div>
                      <div className="underline font-semibold mt-5">
                        <Link href={item.href}>{item.link}</Link>
                      </div>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
      <div className="mt-96"></div>
    </div>
  );
}
