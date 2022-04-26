import React from 'react'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import { saveAs } from 'file-saver'
const { XMLParser, XMLBuilder } = require('fast-xml-parser')
const fs = require('fs')
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

export async function getStaticProps({ params }) {
  const slug = params.slug
  // const results = await fetch(`http://localhost:3000//api/${slug}`).then(
  //   (res) => res.json()
  // )
  // const { slug } = req.query

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

  const dslug = formatedData.filter((i) => i.slug == slug)
  return {
    props: {
      data: dslug[0],
    },
  }
}

export async function getStaticPaths() {
  // const characters = await fetch(`http://localhost:3000//api/hello`).then(
  //   (res) => res.json()
  // )
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
    paths: formatedData.slice(0, 50).map((character) => {
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
