---
to: server.ts
---
import express from 'express'
import { Server, ExpressAdapter } from 'hypercontroller'

const server = new Server(new ExpressAdapter(express))
server.mount([
    // controllers
])
const port = process.env.PORT || 5160
server.app.listen(port, () => {
  console.log(`listening on ${port}`)
})

