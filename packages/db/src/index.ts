// import { PrismaClient } from "@prisma/client";

// const client = new PrismaClient();

// export { client };

const { PrismaClient } = require("@prisma/client");

const client = new PrismaClient();

module.exports = { client };