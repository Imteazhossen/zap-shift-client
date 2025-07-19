import React from 'react';
import { NavLink, Outlet } from 'react-router';
import ProFastLogo from '../Pages/SharedComponents/ProFastLogo/ProFastLogo';
import { FaHome, FaBoxOpen, FaMoneyCheckAlt, FaSearchLocation, FaUserEdit, FaMotorcycle, FaHourglassHalf, FaUserCheck, FaTruckMoving, FaCheckCircle, FaMoneyBillWave } from 'react-icons/fa';
import useUserRole from '../Hooks/useUserRole';

const DashBoardLayout = () => {
    const { role, roleLoading } = useUserRole();
    console.log(role);
    return (
        <div className="drawer  lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col ">
                {/* Page content here */}
                <div className="navbar bg-base-300 lg:hidden w-full">
                    <div className="flex-none ">
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2">Navbar Title</div>
                    <div className="hidden flex-none lg:block">

                    </div>

                </div>
                <Outlet></Outlet>
            </div>
            <div className="drawer-side ">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-[18vw] p-4">
                    {/* Sidebar content here */}
                    <ProFastLogo></ProFastLogo>
                    <li>
                        <NavLink to="/">
                            <FaHome className="mr-2" />
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/myParcels">
                            <FaBoxOpen className="mr-2" />
                            My Parcels
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/paymentHistory">
                            <FaMoneyCheckAlt className="mr-2" />
                            Payment History
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/track">
                            <FaSearchLocation className="mr-2" />
                            Track a Package
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/profile">
                            <FaUserEdit className="mr-2" />
                            Update Profile
                        </NavLink>
                    </li>
                    {/* if rider, they will see */}
                    {
                        !roleLoading && role === 'rider' &&
                        <>
                            <li>
                                <NavLink to="/dashboard/pendingDeliveries">
                                    <FaTruckMoving className="mr-2" />
                                    Pending Deliveries
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/completedDeliveries">
                                    <FaCheckCircle className="mr-2" />
                                    Completed Deliveries
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/myEarnings">
                                    <FaMoneyBillWave className="mr-2" />
                                    My Earnings
                                </NavLink>
                            </li>



                        </>
                    }
                    {/* if admin, they will see */}
                    {!roleLoading && role === 'admin' &&
                        <>
                            <li>
                                <NavLink to="/dashboard/assignRider">
                                    <FaUserCheck className="mr-2" />
                                    Assign Riders
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/dashboard/activeRiders">
                                    <FaMotorcycle className="mr-2" />
                                    Active Riders
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/pendingRiders">
                                    <FaHourglassHalf className="mr-2" />
                                    Pending Riders
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/makeAdmin">
                                    <FaUserEdit className="mr-2" />
                                    Make Admin
                                </NavLink>
                            </li>


                        </>
                    }
                </ul>
            </div>
        </div>
    );
};

export default DashBoardLayout;