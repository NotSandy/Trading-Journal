import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../../lib/prisma";
import { format, utcToZonedTime } from "date-fns-tz";

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

// GET /api/trade/open
async function handleGET(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  const data = await prisma.trade.findMany({
    where: {
      user: { email: session?.user?.email },
      status: "open",
    },
  });

  const trades = JSON.stringify(data);
  res.json(trades);
  res.status(200).end();
}
