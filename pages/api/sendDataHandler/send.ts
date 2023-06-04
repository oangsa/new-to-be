// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongo from '@/src/libs/connectMongo'
import Note from '@/src/models/schemas'
import Usetage from '../../../src/models/usetage'


export default async function send( req: NextApiRequest,res: NextApiResponse) {
  if (req.method !== "POST" ) return res.status(405).send({message: "Only POST method is allowed!"})
  
  const { name, surname, other, oldMonth } = req.body

  console.log(name, surname, other, oldMonth)

  const auth1 = (name === undefined || surname === undefined || other === undefined || oldMonth === undefined)

  const auth2 = (name === "" || surname === "" || other === "" || oldMonth === "")

  if ( auth1 || auth2 ) return res.status(401).send({ message: "Please send all of data in request!" })


  try {
    connectMongo()

    const check = await Note.findOne({"studentData.name": name, "studentData.surname": surname})

    if ( check == null ) return res.status(201).send({ message: "Student is not valid!" })

    console.log(check)

    await Note.updateOne({"studentData.name" : name, "studentData.surname" : surname}, 
        {$set: {"studentData.reason": other, "studentData.total": check.studentData.total + 1, 
                "studentData.oldMonth": check.studentData.total + 1, "studentData.timestamps": new Date()}})
    
    const Data = await Usetage.find({})

    if ( Data.length < 1 ) {
        const struct = {
            currentData: {
                total: 1,
                Day: 1,
                Month: 1
            },
            oldData: {
                Day: 0,
                Month: 0
            }
        }
        await Usetage.create(struct)
    } 

    else {
        await Usetage.updateOne({"currentData.total": Data[0].currentData.total}, 
            {$set: {"currentData.total": Data[0].currentData.Day + 1, "currentData.Day": Data[0].currentData.total + 1, "currentData.Month": Data[0].currentData.Month + 1 }})
    }

    return res.status(200).send({ message: "Success" })
  } 
  catch (err) {
    return res.status(404).send({ message: "Unexpected Error" })
  }

  
}