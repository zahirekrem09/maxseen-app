import { PrismaClient } from '@prisma/client'
import { users } from './seed-data/users'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.createMany({
    data: users,
    skipDuplicates: true, // Skip 'Bobo'
  })
}

main()
