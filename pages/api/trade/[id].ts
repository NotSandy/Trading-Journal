import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const tradeID = req.query.id;

  if (req.method === "GET") {
    handleGET(tradeID, res);
  }
}
// GET /api/trade
async function handleGET(tradeID: string | string[], res: NextApiResponse) {
  try {
    const trade = await prisma.trade.findUnique({
      where: { id: tradeID },
    });
    res.json(trade);
    res.status(200).end();
  } catch (error) {
    res.json(error);
    res.status(405).end();
  }
}
