import Fastify from 'fastify';
import routes from '../routes/test.route.js';

const fastify = Fastify({
  logger: true
})

fastify.register(routes);

// Run the server!
fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})