import { PrismaClient, Type_TagRankList } from '@prisma/client'

// added for runnning fetch operation without using graphql
import fetch from 'cross-fetch'

import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

import z from 'zod'
import { TagRankQuery } from '../src/queries'

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: 'http://localhost:3000/api/graphql', fetch }),
})

const prisma = new PrismaClient()

const RankTagQuery = async () => {
  const { data } = await apolloClient.query({
    query: TagRankQuery,
  })

  return data
}

const tagRankValidator = z.object({
  name: z.string(),
  count: z.number(),
})

type TagRank = z.infer<typeof tagRankValidator>

const RunTagRank = async () => {
  try {
    await prisma.tagRank.deleteMany()
    await prisma.tagRankList.deleteMany()

    const start = '2022-09-06T00:00:00+00:00'
    const end = '2022-09-06T01:00:00+00:00'

    const tagRankList = await prisma.tagRankList.create({
      data: {
        type: Type_TagRankList.HOUR,
        start,
        end,
      },
    })

    const data: any = await RankTagQuery()
    console.log('data', data.fetchTagsRanked)

    // not using promise.all here since testing reveals using promise.all is slower in this case
    data.fetchTagsRanked.forEach(async (tag: TagRank) => {
      await prisma.tagRank.create({
        data: {
          name: tag.name,
          count: tag.count,
          tagRankListId: tagRankList.id,
        },
      })
    })
  } catch (error) {
    console.log('Error: ', error)
  }
}

export default RunTagRank

export {}