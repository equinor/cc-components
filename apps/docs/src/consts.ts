export const SITE = {
  title: 'CC components docs',
  description: 'Documentation for CC components',
  defaultLanguage: 'en-us',
} as const;

export const OPEN_GRAPH = {
  image: {
    src: 'https://github.com/withastro/astro/blob/main/assets/social/banner-minimal.png?raw=true',
    alt:
      'astro logo on a starry expanse of space,' +
      ' with a purple saturn-like planet floating in the right foreground',
  },
  twitter: 'astrodotbuild',
};

export const COMMUNITY_INVITE_URL = `https://astro.build/chat`;

// See "Algolia" section of the README for more information.
export const ALGOLIA = {
  indexName: 'XXXXXXXXXX',
  appId: 'XXXXXXXXXX',
  apiKey: 'XXXXXXXXXX',
};

export type Sidebar = Record<string, { text: string; link: string }[]>;
export const SIDEBAR: Sidebar = {
  Overview: [
    {
      text: 'Introduction',
      link: 'introduction',
    },
    {
      text: 'Project structure',
      link: 'overview/structure',
    },
  ],
  Development: [
    {
      text: 'Getting started',
      link: 'development/getting-started',
    },
    {
      text: 'Creating an app',
      link: 'development/creating-an-app',
    },
  ],
  Applications: [
    {
      text: 'Handover',
      link: 'applications/handover',
    },
    {
      text: 'Workorder',
      link: 'applications/workorder',
    },
    {
      text: 'Mechanical completion',
      link: 'applications/mechanical-completion',
    },
    {
      text: 'SWCR',
      link: 'applications/swcr',
    },
    {
      text: 'Loop',
      link: 'applications/loop',
    },
  ],
};
