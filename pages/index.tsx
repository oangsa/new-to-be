import { useEffect, useState } from "react"
import { useRouter, NextRouter } from "next/router"
import { CookieValueTypes, getCookie } from 'cookies-next';
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
import FormModal from "@/src/components/modals/formModal";
import { modalOptions } from "@/src/libs/modalOption";
import { Modal } from "flowbite";
import { FiLink } from 'react-icons/fi'
import jwtDecode from "jwt-decode";
import { studentData, loginData } from "@/src/libs/interface"
import getData from "@/src/libs/getData"

export default function Dashboard() {
    const router: NextRouter = useRouter()
    
    const [studentData, setStudentData] = useState<studentData>({
        name: "",
        surname: "",
        studentId: 0,
        yearClass: 0,
        class: 0,
        reason: "",
        total: 0,
        oldMonth: 0,
        timestamps: new Date()
    })
    const [loginData, setLoginData] = useState<loginData>({
        username: "",
        password: ""
    })
    
    const data = async () => {
        const cookie: any = getCookie("user-token")
        const token: any = jwtDecode(cookie, {header: true})
        const data: Promise<student> = getData(token.username, token.password)
        const [Student] = await Promise.all([data])
        
        setStudentData(Student.studentData)
        setLoginData(Student.loginData)
    }

    useEffect(() => {
        data()
    })

    const leaveClick = () => {

        try {
    
            const $modalElement: any = document.querySelector('#leaveModal');
            
            const modal = new Modal($modalElement, modalOptions);
    
            modal.show();
    
        } catch (err) {
            console.log(err)
        }
    }
    
    return (
        <>
            <p className="text-gray-700 text-3xl mb-16 font-bold">Home</p>
            <div>
                <div className="grid lg:grid-cols-3 gap-5 mb-16">
                        <div className="rounded bg-white h-40 shadow-sm">
                            <div className="font-bold text-xl mt-4 ml-4" >สวัสดี, {studentData.name} {studentData.surname} 👋</div>
                            <div>
                                <div className="mt-2 ml-4 inline-flex items-center justify-center rounded-lg text-lg text-center sm:w-auto">
                                    ⤷ 
                                    เข้าใช้บริการแล้ว {studentData.oldMonth} ครั้ง
                                </div>
                            </div>
                        </div>
                        <div className="rounded bg-white h-40 shadow-sm">
                            <div className="mt-4 ml-4 inline-flex items-center justify-center rounded-lg text-lg text-center sm:w-auto">
                                <ChevronDoubleRightIcon className="h-5 w-5" />
                                กรุณาลงข้อมูล !
                            </div>
                            <div className="mt-2 ml-4">
                              <button onClick={leaveClick} type="button" className="w-1/2 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto">
                                  <FiLink className="mr-2 h-5 w-5"/>
                                  ลงข้อมูลที่นี่
                              </button>
                                
                                <FormModal name={studentData.name} surname={studentData.surname} month={studentData.oldMonth} />
                            </div>
                        </div>
                        <div className="flex-none rounded bg-white h-40 shadow-sm">
                            
                        </div>
                    </div>
            </div>
            <div className="font-bold text-xl mb-4">
                🛠️ Update Log 🛠️
            </div>
            <div className="rounded bg-white h-96 shadow-sm">
                <div className="inline-flex items-center justify-center mt-4 ml-4 text-lg">
                    <div className="text-red-700">[</div><div className="text-blue-700">LOG</div><div className="text-red-700">]</div><div className="mr-1">:</div>
                    Update 1.0
                </div>
                <div className="mt-1 ml-9 text-lg">
                ⤷ Release Full Version
                </div>
            </div>           
        </>
    )
}