import express from 'express'
import bodyParser from 'body-parser'
import expressList from 'express-list-endpoints'
import { Server, ExpressAdapter } from '../../../dist'
import HomeController from './controllers/home'
import AccountController from './controllers/account'
import RestController from './controllers/rest'

const server = new Server(new ExpressAdapter(express))
server.app.use(bodyParser.json())
server.mount([
  new HomeController(),
  new RestController(),
  new AccountController()
])
console.log('', expressList(server.app))
server
  .start()
  .then(({ opts: { port } }) => console.log(`listening on ${port}!`))
