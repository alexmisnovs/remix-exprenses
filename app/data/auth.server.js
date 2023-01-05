import { hash } from "bcryptjs";
import { prisma } from "./database.server";

export async function signup({ email, password }) {
  // check if user exists with this email

  const existingUser = await prisma.user.findFirst({ where: { email } });
  if (existingUser) {
    const error = new Error("A user with this email already exists");
    error.status = 422;
    throw error;
  } else {
    // create user

    const hashedPass = await hash(password, 10);
    return await prisma.user.create({
      data: {
        email: email,
        password: hashedPass,
      },
    });
  }
}
