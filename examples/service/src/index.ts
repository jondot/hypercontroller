import express from 'express'
import { Server, printMountpoints, ExpressAdapter } from 'hypercontroller'
import bodyParser from 'body-parser'
import HomeController from './controllers/home'
import AccountController from './controllers/account'

const server = new Server(new ExpressAdapter(express))
server.app.use(bodyParser.json())
const mountpoints = server.mount([
  new HomeController(),
  new AccountController()
])
printMountpoints(mountpoints)
const port = process.env.PORT || 5160
server.app.listen(port, () => {
  console.log(`listening on ${port}`)
})
