const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  const filePath = path.join(__dirname, 'movies.json');
  const movieData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  for (const movie of movieData) {
    await prisma.movie.create({
      data: movie,
    });
  }

  console.log('✅ Movies seeded successfully');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
