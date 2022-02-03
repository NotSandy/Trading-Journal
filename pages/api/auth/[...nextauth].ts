import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import TwitterProvider from "next-auth/providers/twitter";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../lib/prisma";
import nodemailer from "nodemailer";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      async sendVerificationRequest({
        identifier: email,
        url,
        provider: { server, from },
      }) {
        const { host } = new URL(url);
        const transport = nodemailer.createTransport(server);
        await transport.sendMail({
          to: email,
          from,
          subject: `Sign in to ${host}`,
          text: text({ url, host }),
          html: html({ url, host, email }),
        });
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.SECRET,
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   return true;
    // },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl;
    // },
    // async session({ session, user, token }) {
    //   return session;
    // },
    // async jwt({ token, user, account, profile, isNewUser }) {
    //   return token;
    // },
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/auth-error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-email", // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
});

function html({
  url,
  host,
  email,
}: {
  url: string;
  host: string;
  email: string;
}) {
  const escapedEmail = `${email.replace(/\./g, "&#8203;.")}`;
  const escapedHost = `${host.replace(/\./g, "&#8203;.")}`;
  // Your email template here
  return `
      <body>
        <h1>Your magic link! 🪄</h1>
        <h3>Your email is ${escapedEmail}</h3>
        <p>
          <a href="${url}">Sign in to ${escapedHost}</a>
      </body>
  `;
}

// Fallback for non-HTML email clients
function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`;
}
