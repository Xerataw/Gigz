import { PrismaClient } from '@prisma/client';

const database = new PrismaClient();

const useDatabase = () => ({
  database,
});

export default useDatabase;
