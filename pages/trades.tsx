import React, { ReactElement } from "react";
import { useSession, getSession } from "next-auth/react";
import Layout from "../components/layouts/Layout";
import PageTitle from "../components/ui/PageTitle";
import TradesTable, {
  SelectColumnFilter,
} from "../components/widgets/TradesTable";

// <th className="px-6 py-3 text-left">Date</th>
// <th className="px-6 py-3 text-left">Ticker</th>
// <th className="px-6 py-3 text-left">Expiry</th>
// <th className="px-6 py-3 text-left">Strike</th>
// <th className="px-6 py-3 text-left">Srategy</th>
// <th className="px-6 py-3 text-left">Quantity</th>
// <th className="px-6 py-3 text-left">Entry</th>
// <th className="px-6 py-3 text-left">Exit</th>
// <th className="px-6 py-3 text-left">Premium</th>
// <th className="px-6 py-3 text-left">Return</th>
// <th className="px-6 py-3 text-left">Return %</th>
// <th className="px-6 py-3 text-left">Status</th>

const getData = () => {
  const data = [
    {
      date: "01/20/2022",
      ticker: "TSLA",
      expiry: "01/21/2022",
      strike: "$1000",
      strategy: "Call",
      quantity: "1",
      entry: "5.00",
      exit: "10.00",
      premium: "$300",
      return: "$500",
      return_percent: "100%",
      status: "Win",
      notes: "Harry's signal",
    },
    {
      date: "01/20/2022",
      ticker: "TSLA",
      expiry: "01/21/2022",
      strike: "$1000",
      strategy: "Call",
      quantity: "1",
      entry: "5.00",
      exit: "10.00",
      premium: "$300",
      return: "$500",
      return_percent: "100%",
      status: "Win",
    },
    {
      date: "01/20/2022",
      ticker: "TSLA",
      expiry: "01/21/2022",
      strike: "$1000",
      strategy: "Call",
      quantity: "1",
      entry: "5.00",
      exit: "10.00",
      premium: "$300",
      return: "$500",
      return_percent: "100%",
      status: "Win",
    },
    {
      date: "01/20/2022",
      ticker: "TSLA",
      expiry: "01/21/2022",
      strike: "$1000",
      strategy: "Call",
      quantity: "1",
      entry: "5.00",
      exit: "10.00",
      premium: "$300",
      return: "$500",
      return_percent: "100%",
      status: "Win",
    },
    {
      date: "01/20/2022",
      ticker: "TSLA",
      expiry: "01/21/2022",
      strike: "$1000",
      strategy: "Call",
      quantity: "1",
      entry: "5.00",
      exit: "10.00",
      premium: "$300",
      return: "$500",
      return_percent: "100%",
      status: "Win",
    },
    {
      date: "01/20/2022",
      ticker: "TSLA",
      expiry: "01/21/2022",
      strike: "$1000",
      strategy: "Call",
      quantity: "1",
      entry: "5.00",
      exit: "10.00",
      premium: "$300",
      return: "$500",
      return_percent: "100%",
      status: "Win",
    },
    {
      date: "01/20/2022",
      ticker: "TSLA",
      expiry: "01/21/2022",
      strike: "$1000",
      strategy: "Call",
      quantity: "1",
      entry: "5.00",
      exit: "10.00",
      premium: "$300",
      return: "$500",
      return_percent: "100%",
      status: "Win",
    },
    {
      date: "01/20/2022",
      ticker: "TSLA",
      expiry: "01/21/2022",
      strike: "$1000",
      strategy: "Call",
      quantity: "1",
      entry: "5.00",
      exit: "10.00",
      premium: "$300",
      return: "$500",
      return_percent: "100%",
      status: "Win",
    },
    {
      date: "01/20/2022",
      ticker: "TSLA",
      expiry: "01/21/2022",
      strike: "$1000",
      strategy: "Call",
      quantity: "1",
      entry: "5.00",
      exit: "10.00",
      premium: "$300",
      return: "$500",
      return_percent: "100%",
      status: "Win",
    },
    {
      date: "01/20/2022",
      ticker: "TSLA",
      expiry: "01/21/2022",
      strike: "$1000",
      strategy: "Call",
      quantity: "1",
      entry: "5.00",
      exit: "10.00",
      premium: "$300",
      return: "$500",
      return_percent: "100%",
      status: "Win",
    },
    {
      date: "01/20/2022",
      ticker: "TSLA",
      expiry: "01/21/2022",
      strike: "$1000",
      strategy: "Call",
      quantity: "1",
      entry: "5.00",
      exit: "10.00",
      premium: "$300",
      return: "$500",
      return_percent: "100%",
      status: "Win",
    },
  ];
  return [...data];
};

const Trades = () => {
  const { data: session, status } = useSession();

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
        Header: "Return",
        accessor: "return",
      },
      {
        Header: "Return%",
        accessor: "return_percent",
      },
      {
        Header: "Status",
        accessor: "status",
        Filter: SelectColumnFilter,
        filter: "includes",
      },
      {
        Header: "Notes",
        accessor: "notes",
      },
    ],
    []
  );

  const data = React.useMemo(() => getData(), []);

  if (status === "loading") {
    return <h1>Loading...</h1>;
  }

  if (status === "authenticated" && session) {
    return (
      <div>
        <PageTitle title="Trades" />
        <TradesTable columns={columns} data={data} />
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

  return {
    props: { session },
  };
}
