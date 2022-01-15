import { signIn } from "next-auth/react";
import { NextPage } from "next";
import React from "react";
import Image from "next/image";

interface Props {
  provider: any;
  providerName: string;
  svg: string;
}

const SocialLoginButton: NextPage<Props> = ({
  provider,
  providerName,
  svg,
}) => {
  return (
    <div className="flex justify-center w-full mb-4" key={provider.name}>
      <button
        className="flex items-center justify-center w-full px-4 py-2 space-x-2 rounded-md bg-primary-500 text-neutral-100"
        onClick={() =>
          signIn(provider.id, {
            callbackUrl: `${window.location.origin}/dashboard`,
          })
        }
      >
        <Image
          src={`/assets/social-icons/${svg}`}
          alt={svg}
          width={24}
          height={24}
        />
        <p>Login with {providerName}</p>
      </button>
    </div>
  );
};

export default SocialLoginButton;
