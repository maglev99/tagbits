import prisma from '../src/server/db/client'

const resolvers = {
  Query: {

    fetchTagsRanked: async () => {
      const rawData: any = await prisma.$queryRaw`
      SELECT UNNEST(tags) as name, COUNT(*) as count FROM "Token"
      GROUP BY name
      ORDER BY count DESC, name
      `
      // convert rawData type to match gql schema
      const data = rawData.map((tag: any) => ({
        name: tag.name,
        count: Number(tag.count.toString())
      }))
      return data
    },

  },
}

export default resolvers
