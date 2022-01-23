import { getSession } from "next-auth/react";
import { prisma } from "../../../lib/prisma";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req: any, res: any) {
  const { date, ticker, expiry, time, strike, strategy, quantity, entry, exit } = req.body;

  const session = await getSession({ req });
  const result = await prisma.trade.create({
    data: {
      date: date,
      ticker: ticker,
      expiry: expiry,
      time: time,
      strike: strike,
      strategy: strategy,
      quantity: quantity,
      entry: entry,
      exit: exit,
      user: { connect: { email: session?.user?.email } },
    },
  });
  res.json(result);
}