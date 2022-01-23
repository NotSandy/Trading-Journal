-- CreateTable
CREATE TABLE "Trade" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "ticker" TEXT NOT NULL,
    "expiry" TIMESTAMP(3) NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "strike" INTEGER NOT NULL,
    "strategy" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "entry" INTEGER NOT NULL,
    "exit" INTEGER,
    "content" TEXT,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Trade_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
