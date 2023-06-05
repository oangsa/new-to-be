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
    const msg = `message=\n${name} ${surname} ได้เข้าใช้ศูนย์เพื่อนใจ\nเพราะ: ${other}\nเวลา: ${`${new Date(check.studentData.timestamps).toLocaleString("th-TH", {timeZone: "Asia/Bangkok"}).split(" ")[1].split(":")[0]}:${new Date(check.studentData.timestamps).toLocaleString("th-TH", {timeZone: "Asia/Bangkok"}).split(" ")[1].split(":")[1]}`} น.`;

    if ( check == null ) return res.status(201).send({ message: "Student is not valid!" })

    await Note.updateOne({"studentData.name" : name, "studentData.surname" : surname}, 
        {$set: {"studentData.reason": other, "studentData.total": check.studentData.total + 1, 
                "studentData.oldMonth": check.studentData.total + 1, "studentData.timestamps": new Date()}})

    const response = await fetch("https://notify-api.line.me/api/notify", {
        mode: "cors",
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.LINE_TOKEN}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: msg,
    });

    console.log(response.text)
    
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