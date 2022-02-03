import React, { ReactElement } from "react";
import { useSession, getSession } from "next-auth/react";
import Layout from "../components/layouts/Layout";
import PageTitle from "../components/ui/PageTitle";
import TradesTable from "../components/trades/TradesTable";
import { prisma } from "../lib/prisma";
import { format } from "date-fns";

const Trades = (props: any) => {
  const { data: session, status } = useSession();
  let { trades } = props;
  trades = JSON.parse(trades);

  if (status === "loading") {
    return <h1>Loading...</h1>;
  }

  if (status === "authenticated" && session) {
    return (
      <div>
        <PageTitle title="Trades" />
        <TradesTable data={trades} />
      </div>
    );
  }
};

export default Trades;

Trades.getLayout = (page: ReactElement) => {
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
    },
  });

  data.forEach((element: any) => {
    if (element.date) {
      element.date = format(new Date(element.date), "MM/dd/yy");
    }
    if (element.expiry) {
      element.expiry = format(new Date(element.expiry), "MM/dd/yy");
    }
    if (element.strike) {
      element.strike = element.strike.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    }
    if (element.entry) {
      element.entry = element.entry.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    }
    if (element.exit) {
      element.exit = element.exit.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    }
    if (element.premium) {
      element.premium = element.premium.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    }
    if (element.pnl) {
      element.pnl = element.pnl.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    }
    if (element.percent) {
      element.percent = element.percent.toFixed(0) + "%";
    }
  });

  const trades = JSON.stringify(data);

  return {
    props: { session, trades },
  };
}
