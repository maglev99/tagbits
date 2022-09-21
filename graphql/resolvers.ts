// import prisma from '../src/server/db/client'

const resolvers = {
  Query: {
    testQuery: async () => 'test query returned',
  },
}

export default resolvers
