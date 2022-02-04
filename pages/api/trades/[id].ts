import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { initializeTrade } from "../../../utils/trades/utils";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const tradeID = req.query.id;

  if (req.method === "GET") {
    handleGET(tradeID, res);
  } else if (req.method === "PUT") {
    handlePUT(tradeID, req, res);
  } else if (req.method === "DELETE") {
    handleDELETE(tradeID, res);
  } else {
    res.status(405).end();
  }
}
// GET /api/trade
async function handleGET(tradeID: string | string[], res: NextApiResponse) {
  try {
    const trade = await prisma.trade.findUnique({
      where: { id: tradeID as string },
    });
    res.json(trade);
    res.status(200).end();
  } catch (error) {
    res.json(error);
    res.status(405).end();
  }
}

// PUT /api/trade
// Required fields in body: id, date, ticker, expiry, time, strike, strategy, quantity, entry, exit
// Optional fields in body: exit, notes
async function handlePUT(
  tradeID: string | string[],
  req: NextApiRequest,
  res: NextApiResponse
) {
  let initializedTrade = initializeTrade(req);
  const trade = await prisma.trade.update({
    where: { id: tradeID as string },
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
    },
  });
  res.json(trade);
  res.status(200).end();
}

// DELETE /api/trade
// Required fields in body: id
async function handleDELETE(tradeID: string | string[], res: NextApiResponse) {
  const post = await prisma.trade.delete({
    where: { id: tradeID as string },
  });
  res.json(post);
  res.status(200).end();
}
