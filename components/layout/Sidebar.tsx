import { BsBellFill, BsHouseFill } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import { BiLogOut } from 'react-icons/bi'
import { signOut } from 'next-auth/react';

import useCurrentUser from '@/hooks/useCurrentUser';

import SidebarLogo from './SidebarLogo'
import SidebarItem from './SidebarItem'
import SidebarTweetButton from './SidebarTweetButton'



interface SidebarProps {

}

const Sidebar = () => {

  const { data: currentUser } = useCurrentUser();

  const items = [
    {
      icon: BsHouseFill,
      label: 'Home',
      href: '/',
    },
    {
      icon: BsBellFill,
      label: 'Notifications',
      href: '/notifications',
      auth: true,
      alert: currentUser?.hasNotification
    },
    {
      icon: FaUser,
      label: 'Profile',
      href: `/users/${currentUser?.id}`,
      auth: true,
    },
  ]

  return (
    <div className='col-span-1 h-full pr-4 md:pr-6'>
      <div className='flex flex-col items-end'>
        <div className='space-y-2 ls:w-[230px]'>
          <SidebarLogo />
          {items.map((item) => (
            <SidebarItem
              key={`navto-${item.href}`}
              href={item.href}
              label={item.label}
              icon={item.icon}
            />
          ))}
          <SidebarItem onClick={() => signOut()} icon={BiLogOut} label={'Logout'} />
          <SidebarTweetButton/>
        </div>
      </div>
    </div>
  )
}

export default Sidebar