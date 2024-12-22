import React from 'react';
import { LogOut, BookText, LogIn, UserPlus, House, User } from 'lucide-react';

const logoutHandler = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/login";
}

const blogsRedirecter = () => {
    window.location.reload();
}

const ProfileDropdown = ({ authenticated, username }) => {
    console.log(authenticated, username);
    const menuItems = [
        {
            icon: House,
            label: 'Home',
            onClick: () => window.location.href = "/",
            availableTo: !authenticated,
        },
        {
            icon: House,
            label: 'Dashboard',
            onClick: () => window.location.href = "/dashboard",
            availableTo: authenticated,
        },
        {
            icon: LogIn,
            label: 'Login',
            onClick: () => window.location.href = "/login",
            availableTo: !authenticated,
        },
        {
            icon: UserPlus,
            label: 'Register',
            onClick: () => window.location.href = "/signup",
            availableTo: !authenticated,
        },
        {
            icon: BookText,
            label: 'Blogs',
            onClick: () => blogsRedirecter(),
            availableTo: true,
        },
        {
            icon: LogOut,
            label: 'Logout',
            onClick: () => logoutHandler(),
            className: 'text-red-600 hover:text-red-700 hover:bg-red-100',
            availableTo: authenticated,
        },
    ];

    return (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 py-1 px-1 z-50">
            {
                username && (
                    <div className='w-full px-4 py-4 text-xl font-semibold text-center'>
                        {username}
                    </div>
                )
            }
            {menuItems.map((item, index) => (
                item.availableTo && (
                    <button
                        key={index}
                        onClick={item.onClick}
                        className={`w-full rounded-md px-4 py-2 text-md text-left flex items-center gap-2 hover:bg-gray-200 ${item.className || 'text-gray-700 hover:text-gray-900'
                            }`
                        }
                    >
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                    </button>
                )
            ))}
        </div>
    );
};

export default ProfileDropdown;