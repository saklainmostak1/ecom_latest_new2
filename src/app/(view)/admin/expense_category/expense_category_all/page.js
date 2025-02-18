'use client'
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import '../../../admin_layout/modal/fa.css'
import Swal from 'sweetalert2';

const ExpenceAllCategory = () => {


    const { data: expenseCategory = [], isLoading, refetch
    } = useQuery({
        queryKey: ['expenseCategory'],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}:5002/Admin/expence_category/expence_category_all`)

            const data = await res.json()
            return data
        }
    })
    const page_group = localStorage.getItem('pageGroup')
    const userId = localStorage.getItem('userId')
    const { data: moduleInfo = []
    } = useQuery({
        queryKey: ['moduleInfo'],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}:5002/admin/module_info/module_info_all/${userId}`)

            const data = await res.json()
            return data
        }
    })

    // console.log(moduleInfo.filter(moduleI => moduleI.controller_name === 'brand'))
    const brandList = moduleInfo.filter(moduleI => moduleI.controller_name === 'expense_category')

    //   console.log(filteredModuleInfo);


    const filteredBtnIconEdit = brandList.filter(btn =>
        btn.method_sort === 3
    );
    const filteredBtnIconCopy = brandList.filter(btn =>
        btn.method_sort === 4
    );



    const filteredBtnIconDelete = brandList.filter(btn =>
        btn.method_sort === 5
    );
    const filteredBtnIconCreate = brandList.filter(btn =>
        btn.method_sort === 1
    );

    const expense_category_delete = id => {

        console.log(id)
        const proceed = window.confirm(`Are You Sure delete${id}`)
        if (proceed) {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}:5002/Admin/expence_category/expence_category_delete/${id}`, {
                method: "POST",

            })
                .then(Response => Response.json())
                .then(data => {

                    console.log(data)
                })
        }
    }
    const [message, setMessage] = useState();
    useEffect(() => {
        if (sessionStorage.getItem("message")) {
            setMessage(sessionStorage.getItem("message"));
            sessionStorage.removeItem("message");
        }
    }, [])

    return (
        <div class="container-fluid">
            <div class=" row ">
                <div className='col-12 p-4'>
                    {
                        message &&

                        <div className="alert alert-success font-weight-bold">
                            {message}
                        </div>
                    }
                    <div className='card'>
                        <div class=" bg-light body-content">
                            <div class=" border-primary shadow-sm border-0" >
                                <div class="card-header custom-card-header  py-1  clearfix bg-gradient-primary text-white" style={{ backgroundColor: '#4267b2' }}>
                                    <h5 class="card-title card-header-color font-weight-bold mb-0  float-left mt-1">Expense Category List</h5>
                                    <div class="card-title card-header-color font-weight-bold mb-0  float-right"> <Link href="/Admin/expense_category/expense_category_create?page_group=account_management" class="btn btn-sm btn-info">Create Expense category</Link> </div>
                                </div>
                                <div class="card-body">
                                    <div className='table-responsive'>

                                        <table className="table  table-bordered table-hover table-striped table-sm">
                                            <thead>
                                                <tr>
                                                    <th>

                                                        Serial
                                                    </th>
                                                    <th>
                                                        Name
                                                    </th>
                                                    <th>
                                                        Full Name
                                                    </th>

                                                    <th>
                                                        Created Date
                                                    </th>
                                                    <th>
                                                        Action
                                                    </th>
                                                </tr>

                                            </thead>

                                            <tbody>
                                                {isLoading ? <div className='text-center'>
                                                    <div className='  text-center text-dark'
                                                    >
                                                        <FontAwesomeIcon style={{
                                                            height: '33px',
                                                            width: '33px',
                                                        }} icon={faSpinner} spin />
                                                    </div>
                                                </div>
                                                    :
                                                    expenseCategory.map((expense_category, i) => (
                                                        <tr key={expense_category.id}>
                                                            <td>    {i + 1}</td>
                                                            <td>{expense_category.expense_category_name}</td>
                                                            <td>
                                                                {expense_category.created_by}
                                                            </td>

                                                            <td>{expense_category.created_date}</td>

                                                            <td>  <div className="flex items-center ">
                                                                <Link href={`/Admin/expense_category/expense_category_edit/${expense_category.id}?page_group=${page_group}`}>
                                                                    {filteredBtnIconEdit?.map((filteredBtnIconEdit => (
                                                                        <button
                                                                            key={filteredBtnIconEdit.id}
                                                                            title='Edit'
                                                                            style={{ width: "35px ", height: '30px', marginLeft: '5px', marginTop: '5px' }}
                                                                            className={filteredBtnIconEdit?.btn}
                                                                        >
                                                                            <a
                                                                                dangerouslySetInnerHTML={{ __html: filteredBtnIconEdit?.icon }}
                                                                            ></a>
                                                                        </button>
                                                                    )))}
                                                                </Link>
                                                                <Link href={`/Admin/expense_category/expense_category_copy/${expense_category.id}?page_group=${page_group}`}>
                                                                    {filteredBtnIconCopy.map((filteredBtnIconEdit => (
                                                                        <button
                                                                            key={filteredBtnIconEdit.id}
                                                                            title='Copy'
                                                                            style={{ width: "35px ", height: '30px', marginLeft: '5px', marginTop: '5px' }}
                                                                            className={filteredBtnIconEdit?.btn}
                                                                        >
                                                                            <a
                                                                                dangerouslySetInnerHTML={{ __html: filteredBtnIconEdit?.icon }}
                                                                            ></a>
                                                                        </button>
                                                                    )))}
                                                                </Link>
                                                                {filteredBtnIconDelete.map((filteredBtnIconDelete => (
                                                                    <button
                                                                        key={filteredBtnIconDelete.id}
                                                                        title='Delete'
                                                                        onClick={() => expense_category_delete(expense_category.id)}
                                                                        style={{ width: "35px ", height: '30px', marginLeft: '5px', marginTop: '5px' }}
                                                                        className={filteredBtnIconDelete?.btn}
                                                                    >
                                                                        <a
                                                                            dangerouslySetInnerHTML={{ __html: filteredBtnIconDelete?.icon }}
                                                                        ></a>
                                                                    </button>
                                                                )))}
                                                            </div></td>
                                                        </tr>
                                                    )

                                                    )



                                                }
                                            </tbody>

                                        </table>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ExpenceAllCategory;