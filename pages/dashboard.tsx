import React, { ReactElement, useState } from "react";
import { useSession, getSession } from "next-auth/react";
import Layout from "../components/layouts/Layout";
import PageTitle from "../components/ui/PageTitle";
import Welcome from "../components/widgets/Welcome";
import SmallStat from "../components/widgets/SmallStat";
import {
  CashIcon,
  ReceiptRefundIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/outline";
import TradesMadeGraph from "../components/widgets/TradesMadeChart";
import MonthlyPNLChart from "../components/widgets/MonthlyPNLChart";
import PNLChart from "../components/widgets/TotalPNLChart";
import { prisma } from "../lib/prisma";
import TopTrades from "../components/widgets/TopTrades";
import OpenTradesTable from "../components/widgets/OpenTradesTable";
import {
  calcAveragePremium,
  calcAverageProfit,
  calcAverageProfitPercentage,
} from "../utils/trades/utils";

const Dashboard = (props: any) => {
  const { data: session, status } = useSession();
  const [openTrades, setOpenTrades] = useState(JSON.parse(props.openTrades));
  const [trades, setTrades] = useState(JSON.parse(props.trades));

  const tradesChangeHandler = () => {
    fetch("/api/trades/open/")
      .then((res) => res.json())
      .then((res) => setOpenTrades(res));
    fetch("/api/trades/")
      .then((res) => res.json())
      .then((res) => setTrades(res));
  };

  if (status === "loading") {
    return <h1>Loading...</h1>;
  }

  if (status === "authenticated" && session) {
    return (
      <div>
        <PageTitle title="Dashboard" />
        <div className="flex flex-wrap lg:flex-nowrap">
          <div className="flex-col basis-full lg:basis-1/3">
            <Welcome
              userProfilePicture={`${session?.user?.image}`}
              trades={trades}
            />
            <MonthlyPNLChart></MonthlyPNLChart>
          </div>
          <div className="flex-col basis-full lg:basis-2/3">
            <div className="flex flex-wrap">
              <div className="basis-full sm:basis-1/3">
                <SmallStat
                  title="Avg. Return"
                  value={calcAverageProfit(trades).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                  Icon={ReceiptRefundIcon}
                />
              </div>
              <div className="basis-full sm:basis-1/3">
                <SmallStat
                  title="Avg. Profit %"
                  value={calcAverageProfitPercentage(trades).toFixed(0) + " %"}
                  Icon={CurrencyDollarIcon}
                />
              </div>
              <div className="basis-full sm:basis-1/3">
                <SmallStat
                  title="Avg. Premium"
                  value={calcAveragePremium(trades).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                  Icon={CashIcon}
                />
              </div>
            </div>
            <div className="basis-full">
              <TradesMadeGraph></TradesMadeGraph>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="flex-col basis-full">
            <PNLChart></PNLChart>
          </div>
        </div>
        <div className="flex flex-wrap lg:flex-nowrap">
          <div className="flex-col min-w-0 basis-full lg:basis-1/2">
            <OpenTradesTable
              data={openTrades}
              onOpenTradeTableChangeHandler={tradesChangeHandler}
            ></OpenTradesTable>
          </div>
          <div className="flex-col basis-full lg:basis-1/2">
            <TopTrades></TopTrades>
          </div>
        </div>
      </div>
    );
  }
};

export default Dashboard;

Dashboard.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
      props: {},
    };
  }
  const data = await prisma.trade.findMany({
    where: {
      user: { email: session?.user?.email },
      status: "open",
    },
  });

  const openTrades = JSON.stringify(data);

  const data2 = await prisma.trade.findMany({
    where: {
      user: { email: session?.user?.email },
    },
  });

  const trades = JSON.stringify(data2);

  return {
    props: { session, openTrades, trades },
  };
}
