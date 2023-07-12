import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function seed() {
  try {
    for (let i = 0; i < 10; i++) {
      const name = faker.person.fullName();
      const email = faker.internet.email();

      const user = await prisma.user.create({
        data: {
          name,
          email,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      console.log('Seed concluído para o usuário:', user);
    }
    for (let i = 0; i < 10; i++) {
      const name = faker.finance.currencyName();
      const tiker = faker.finance.currencySymbol();
      const value = faker.finance.amount(100, 1000, 2);

      const coin = await prisma.coin.create({
        data: {
          name,
          tiker,
          value,
        },
      });
      console.log('Seed concluído para a moeda:', coin);
    }
    for (let i = 0; i < 15; i++) {
      const wallet = await prisma.wallet.create({
        data: {
          userId: faker.number.int({ min: 1, max: 10 }),
        },
      });
      console.log('Seed concluído para a carteira:', wallet);
    }
    for (let i = 0; i < 15; i++) {
      const walletCoin = await prisma.walletCoins.create({
        data: {
          walletId: faker.number.int({ min: 1, max: 15 }),
          coinId: faker.number.int({ min: 1, max: 10 }),
          quantity: faker.number.int({ min: 1, max: 100 }),
        },
      });
      console.log('Seed concluído para a Moedas na carteira:', walletCoin);
    }
  } catch (error) {
    console.error('Erro ao executar a seed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
