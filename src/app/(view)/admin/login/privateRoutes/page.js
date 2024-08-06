'use client'
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const PrivateRoutes = ({ children }) => {

  const { data: users = [], isLoading, refetch
  } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}:5002/user/allUser`)

      const data = await res.json()
      return data
    }
  })

  const userEmail = sessionStorage.getItem('userEmail');
  console.log(users)

  const router = useRouter();

  if (isLoading) {
    // Render a loading spinner while data is being fetched
    return (
      <div className='text-center'>
        <div className=' my-5 py-5 mr-5 text-center text-primary'
        >
          <FontAwesomeIcon style={{
            height: '33px',
            width: '33px',
          }} icon={faSpinner} spin />
        </div>
      </div>
    );
  }

  if (userEmail) {

    return children
  }

  router.replace('/admin/login/login');
  return null;
};

export default PrivateRoutes;