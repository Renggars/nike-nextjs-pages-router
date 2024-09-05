import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import ButtonManual from "@/components/ui/ButtonManual/index";
import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { title } from "process";
import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"] });

const dataFeatured = [
  {
    img: "/homePage/featured/1.jpg",
    title: "Find Your Max",
    desc: "Discover Air Max Styles",
    link: "Explore",
    href: "/products",
  },
  {
    img: "/homePage/featured/2.jpg",
    title: "Air Max 90",
    desc: "For Your 90s Vibes",
    link: "Explore",
    href: "/products",
  },
  {
    img: "/homePage/featured/3.jpg",
    title: "Air Max Koko",
    desc: "For Street Heat",
    link: "Explore",
    href: "/products",
  },
  {
    img: "/homePage/featured/4.jpg",
    title: "Air Max Plus",
    desc: "For An Eye-Catching Edge",
    link: "Explore",
    href: "/products",
  },
  {
    img: "/homePage/featured/5.jpg",
    title: "Air Max 1",
    desc: "For Leading With Style",
    link: "Explore",
    href: "/products",
  },
  {
    img: "/homePage/featured/6.jpg",
    title: "Amp Up Your Style",
    desc: "Discover the Air Max",
    link: "Explore",
    href: "/products",
  },
];

const dataNewArrival = [
  {
    img: "/homePage/newArrival/1.png",
    title: "Nike Dunk Low Premium",
    type: "Women's Shoes",
    price: "Rp 2,099,000",
    href: "/products",
  },
  {
    img: "/homePage/newArrival/2.png",
    title: "Luka 3 PF 'Motorsport'",
    type: "Basketball ",
    price: "Rp 2,099,000",
    href: "/products",
  },
  {
    img: "/homePage/newArrival/3.png",
    title: "Nike Sportswear Women's Artist Collection",
    type: "Short-Sleeve Graphic T-Shirt",
    price: "Rp 549,000",
    href: "/products",
  },
  {
    img: "/homePage/newArrival/4.png",
    title: 'Nike Mercurial Vapor 16 Elite "Kylian Mbappé"',
    type: "FG Low-Top Football Boot",
    price: "Rp 3,999,000",
    href: "/products",
  },
  {
    img: "/homePage/newArrival/5.png",
    title: "Nike Mercurial Superfly 10 Elite 'Kylian Mbappé'",
    type: "FG High-Top Football Boot",
    price: "Rp 4,429,000",
    href: "/products",
  },
  {
    img: "/homePage/newArrival/6.png",
    title: "Nike Primary Studio '72",
    type: "Men's Dri-FIT Short-Sleeve Versatile Top",
    price: "Rp 649,000",
    href: "/products",
  },
  {
    img: "/homePage/newArrival/7.png",
    title: "Nike Calm",
    type: "Women's Slides",
    price: "Rp 839,000",
    href: "/products",
  },
  {
    img: "/homePage/newArrival/8.png",
    title: "Nike Sportswear Women's Artist Collection",
    type: "Bomber Jacket",
    price: "Rp 1,899,000",
    href: "/products",
  },
  {
    img: "/homePage/newArrival/9.png",
    title: "Nike Sportswear Phoenix Fleece Women's Artist Collection",
    type: "Over-Oversized Crew-Neck Sweatshirt",
    price: "Rp 1,079,000",
    href: "/products",
  },
  {
    img: "/homePage/newArrival/10.png",
    title: "Nike Air Max 1 Essential Premium",
    type: "Men's Shoes",
    price: "Rp 2,379,000",
    href: "/products",
  },
];

const dataTheLatest = [
  {
    img: "/homePage/theLatest/1.png",
    title: "Nike Zenvy Collection",
    href: "/products",
  },
  {
    img: "/homePage/theLatest/2.png",
    title: "Kylian Mbappé Mercurial",
    href: "/products",
  },
  {
    img: "/homePage/theLatest/3.jpeg",
    title: "Train Like LeBron in the TR1",
    href: "/products",
  },
];

const dataRunWithUs = [
  {
    img: "/homePage/runWithUs/1.jpg",
    title: "Store finder",
    desc: "Find Your Perfect Fit In-Store",
    linkTitle: "Find Your Store",
    href: "/products",
  },
  {
    img: "/homePage/runWithUs/2.jpg",
    title: "Nike Run Club App",
    desc: "Community and Coaching",
    linkTitle: "Learn More",
    href: "/products",
  },
  {
    img: "/homePage/runWithUs/3.jpg",
    title: "",
    desc: "Nike By You",
    linkTitle: "Customise",
    href: "/products",
  },
];

const dataFooterResource = [
  {
    title: "Resources",
    list: [
      {
        title: "Get Help",
        href: "/products",
      },
      {
        title: "Become A Member",
        href: "/products",
      },
      {
        title: "Education Discounts",
        href: "/products",
      },
      {
        title: "Send Us Feedback",
        href: "/products",
      },
    ],
  },
  {
    title: "Help",
    list: [
      {
        title: "Get Help",
        href: "/products",
      },
      {
        title: "Order Status",
        href: "/products",
      },
      {
        title: "Delivery",
        href: "/products",
      },
      {
        title: "Return",
        href: "/products",
      },
      {
        title: "Payment Options",
        href: "/products",
      },
      {
        title: "Contact Us",
        href: "/products",
      },
    ],
  },
  {
    title: "Company",
    list: [
      {
        title: "About Nike",
        href: "/products",
      },
      {
        title: "News",
        href: "/products",
      },
      {
        title: "Careers",
        href: "/products",
      },
      {
        title: "Investors",
        href: "/products",
      },
      {
        title: "Sustainability",
        href: "/products",
      },
    ],
  },
];

const dataGuides = [
  {
    title: "Nike Adapt",
    href: "/products",
  },
  {
    title: "Nike Air",
    href: "/products",
  },
  {
    title: "Nike Air 1",
    href: "/products",
  },
  {
    title: "Nike Air Max",
    href: "/products",
  },
  {
    title: "Nike FlyEase",
    href: "/products",
  },
  {
    title: "Nike FlyKnit",
    href: "/products",
  },
  {
    title: "Nike FlyLeather",
    href: "/products",
  },
  {
    title: "Nike Free",
    href: "/products",
  },
  {
    title: "Nike Joyride",
    href: "/products",
  },
  {
    title: "Nike Pegasus",
    href: "/products",
  },
  {
    title: "Nike React",
    href: "/products",
  },
  {
    title: "Nike Vaporfly",
    href: "/products",
  },
  {
    title: "Nike Xoom Fly",
    href: "/products",
  },
  {
    title: "Nike ZoomX",
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
          <ButtonManual type="button" classname="w-28">
            Admin
          </ButtonManual>
        </Link>
        <Link href={"/member"}>
          <ButtonManual type="button" classname="w-28">
            Member
          </ButtonManual>
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
            <ButtonManual
              type="button"
              classname="w-28 bg-gray-950 hover:bg-gray-700"
            >
              Shop
            </ButtonManual>
          </Link>
        </div>
      </div>
      {/* featured */}
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
            {dataFeatured.map((item, index) => (
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
                      <div className="underline underline-offset-4 font-semibold mt-5">
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
      {/* new arrival */}
      <section className="w-full max-w-[95rem] mt-24">
        <div className="flex justify-between">
          <h3 className="text-3xl">New Arrival</h3>
          <div className="flex justify-center items-center gap-3">
            <Link href={"/products"} className="text-xl font-semibold">
              Shop
            </Link>
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
          </div>
        </div>
        <Carousel className="mt-3">
          <CarouselContent className="">
            {dataNewArrival.map((item, index) => (
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
                      <div className="font-semibold text-lg text-gray-700">
                        {item.title}
                      </div>
                      <div className="text-gray-500">{item.type}</div>
                      <div className="font-semibold mt-5">
                        <Link href={item.href}>{item.price}</Link>
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
      {/* the latest */}
      <section className="w-full max-w-[95rem] mt-24">
        <h3 className="text-3xl">The Latest</h3>
        <Carousel className="mt-3">
          <CarouselContent className="">
            {dataTheLatest.map((item, index) => (
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
                      <div className="underline underline-offset-4 font-semibold mt-5">
                        <Link href={item.href}>Shop</Link>
                      </div>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>
      {/* run with us */}
      <section className="w-full max-w-[95rem] mt-24">
        <h3 className="text-3xl">Run With Us</h3>
        <Carousel className="mt-3">
          <CarouselContent className="">
            {dataRunWithUs.map((item, index) => (
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">
                  <Card className="h-[610px]">
                    <CardContent className="flex aspect-square p-6">
                      <div className="relative">
                        <Image
                          src={item.img}
                          alt={item.title}
                          width={800}
                          height={800}
                        ></Image>
                      </div>
                      {item.desc !== "Nike By You" ? (
                        <div className="absolute flex flex-col ml-7 mb-5 text-white bottom-6">
                          <div className="font-semibold text-lg">
                            {item.title}
                          </div>
                          <div className="font-semibold text-xl mt-2">
                            {item.desc}
                          </div>
                          <div className="font-semibold mt-5">
                            <Link href={item.href}>
                              <Button className="rounded-full text-lg bg-white text-gray-700 hover:bg-gray-300">
                                {item.linkTitle}
                              </Button>
                            </Link>
                          </div>
                        </div>
                      ) : (
                        <div className="absolute flex flex-col ml-7 mb-5 text-black bottom-6">
                          <div className="font-semibold text-lg">
                            {item.title}
                          </div>
                          <div className="font-semibold text-xl">
                            {item.desc}
                          </div>
                          <div className="font-semibold mt-5">
                            <Link href={item.href}>
                              <Button className="rounded-full text-lg hover:bg-gray-500">
                                {item.linkTitle}
                              </Button>
                            </Link>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>
      <div className="mt-96"></div>
    </div>
  );
}
