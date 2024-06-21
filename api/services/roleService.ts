import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllRoles = async () => {
    const roles = await prisma.rol.findMany();
    console.log("ROLES", roles);

    return roles;
}