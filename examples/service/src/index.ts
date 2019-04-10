import express from 'express'
import bodyParser from 'body-parser'
import { Server, printMountpoints, ExpressAdapter } from '../../../src'
import HomeController from './controllers/home'
import AccountController from './controllers/account'
import RestController from './controllers/rest'

const server = new Server(new ExpressAdapter(express))
server.app.use(bodyParser.json())
const mountpoints = server.mount([
  new HomeController(),
  new RestController(),
  new AccountController()
])
printMountpoints(mountpoints)
server
  .start()
  .then(({ opts: { port } }) => console.log(`listening on ${port}!`))
