import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Fragment } from 'react';
import { HiOutlineLogout } from 'react-icons/hi';

import { Button } from '@/components/ui/button';
import useAuthStore from '@/store/authStore';

const UserAction = () => {
  // Router initialization
  const router = useRouter();

  // Hydration Error Fix
  const [name, setName] = React.useState('');
  const username = useAuthStore.useName();
  React.useEffect(() => {
    setName(username);
  }, [name, username]);

  // Logout
  const logout = useAuthStore.useLogout();
  const logOut = () => {
    logout();
    localStorage.removeItem('accessToken');
    router.push('/');
  };

  return (
    <Menu as='div' className='relative inline-block text-left'>
      <Menu.Button className='inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
        {name ? name : 'Loading'}
        <ChevronDownIcon
          className='ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100'
          aria-hidden='true'
        />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='px-1 py-1 '>
            <Menu.Item>
              {({ active }) => (
                <Button
                  onClick={() => {
                    logOut();
                  }}
                  variant='destructive'
                  className={`${
                    active ? 'brightness-75' : ''
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm text-white gap-1`}
                >
                  <HiOutlineLogout className='w-4 h-4' />
                  Logout
                </Button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserAction;
