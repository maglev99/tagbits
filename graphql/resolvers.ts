import z from 'zod'
import prisma from '../src/server/db/client'

const tagRankListValidator = z.object({
  name: z.string(),
  count: z.number()
}).array()

type TagRankList = z.infer<typeof tagRankListValidator>

const tagRankValidator = z.object({
    name: z.string(),
    count: z.number()
})

type TagRank = z.infer<typeof tagRankValidator>

const resolvers = {
  Query: {
    testQuery: async () => 'test query returned',

    getLatestHourlyTagRankList: async () => {
      const rawData: TagRankList = await prisma.$queryRaw`
      SELECT  name, SUM(count) as count FROM "TagRank"
      WHERE "tagRankListId" = 
        (
          SELECT id FROM "TagRankList"
          WHERE type = 'HOUR'
          ORDER BY start DESC
          LIMIT 1
        )
      GROUP BY name 
      ORDER BY count DESC, name
      `
      // convert rawData type to match gql schema
      const data = rawData.map((tag: TagRank) => ({
        name: tag.name,
        count: Number(tag.count.toString())
      }))
      return data
    },
  },
}

export default resolvers
