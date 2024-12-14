import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { TABLES } from '../src/config/tables';

const prisma = new PrismaClient();

async function seed() {
  try {
    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await prisma.user.create({
      data: {
        email: 'admin@ramenfusion.com',
        name: 'Admin User',
        password: hashedPassword,
        role: 'ADMIN',
      },
    });

    // Create tables
    for (const table of TABLES) {
      await prisma.table.create({
        data: {
          id: table.id,
          type: table.type,
          seats: table.seats,
          isAvailable: true,
        },
      });
    }

    console.log('✅ Database has been seeded');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();