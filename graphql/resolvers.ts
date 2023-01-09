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

    getLatest24HoursTagRankList: async () => {
      const rawData: TagRankList = await prisma.$queryRaw`
      SELECT total_count as count, array_agg(name ORDER BY UPPER(name) ASC) as tags FROM 
      (SELECT sum(count) as total_count, name FROM "TagRank"
      WHERE "tagRankListId" IN 
              (
                SELECT id FROM "TagRankList"
                WHERE type = 'HOUR'
                ORDER BY start DESC
                LIMIT 24
              )
      GROUP BY name 
      ORDER BY total_count DESC) as SummedList
      GROUP BY total_count
      ORDER BY total_count DESC
      `
      // convert rawData type to match gql schema
      const data = rawData.map((item: TagRank) => ({
        tags: item.tags,
        count: Number(item.count.toString()),
      }))
      return data
    },

    getLatestDayTagRankList: async () => {
      const rawData: TagRankList = await prisma.$queryRaw`
      SELECT total_count as count, array_agg(name ORDER BY UPPER(name) ASC) as tags FROM 
      (SELECT sum(count) as total_count, name FROM "TagRank"
      WHERE "tagRankListId" IN 
              (
                SELECT id FROM "TagRankList"
                WHERE "start" >= TO_TIMESTAMP((CURRENT_DATE - 1 || ' ' || '00:00:00'), 'YYYY-MM-DD HH24:00:00')
                AND "end" <= TO_TIMESTAMP((CURRENT_DATE || ' ' || '00:00:00'), 'YYYY-MM-DD HH24:00:00')
                AND type = 'HOUR'
                ORDER BY start DESC
              )
      GROUP BY name 
      ORDER BY total_count DESC
      LIMIT 100
      ) as SummedList
      GROUP BY total_count
      ORDER BY total_count DESC
      `
      // convert rawData type to match gql schema
      const data = rawData.map((item: TagRank) => ({
        tags: item.tags,
        count: Number(item.count.toString()),
      }))
      return data
    },
    
    getLatestDaySoldTokens: async () => {
      const rawData: any = await prisma.$queryRaw`
      SELECT  price, SUM(amount) as amount FROM "SoldToken"
      WHERE "timeOfSale" >= TO_TIMESTAMP((CURRENT_DATE - 1 || ' ' || '00:00:00'), 'YYYY-MM-DD HH24:00:00')
                AND "timeOfSale" < TO_TIMESTAMP((CURRENT_DATE || ' ' || '00:00:00'), 'YYYY-MM-DD HH24:00:00')
      GROUP BY price 
      ORDER BY price ASC
      `
      // convert rawData type to match gql schema
      const data = rawData.map((item: any) => ({
        price: Number(item.price.toString()),
        amount: Number(item.amount.toString()),
      }))
      return data
    },
  },
}

export default resolvers
