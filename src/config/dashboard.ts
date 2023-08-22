import { DashboardConfig } from '@/types'

export const dashboardConfig: DashboardConfig = {
  adminMainNav: [
    {
      title: 'Dashboard',
      href: '/admin',
    },
    {
      title: 'Users',
      href: '/admin/users',
    },
    {
      title: 'Products',
      href: '/admin/products',
    },
    {
      title: 'Settings',
      href: '/admin/settings',
    },
  ],
  mainNav: [
    {
      title: 'Dashboard',
      href: '/dashboard',
    },
    {
      title: 'Orders',
      href: '/dashboard/orders',
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
    },
  ],
  sidebarNav: [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: 'logo',
    },
    {
      title: 'Orders',
      href: '/dashboard/orders',
      icon: 'post',
    },
    // {
    //   title: 'Products',
    //   href: '/dashboard/products',
    //   icon: 'billing',
    // },
    {
      title: 'Settings',
      href: '/dashboard/settings',
      icon: 'settings',
    },
  ],
  adminSidebarNav: [
    {
      title: 'Dashboard',
      href: '/admin',
      icon: 'logo',
    },
    {
      title: 'Users',
      href: '/admin/users',
      icon: 'user',
    },
    {
      title: 'Products',
      href: '/admin/products',
      icon: 'billing',
    },
    {
      title: 'Settings',
      href: '/admin/settings',
      icon: 'settings',
    },
  ],
}
