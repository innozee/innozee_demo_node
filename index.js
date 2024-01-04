// npm init -y
// npm install fastify
// npm i sqlite3
// npm i websocket
// npm i ajv

'use strict'
const PORT = process.env.PORT || 3000;
// const HOST = "0.0.0.0"

// Require the framework and instantiate it
const Fastify = require('fastify')()

// Declare a route
Fastify.get('/', function handler (request, reply) {
  reply.type('application/json').code(200)
  reply.send({ hello: 'world' });
  //return { hello: 'world' }
  //reply.send({ hello: 'world' })
})

Fastify.get('/innozee', function handler (request, reply) {
  reply.type('application/json').code(200)
  reply.send({ message: 'hello world - by InnoZee' });
})
// Run the server!
// { port: PORT, host: HOST }
// { port: PORT}
Fastify.listen({ port: PORT}, (err, address) => {

    if(err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at PORT: ${address}`);
});

// use URL => http://localhost:3000/
// use URL => http://localhost:3000/innozee
// use URL => https://awful-dove-housecoat.cyclic.app/
