'use client'
import React, { useEffect, useState } from 'react';
import '../../(view)/admin/adminStyle.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminSidebar from '@/app/(view)/admin_layout/sidebar/page';
import { useRouter } from 'next/navigation';
import PrivateRoutes from '@/app/(view)/admin/login/privateRoutes/page';
import { useQuery } from '@tanstack/react-query';




const AdminTemplate = ({ children }) => {












    const router = useRouter()
    const [categories, setCategories] = useState([])
    const [css, setCss] = useState([])


    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}:5002/admin/admin_panel_settings`)
            .then(Response => Response.json())
            .then(data => setCategories(data))
    }, [])
    console.log(categories, 'categories')
    const filteredCategories = categories.filter(category => category.status === 1);
    console.log(filteredCategories[0]?.login_template_name, 'filteredCategories[0]?.admin_template')


    const loginTemplateNumber = filteredCategories[0]?.login_template_name
    const number = parseFloat(loginTemplateNumber)
    
    // console.log(`/admin/login${typeof(loginTemplateNumber)}`, 'loginTemplateNumber')

    const route = `/login${loginTemplateNumber}`

    console.log(route)

    const [isSidebarActive, setSidebarActive] = useState(false);

    const toggleSidebar = () => {
        setSidebarActive(!isSidebarActive);
    };
    const userInfo = localStorage?.getItem('userId')

    const { data: singleUsers = [], isLoading, refetch } = useQuery({
        queryKey: ['singleUsers'],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}:5002/user/allUser/${userInfo}`);
            const data = await res.json();

            return data;
        },
    });

    console.log(singleUsers[0]?.verifiy_codes)
    const verifyCode = singleUsers[0]?.OTP
    const userId = localStorage.getItem('userId')
    const passReset = singleUsers[0]?.pass_reset








    const roleName = parseFloat(singleUsers[0]?.role_name)



    const { data: roleDefaultPage = []
    } = useQuery({
        queryKey: ['roleDefaultPage'],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}:5002/admin/users_role/users_role_permission/${roleName}`)

            const data = await res.json()
            return data
        }
    })

    console.log(roleDefaultPage)

    const defaultPage = roleDefaultPage[0]?.user_default_page


    const { data: moduleInfo = []
    } = useQuery({
        queryKey: ['moduleInfo'],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}:5002/admin/module_info/module_info_all/${userInfo}`)

            const data = await res.json()
            return data
        }
    })

    console.log(moduleInfo)

    const matchingIds = moduleInfo.filter(info => info.id === parseFloat(defaultPage))

    console.log(matchingIds[0]?.controller_name)
    console.log(matchingIds[0]?.method_name)

    const method = matchingIds[0]?.method_name
    const controller = matchingIds[0]?.controller_name


    console.log(`/Admin/${controller}/${method}`)

    const adminLogin = localStorage.getItem('login')

    // /Admin/users/change_password/
    const login = () => {

        router.push(`/admin/login`)

    }

 

    useEffect(() => {

        if (!userInfo) {

            // router.push(`/admin/login13`);
            router.push(`/admin/login`);
        }
        // else if (passReset === '1') {

        
        //     // router.push(`/Admin/users/reset_password/${userId}`);
        //      router.push(`/admin/users/password_reset/${userId}`)
          
        // }
        // else if (verifyCode === '1') {

        
        //     router.push(`/admin/users/verification_code/${userId}`);
        //     //  router.push(`/admin/users/password_reset/${userId}`)
          
        // }
        // else if (verifyCode === '2') {

        
        //     router.push(`/admin/users/email_verify_code/${userId}`);
        //      // router.push(`/admin/users/password_reset/${id}`)
          
        // }
        // else if(defaultPage !== ''){
        //     router.push(`/Admin/${controller}/${method}`);
        // }


       
       
    }, [userInfo,  router, adminLogin]);




    return (
        // <div>
        //     {/* class="wrapper" */}
        //     <div>

                <div id='wrapper' className={`wrapper ${isSidebarActive ? 'sidebar-active' : ''}`}>
                    {userInfo ? (
                        <AdminSidebar
                            isSidebarActive={isSidebarActive}
                            child={children}
                            toggleSidebar={toggleSidebar}
                        />
                    ) : <>
                        {login()}
                    </>}
                </div>
        //     </div>

        // </div>
    );
};

export default AdminTemplate;


 // else if (passReset === '1') {

        
        //     // router.push(`/Admin/users/reset_password/${userId}`);
        //      router.push(`/admin/users/password_reset/${userId}`)
          
        // }
        // else if (verifyCode === '1') {

        
        //     // router.push(`/admin/users/verification_code/${userId}`);
        //      router.push(`/admin/users/password_reset/${userId}`)
          
        // }
        // else if (verifyCode === '2') {

        
        //     router.push(`/admin/users/email_verify_code/${userId}`);
        //      // router.push(`/admin/users/password_reset/${id}`)
          
        // }
        // else if(defaultPage !== ''){
        //     router.push(`/Admin/${controller}/${method}`);
        // }