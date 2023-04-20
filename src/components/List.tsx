import Jdenticon from 'react-jdenticon';
import User from '../types.ts/User';
import EditLogo from '../icons/Edit.png';
import TrashLogo from '../icons/Trash.png';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface LisProps {
    userList: User[];
}

export default function List({ userList }: LisProps) {
        const [users, setUsers] = useState(userList);

    useEffect(() =>{
        setUsers(userList);
    }, [userList]);

    const handleClick = (event: any, id: any ) => {
            let newUserList;
            let filteredUserList;
            const userListString = localStorage.getItem('userList');
            if (userListString !== null) {
                newUserList = JSON.parse(userListString);
                filteredUserList = newUserList.filter((user: User) => {
                    return user.id !== id;
                });
                setUsers(filteredUserList);
                localStorage.setItem('userList', JSON.stringify(filteredUserList));
        }
    };

    return (
        <div className='flex flex-col p-10'>
            <div className="font-bold text-xl mb-10">Customers</div>
            <div className='flex mb-1'>
                <div className='w-72 mr-6 text-sm 500 text-slate-400'>Name</div>
                <div className='w-72 mr-6 text-base text-slate-400'>Company</div>
                <div className='w-72 mr-6 text-base text-slate-400'>Email</div>
                <div className='w-12 mr-6 text-base text-slate-400'>Admin</div>
                <div className='w-14 mr-8 text-base text-slate-400'>Actions</div>
            </div>
            {users.length ?
                <ul>
                    {users.map(user =>
                        <li key={user.id} className='mb-3 h-8 flex items-center'>
                            <div className='bg-slate-200 w-8 h-8 border-0 rounded-md p-1 mr-2'>
                                <Jdenticon size='24' width='24' value={user.email} />
                            </div>
                            <div className='w-64 mr-4'>
                                {user.firstName}
                            </div>
                            <div className='w-72 mr-6'>
                                {user.company}
                            </div>
                            <div className='w-72 mr-6'>
                                {user.email}
                            </div>
                            <div className='mr-6'>
                                {user.status === 'admin' ?
                                    <div className='w-12 h-6 bg-sky-500 border-0 rounded-md' />
                                    :
                                    <div className='w-12 h-6 bg-gray-300 border-0 rounded-md' />
                                }
                            </div>
                            <div className='flex justify-between w-16'>
                                <Link href={`/edit/${user.id}`}>
                                    <img className='cursor-pointer' src={EditLogo.src} alt="edit"/>
                                </Link>
                                <img className='cursor-pointer' src={TrashLogo.src} alt="trash" onClick={event => handleClick(event, user.id)}/>
                            </div>
                        </li>
                    )}
                </ul>
                :
                ''
            }
        </div>
    )
};

// export default List;