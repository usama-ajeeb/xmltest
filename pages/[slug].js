import React from 'react'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import { saveAs } from 'file-saver'
function PageTemplate({ data }) {
  const saveFile = () => {
    saveAs(data.download, `${data.slug}.pdf`)
  }
  return (
    <div className={styles.page_card}>
      <h1>{data.title}</h1>
      <p className={styles.date}>{data.date}</p>
      <Image
        width={600}
        height={300}
        src={data.img}
        alt={data.title}
        layout='responsive'
      />
      <p>{data.body}</p>
      <button onClick={saveFile}>Download PDF</button>
    </div>
  )
}

export default PageTemplate

export async function getInitialProps({ params }) {
  const slug = params.slug
  const results = await fetch(`${process.env.VERCEL_URL}/api/${slug}`).then(
    (res) => res.json()
  )
  return {
    props: {
      data: results[0] || {},
    },
  }
}

export async function getStaticPaths() {
  const characters = await fetch(`${process.env.VERCEL_URL}/api/hello`).then(
    (res) => res.json()
  )
  return {
    paths: characters.map((character) => {
      const slug = character.slug
      return {
        params: {
          slug,
        },
      }
    }),
    fallback: false,
  }
}
