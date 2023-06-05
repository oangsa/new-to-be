import { ChangeEvent, FC, useEffect, useState } from "react"
import { Modal } from 'flowbite'
import type { ModalOptions, ModalInterface } from 'flowbite'
import { NextRouter, useRouter } from "next/router"
import { modalOptions } from "../../libs/modalOption"
import Swal, { SweetAlertOptions } from "sweetalert2"

interface leaveModal {
    name: string,
    surname: string,
    month: number
}

interface leaveFrom {
    other: string
}

const FormModal: FC<leaveModal> = ({ name, surname, month }) => {
    const router: NextRouter = useRouter()

    const [data, setData] = useState<leaveFrom>({
        other: ""
    })

    
    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        console.log(name, value)
        setData((prev) => ({...prev, [name]: value}))
    }

    const close = () => {

        try {
    
            const $modalElement: any = document.querySelector('#leaveModal');
            
            const modal: ModalInterface = new Modal($modalElement, modalOptions);
    
            modal.hide();
            
            router.reload()
        } catch (err) {
            console.log(err)
        }
    }

    const swalFunc = ({title, icon}: SweetAlertOptions<string, string>) => {
        // setTimeout
        Swal.fire({
            title: title,
            icon: icon,
        })

        router.reload()
    }

    const leave = async () => {
        const res = await fetch(`/api/sendDataHandler/send`, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({other: data.other, name: name, surname: surname, oldMonth: month}),
        })

        console.log(await res.json())

        if(res.status !== 200) return false

        return true

    }

    const submit = async () => { 

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm'
        }).then(async (result) => {
            
            if (result.isConfirmed) {
                if (!leave()) return swalFunc({title:"ไม่สำเร็จ", icon:"error"})
                else return swalFunc({title:"สำเร็จ", icon:"success"})
            }
        })

    }

    return (
        <>
            <div id="leaveModal" tabIndex={-1} aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
                <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">

                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">

                        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                ลงข้อมูล
                            </h3>
                            <button type="button" onClick={close} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form>
                            <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ชื่อ</label>
                                    <input disabled value={name} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="ประยุทธ์" required />
                                </div>
                                <div>
                                    <label htmlFor="surname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">นามสกุล</label>
                                    <input disabled value={surname} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="ประยุทธ์" required />
                                </div>
                            </div>
                            <div className="grid gap-4 mb-4 sm:grid-cols-1"> 
                                <div>
                                    <label htmlFor="other" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ระบุเหตุผล</label>
                                    <input value={data.other} onChange={handleInput} type="text" name="other" id="other" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="ติดเกม..." required />
                                </div>
                            </div>
                        </form>
                        <button onClick={submit} type="submit" className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                            <svg className="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FormModal