/*
  Warnings:

  - Added the required column `userId` to the `Offers` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Offers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantity" INTEGER NOT NULL,
    "coinId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "unitPrice" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL,
    "updated_at" DATETIME NOT NULL,
    "deleted_at" DATETIME,
    CONSTRAINT "Offers_coinId_fkey" FOREIGN KEY ("coinId") REFERENCES "Coin" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Offers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Offers" ("coinId", "created_at", "deleted_at", "id", "quantity", "unitPrice", "updated_at") SELECT "coinId", "created_at", "deleted_at", "id", "quantity", "unitPrice", "updated_at" FROM "Offers";
DROP TABLE "Offers";
ALTER TABLE "new_Offers" RENAME TO "Offers";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
