import React, { useCallback } from 'react';
import { IconType } from "react-icons"
import { BsDot } from 'react-icons/bs';

import { useRouter } from 'next/router';

import useLoginModal from '@/hooks/useLoginModal';
import useCurrentUser from '@/hooks/useCurrentUser';

interface SidebarItemProps {
    label: string;
    href?: string;
    icon: IconType;
    onClick?: () => void;
    auth?: boolean;
    alert?: boolean;
}
const SidebarItem: React.FC<SidebarItemProps> = ({
    label,
    href,
    icon: Icon,
    onClick,
    auth,
    alert
}) => {

    const router = useRouter();
    const loginModal = useLoginModal();

    const { data: currentUser } = useCurrentUser();

    const handleClick = useCallback(() => {
        if (onClick) {
            return onClick();
        }

        if (auth && !currentUser) {
            loginModal.onOpen();
        } else if (href) {
            router.push(href);
        }
    }, [router, href, auth, loginModal, onClick, currentUser]);

    return (
        <div className="flex flex-row items-center">
            <div className="relative 
            rounded-full
            h-14
            w-14
            flex
            items-center
            justify-center
            p-4
            hover:bg-slate-300
            hover:bg-opacity-10
            cursor-pointer
            lg:hidden
            ">

                <Icon size={28} color={`white`} />
            </div>
            <div className="
            relative
            hidden
            lg:flex
            items-center
            gap-4
            p-4
            rounded-full
            hover:bg-slate-300
            hover:bg-opacity-10
            cursor-pointer
            ">
                <Icon size={24} color={`white`} />
                <p className="block text-white text-xl">
                    {label}
                </p>
            </div>
        </div>
    )
}

export default SidebarItem