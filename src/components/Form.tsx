import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import User from "../types.ts/User";
import List from "./List";
import { NextPage } from "next";
import Link from "next/link";

const Form: NextPage = () => {
    const router = useRouter();
    const queryid = router.query.id;
    const initialSwitcherClass = 'elSwitch z-10 bg-white shadow text-gray-800 flex items-center justify-center w-1/2 rounded h-8 transition-all top-[4px] absolute left-1';
    const shiftedSwitcherClass = 'elSwitch z-10 bg-white shadow text-gray-800 flex items-center justify-center w-1/2 rounded h-8 transition-all top-[4px] absolute left-[135px]';
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    const [userFirstName, setUserFirstName] = useState<string>('');
    const [userLastName, setUserLastName] = useState<string>('');
    const [userCompany, setUserCompany] = useState<string>('');
    const [userEmail, setUserEmail] = useState<string>('');
    const [userPassword, setUserPassword] = useState<string>('');
    const [userStatus, setUserStatus] = useState<string>('User');

    const [editableUser, setEditableUser] = useState<User>();

    const [switcherClass, setSwitcherClass] = useState<string>(initialSwitcherClass);

    const [userList, setUserList] = useState<Array<User>>([]);

    const indexRout = '/';

    useEffect(() => {
        let newUserList;
        const userList = localStorage.getItem('userList');
        if (userList === null) {
            newUserList = [];
        } else {
            newUserList = JSON.parse(userList);
        }
        setUserList(newUserList);
    }, []);

    useEffect(() => {
        if (router.pathname !== indexRout) {
            const editableUser = userList.find((user: User) => {
                return user.id === Number(router.query.id);
            });
            setEditableUser(editableUser);
            if (editableUser) {
                setUserFirstName(editableUser.firstName);
                setUserLastName(editableUser.lastName);
                setUserCompany(editableUser.company);
                setUserStatus(editableUser.status);
                editableUser.status === 'user' ? setSwitcherClass(initialSwitcherClass) : setSwitcherClass(shiftedSwitcherClass);
                setUserEmail(editableUser.email);
                setUserPassword(editableUser.password);
            }
        }
    }, [queryid, userList]);

    function togglePasswordVisibility(event: any) {
        event.preventDefault();
        setIsPasswordVisible((prevState) => !prevState);
    };

    function handleTabClick() {
        if (switcherClass === initialSwitcherClass) {
            setSwitcherClass(shiftedSwitcherClass);
            setUserStatus('admin');
        } else {
            setSwitcherClass(initialSwitcherClass);
            setUserStatus('user');
        }
    };

    function handleSaveUser() {
        const id: number = Date.now();
        const user: User = {
            firstName: userFirstName,
            lastName: userLastName,
            id,
            company: userCompany,
            email: userEmail,
            password: userPassword,
            status: userStatus,
        }

        let newUserList;
        const userList = localStorage.getItem('userList');
        if (userList === null) {
            newUserList = [];
        } else {
            newUserList = JSON.parse(userList);
        }
        newUserList.push(user);
        setUserList(newUserList);
        localStorage.setItem('userList', JSON.stringify(newUserList));
        setIsPasswordVisible(false);
        setUserFirstName('');
        setUserLastName('');
        setUserCompany('');
        setUserEmail('')
        setUserPassword('');
        setUserStatus('User');
        setSwitcherClass(initialSwitcherClass);
    };

    function handleEditUser () {
        const upatedList = userList.map((user) => {
            if (editableUser && user.id === editableUser.id) {
                const newUser = {
                    firstName: userFirstName,
                    lastName: userLastName,
                    id: user.id,
                    company: userCompany,
                    email: userEmail,
                    password: userPassword,
                    status: userStatus,
                }
                return newUser;
            }
            return user;
        })
        setUserList(upatedList);
        localStorage.setItem('userList', JSON.stringify(upatedList));
    };

    return (
        <div className="flex min-h-screen">
            <div className="w-26 p-10 border-r border-inherit">
                {router.pathname === indexRout ?
                    <div className="font-bold text-xl mb-10">Add customer</div>
                    :
                    <div className="font-bold text-xl mb-10">Edit customer</div>
                }
                <form className="w-full">

                    <div className="mb-7 flex justify-between">
                        <div className="mb-4 md:mr-6 md:mb-0 h-14 w-204">
                            <label className="block mb-2 text-sm 500 text-gray-700">
                                First Name
                            </label>
                            <input
                                value={userFirstName}
                                className="w-full peer  px-3 py-2 text-sm leading-tight text-gray-700 border rounded-lg shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="firstName"
                                type="text"
                                onChange={(event) => setUserFirstName(event.target.value)}
                            />
                            <p className="invisible peer-invalid:visible text-red-700 font-light">
                                Please enter your name
                            </p>
                        </div>
                        <div className="md:ml-2 h-14">
                            <label className="block mb-2 text-sm 500 text-gray-700">
                                Last Name
                            </label>
                            <input
                                value={userLastName}
                                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded-lg shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="lastName"
                                type="text"
                                onChange={(event) => setUserLastName(event.target.value)}
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm 500 mb-2">Company</label>
                        <input
                            value={userCompany}
                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded-lg shadow appearance-none focus:outline-none focus:shadow-outline"
                            type="text"
                            id="company"
                            onChange={(event) => setUserCompany(event.target.value)}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm 500 mb-2">Status</label>
                        <div className="shadow rounded border h-10 flex p-1 relative items-center bg-gray-200 z-0 cursor-pointer" onClick={handleTabClick}>
                            <div className="w-full flex justify-center z-20 text-gray-700 text-sm 500">
                                <div>User</div>
                            </div>
                            <div className="w-full flex justify-center z-20 text-gray-700 text-sm 500">
                                <div>Administrator</div>
                            </div>
                            <span
                                className={switcherClass}>
                            </span>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm 500 mb-2">Email</label>
                        <input
                            value={userEmail}
                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded-lg shadow appearance-none focus:outline-none focus:shadow-outline"
                            type="text"
                            id="email"
                            onChange={(event) => setUserEmail(event.target.value)}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm 500 mb-2">Password</label>
                        <div className="mb-2.5 relative w-full container mx-auto">
                            <input
                                value={userPassword}
                                type={isPasswordVisible ? "text" : "password"}
                                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded-lg shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="password"
                                onChange={(event) => setUserPassword(event.target.value)}
                            />
                            <button
                                className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                                onClick={togglePasswordVisibility}
                            >
                                {isPasswordVisible ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                        <label className="block text-gray-400 text-sm 500 mb-2">8+ characters</label>
                    </div>

                    <div>
                        {editableUser ?
                            <Link href='/'>
                                <button className='w-full rounded-lg h-10 bg-sky-500 focus:outline-transparent disabled:opacity-50 disabled:pointer-events-none disabled:opacity-40 disabled:hover:opacity-40 disabled:cursor-not-allowed disabled:shadow-none
                                text-white hover:bg-[#3333D1] focus:border-[#B3B3FD] focus:bg-[#4040F2]'
                                    onClick={handleEditUser}>
                                    Save
                                </button>
                            </Link>
                            :
                            <button
                                className='w-full rounded-lg h-10 bg-sky-500 focus:outline-transparent disabled:opacity-50 disabled:pointer-events-none disabled:opacity-40 disabled:hover:opacity-40 disabled:cursor-not-allowed disabled:shadow-none
                                    text-white hover:bg-[#3333D1] focus:border-[#B3B3FD] focus:bg-[#4040F2]'
                                onClick={handleSaveUser}>
                                Save
                            </button>
                        }
                    </div>
                </form>
            </div>

            <List userList={userList} />
        </div>
    );
};

export default Form;