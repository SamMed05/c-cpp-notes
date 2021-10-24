// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'C/C++ Notes',
  tagline: 'A collection of school notes about coding in C++ and C programming languages.',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  //organizationName: 'facebook', // Usually your GitHub org/user name.
  //projectName: 'docusaurus', // Usually your repo name.

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/facebook/docusaurus/edit/main/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/main/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'C/C++ Notes',
        logo: {
          alt: 'Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'cpp/cpp-intro',
            position: 'left',
            label: 'C++',
          },
		  {
            type: 'doc',
            docId: 'c/c-intro',
            position: 'left',
            label: 'C',
          },
          //{to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/SamMed05',
            label: 'GitHub',
            position: 'right',
          },
		  {
            href: 'https://sammed05.github.io/sm_blog/',
            label: 'Personal blog',
            position: 'right',
          },
		  {
            href: 'https://twitter.com/MedianiSamuel',
            label: 'Twitter',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Languages',
            items: [
              {
                label: 'C++',
                to: '/docs/cpp-intro',
              },
			  {
                label: 'C',
                to: '/docs/c-intro',
              },
            ],
          },
          {
            title: 'Links',
            items: [
              // {
                // label: 'Blog',
                // to: '/blog',
              // },
              {
                label: 'GitHub',
                href: 'https://github.com/SamMed05',
              },
			  {
                label: 'Personal blog',
                href: 'https://sammed05.github.io/sm_blog/',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/MedianiSamuel',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Samuel Mediani. Built with Docusaurus 🦖.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
