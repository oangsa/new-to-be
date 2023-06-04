import _ from 'lodash'
import { useState } from 'react'

const Pagination = ({items, pageSize, currentPage, onPageChange}: any) => {

    let [num, setNum] = useState(1)
    const pageCount = items / pageSize

    console.log(pageCount)

    // if (Math.ceil(pageCount) === 1) return null;
    // const pages = _.range(1, pageCount + 1)
    const pages = [];
        for (let i = 0; i < 4; i++) {
        pages.push({ page: num + i });
        }
    function Next ()
    {  
        if (pageCount + 1 > num + 3 ) return setNum(++num)
        return;
    }
    function back ()
    {
       num > 1 && setNum(--num)
    }

    return (
        <nav className="flex bg-white rounded-lg">
            <button onClick={back} className="h-12 border-2 border-r-0 border-primary-500
                px-4 rounded-l-lg hover:bg-primary-500 hover:text-white">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" fillRule="evenodd"></path>
                </svg>
            </button>
            {
                pages.map((page, i) => (
                <button key={i} onClick={() => onPageChange(page.page)} className={`h-12 border-2 border-r-0 border-primary-500 hover:bg-primary-500 hover:text-white
                w-12 ${currentPage === page.page && 'bg-primary-500 text-white'}`}>{page.page}</button>
                ))
            }
            <button onClick={Next} className="h-12 border-2  border-primary-500
                px-4 rounded-r-lg hover:bg-primary-500 hover:text-white">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" fillRule="evenodd"></path></svg>
            </button>
        </nav>
    )
}


export default Pagination