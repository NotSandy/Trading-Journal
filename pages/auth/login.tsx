import React, { useState } from "react";
import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
} from "next-auth/react";
import { AtSymbolIcon } from "@heroicons/react/outline";
import SocialLoginButton from "../../components/auth/SocialLoginButton";
import Image from "next/image";
import { useRouter } from "next/router";
import AuthError from "./auth-error";

const Login = ({
  providers,
  csrfToken,
}: {
  providers: any;
  csrfToken: any;
}) => {

  const { error } = useRouter().query;

  const [email, setEmail] = useState('')

  const sendEmailVerification = (e:any) => {
    e.preventDefault()
    signIn('email', { callbackUrl: `${window.location.origin}/dashboard`, email })
  }

  return (
    <div className="w-screen min-h-screen overflow-hidden overflow-y-scroll bg-neutral-1000 scrollbar-hide">
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-8 shadow-lg rounded-xl bg-neutral-900">
          <div className="flex flex-col items-center">
            <div className="flex justify-center w-full mb-16 text-center">
              <h1 className="text-4xl tracking-wider text-neutral-100">
                Login to <span className="text-primary-500">TradeJournal</span>
              </h1>
            </div>
            {error && <AuthError error={error} />}
            <form
              className="flex flex-col items-center w-full"
              onSubmit={sendEmailVerification}
            >
              <div className="relative w-full mb-8">
                <input
                  name="csrfToken"
                  type="hidden"
                  defaultValue={csrfToken}
                />
                <AtSymbolIcon className="absolute top-0 w-8 h-8 text-primary-500" />
                <input
                  className="w-full h-12 pl-12 tracking-widest transition duration-500 bg-transparent border-0 border-b-2 outline-none placeholder-opacity-80 border-b-neutral-800 placeholder-neutral-100 text-primary-500 focus:border-b-primary-500 selection:text-secondary-500"
                  type="email"
                  id="email"
                  placeholder="Email"
                  name="email"
                  required
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <button
                className="flex items-center justify-center w-full px-4 py-2 space-x-2 rounded-md bg-primary-500 text-neutral-100"
                type="submit"
              >
                <Image
                  src="/assets/social-icons/email.svg"
                  alt="Email"
                  width={24}
                  height={24}
                />
                <p>Login with Email</p>
              </button>
            </form>
            <div className="flex justify-center my-8">
              <p className="text-sm text-neutral-500">OR</p>
            </div>
            {Object.values(providers).map((provider: any) => {
              if (provider.name === "Email") {
                return;
              }
              if (provider.name === "Google") {
                return (
                  <SocialLoginButton
                    key={provider.id}
                    provider={provider}
                    providerName={"Google"}
                    svg={"google.svg"}
                  />
                );
              }
              if (provider.name === "Discord") {
                return (
                  <SocialLoginButton
                    key={provider.id}
                    provider={provider}
                    providerName={"Discord"}
                    svg={"discord.svg"}
                  />
                );
              }
              if (provider.name === "Twitter (Legacy)") {
                return (
                  <SocialLoginButton
                    key={provider.id}
                    provider={provider}
                    providerName={"Twitter"}
                    svg={"twitter.svg"}
                  />
                );
              }
            })}
            <div className="flex justify-center mt-16">
              <p className="text-sm text-neutral-500">
                © 2022 Sandy Liu. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

export async function getServerSideProps(context: any) {

  const session = await getSession(context);
  if(session) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false
      },
      props: {session}
    }
  }

  const csrfToken = await getCsrfToken(context);
  const providers = await getProviders();
  return {
    props: { csrfToken, providers },
  };
}
