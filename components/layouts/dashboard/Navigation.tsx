'use client';

import { Disclosure } from '@headlessui/react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import { FiChevronDown } from 'react-icons/fi';

import { AdminDashboardNavData } from '@/constant/NavigationData';
import { cn } from '@/lib/utils';
import type { NavigationInterface } from '@/types/navigation';

type NavigationProps = React.ComponentPropsWithoutRef<'nav'>;

export default function Navigation({ className, ...rest }: NavigationProps) {
  return (
    <nav className={cn('px-2 md:px-3', className)} {...rest}>
      <div className='space-y-1.5'>
        {AdminDashboardNavData.map((nav) =>
          nav.children ? (
            <NestedNavigation navigation={nav} key={nav.name} />
          ) : (
            <NavigationLink key={nav.name} navigation={nav} />
          )
        )}
      </div>
    </nav>
  );
}

function NestedNavigation({
  navigation: navChildren,
}: {
  navigation: NavigationInterface;
}) {
  const router = useRouter();
  const pathname = usePathname();

  function checkActive(nav?: NavigationInterface[]): boolean {
    if (!nav) return false;

    return nav.some((n) => {
      if (!n.children) {
        const isActive = n.exactMatch
          ? pathname === n.href
          : pathname.startsWith(n.href);

        return isActive;
      }

      return checkActive(n.children);
    });
  }

  return (
    <Disclosure as='div' defaultOpen={checkActive(navChildren.children)}>
      {({ open }) => (
        <div>
          <Disclosure.Button
            className={clsx(
              'hover:bg-white/10',
              'text-white',
              'group flex w-full items-center rounded-md px-2 py-4 text-sm font-medium',
              'focus-visible:ring-offset-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500'
            )}
          >
            <navChildren.icon
              className={clsx(
                'mr-1.5 flex-shrink-0',
                'text-white text-lg',
                open && 'mt-[1px] self-start'
              )}
              aria-hidden='true'
            />
            <span className={clsx('text-left', !open && 'truncate')}>
              {navChildren.name}
            </span>
            <FiChevronDown
              className={clsx(
                'flex-shrink-0',
                'text-white ml-auto text-lg',
                open && 'mt-[1px] rotate-180 self-start'
              )}
            />
          </Disclosure.Button>
          <Disclosure.Panel className='ml-5 mt-0.5'>
            {navChildren.children?.map((nav) =>
              nav.children ? (
                <NestedNavigation key={nav.name} navigation={nav} />
              ) : (
                <NavigationLink key={nav.name} navigation={nav} />
              )
            )}
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
}

function NavigationLink({
  navigation,
  className,
}: {
  navigation: NavigationInterface;
  className?: string;
}) {
  const pathname = usePathname();

  const isActive = navigation.exactMatch
    ? pathname === navigation.href
    : pathname.startsWith(navigation.href);

  return (
    <Link
      href={navigation.href}
      className={cn(
        isActive ? 'bg-white/20 text-black' : 'hover:bg-white/10',
        'group my-0.5 flex items-center rounded-md px-2 py-[15px] text-sm font-medium',
        className
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      <navigation.icon
        className={clsx('mr-1.5 flex-shrink-0', 'text-white text-lg')}
        aria-hidden='true'
      />
      <span className='truncate text-white'>{navigation.name}</span>
    </Link>
  );
}
