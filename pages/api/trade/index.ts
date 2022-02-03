import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../../lib/prisma";
import { initializeTrade } from "../../../utils/trades/utils";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    handlePOST(req, res);
  } else {
    res.status(405).end();
  }
}

// POST /api/trade
// Required fields in body: date, ticker, expiry, time, strike, strategy, quantity, entry, exit
// Optional fields in body: exit, notes
async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
  let initializedTrade = initializeTrade(req);
  const session = await getSession({ req });
  const trade = await prisma.trade.create({
    data: {
      date: initializedTrade.date,
      time: initializedTrade.time,
      ticker: initializedTrade.ticker,
      expiry: initializedTrade.expiry,
      strike: initializedTrade.strike,
      strategy: initializedTrade.strategy,
      quantity: initializedTrade.quantity,
      entry: initializedTrade.entry,
      exit: initializedTrade.exit,
      premium: initializedTrade.premium,
      pnl: initializedTrade.pnl,
      percent: initializedTrade.percent,
      status: initializedTrade.status,
      notes: initializedTrade.notes,
      user: { connect: { email: session?.user?.email as string } },
    },
  });
  res.json(trade);
  res.status(200).end();
}
