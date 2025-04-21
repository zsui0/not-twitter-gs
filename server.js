import express from 'express'
import { getPosts, createPost } from './database.js'
import favicon from 'serve-favicon'

const app = express()
const port = 3000

app.use(express.static('public'))
app.use(favicon('public/favicon.ico'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.post('/posts', async (req, res) => { // Add post into database
  const { name, title, content } = req.body
  const post = await createPost(name, title, content)
  res.send(post)
})

app.get('/posts', async (req, res) => { // Get all post from database 
  const posts = await getPosts()
  res.status(201).send(posts)
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})