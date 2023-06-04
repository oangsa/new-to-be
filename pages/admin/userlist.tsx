import type { ReactElement } from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from '../../src/components/container/PageContainer';
import AddModal from '@/src/components/modals/addModal'
import EditBtn from '@/src/components/list/editBtn'
import Pagnation from '@/src/components/list/pagination'
import UserListComp from '@/src/components/list/userlist'
import { paginate } from '@/src/utils/paginate'
import { NextRouter, useRouter } from 'next/router'
import { SetStateAction, useEffect, useState } from 'react'

export default function UserList() {
  const router: NextRouter = useRouter()
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const pageSize = 10
  const [testData, setTestData] = useState([
      {"studentData":{"name":"นราวิชญ์ วรรัตน์โภคา","classNumber":"24","studentId":"58515","secondary":"6","class":"5","status":false,"reason":"-","total":0,"weekDay":0},"loginData":{"username":"นราวิชญ์","password":"58515"}},
      {"studentData":{"name":"สุธางค์ สุขเรืองกูล","classNumber":"27","studentId":"58528","secondary":"6","class":"5","status":false,"reason":"-","total":0,"weekDay":0},"loginData":{"username":"สุธางค์","password":"58528"}}
  ]) 

  const getData = async () => {
      const res = await fetch("/api/getall")

      const d = await res.json()
      
      setData(d)
  }

  useEffect(() => {
      
      getData();
      
  }, [])


  const handlePageChange = (page: SetStateAction<number>) => {
      setCurrentPage(page)
  }

  const paginateStudent = paginate(data, currentPage, pageSize)

  const showStudent = true
  return (
    <PageContainer title="UserList" description="this is Userlist">
      <div>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 block sm:flex items-center justify-between border-b border-gray-200">
                    <div className="mb-1 w-full">
                        <div className="mb-4">
                        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white underline">Student Lists</h1>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
                        <AddModal></AddModal>
                    </div>
                </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg lg:m-16 md:m-8">
                {showStudent === true ? (
                    <>
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3" >Name</th>
                                    <th scope="col" className="px-6 py-3" >Surname</th>
                                    <th scope="col" className="px-6 py-3" >Year Class</th>
                                    <th scope="col" className="px-6 py-3" >Class</th>
                                    <th scope="col" className="px-6 py-3" >Student Id</th>
                                    <th scope="col" className="px-6 py-3" >Total</th>
                                    <th scope="col" className="px-6 py-3"></th>              
                                </tr>
                            </thead>
                            <tbody>
                                {paginateStudent.map((element) => {
                                    console.log(element)
                                    const editStudent = (
                                        <EditBtn key={element.studentData.name} name={element.studentData.name} surname= {element.studentData.surname} studentID={element.studentData.studentId} yearClass={element.studentData.yearClass} Class={element.studentData.class} username={element.loginData.username} password={element.loginData.password}/>
                                    )
                                    return (<UserListComp key={element.studentData.name} name={element.studentData.name} surname={element.studentData.surname} studentId={element.studentData.studentId} secondary={element.studentData.yearClass} Class={element.studentData.class} total={element.studentData.total} editStudent={editStudent} />)
                                })}
                            </tbody>
                        </table>
                    </> 
                ) : (
                    <p>None of student!</p>
                )}     
            </div>
            <Pagnation items={data.length} currentPage={currentPage} pageSize={pageSize} onPageChange={handlePageChange}></Pagnation> 
        </div>
    </PageContainer>
  );
}