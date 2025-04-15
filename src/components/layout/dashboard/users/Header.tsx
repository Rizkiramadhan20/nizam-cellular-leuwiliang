import React from 'react';

import { useAuth } from '@/utils/context/AuthContext';

import { usePathname } from 'next/navigation';

import Link from 'next/link';

import { FiLogOut } from 'react-icons/fi';

import Image from 'next/image';

import { menuItems } from '@/components/layout/dashboard/users/data/Header';

import { FaRegUser } from "react-icons/fa";

interface HeaderProps {
    onSidebarToggle: (isOpen: boolean) => void;
    isCollapsed?: boolean;
}

export default function UserHeader({ onSidebarToggle, isCollapsed = false }: HeaderProps) {
    const { user, logout } = useAuth();
    const pathname = usePathname();
    const [activeDropdown, setActiveDropdown] = React.useState<number | null>(null);

    const handleLinkClick = () => {
        // Close sidebar on mobile when link is clicked
        onSidebarToggle(false);
        // Also close any open dropdowns
        setActiveDropdown(null);
    };

    const isLinkActive = (href: string) => {
        // Remove trailing slashes for comparison
        const normalizedPathname = pathname?.replace(/\/$/, '') ?? '';
        const normalizedHref = href.replace(/\/$/, '');

        // For home page
        if (href === '/') {
            return pathname === href;
        }

        // For dashboard page
        if (normalizedHref === '/dashboard/user') {
            return normalizedPathname === normalizedHref;
        }

        // For menu items with subItems, only highlight parent if exact match
        const menuItem = menuItems.find(item => item.href === href);
        if (menuItem?.subItems) {
            return normalizedPathname === normalizedHref;
        }

        // For submenu items or regular menu items without subItems
        return normalizedPathname.startsWith(normalizedHref);
    };

    const toggleDropdown = (index: number) => {
        setActiveDropdown(activeDropdown === index ? null : index);
    };

    return (
        <header className="flex flex-col h-full w-full bg-[var(--header-bg)] backdrop-blur-md border-r border-[var(--header-border)] shadow-sm custom-scrollbar z-30 transition-all duration-300">
            {/* Close Button - Mobile Only */}
            <div className="absolute top-0 right-0 flex justify-end p-4 lg:hidden">
                <button
                    onClick={() => onSidebarToggle(false)}
                    className="p-2 hover:bg-[var(--hover-bg)] rounded-lg transition-colors duration-200"
                >
                    <svg
                        className="w-5 h-5 text-[var(--text-secondary)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>

            {/* Profile Section */}
            <div className={`p-4 mt-2 mb-2 border-b border-[var(--header-border)] ${isCollapsed ? 'flex justify-center' : ''}`}>
                <div className={`flex items-center gap-3 ${isCollapsed ? 'flex-col' : ''}`}>
                    {
                        user?.photoURL ? (
                            <div className={`relative ${isCollapsed ? 'w-10 h-10' : 'w-12 h-12'} group`}>
                                <Image
                                    src={user?.photoURL}
                                    alt="Profile"
                                    fill
                                    className="rounded-full object-cover ring-2 ring-white shadow-sm transition-transform duration-200 group-hover:scale-105"
                                />
                            </div>
                        ) : (
                            <div className={`relative ${isCollapsed ? 'w-10 h-10' : 'w-12 h-12'} group`}>
                                <div className="rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center w-full h-full transition-transform duration-200 group-hover:scale-105">
                                    <FaRegUser className="text-slate-500 text-2xl font-bold" />
                                </div>
                            </div>
                        )
                    }
                    {!isCollapsed && (
                        <div className="flex flex-col">
                            <p className="text-[15px] font-semibold truncate max-w-[150px]">
                                {user?.displayName}
                            </p>
                            <p className="text-[12px]">@{user?.role}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-2 overflow-y-auto custom-scrollbar">
                <ul className="space-y-4">
                    {menuItems.map((item, index) => (
                        <li key={index} className={`${isCollapsed ? 'flex justify-center' : ''}`}>
                            {!item.subItems ? (
                                <Link
                                    href={item.href}
                                    onClick={handleLinkClick}
                                    className={`group flex items-center gap-3 py-2.5 px-3 rounded-lg transition-all duration-200 ${isLinkActive(item.href)
                                        ? 'bg-primary text-white shadow-sm shadow-primary/25'
                                        : 'hover:bg-slate-100 hover:text-slate-900'
                                        } ${isCollapsed ? 'w-12 justify-center' : 'w-full'}`}
                                    title={isCollapsed ? item.label : undefined}
                                >
                                    <div className={`relative flex items-center justify-center ${isCollapsed ? 'w-6 h-6' : ''}`}>
                                        <item.icon className={`w-[22px] h-[22px] transition-transform duration-200 group-hover:scale-110 ${isCollapsed && isLinkActive(item.href) ? 'text-white' : ''
                                            }`} />
                                        {isCollapsed && !isLinkActive(item.href) && (
                                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                                                <item.icon className="w-[22px] h-[22px] text-slate-900" />
                                            </div>
                                        )}
                                    </div>
                                    {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                                </Link>
                            ) : (
                                <>
                                    <button
                                        onClick={() => toggleDropdown(index)}
                                        className={`group flex items-center gap-3 py-2.5 px-3 rounded-lg transition-all duration-200 ${item.subItems?.some(subItem => isLinkActive(subItem.href))
                                            ? 'bg-primary shadow-sm shadow-primary/25'
                                            : 'hover:bg-slate-100 hover:text-slate-900'
                                            } ${isCollapsed ? 'w-12 justify-center' : 'w-full justify-between'}`}
                                        title={isCollapsed ? item.label : undefined}
                                    >
                                        <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
                                            <div className={`relative flex items-center justify-center ${isCollapsed ? 'w-6 h-6' : ''}`}>
                                                <item.icon className={`w-[22px] h-[22px] transition-transform duration-200 group-hover:scale-110  ${isCollapsed && item.subItems?.some(subItem => isLinkActive(subItem.href)) ? 'text-white' : ''
                                                    }`} />
                                                {isCollapsed && !item.subItems?.some(subItem => isLinkActive(subItem.href)) && (
                                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                                                        <item.icon className="w-[22px] h-[22px] text-slate-900" />
                                                    </div>
                                                )}
                                            </div>
                                            {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                                        </div>
                                        {!isCollapsed && (
                                            <svg
                                                className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === index ? 'rotate-180' : ''} ${item.subItems?.some(subItem => isLinkActive(subItem.href)) ? 'text-white' : ''}`}
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        )}
                                    </button>

                                    {!isCollapsed && (
                                        <div className={`overflow-hidden transition-all duration-200 ${activeDropdown === index ? 'max-h-96' : 'max-h-0'
                                            }`}>
                                            <ul className="mt-3 space-y-3 px-3.5">
                                                {item.subItems.map((subItem, subIndex) => (
                                                    <li key={subIndex}>
                                                        <Link
                                                            href={subItem.href}
                                                            onClick={handleLinkClick}
                                                            className={`block py-2 px-4 text-sm rounded-md transition-all duration-200 ${isLinkActive(subItem.href)
                                                                ? 'text-primary font-medium bg-primary/10'
                                                                : 'text-slate-200 hover:text-slate-900 hover:bg-slate-100'
                                                                }`}
                                                        >
                                                            {subItem.label}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </nav >

            {/* Premium Update Section */}
            <div className="px-3 mb-2" >
                <div className={`relative overflow-hidden rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--primary-hover)] shadow-lg ${isCollapsed ? 'h-[52px] flex items-center justify-center' : 'h-[140px]'
                    }`}>
                    {!isCollapsed && (
                        <>
                            <div className="relative z-10 p-4">
                                <h3 className="text-white font-semibold text-[15px]">Upgrade to Premium</h3>
                                <p className="text-white/80 text-xs mt-1.5">Get access to all features!</p>
                                <button className="mt-4 bg-white text-primary text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/90 transition-all duration-200 hover:shadow-md">
                                    Upgrade Now
                                </button>
                            </div>
                            <div className="absolute -right-8 -bottom-8 opacity-10">
                                <svg className="w-32 h-32" viewBox="0 0 24 24" fill="none">
                                    <path d="M21 7V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V7C3 4 4.5 2 8 2H16C19.5 2 21 4 21 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M14.5 4.5V6.5C14.5 7.6 15.4 8.5 16.5 8.5H18.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M8 13H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M8 17H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </>
                    )}
                    {isCollapsed && (
                        <div className="relative group">
                            <svg className="w-6 h-6 text-white transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24" fill="none">
                                <path d="M21 7V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V7C3 4 4.5 2 8 2H16C19.5 2 21 4 21 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M14.5 4.5V6.5C14.5 7.6 15.4 8.5 16.5 8.5H18.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8 13H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8 17H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div className="absolute left-full ml-2 -translate-y-1/2 top-1/2 hidden group-hover:block z-50">
                                <div className="bg-slate-800 text-white text-xs py-1.5 px-3 rounded-lg whitespace-nowrap shadow-lg">
                                    Upgrade to Premium
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div >

            {/* Logout Button */}
            <div className="p-3 border-t border-[var(--header-border)]" >
                <div className={`${isCollapsed ? 'flex justify-center' : ''}`}>
                    <button
                        onClick={() => {
                            logout();
                            handleLinkClick();
                        }}
                        className={`group flex items-center gap-2 py-2.5 px-3 rounded-lg text-red-600 hover:bg-red-50 active:bg-red-100 transition-all duration-200 ${isCollapsed ? 'w-12 justify-center' : 'w-full'
                            }`}
                        title={isCollapsed ? "Logout" : undefined}
                    >
                        <div className={`relative flex items-center justify-center ${isCollapsed ? 'w-6 h-6' : ''}`}>
                            <FiLogOut className="w-[22px] h-[22px] transition-transform duration-200 group-hover:scale-110" />
                            {isCollapsed && (
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                                    <FiLogOut className="w-[22px] h-[22px] text-red-700" />
                                </div>
                            )}
                        </div>
                        {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
                    </button>
                </div>
            </div >
        </header >
    );
}