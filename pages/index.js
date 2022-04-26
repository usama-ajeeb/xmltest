import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
const { XMLParser, XMLBuilder } = require('fast-xml-parser')
const fs = require('fs')

export default function Home({ data }) {
  console.log(data)
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href='https://nextjs.org'>Xml Static Site Creator</a>
        </h1>

        <p className={styles.description}>
          List of Pages <code className={styles.code}></code>
        </p>

        <div className={styles.grid}>
          {/* <a href='https://nextjs.org/docs' className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a> */}

          {data.slice(0, 10).map((i) => (
            <div key={i.title} className={styles.card}>
              <Link href={i.slug}>
                <div>
                  <h1>{i.title}</h1>
                  <p>{i.date}</p>
                  <Image width={500} height={150} src={i.img} />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export async function getStaticProps(context) {
  // const results = await fetch(`http://localhost:3000//api/hello`)

  // const result = await results.json()
  const parser = new XMLParser()
  var json = fs.readFileSync('data/resources-haznote.xml', 'utf8')
  const data = parser.parse(json)

  const formatedData = data.dpnodes.dpnode.map((i) => {
    return {
      title: i.Title,
      date: i.Date.span,
      body: i.Body,
      download: i.Download,
      img: `https://test-bnhcrc.pantheonsite.io/sites/default/files/${i[
        'Key-Image'
      ].span.a.slice(9, i['Key-Image'].span.a.length)}`,
      slug: i.Title.toLowerCase().replace(/ /g, '-').replace(/[:]/g, ''),
    }
  })

  return {
    props: {
      data: formatedData,
    },
  }
}
