import 'dotenv/config'
import express from 'express'
import routes from './routes'

const app = express()

app.use(express.json())

app.use(routes)

app.listen(process.env.PORT, () => {
	console.log('Server started.' + process.env.PORT)
})

// Expressão regular para validação de email
// /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/