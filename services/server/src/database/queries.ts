import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createUser = async ({ email, googleUserId }) => {
  return await prisma.appUser.create({
    data: {
      email,
      google_user_id: googleUserId,
    },
  });
};

// export const fetchAllUsers = async () => {
//   const allUsers = await prisma.app_user.findMany();
//   return allUsers;
// };

export const getUserByEmail = async (email) => {
  return await prisma.appUser.findUnique({
    where: {
      email,
    },
  });
};
export const getUserById = async (id) => {
  return await prisma.appUser.findUnique({
    where: {
      id,
    },
  });
};

export const getNotesForUser = async (userId) => {
  return await prisma.note.findMany({
    where: {
      user_id: userId,
    },
  });
};
