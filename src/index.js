// System constants
const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

// Defining the resolvers
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
//const Subscription = require('./resolvers/Subscription')
const Location = require('./resolvers/Location')
const Event = require('./resolvers/Event')
const Organization = require('./resolvers/Organization')

const resolvers = {
  Query,
  Mutation,
//  Subscription,  
  Location,
  Event,
  Organization
}

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: { prisma } 
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
