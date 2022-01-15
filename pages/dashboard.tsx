import React, { ReactElement, ReactNode } from "react";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import Layout from "../components/layouts/Layout";

const Dashboard = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <h1>Loading...</h1>;
  }

  if (status === "authenticated" && session) {
    return (
      <div className="fixed transform translate-x-1/2 translate-y-1/2 top-1/2 left-1/2">
        <h1>Signed in as {session.user?.email}</h1>
        <button
          type="button"
          onClick={() =>
            signOut({
              callbackUrl: `${window.location.origin}`,
            })
          }
        >
          Logout
        </button>
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
