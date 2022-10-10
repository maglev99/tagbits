import z from 'zod'
import prisma from '../src/server/db/client'

const tagRankListValidator = z
  .object({
    tags: z.string().array(),
    count: z.number(),
  })
  .array()

type TagRankList = z.infer<typeof tagRankListValidator>

const tagRankValidator = z.object({
  tags: z.string().array(),
  count: z.number(),
})

type TagRank = z.infer<typeof tagRankValidator>

const resolvers = {
  Query: {
    testQuery: async () => 'test query returned',

    getLatestHourlyTagRankList: async () => {
      const rawData: TagRankList = await prisma.$queryRaw`
      SELECT count, array_agg(name ORDER BY UPPER(name) ASC) as tags FROM "TagRank"
      WHERE "tagRankListId" = 
        (
          SELECT id FROM "TagRankList"
          WHERE type = 'HOUR'
          ORDER BY start DESC
          LIMIT 1
        )
      GROUP BY count 
      ORDER BY count DESC
      `
      // convert rawData type to match gql schema
      const data = rawData.map((item: TagRank) => ({
        tags: item.tags,
        count: Number(item.count.toString()),
      }))
      return data
    },
  },
}

export default resolvers
