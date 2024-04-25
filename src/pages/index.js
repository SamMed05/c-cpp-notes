import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';
import CookieConsent from "react-cookie-consent";
import { SpeedInsights } from "@vercel/speed-insights/react"

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/basics">
            Start reading!
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      //title={`${siteConfig.title}`}
      description="Welcome to C/C++ Notes, a handy collection of information, instructions, tips and tricks about these two programming languages.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
      <CookieConsent>This website uses cookies to enhance the user experience.</CookieConsent>
      <SpeedInsights />
    </Layout>
  );
}
