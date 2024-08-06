'use client'

import '../../../../globals.css'
// import handleLogin from '../auth';

import { Image } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
// import { useRouter } from 'next/navigation';

const Login = () => {
    const router = useRouter();

    // const handleSubmit = async (event) => {
    //     event?.preventDefault();
    //     const form = event?.target;
    //     const email = form?.email?.value;
    //     const password = form?.password?.value;

    //     const loginSuccessful = await handleLogin(email, password);

    //     if (loginSuccessful) {
    //         console.log('Login was successful');
    //         // Use router to navigate to another page (e.g., '/')
    //         router.push('/'); // Replace '/' with the path to the page you want to navigate to
    //     } else {
    //         console.log('Login failed');
    //     }
    // };

    const { data: users = [], isLoading, refetch
    } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}:5002/user/allUser`)

            const data = await res.json()
            return data
        }
    })

    const [userRole, setUserRole] = useState([])


    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}:5002/user/role`)
            .then(Response => Response.json())
            .then(data => setUserRole(data))
    }, [])


    // http://192.168.0.110:5002/user/role



    const handleSubmit = async (event) => {
        event?.preventDefault();
        const form = event?.target;
        const email = form?.email?.value;
        const password = form?.password?.value;
        const loginDb = {
            email, password
        }
        const userInfo = users.filter(u => u.email === email)
        const userRoleInfo = (userRole.users.filter(user => user.id === userInfo[0].role_name))

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}:5002/login`, {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginDb),
            });
            console.log(response)

            if (response.ok) {
                toast.success('login successful')
                localStorage.setItem('userEmail', userInfo[0].email);
                localStorage.setItem('userId', userInfo[0].id);
                localStorage.setItem('userName', userInfo[0].full_name);
                localStorage.setItem('userRoleName', userRoleInfo[0].role_name);
                // sessionStorage.setItem('userOTP', userRoleInfo[0].OTP);

                router.push('/Admin/dashboard')
                // window.location.href = '/Admin/dashboard';
                console.log('Handle successful login');
                console.log(loginDb)
            } else {
                toast.error('Invalid email Or password')
                console.log('Handle login error');
            }
        } catch (error) {
            toast.error('Invalid email Or password')
            console.error('Login failed:', error);
        }
    }


    return (


        <section className=" gradient-form gradient-custom-2" >
            <div className="container py-5 h-100" >
                <div className="row d-flex justify-content-center align-items-center h-100">

                    <div className="col-xl-6">
                        <div className="text-center text-white font-weight-bold">
                            <Image src="https://atik.urbanitsolution.com/files/logo/thumbnail/7632b474c6d5b78e3f6233a87461bf623f453c67.jpeg"
                                style={{ width: "100px" }} alt="logo" />
                            <h2 className="mt-1 pb-1 font-weight-bold">Pathshala School & College</h2>
                            <h5 className='font-weight-bold'>School Management System</h5>
                            <p>Dear user, log in to access the admin area!</p>
                        </div>
                        <div className="card rounded-3 text-black">

                            <div className="row g-0">
                                <div className="col-lg-12">
                                    <div className="card-body p-md-5 mx-md-4 p-lg-10  mx-lg-4 p-4">



                                        <form onSubmit={handleSubmit}>
                                            <h2 className='text-center mb-5'>LogIn</h2>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" >Email</label>
                                                <input
                                                    type="email"
                                                    name="email"

                                                    id="form2Example11" className="form-control"
                                                    placeholder="Phone number or email address" />

                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" >Password</label>
                                                <input
                                                    placeholder='Password'
                                                    type="password"
                                                    name="password"
                                                    id="form2Example22" className="form-control" />
                                            </div>
                                            <a className="" href="#!">Forgot password?</a>

                                            <div className="text-center pt-1 mb-5 pb-1 mt-2">

                                                <input
                                                    className="btn w-75 btn btn-dark px-5 py-2 mt-2" type="submit" value="Login" />

                                            </div>



                                        </form>


                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
