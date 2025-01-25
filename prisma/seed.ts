const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Сиды для предустановленных категорий
  const defaultCategories = [
    { type: 'UI' },
    { type: 'Performance' },
    { type: 'Bug' },
  ];

  for (const category of defaultCategories) {
    await prisma.categorys.upsert({
      where: { type: category.type },
      update: {},
      create: category,
    });
  }

  // Сиды для пользовательских категорий
  const customCategories = [
    { type: 'New Feature' },
    { type: 'Integration' },
  ];

  for (const category of customCategories) {
    await prisma.categorys.upsert({
      where: { type: category.type },
      update: {},
      create: category,
    });
  }

  //сиды для предустановленных статусов
  const defaultStatuses = [
    { type: 'Idea' },
    { type: 'InWork'},
    { type: 'InPlan'},
    { type: 'Continue'}
  ]

  for (const status of defaultStatuses) {
    await prisma.statuses.upsert({
      where: { type: status.type },
      update: {},
      create: status
    })
  }
}

main()
  .then(() => {
    console.log('The sids have been added successfully!');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
