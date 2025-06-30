const express = require('express')
const app = express()
const port = 3000

const isAuthenticated = (publicId) => {
  return Object.keys(stickersByUsers).includes(publicId);
}

const stickersByUsers = {
  "58f9eb7a-705c-4d02-aecc-df8681c3888d": [],
}

app.get('/login', (req, res) => {
  res.json({ publicId: '58f9eb7a-705c-4d02-aecc-df8681c3888d' })
})

app.get('/stickers', (req, res) => {
  if (isAuthenticated(req.query.publicId)) {
    res.json([])
  } else {
    res.json({ error: 'error '})
  }
})

app.post('/stickers', (req, res) => {
  if (isAuthenticated(req.query.publicId)) {
    // devolver 5 pacotinhos
    res.json([])
  } else {
    res.json({ error: 'error '})
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
