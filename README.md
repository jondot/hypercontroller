![](media/cover.png)

# Hypercontroller

✅ Structured and declarative project layout with controllers, actions, and middleware
✅ Bring your own framework: use with [Fastify](https://fastify.io) or [Express](https://github.com/expressjs/express)
✅ Automatic routing and mounting
✅ Helpers and best-practices for strong params and async promise-based flows
✅ TypeScript-first
✅ Generators driven (quickly add controllers, actions)

```ts
import { Controller, get, postWithRoute, permitParams } from 'hypercontroller'
const accountParams = permitParams('account', ['name'])

@Controller()
class AccountController {
  @get()
  index(_req, res) {
    res.json({ name: 'Homer Simpson' })
  }

  @postWithRoute('/')
  async update(_req, res) {
    const params = accountParams(req.body)
    const record = await save(params)
    res.json(record)
  }
}
```

## Quick Start

Install:

```
$ yarn add hypercontroller
```

Set up a `server.ts` file using a framework of your choice:

```ts
import express from 'express'
import { Server, printMountpoints, ExpressAdapter } from 'hypercontroller'
import AccountController from './controllers/account'

const server = new Server(new ExpressAdapter(express))
const mountpoints = server.mount([
  new AccountController()
])

printMountpoints(mountpoints)

const port = process.env.PORT || 5160
server.app.listen(port, () => {
  console.log(`listening on ${port}`)
})
```

And run (here using `ts-node`):

```
$ ts-node server.ts
```

## Controllers, Actions and Middleware

Hypercontroller tries to follow the same concepts as [Rails ActionController](https://edgeguides.rubyonrails.org/action_controller_overview.html).

A controller is created with the `@Controller` decorator and a plain class:

```ts
@Controller()
class AccountController {
    ...
```

You add actions (request handlers) to controllers by marking it with an HTTP verb decorator:

```ts
import { Controller, get } from 'hypercontroller'

@Controller()
class AccountController {
  @get()
  index(_req, res) {
    res.json({ name: 'Homer Simpson' })
  }
  ...
```

In terms of routing, hypercontroller will _infer_ the route name from the decorated subject. When `index` or `Index` is used, it will use the index route `/` instead of the literal word `index`.

In any case, hypercontroller lets you specify a route explicitly with the `WithRoute` variant of the `Controller` decorator and each of the HTTP verb decorators.

```ts
@Controller()
class AccountController {
  @get()
  index(_req, res) {
    res.json({ name: 'Homer Simpson' })
  }

  @postWithRoute('/')
  async update(_req, res) {
    const params = accountParams(req.body)
    const record = await save(params)
    res.json(record)
  }
}
```

This controller will form the following routes once mounted:

```
 GET  /accounts
POST  /accounts
```

Any decorator you use accepts middleware as an array of middleware or a single instance:

```ts
@Controller(jwtAuth)
class AccountController {
  @get([cacheWithEtag, compress])
  index(_req, res) {
    res.json({ name: 'Homer Simpson' })
  }
  ...
```

All middleware are the same ones you would originally use with Express or Fastify.

## Server and Mounting

Hypercontroller's `Server` is an entrypoint that takes controllers and understands their structure, and mount actions and middleware cleanly using your chosen web framework.

```ts
const server = new Server(new ExpressAdapter(express))
const mountpoints = server.mount([
  new AccountController()
])

printMountpoints(mountpoints)
```

You can use either `ExpressAdapter` or `FastifyAdapter`, and give each an instance of `express` or `fastify` to work with.

Hypercontroller always lets you work with your web framework directly, and exposes the current app via `server.app`. This way you can use existing legacy code, framework-specific modules, practices, testing harnesses and more -- you take it from here.


## Strong Params

Hypercontroller makes [hyperparams](https://github.com/jondot/hyperparams) accessible for you to use in your actions if you want to implement [strong parameter](https://edgeguides.rubyonrails.org/action_controller_overview.html#strong-parameters) (which you should).

You create a requirement statically:

```ts
const accountParams = permitParams('account', ['name'])
```

And use it in your actions, or anywhere else you want:


```ts
   @get()
   index(req, res){
       const params = accoutnParams(req.body)
       ...
   }
```

Hyperparams is extremely performant, and modular compared to full-fledged validation libraries.


# Contributing

Fork, implement, add tests, pull request, get my everlasting thanks and a respectable place here :).

### Thanks:

To all [Contributors](https://github.com/jondot/hypercontroller/graphs/contributors) - you make this happen, thanks!

# Copyright

Copyright (c) 2019 [@jondot](http://twitter.com/jondot). See [LICENSE](LICENSE.txt) for further details.
