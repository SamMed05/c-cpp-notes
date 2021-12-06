import Head from '@docusaurus/Head';


function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout>
      <Head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-55WH6NEDF7"></script>
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