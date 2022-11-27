import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createUser = async () => {
  await prisma.app_user.create({
    data: {
      name: "Alice",
      email: "alice@prisma.io",
      posts: {
        create: { title: "Hello World" },
      },
      profile: {
        create: { bio: "I like turtles" },
      },
    },
  });
};

export const fetchAllUsers = async () => {
  const allUsers = await prisma.app_user.findMany();
  return allUsers;
};
