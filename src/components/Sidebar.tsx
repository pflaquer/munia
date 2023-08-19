'use client';
import {
  GridFeedCards,
  LogOutCircle,
  Logo,
  Mail,
  NotificationBell,
  Profile,
  Search,
} from '@/svg_components';
import SidebarMenuItem from './SidebarMenuItem';
import { useSessionUserData } from '@/hooks/useSessionUserData';
import Link from 'next/link';
import { LogoText } from './LogoText';
import { useNotificationsCountQuery } from '@/hooks/queries/useNotificationsCountQuery';

export default function Sidebar() {
  const [user] = useSessionUserData();
  const username = user?.username || 'user-not-found';
  const { data: notificationCount } = useNotificationsCountQuery();

  return (
    <div className="sticky top-0 hidden h-screen flex-col items-start p-4 md:flex">
      <Link href="/">
        <div className="mb-4 flex items-center gap-2">
          <Logo className="h-12 w-12" />

          <LogoText className="text-3xl" />
        </div>
      </Link>
      {[
        {
          title: 'Feed',
          Icon: GridFeedCards,
          route: '/',
        },
        {
          title: 'Discover',
          Icon: Search,
          route: '/discover',
        },
        { title: 'Messages', Icon: Mail, route: '/messages' },
        {
          title: 'Notifications',
          Icon: NotificationBell,
          route: '/notifications',
          badge: notificationCount,
        },
        { title: 'My Profile', Icon: Profile, route: `/${username}` },
        {
          title: 'Logout',
          className: 'mt-auto',
          Icon: LogOutCircle,
          route: '/api/auth/signout',
        },
      ].map((item, i) => (
        <SidebarMenuItem key={i} {...item}>
          {item.title}
        </SidebarMenuItem>
      ))}
    </div>
  );
}
