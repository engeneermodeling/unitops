const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Creating test users...');
  
  const users = [
    { email: 'guest@test.com', role: 'guest', name: 'Guest User' },
    { email: 'basic@test.com', role: 'user_basic', name: 'Basic User' },
    { email: 'premium@test.com', role: 'user_premium', name: 'Premium User' },
    { email: 'admin@test.com', role: 'admin', name: 'Admin User' },
    { email: 'super@test.com', role: 'superadmin', name: 'Super Admin' },
  ];

  for (const userData of users) {
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: userData,
    });
    console.log(`✓ Created: ${user.email} (${user.role})`);
  }

  console.log('\nAll users created successfully!');
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });