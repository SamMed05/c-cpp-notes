import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

import Head from '@docusaurus/Head';


function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout>
      <Head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
			<script>
			  window.dataLayer = window.dataLayer || [];
			  function gtag(){window.dataLayer.push(arguments);}
			  gtag('js', new Date());

			  gtag('config', 'G-55WH6NEDF7');
			</script>
      </Head>
    </Layout>
  );
}

const FeatureList = [
  {
    title: 'Simple and concise',
    Svg: require('../../static/img/simple-and-concise.svg').default,
    description: (
      <>
        These notes aim to provide a simple and easily readable 
		guide to C and C++, to learn or revise these two languages 
		quickly and without excessive in-depth concepts, as well as 
		many code examples for algorithms, techniques, formulas, tips and tricks.
      </>
    ),
  },
  {
    title: 'Reliable',
    Svg: require('../../static/img/reliable.svg').default,
    description: (
      <>
        The informations you'll find here were explained during the third year 
		of the upper secondary school I'm attending in Italy by experienced ICT professors,
		but I also added external info, curiosities and interesting insights,
		and everything is double-checked to provide only correct explanations.
      </>
    ),
  },
  {
    title: 'Many code examples and exercises',
    Svg: require('../../static/img/exercises-and-examples.svg').default,
    description: (
      <>
        To really understand the concept in practice, every argument is 
		followed by one or more code examples, and also many exercises 
		that challenge you, test your mind and check that the problem has 
		been definitively understood.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
