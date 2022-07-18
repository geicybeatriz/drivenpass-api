-- CreateTable
CREATE TABLE "documents" (
    "id" SERIAL NOT NULL,
    "fullname" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "expirationDate" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
