// get fastify and the enhance ssr renderer
import Fastify from 'fastify'
import enhance from '@enhance/ssr'

// the renderer is dumb; so we have to pass it all the elements
// the fuller enhance.dev package takes care of this
import HelloWorld from './hello-world.mjs'

const html = enhance({
  elements: {
    'hello-world': HelloWorld
  }
})

// from here its just a standard fastify app
const fastify = Fastify({
  logger: true
})

fastify.get('/', function (request, reply) {
  // take a look at the generated markup to see this element expanded on the backend
  reply.type('text/html')
  reply.send(html`<hello-world greeting="Well hi!"></hello-world>`)
})

// Run the server!
fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  console.log(`Server is now listening on ${address}`)
})
