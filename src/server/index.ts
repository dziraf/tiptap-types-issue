import express from 'express'
import path from 'path'
import * as url from 'url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const app = express()

app.use(express.static('public'))
app.get('*', (_req, res) => res.sendFile(path.join(__dirname, '/../index.html')))

app.listen(8080, () => {
  console.log('app started at port 8080')
})
