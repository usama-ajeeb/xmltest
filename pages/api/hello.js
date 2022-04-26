// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const { XMLParser, XMLBuilder } = require('fast-xml-parser')
const fs = require('fs')

export default function handler(req, res) {
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

  res.status(200).json(formatedData)
}

// https://test-bnhcrc.pantheonsite.io/sites/default/files/
