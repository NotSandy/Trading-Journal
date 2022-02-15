import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    handleGET(req, res);
  } else {
    res.status(405).end();
  }
}

// GET /api/trades/top10loss
async function handleGET(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  const data = await prisma.trade.findMany({
    where: {
      user: { email: session?.user?.email },
      status: "loss",
    },
    orderBy: {
      pnl: "asc",
    },
    take: 10,
  });

  const trades = JSON.stringify(data);
  res.json(trades);
  res.status(200).end();
}
