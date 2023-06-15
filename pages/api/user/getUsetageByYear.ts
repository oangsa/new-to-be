// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongo from '@/src/libs/connectMongo'
import Note from '@/src/models/schemas'

export default async function getUsetageByYear(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") return res.status(405).send({message: "Only GET method is allowed!"})
    var data: any = {
        month: [],
        total: []
    }

    try {
        connectMongo()
        for (let i: number = 1; i <= 6; i++) {
            const result = await Note.find({"studentData.yearClass": i})
            var month: any = 0
            var total: any = 0
            result.map(item => {
                month = month + item.studentData.oldMonth,
                total = total + item.studentData.total
            })
            data.month.push(month)
            data.total.push(total)
        }

        return res.status(200).send(data)

    } catch (err) {
        return res.status(404).send({message: "Unknown Error"})
    }
}