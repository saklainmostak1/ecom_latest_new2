
import AdminHome from '@/app/(view)/admin/admin_home/page';
import PrivateRoutes from '@/app/(view)/admin/login/privateRoutes/page';
import React from 'react';

const Dashboard = () => {
    return (
        <div>
           {/* <PrivateRoutes> */}
           <AdminHome/>
           {/* </PrivateRoutes> */}
        </div>
    );
};

export default Dashboard;