import React, { ReactElement, useState } from "react";
import { useSession, getSession } from "next-auth/react";
import Layout from "../components/layouts/Layout";
import PageTitle from "../components/ui/PageTitle";
import TradesTable from "../components/trades/TradesTable";
import { prisma } from "../lib/prisma";
import { format, utcToZonedTime } from "date-fns-tz";

const Trades = (props: any) => {
  const { data: session, status } = useSession();

  const [trades, setTrades] = useState(JSON.parse(props.trades));

  const tradesChangeHandler = () => {
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
        <PageTitle title="Trades" />
        <TradesTable
          data={trades}
          onTradeTableChangeHandler={tradesChangeHandler}
        />
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

  const trades = JSON.stringify(data);

  return {
    props: { session, trades },
  };
}
