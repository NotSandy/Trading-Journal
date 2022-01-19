import React, { ReactElement } from "react";
import { useSession, getSession } from "next-auth/react";
import Layout from "../components/layouts/Layout";
import Image from "next/image";

const Dashboard = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <h1>Loading...</h1>;
  }

  if (status === "authenticated" && session) {
    return (
      <div>
        <div className="flex pb-4 text-neutral-100">
          <span className="text-lg font-bold">DASHBOARD</span>
        </div>
        <div className="relative overflow-hidden rounded-md bg-neutral-800">
          <div className="flex flex-col p-4 bg-primary-500">
            <span className="text-lg font-semibold text-neutral-100">Welcome back to Trade Journal!</span>
          </div>
          <div className="p-4">
            <div className="flex flex-col sm:flex-row">
              <div className="w-16 h-16 border-4 rounded-full border-neutral-900">
                <Image
                  src={`${session?.user?.image}`}
                  alt="Profile_Picture"
                  width={64}
                  height={64}
                  className="rounded-full"
                />
              </div>
              <div>Total Trades</div>
              <div>Total PnL</div>
              <div>Win Percentage</div>
            </div>
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

  return {
    props: { session },
  };
}
