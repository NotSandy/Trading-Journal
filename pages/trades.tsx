import React, { ReactElement } from "react";
import { useSession, getSession } from "next-auth/react";
import Layout from "../components/layouts/Layout";
import PageTitle from "../components/ui/PageTitle";
import TradesTable, {
  SelectColumnFilter,
} from "../components/trades/TradesTable";
import { StatusBadge } from "../components/ui/Badge";
import { prisma } from "../lib/prisma";
import DeleteTradeModal from "../components/trades/DeleteTradeModal";
import EditTradeModal from "../components/trades/EditTradeModal";

const Trades = (props: any) => {
  const { data: session, status } = useSession();
  let { trades } = props;
  trades = JSON.parse(trades);

  const columns = React.useMemo(
    () => [
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Ticker",
        accessor: "ticker",
        Filter: SelectColumnFilter,
        filter: "includes",
      },
      {
        Header: "Expiry",
        accessor: "expiry",
      },
      {
        Header: "Strike",
        accessor: "strike",
      },
      {
        Header: "Strategy",
        accessor: "strategy",
        Filter: SelectColumnFilter,
        filter: "includes",
      },
      {
        Header: "Quantity",
        accessor: "quantity",
      },
      {
        Header: "Entry",
        accessor: "entry",
      },
      {
        Header: "Exit",
        accessor: "exit",
      },
      {
        Header: "Premium",
        accessor: "premium",
      },
      {
        Header: "PnL",
        accessor: "pnl",
      },
      {
        Header: "%",
        accessor: "percent",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: StatusBadge,
        Filter: SelectColumnFilter,
        filter: "includes",
      },
      {
        Header: "Notes",
        accessor: "notes",
        disableSortBy: true,
        maxWidth: 100,
      },
      {
        Header: "Actions",
        accessor: "actions",
        disableSortBy: true,
        Cell: ({ row }: { row: any }) => (
          <div className="space-x-2">
            <EditTradeModal id={row.original.id}></EditTradeModal>
            <DeleteTradeModal id={row.original.id}></DeleteTradeModal>
          </div>
        ),
      },
    ],
    []
  );

  if (status === "loading") {
    return <h1>Loading...</h1>;
  }

  if (status === "authenticated" && session) {
    return (
      <div>
        <PageTitle title="Trades" />
        <TradesTable columns={columns} data={trades} />
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
      element.date = element.date.toISOString().substring(0, 10);
    }
    if (element.expiry) {
      element.expiry = element.expiry.toISOString().substring(0, 10);
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
