// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const math = require('remark-math');
const katex = require('rehype-katex');

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
  
  // https://docusaurus.io/docs/markdown-features/math-equations
  // https://docs.theochu.com/docusaurus/latex/
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X',
      crossorigin: 'anonymous',
    },
  ],

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/SamMed05/c-cpp-notes/',
		  showLastUpdateTime: true,
          //showLastUpdateAuthor: true,
          remarkPlugins: [math],
		  rehypePlugins: [katex],
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

        // https://stackoverflow.com/questions/61254950/docusaurus-v2-activating-google-analytics-hides-navbar-and-footer
        // https://github.com/facebook/docusaurus/issues/3632
        // https://github.com/facebook/docusaurus/pull/5832
        // GOOGLE ANALYTICS
        //plugins: ['@docusaurus/plugin-google-analytics'],

        googleAnalytics: {
          trackingID: 'G-1VRGG301KZ',
          // Optional fields.
          anonymizeIP: true, // Should IPs be anonymized?
        },
      }),
    ],
  ],

  // https://docusaurus.io/docs/api/themes/configuration
  themeConfig: 
  ({
		//sidebarCollapsible: false,
		image: "img/website-img.png",
		
	  announcementBar: {
		id: 'support_us',
		content:
		  'This website is under construction. 🚧 Please be patient for more advanced topics.',
		backgroundColor: '#fafbfc',
		textColor: '#091E42',
		isCloseable: true,
	  },
	  
	  colorMode: {
		defaultMode: 'light',
		/* colorMode.switchConfig is deprecated
        switchConfig: {
		  darkIcon: '🌙',
		  darkIconStyle: {
		    marginLeft: '2px',
		  },
		  lightIcon: '💡',
		  lightIconStyle: {
		    marginLeft: '1px',
		  },
		}*/
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
              // ... more items
            ],
          },

          {
            label: 'Other guides',
            position: 'right',
            items: [
              {
                href: 'https://www.learncpp.com/',
                label: 'LearnCpp.com',
              },
              {
                href: 'https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-096-introduction-to-c-january-iap-2011/lecture-notes/',
                label: 'Mit Lecture Notes',
              },
              {
                href: 'https://www.geeksforgeeks.org/c-plus-plus/',
                label: 'GeeksforGeeks - C++',
              },
              {
                href: 'https://www.w3schools.com/cpp/default.asp',
                label: 'W3Schools - C++',
              },
              {
                href: 'https://www.tutorialspoint.com/cplusplus/',
                label: 'Tutorials Point - C++',
              },
              {
                href: 'https://www.programiz.com/cpp-programming',
                label: 'Programiz - C++',
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
	
};

module.exports = config;
