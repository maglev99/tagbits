// src/server/db/client.ts
import { PrismaClient } from '@prisma/client'
// eslint-disable-next-line import/extensions
import { env } from '../../env/server.mjs'

declare global {
  // eslint-disable-next-line vars-on-top, no-var
  var prisma: PrismaClient | undefined
}

// eslint-disable-next-line import/prefer-default-export
export const prisma =
  global.prisma ||
  new PrismaClient({
    log:
      env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (env.NODE_ENV !== 'production') {
  global.prisma = prisma
}
