import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import prisma from '../src/server/db/client'

export type Context = {
  prisma: PrismaClient
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function createContext(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  req: NextApiRequest,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  res: NextApiResponse
): Promise<Context> {
  return {
    prisma,
  }
}
