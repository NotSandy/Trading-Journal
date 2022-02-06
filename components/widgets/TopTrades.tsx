import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { Trade } from "@prisma/client";
import { format, utcToZonedTime } from "date-fns-tz";

const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json());

const TopTrades = () => {
  const { data: session } = useSession();
  const { data: top10Win, error: top10WinError } = useSWR(
    "/api/trades/top10win/",
    fetcher
  );

  if (top10WinError) return <div>Something went wrong...</div>;
  if (!top10Win) return <div>Loading...</div>;
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
            {top10Win.map((trade: Trade) => {
              return (
                <div
                  key={trade.id}
                  className="flex items-center justify-between flex-grow p-2 rounded-md basis-2/5 gap-x-4 bg-neutral-900"
                >
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
                      <div className="text-sm font-semibold text-neutral-100 sm:text-base">
                        <span>
                          {trade.ticker}{" "}
                          {trade.strike.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </span>
                      </div>
                      <div className="text-sm text-neutral-300 sm:text-base">
                        <span>
                          {format(
                            utcToZonedTime(new Date(trade.date), "UTC"),
                            "LLL dd, yyyy"
                          )}{" "}
                          {trade.strategy}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right basis-1/3">
                    <span className="text-sm font-semibold sm:text-base text-success-300">
                      {trade?.pnl?.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopTrades;
