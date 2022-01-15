// @ts-nocheck
import React from "react";

const errors = {
  Signin: "Try signing with a different account.",
  OAuthSignin: "Try signing with a different account.",
  OAuthCallback: "Try signing with a different account.",
  OAuthCreateAccount: "Try signing with a different account.",
  EmailCreateAccount: "Try signing with a different account.",
  Callback: "Try signing with a different account.",
  OAuthAccountNotLinked:
    "To confirm your identity, sign in with the same account you used originally.",
  EmailSignin: "Check your email address.",
  CredentialsSignin:
    "Sign in failed. Check the details you provided are correct.",
  default: "Unable to sign in.",
};

const AuthError = ({ error }: { error: any }) => {
  const errorMessage = error && (errors[error] ?? errors.default);
  return (
    <div className="flex justify-center w-full mb-8 text-center">
      <p className="text-danger-500">{errorMessage}</p>
    </div>
  );
};

export default AuthError;
