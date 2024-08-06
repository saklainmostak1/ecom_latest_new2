// import Link from 'next/link';
// import React, { useEffect, useState } from 'react';
// import { FaCaretDown } from 'react-icons/fa';

// const AdminSubHeader = ({pageGroup}) => {
//     console.log(pageGroup , 'href')
// const [customMenu, setCustomMenu] = useState([])
// useEffect(() => {
//     fetch('http://192.168.0.126:5002/api/menu')
//     .then(res => res.json())
//     .then(data => setCustomMenu(data))
// }, [])

// console.log(customMenu.map(menu => menu.children))
    
//     return (
//         <div className='sticky-top' >
//             <nav style={{ marginTop: '-35px' }} className="navbar  navbar-expand-lg navbar-light bg-light">
//                 <div className="container-fluid" >
//                     <Link className="navbar-brand  text-primary" href="https://atik.urbanitsolution.com/Admin/admin_page_group/admin_page_group_all/system_setup">System Setup:{pageGroup}</Link>
//                     <button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#customNavbarCollapse" aria-controls="customNavbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
//                         =
//                     </button>
//                     <div className="collapse navbar-collapse " id="customNavbarCollapse">
//                         <ul className="nav navbar-nav ml-auto ">
//                             <li className="nav-item active">
//                                 <Link className="nav-link" href="#">{pageGroup}</Link>
//                             </li>
//                             <li className="nav-item">
//                                 <Link className="nav-link" href="#">Page</Link>
//                             </li>
//                             <li className="nav-item">
//                                 <Link className="nav-link" href="#">Page</Link>
//                             </li>
//                             <li className="nav-item">
//                                 <Link className="nav-link" href="#">Page</Link>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </nav>
















//               <nav style={{ marginTop: '-35px' }} className="navbar  navbar-expand-lg navbar-light bg-light">
//                 <div className="container-fluid" >
//                     <Link className="navbar-brand  text-primary" href="https://atik.urbanitsolution.com/Admin/admin_page_group/admin_page_group_all/system_setup">System Setup:{pageGroup}</Link>
//                     <button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#customNavbarCollapse" aria-controls="customNavbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
//                         =
//                     </button>
//                     <div className="collapse navbar-collapse " id="customNavbarCollapse">
//                     <ul class=" nav navbar-nav ml-auto">
//                     {
//                       customMenu?.map(page =>
//                         <>
//                           <div class=" ml-0 dropdown " >

//                             <li className="nav-item active
//                             "

//                             >
//                               <Link className="nav-link" href=""


                               
//                               >{(page?.title_en)}

//                                 <FaCaretDown></FaCaretDown>
//                               </Link>
//                             </li>
//                             <ul class="dropdown-menu nav-item active ml-0" aria-labelledby="dropdownMenuButton">
//                               {
//                                 page.children.map(displayNames =>

//                                   <>

//                                     <li

//                                     ><Link
//                                     href={``}


//                                      >{displayNames.title_en}

//                                       </Link></li>
//                                   </>
//                                 )
//                               }

//                             </ul>
//                           </div>
//                         </>
//                       )}

//                   </ul>
//                     </div>
//                 </div>
//             </nav>
//         </div>
//     );
// };

// export default AdminSubHeader;