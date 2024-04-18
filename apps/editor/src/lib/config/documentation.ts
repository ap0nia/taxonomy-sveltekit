export type DocsConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
}

export type MainNavItem = NavItem

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      items: SidebarNavItem[]
    }
)

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: 'Documentation',
      href: '/docs',
    },
    {
      title: 'Guides',
      href: '/guides',
    },
  ],
  sidebarNav: [
    {
      title: 'Getting Started',
      items: [
        {
          title: 'Introduction',
          href: '/documentation/index',
        },
      ],
    },
    {
      title: 'Documentation',
      items: [
        {
          title: 'Introduction',
          href: '/documentation/introduction',
        },
        {
          title: 'Contentlayer',
          href: '/documentation/in-progress',
          disabled: true,
        },
        {
          title: 'Components',
          href: '/documentation/components',
        },
        {
          title: 'Code Blocks',
          href: '/documentation/code-blocks',
        },
        {
          title: 'Style Guide',
          href: '/documentation/style-guide',
        },
        {
          title: 'Search',
          href: '/documentation/in-progress',
          disabled: true,
        },
      ],
    },
    {
      title: 'Blog',
      items: [
        {
          title: 'Introduction',
          href: '/documentation/in-progress',
          disabled: true,
        },
        {
          title: 'Build your own',
          href: '/documentation/in-progress',
          disabled: true,
        },
        {
          title: 'Writing Posts',
          href: '/documentation/in-progress',
          disabled: true,
        },
      ],
    },
    {
      title: 'Dashboard',
      items: [
        {
          title: 'Introduction',
          href: '/documentation/in-progress',
          disabled: true,
        },
        {
          title: 'Layouts',
          href: '/documentation/in-progress',
          disabled: true,
        },
        {
          title: 'Server Components',
          href: '/documentation/in-progress',
          disabled: true,
        },
        {
          title: 'Authentication',
          href: '/documentation/in-progress',
          disabled: true,
        },
        {
          title: 'Database with Prisma',
          href: '/documentation/in-progress',
          disabled: true,
        },
        {
          title: 'API Routes',
          href: '/documentation/in-progress',
          disabled: true,
        },
      ],
    },
    {
      title: 'Marketing Site',
      items: [
        {
          title: 'Introduction',
          href: '/documentation/in-progress',
          disabled: true,
        },
        {
          title: 'File Structure',
          href: '/documentation/in-progress',
          disabled: true,
        },
        {
          title: 'Tailwind CSS',
          href: '/documentation/in-progress',
          disabled: true,
        },
        {
          title: 'Typography',
          href: '/documentation/in-progress',
          disabled: true,
        },
      ],
    },
  ],
}
