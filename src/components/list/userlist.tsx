import Del from "../../libs/del"
import { NextRouter, useRouter } from "next/router"
import Swal from "sweetalert2"


const UserListComp = ({ name, surname, studentId, secondary, Class, total, editStudent }: any) => {
    
    const router: NextRouter = useRouter()

    const delBtnClicked = async () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete'
        }).then((result) => {
            if (result.isConfirmed) {
                Del(name, surname)
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                setTimeout(() => router.reload(), 1000)
            }
        })
        
    }

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={studentId}>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" >{name}</th>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" >{surname}</th>
            <td className="px-14 py-4" >{secondary}</td>
            <td className="px-10 py-4" >{Class}</td>
            <td className="px-9 py-4" >{studentId}</td>
            <td className="px-5 py-4" >{total} Times</td>
            <td className="px-6 py-4 whitespace-nowrap space-x-2">
                {editStudent}
                <button onClick={delBtnClicked} type="button" data-modal-toggle="delete-user-modal" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                    <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                    Delete Student
                </button>
            </td>
        </tr>
    )
}

export default UserListComp