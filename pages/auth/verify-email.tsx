import React from "react";

const VerifyRequest = () => {
  return (
    <div className="w-screen min-h-screen overflow-hidden overflow-y-scroll bg-neutral-1000 scrollbar-hide">
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-8 shadow-lg rounded-xl bg-neutral-900">
          <div className="flex flex-col items-center">
            <div className="flex justify-center w-full mb-16 text-center">
              <h1 className="text-4xl tracking-wider text-primary-500">
                Check your email!
              </h1>
            </div>
            <div className="flex justify-center w-full">
                <p className="text-center text-neutral-100">To finish signing in, click the link we sent to your email.</p>
            </div>
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

export default VerifyRequest;
