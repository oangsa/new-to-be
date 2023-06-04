// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectMongo from '@/src/libs/connectMongo'
import Note from '@/src/models/schemas'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function remove( req: NextApiRequest, res: NextApiResponse ) {
  if (req.method !== "DELETE") return res.status(405).send({ message: "Only DELETE method are allowed!" })

  const { id, surname } = req.query

  try {
    connectMongo()
    
    const result = await Note.deleteOne({"studentData.name": id, "studentData.surname": surname})

    if (!result.acknowledged) return res.status(201).send({ message: false })

    return res.status(200).send({ message: true })

} catch (err) {
    return res.status(404).send({message: "Unknown Error"})
}
}