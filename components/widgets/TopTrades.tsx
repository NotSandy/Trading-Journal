import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

const TopTrades = () => {
  const { data: session, status } = useSession();
  return (
    <div className="px-2 mb-4">
      <div className="rounded-md bg-neutral-800">
        <div className="flex flex-wrap items-center justify-center p-4 gap-y-4">
          <div className="basis-full">
            <div className="text-lg font-bold text-neutral-100">
              <span>Top Trades</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 basis-full">
            <div className="flex items-center justify-between flex-grow p-2 rounded-md basis-2/5 gap-x-4 bg-neutral-900">
              <div className="flex items-center basis-2/3 gap-x-2">
                <div className="relative w-12 h-12 border-2 rounded-full border-neutral-900">
                  <Image
                    src={`${session?.user?.image}`}
                    alt="Profile_Picture"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
                <div className="flex-col whitespace-nowrap">
                  <div className="font-semibold text-neutral-100">
                    <span>AMD $140.00</span>
                  </div>
                  <div className="text-neutral-300">
                    <span>2022-02-18 Call</span>
                  </div>
                </div>
              </div>
              <div className="text-right basis-1/3">
                <span className="font-semibold text-success-300">
                  +$1,564.58
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between flex-grow p-2 rounded-md basis-2/5 gap-x-4 bg-neutral-900">
              <div className="flex items-center basis-2/3 gap-x-2">
                <div className="relative w-12 h-12 border-2 rounded-full border-neutral-900">
                  <Image
                    src={`${session?.user?.image}`}
                    alt="Profile_Picture"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
                <div className="flex-col whitespace-nowrap">
                  <div className="font-semibold text-neutral-100">
                    <span>AMD $140.00</span>
                  </div>
                  <div className="text-neutral-300">
                    <span>2022-02-18 Call</span>
                  </div>
                </div>
              </div>
              <div className="text-right basis-1/3">
                <span className="font-semibold text-success-300">
                  +$1,564.58
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between flex-grow p-2 rounded-md basis-2/5 gap-x-4 bg-neutral-900">
              <div className="flex items-center basis-2/3 gap-x-2">
                <div className="relative w-12 h-12 border-2 rounded-full border-neutral-900">
                  <Image
                    src={`${session?.user?.image}`}
                    alt="Profile_Picture"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
                <div className="flex-col whitespace-nowrap">
                  <div className="font-semibold text-neutral-100">
                    <span>AMD $140.00</span>
                  </div>
                  <div className="text-neutral-300">
                    <span>2022-02-18 Call</span>
                  </div>
                </div>
              </div>
              <div className="text-right basis-1/3">
                <span className="font-semibold text-success-300">
                  +$1,564.58
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between flex-grow p-2 rounded-md basis-2/5 gap-x-4 bg-neutral-900">
              <div className="flex items-center basis-2/3 gap-x-2">
                <div className="relative w-12 h-12 border-2 rounded-full border-neutral-900">
                  <Image
                    src={`${session?.user?.image}`}
                    alt="Profile_Picture"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
                <div className="flex-col whitespace-nowrap">
                  <div className="font-semibold text-neutral-100">
                    <span>AMD $140.00</span>
                  </div>
                  <div className="text-neutral-300">
                    <span>2022-02-18 Call</span>
                  </div>
                </div>
              </div>
              <div className="text-right basis-1/3">
                <span className="font-semibold text-success-300">
                  +$1,564.58
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between flex-grow p-2 rounded-md basis-2/5 gap-x-4 bg-neutral-900">
              <div className="flex items-center basis-2/3 gap-x-2">
                <div className="relative w-12 h-12 border-2 rounded-full border-neutral-900">
                  <Image
                    src={`${session?.user?.image}`}
                    alt="Profile_Picture"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
                <div className="flex-col whitespace-nowrap">
                  <div className="font-semibold text-neutral-100">
                    <span>AMD $140.00</span>
                  </div>
                  <div className="text-neutral-300">
                    <span>2022-02-18 Call</span>
                  </div>
                </div>
              </div>
              <div className="text-right basis-1/3">
                <span className="font-semibold text-success-300">
                  +$1,564.58
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between flex-grow p-2 rounded-md basis-2/5 gap-x-4 bg-neutral-900">
              <div className="flex items-center basis-2/3 gap-x-2">
                <div className="relative w-12 h-12 border-2 rounded-full border-neutral-900">
                  <Image
                    src={`${session?.user?.image}`}
                    alt="Profile_Picture"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
                <div className="flex-col whitespace-nowrap">
                  <div className="font-semibold text-neutral-100">
                    <span>AMD $140.00</span>
                  </div>
                  <div className="text-neutral-300">
                    <span>2022-02-18 Call</span>
                  </div>
                </div>
              </div>
              <div className="text-right basis-1/3">
                <span className="font-semibold text-success-300">
                  +$1,564.58
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between flex-grow p-2 rounded-md basis-2/5 gap-x-4 bg-neutral-900">
              <div className="flex items-center basis-2/3 gap-x-2">
                <div className="relative w-12 h-12 border-2 rounded-full border-neutral-900">
                  <Image
                    src={`${session?.user?.image}`}
                    alt="Profile_Picture"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
                <div className="flex-col whitespace-nowrap">
                  <div className="font-semibold text-neutral-100">
                    <span>AMD $140.00</span>
                  </div>
                  <div className="text-neutral-300">
                    <span>2022-02-18 Call</span>
                  </div>
                </div>
              </div>
              <div className="text-right basis-1/3">
                <span className="font-semibold text-success-300">
                  +$1,564.58
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between flex-grow p-2 rounded-md basis-2/5 gap-x-4 bg-neutral-900">
              <div className="flex items-center basis-2/3 gap-x-2">
                <div className="relative w-12 h-12 border-2 rounded-full border-neutral-900">
                  <Image
                    src={`${session?.user?.image}`}
                    alt="Profile_Picture"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
                <div className="flex-col whitespace-nowrap">
                  <div className="font-semibold text-neutral-100">
                    <span>AMD $140.00</span>
                  </div>
                  <div className="text-neutral-300">
                    <span>2022-02-18 Call</span>
                  </div>
                </div>
              </div>
              <div className="text-right basis-1/3">
                <span className="font-semibold text-success-300">
                  +$1,564.58
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between flex-grow p-2 rounded-md basis-2/5 gap-x-4 bg-neutral-900">
              <div className="flex items-center basis-2/3 gap-x-2">
                <div className="relative w-12 h-12 border-2 rounded-full border-neutral-900">
                  <Image
                    src={`${session?.user?.image}`}
                    alt="Profile_Picture"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
                <div className="flex-col whitespace-nowrap">
                  <div className="font-semibold text-neutral-100">
                    <span>AMD $140.00</span>
                  </div>
                  <div className="text-neutral-300">
                    <span>2022-02-18 Call</span>
                  </div>
                </div>
              </div>
              <div className="text-right basis-1/3">
                <span className="font-semibold text-success-300">
                  +$1,564.58
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between flex-grow p-2 rounded-md basis-2/5 gap-x-4 bg-neutral-900">
              <div className="flex items-center basis-2/3 gap-x-2">
                <div className="relative w-12 h-12 border-2 rounded-full border-neutral-900">
                  <Image
                    src={`${session?.user?.image}`}
                    alt="Profile_Picture"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
                <div className="flex-col whitespace-nowrap">
                  <div className="font-semibold text-neutral-100">
                    <span>AMD $140.00</span>
                  </div>
                  <div className="text-neutral-300">
                    <span>2022-02-18 Call</span>
                  </div>
                </div>
              </div>
              <div className="text-right basis-1/3">
                <span className="font-semibold text-success-300">
                  +$1,564.58
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopTrades;
