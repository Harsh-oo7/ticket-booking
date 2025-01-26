// import { PrismaClient } from "@prisma/client";

// const client = new PrismaClient();

// export { client };

const { PrismaClient, AdminType : PrismaAdminTypeStr } = require("@prisma/client");

const client = new PrismaClient();


module.exports = { client, AdminType: PrismaAdminTypeStr };