import React from 'react';
import { Settings, LogOut, User, Shield } from 'lucide-react';

const logoutHandler = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/login";
}

const ProfileDropdown = () => {
    const menuItems = [
        // {
        //     icon: User,
        //     label: 'My Profile',
        //     onClick: () => console.log('Profile clicked'),
        // },
        // {
        //     icon: Settings,
        //     label: 'Settings',
        //     onClick: () => console.log('Settings clicked'),
        // },
        // {
        //     icon: Shield,
        //     label: 'Privacy',
        //     onClick: () => console.log('Privacy clicked'),
        // },
        {
            icon: LogOut,
            label: 'Logout',
            onClick: () => logoutHandler(),
            className: 'text-red-600 hover:text-red-700 hover:bg-red-50',
        },
    ];

    return (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
            {menuItems.map((item, index) => (
                <button
                    key={item.label}
                    onClick={item.onClick}
                    className={`w-full px-4 py-2 text-sm text-left flex items-center space-x-2 hover:bg-gray-50 ${item.className || 'text-gray-700 hover:text-gray-900 hover:font-bold'
                        }`
                    }
                >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                </button>
            ))}
        </div>
    );
};

export default ProfileDropdown;