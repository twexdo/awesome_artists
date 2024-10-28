// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create a test user
  const testUser = await prisma.user.upsert({
    where: { email: 'testuser@example.com' },
    update: {},
    create: {
      email: 'testuser@example.com',
      password: await bcrypt.hash('testpassword', 10), // hashing password
      name: 'Test User',
    },
  });

  // Create some fake projects for the portfolio
  const projectsData = [
    {
      title: 'Project One',
      description: 'This is the first project.',
      clientLink: 'https://clientone.com',
      status: 'visible',
      imageUrl: 'https://via.placeholder.com/150',
      userId: testUser.id,
    },
    {
      title: 'Project Two',
      description: 'This is the second project.',
      clientLink: 'https://clienttwo.com',
      status: 'hidden',
      imageUrl: 'https://via.placeholder.com/150',
      userId: testUser.id,
    },
    {
      title: 'Project Three',
      description: 'This is the third project.',
      clientLink: 'https://clientthree.com',
      status: 'visible',
      imageUrl: 'https://via.placeholder.com/150',
      userId: testUser.id,
    },
  ];

  for (const project of projectsData) {
    await prisma.project.create({
      data: project,
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
