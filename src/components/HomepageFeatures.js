import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Simple and concise',
    Svg: require('../../static/img/simple-and-concise.svg').default,
    description: (
      <>
        These notes aim to provide a simple and easily readable 
		guide to C and C++, to learn or revise these two languages 
		quickly and without excessive in-depth concepts. 
        This website is highly recommended for beginners, since the 
        learning process is guided starting from the basics of programming.
      </>
    ),
  },
  {
    title: 'Reliable',
    Svg: require('../../static/img/reliable.svg').default,
    description: (
      <>
        The information you'll find here is double-checked to provide only reliable 
        explanations. I've put an extra effort to make sure not to share 
        incorrect, doubtful or incomplete content. For non-beginner developers, techniques
        external info, curiosities and interesting insights are available.
      </>
    ),
  },
  {
    title: 'Many code examples and exercises',
    Svg: require('../../static/img/exercises-and-examples.svg').default,
    description: (
      <>
        To really understand the concept in practice, every argument is 
		followed by one or more code examples for algorithms, techniques, formulas, 
        tips and tricks. After theory, many exercises are also included to 
        challenge you and check that the concept has been definitively understood.
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
