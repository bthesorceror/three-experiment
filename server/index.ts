import * as express from 'express'

let app: express.Application = express()
let port: number = parseInt(process.env.PORT || '4000')

app.set('view engine', 'pug')
app.set('views', 'views')

app.use('/public', express.static('public'))

app.get('/', (req: express.Request, res: express.Response) => {
  res.render('index')
})

app.listen(port, () => {
  console.info(`Now listening on port ${port}`)
})
