// 'use client'

// const handleSubmit = async (email, password) => {

//     const loginDb = {
//         email, password
//     }

//     try {
//         const response = await fetch('http://192.168.0.110:5002/login', {
            
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(loginDb),
//         });
//         console.log(response)
        
//         if (response.ok) {
      
//             console.log('Handle successful login');
//             console.log(loginDb)
//         } else {
//             console.log('Handle login error');
//         }
//     } catch (error) {
//         console.error('Login failed:', error);
//     }
// }

// export default handleSubmit



'use client'



const handleSubmit = async (event) => {
    event?.preventDefault();
    const form = event?.target;
    const email = form?.email?.value;
    const password = form?.password?.value;
    const loginDb = {
        email, password
    }

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
       
            window.location.href = '/Admin/dashboard';
            console.log('Handle successful login');
            console.log(loginDb)
        } else {
            console.log('Handle login error');
        }
    } catch (error) {
        console.error('Login failed:', error);
    }
}

export default handleSubmit



