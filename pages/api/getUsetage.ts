// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongo from '@/src/libs/connectMongo'
import Usetage from '@/src/models/usetage'

export default async function getUsetage(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") return res.status(405).send({message: "Only GET method is allowed!"})

    try {
        connectMongo()
        
        const result = await Usetage.findOne({})
        
        if (result === null) return res.status(400).send({message: "User is not valid."})

        return res.status(200).send(result)

    } catch (err) {
        return res.status(404).send({message: "Unknown Error"})
    }
}