import type { FastifyPluginAsync } from 'fastify';

const routes: FastifyPluginAsync = async (fastify, options) => {
  fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
  })
}

export default routes;