---
to: server.ts
---
import express from 'express'
import { Server, printMountpoints, ExpressAdapter } from 'hypercontroller'

const server = new Server(new ExpressAdapter(express))
const mountpoints = server.mount([
    // controllers
])
printMountpoints(mountpoints)
const port = process.env.PORT || 5160
server.app.listen(port, () => {
  console.log(`listening on ${port}`)
})

