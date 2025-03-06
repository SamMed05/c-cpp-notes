// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const math = require('remark-math');
const katex = require('rehype-katex');

const config = {
  title: 'C/C++ Notes',
  tagline: 'A collection of notes about coding in C++ and C programming languages.',
  url: 'https://c-cpp-notes.vercel.app',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  //organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'c-cpp-notes', // Usually your repo name.
  
  // https://docusaurus.io/docs/markdown-features/math-equations
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity: 'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        // GOOGLE ANALYTICS
        // https://stackoverflow.com/questions/61254950/docusaurus-v2-activating-google-analytics-hides-navbar-and-footer
        // https://github.com/facebook/docusaurus/issues/3632
        // https://github.com/facebook/docusaurus/pull/5832
        //plugins: ['@docusaurus/plugin-google-analytics'],
        googleAnalytics: {
          trackingID: 'G-1VRGG301KZ',
          // Optional fields.
          anonymizeIP: true, // Should IPs be anonymized?
        },
        gtag: {
          trackingID: 'G-1VRGG301KZ',
          anonymizeIP: true,
        },

        docs: {
          path: 'docs',
          breadcrumbs: true,
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/SamMed05/c-cpp-notes/',
		      showLastUpdateTime: true,
          showLastUpdateAuthor: false,

          remarkPlugins: [math],
		      rehypePlugins: [katex],
        },

        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: 'https://github.com/SamMed05/c-cpp-notes',
        },

        theme: {
          customCss: require.resolve('./src/css/custom.css'),
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
    		  'This website is under construction. 🚧 Please be patient more content.',
    		backgroundColor: '#fafbfc',
    		textColor: '#091E42',
    		isCloseable: true,
  	  },
  	  
  	  colorMode: {
  	    defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
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
                href: 'https://cpp.sh/',
                label: 'C++ Shell',
              },
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
                href: 'https://www.learn-cpp.org/',
                label: 'learn-cpp.org',
              },
              {
                href: 'https://www.edx.org/learn/computer-science/harvard-university-cs50-s-introduction-to-computer-science',
                label: 'HarvardX: CS50\'s Introduction to Computer Science',
              },
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
                href: 'https://en.cppreference.com/w/',
                label: 'cppreference.com',
              },
              {
                href: 'https://www.tutorialspoint.com/cplusplus/',
                label: 'Tutorials Point - C++',
              },
              {
                href: 'https://www.programiz.com/cpp-programming',
                label: 'Programiz - C++',
              },
              {
                href: 'https://www.w3schools.com/cpp/default.asp',
                label: 'W3Schools - C++',
              },
              {
                href: 'https://www.ibm.com/docs/en/i/7.2?topic=c-ile-cc-language-reference',
                label: 'IBM - ILE C/C++ Language Reference',
              },
              {
                href: 'https://computer.howstuffworks.com/c.htm',
                label: 'HowStuffWorks - The Basics of C Programming',
              },
              {
                href: 'https://youtu.be/e9Eds2Rc_x8?list=PLhQjrBD2T381L3iZyDTxRwOBuUt6m1FnW',
                label: 'CS50 2019 - C',
              },
              {
                href: 'https://www.stroustrup.com/C++.html',
                label: 'stroustrup.com - C++',
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
        
        magicComments: [
        // Remember to extend the default highlight class name as well!
        {
          className: 'theme-code-block-highlighted-line',
          line: 'highlight-next-line',
          block: {start: 'highlight-start', end: 'highlight-end'},
        },
        {
          className: 'code-block-error-line',
          line: 'This will error',
        },
        {
          className: 'code-block-correct-line',
          line: 'This is correct',
        },
      ],
      },
	  
	  tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 5,
      },
    }),

};

module.exports = config;
