import type { NextApiRequest, NextApiResponse } from 'next'
// import { prisma } from '../../server/db/client'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ message: 'Hello!' })
}

export default handler