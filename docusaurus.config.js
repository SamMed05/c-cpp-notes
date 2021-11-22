// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'C/C++ Notes',
  tagline: 'A collection of school notes about coding in C++ and C programming languages.',
  url: 'https://c-cpp-notes.vercel.app',
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
          editUrl: 'https://github.com/SamMed05/c-cpp-notes/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
			// 'https://github.com/facebook/docusaurus/edit/main/website/blog/',
			'https://github.com/SamMed05/c-cpp-notes',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  // https://docusaurus.io/docs/api/themes/configuration
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
	  announcementBar: {
		id: 'support_us',
		content:
		  'This website is under construction. 🚧 Please be patient for more advanced topics.',
		backgroundColor: '#fafbfc',
		textColor: '#091E42',
		isCloseable: true,
	  },
      navbar: {
        title: 'C/C++ Notes',
        logo: {
          alt: 'Logo',
          src: 'img/logo.svg',
		  // srcDark: 'img/logo_dark.svg',
          // href: 'https://docusaurus.io/',
          // target: '_self',
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
            label: 'Links',
            position: 'right',
            items: [
              {
                href: 'https://github.com/SamMed05',
				label: 'GitHub',
              },
              {
                href: 'https://sammed05.github.io/sm_blog/',
				label: 'Personal blog',
              },
			  {
				href: 'https://twitter.com/MedianiSamuel',
				label: 'Twitter',
			  },
			  {
				href: 'https://www.learncpp.com/',
				label: 'LearnCpp.com',
			  },
			  {
				href: 'https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-096-introduction-to-c-january-iap-2011/lecture-notes/',
				label: 'Mit Lecture Notes',
			  },
              // ... more items
            ],
          },
		  
		  
          // {
            // href: 'https://github.com/SamMed05',
            // label: 'GitHub',
            // position: 'right',
          // },
		  // {
            // href: 'https://sammed05.github.io/sm_blog/',
            // label: 'Personal blog',
            // position: 'right',
          // },
		  // {
            // href: 'https://twitter.com/MedianiSamuel',
            // label: 'Twitter',
            // position: 'right',
          // },
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
                to: '/docs/cpp/cpp-intro',
              },
			  {
                label: 'C',
                to: '/docs/c/c-intro',
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
		defaultLanguage: 'cpp', // https://prismjs.com/#supported-languages
      },
	  
	  tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 5,
      },
    }),
	
	plugins: ['@docusaurus/plugin-google-analytics'],
	themeConfig: {
		googleAnalytics: {
		trackingID: 'G-55WH6NEDF7',
		// Optional fields.
		anonymizeIP: true, // Should IPs be anonymized?
    },
  },
};

module.exports = config;
