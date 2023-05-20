import 'dotenv/config'

import fastify from 'fastify'
import  multipart from '@fastify/multipart'
import  Static from '@fastify/static'
import { memoriesRoutes } from './routes/memories'
import cors from '@fastify/cors'
import { authRoutes } from './routes/auth'
import jwt from '@fastify/jwt'
import { uploadRoutes } from './routes/upload'
import { resolve } from 'node:path'

const app = fastify()

app.register(multipart)
app.register(Static, {
  root: resolve(__dirname, '../uploads'),
  prefix:'/uploads',
})
app.register(memoriesRoutes)
app.register(authRoutes)
app.register(uploadRoutes)

app.register(cors, {
  origin: true,
})

app.register(jwt, {
  secret: 'spacetime'
})

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('🚀 HTTP server runnin on http://localhost:3333')
  })
