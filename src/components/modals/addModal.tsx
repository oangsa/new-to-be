import { ChangeEvent, useState } from "react"
import { Modal } from 'flowbite'
import type { ModalOptions, ModalInterface } from 'flowbite'
import { NextRouter, useRouter } from "next/router"
import { modalOptions } from "../../libs/modalOption"
import Swal from "sweetalert2"
import add from "@/src/libs/add"

const AddModal = () => {
    const router: NextRouter = useRouter()

    const [data, setData] = useState({
        name: "",
        surname: "", 
        studentID: 11111,
        yearClass: 0, 
        Class: 0
    })
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        console.log(name, value)
        setData((prev) => ({...prev, [name]: value}))
        
    }

    const close = () => {

        try {
    
            const $modalElement: any = document.querySelector('#modalEl');
            
            const modal: any = new Modal($modalElement, modalOptions);
    
            modal.hide();
            
            router.reload()
        } catch (err) {
            console.log(err)
        }
    }

    

    const addClick = () => {

        try {
    
            const $modalElement: any = document.querySelector('#modalEl');
            
            const modal: ModalInterface = new Modal($modalElement, modalOptions);
    
            modal.show();
    
        } catch (err) {
            console.log(err)
        }
    }

    const swalFunc = () => {
        // setTimeout
        Swal.fire({
            title: 'Student is already exist!',
            icon: "error",
        })
    }

    const submit = async () => {

        const res = await add(data.name, data.surname, data.studentID, data.yearClass, data.Class)

        if (res.status !== 200) return swalFunc()

        Swal.fire({
            title: 'Success',
            icon: "success",
        })

        return router.reload()

    }

    return (
        <>
            <button onClick={addClick} type="button" className="w-1/2 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto">
                <svg className="-ml-1 mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                Add
            </button>

            <div id="modalEl" tabIndex={-1} aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
                <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">

                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">

                        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Add Product
                            </h3>
                            <button type="button" onClick={close} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>

                        <form>
                            <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                    <input value={data.name} onChange={handleChange} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Nigga" required />
                                </div>
                                <div>
                                    <label htmlFor="surname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Surname</label>
                                    <input value={data.surname} onChange={handleChange} type="text" name="surname" id="surname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Jamal" required />
                                </div>
                                <div>
                                    <label htmlFor="studentID" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">StudentId</label>
                                    <input value={data.studentID} onChange={handleChange} type="number" name="studentID" id="studentID" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="1" required />
                                </div>
                                <div>
                                    <label htmlFor="yearClass" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Year Class</label>
                                    <input value={data.yearClass} onChange={handleChange} type="number" name="yearClass" id="yearClass" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="1" required />
                                </div>
                                <div>
                                    <label htmlFor="Class" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Class</label>
                                    <input value={data.Class} onChange={handleChange} type="number" name="Class" id="Class" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="1" required />
                                </div>
                            </div>
                        </form>
                        <button onClick={submit} type="submit" className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                            <svg className="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                            Add new student
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddModal