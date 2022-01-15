import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div>
      <div>This is going to be the main page of the site</div>
      <div className="fixed transform translate-x-1/2 translate-y-1/2 top-1/2 left-1/2">
        <h1>You are currently not signed in</h1>
        <Link href="/auth/login">
          <a>Login</a>
        </Link>
      </div>
    </div>
  );
};

export default Home;
