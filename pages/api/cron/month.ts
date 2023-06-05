// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectMongo from '@/src/libs/connectMongo'
import Usetage from '@/src/models/usetage'
import Note from '@/src/models/schemas'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function setMonth( req: NextApiRequest, res: NextApiResponse ) {
    try {
        connectMongo()

        const res = await Usetage.findOne({})

        await Usetage.updateMany({}, {$set:{"currentData.Month": 0, "oldData.Month": res.currentData.Month}})
        await Note.updateMany({}, {$set:{"studentData.oldMonth": 0}})
        return res.status(200).send({msg: "Success"})
    }
    catch (err) {
        return res.status(400).send({msg: "Error"})
    }
}