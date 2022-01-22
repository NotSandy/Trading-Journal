import React, { ReactElement } from "react";
import { useSession, getSession } from "next-auth/react";
import Layout from "../components/layouts/Layout";
import PageTitle from "../components/ui/PageTitle";
import TradesTable, {
  SelectColumnFilter,
} from "../components/widgets/TradesTable";
import { StatusBadge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";

const getData = () => {
  const data = [
    {
      date: "01/20/2022",
      ticker: "TSLA",
      expiry: "01/21/2022",
      strike: "$1000",
      strategy: "Put",
      quantity: "1",
      entry: "3.78",
      exit: "10.28",
      premium: "$378",
      return: "$650",
      return_percent: "172%",
      status: "Win",
      notes: "Harry's signal",
    },
    {
      date: "01/20/2022",
      ticker: "BABA",
      expiry: "01/21/2022",
      strike: "$150",
      strategy: "Call",
      quantity: "3",
      entry: "3.30",
      exit: "1.03",
      premium: "$990",
      return: "-$681",
      return_percent: "-69%",
      status: "Lost",
      notes: "FOMO",
    },
    {
      date: "01/20/2022",
      ticker: "AMZN",
      expiry: "01/21/2022",
      strike: "$2800",
      strategy: "Put",
      quantity: "1",
      entry: "12.00",
      exit: "36.00",
      premium: "$1200",
      return: "$2400",
      return_percent: "200%",
      status: "Win",
      notes: "Harry's Signal",
    },
    {
      date: "01/20/2022",
      ticker: "GLD",
      expiry: "01/21/2022",
      strike: "$72",
      strategy: "Call",
      quantity: "4",
      entry: "1.30",
      exit: "2.73",
      premium: "$520",
      return: "$572",
      return_percent: "110%",
      status: "Win",
      notes: "Harry's Signal",
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
      ticker: "SQ",
      expiry: "01/21/2022",
      strike: "$180",
      strategy: "Call",
      quantity: "1",
      entry: "5.00",
      premium: "$500",
      status: "Open",
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
      ticker: "PTON",
      expiry: "01/21/2022",
      strike: "$180",
      strategy: "Put",
      quantity: "1",
      entry: "2.40",
      premium: "$240",
      status: "Open",
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
      status: "Lost",
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
        Cell: StatusBadge,
        Filter: SelectColumnFilter,
        filter: "includes",
      },
      {
        Header: "Notes",
        accessor: "notes",
        maxWidth: 100,
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }: { row: any }) => (
          <div className="space-x-2">
            <Button className="" disabled={false}>
              Edit
            </Button>
            <Button className="!text-danger-500" disabled={false}>
              Delete
            </Button>
            {console.log(row)}
          </div>
        ),
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
