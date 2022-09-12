import prisma from '../src/server/db/client'
// import { Context } from './context'

import { TokenQuery } from '../src/queries'
import apolloClient from '../src/lib/apollo'

const UpdateTokenQuery = async () => {
  // console.log('updating token query')

  // const { data } = await useQuery(TokenQuery, {
  //   context: { clientName: 'objkt-api' },
  // })

  const { data } = await apolloClient.query({
    query: TokenQuery,
    context: { clientName: 'objkt-api' },
    variables: {
      pk: 0,
      gte: '2022-09-06T00:00:29+00:00',
      lt: '2022-09-06T00:10:00+00:00',
    },
  })

  console.log('token data', data)

  return data
}

const resolvers = {
  Query: {
    // ISSUE: context currently not working as cannot read prisma in context.prisma
    // eslint-disable-next-line @typescript-eslint/return-await
    // links: async (context: Context) => await context.prisma.link.findMany(),

    // links: async () => prisma.link.findMany(),

    tokens: async () => UpdateTokenQuery(),

    updateTokenList: async () => {
      const data = await UpdateTokenQuery()
      console.log('data', data)
      return data.token[0].pk
    },

    fetchTokensRanked: async () => {
      console.log('calling fetch token ranked query')
      const data = (await prisma.token.findMany()).map((token) => ({
        id: token.id,
        pk: token.pk.toString(), // convert pk to string since GraphQL does not support BigInt (type Token in schema.ts) 
        timestamp: token.timestamp,
        tags: token.tags
      }))
      return data
    },
  },
}

export default resolvers
