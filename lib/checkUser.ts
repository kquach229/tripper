import { currentUser } from '@clerk/nextjs/server';
import { prisma } from './prisma';

export const checkUser = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  // check existing user from prisma db

  const existingUser = await prisma.user.findUnique({
    where: {
      email: user.emailAddresses[0].emailAddress,
    },
  });

  if (existingUser) {
    return existingUser;
  }

  if (!existingUser) {
    // create new user in prisma db
    const newUser = await prisma.user.create({
      data: {
        id: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: user.fullName || '',
        // Optional: You can store the image URL if available
        image: user.imageUrl || '',
      },
    });
    return newUser;
  }
};
