// System constants
const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')
const config = require ('./config')

// Defining the resolvers
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Location = require('./resolvers/Location')
const Event = require('./resolvers/Event')
const Organization = require('./resolvers/Organization')

const resolvers = {
  Query,
  Mutation,
  Location,
  Event,
  Organization
}

// Middleware configuration
//   Async addition of lat/lng to locations after initial save
const geometryUpdaterMiddleware = {
  Mutation: {
    createLocation: require('./middleware/Location').updateGeometry,
    updateLocation: require('./middleware/Location').updateGeometry,
  }
}
const middlewares = [geometryUpdaterMiddleware]

// Server start
const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  middlewares,
  context: request => {
    return {
      ...request,
      prisma,
      server
    }
  },
})
server.start(() => console.log(`Server is running on http://localhost:${config.options.port}`))
