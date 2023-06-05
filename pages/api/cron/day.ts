// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectMongo from '@/src/libs/connectMongo'
import Usetage from '@/src/models/usetage'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function setDay( req: NextApiRequest, res: NextApiResponse ) {
    try {
        connectMongo()

        const res = await Usetage.findOne({})

        await Usetage.updateMany({}, {$set:{"currentData.Day": 0, "oldData.Day": res.currentData.Day}})
        return res.status(200).send({msg: "Success"})
    }
    catch (err) {
        return res.status(400).send({msg: "Error"})
    }
}