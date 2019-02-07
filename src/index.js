const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

const resolvers = {
  Query: {
    info: () => `This is the API of Staten Island Supermarket Search`,
    
    // Organizations
    organizations: (root, args, context, info) => {
      return context.prisma.organizations()
    },
    organizationsByName: (root, args, context, info) => {
      return context.prisma.organizations({
        where: {
          name_contains: args.name,
        },
      })        
    },
    organizationsByLocation: (root, args, context, info) => {
      return context.prisma.organizations({
        where: {
          locations_some: {
            name_contains: args.name,
          },
        },
      })   
    },
    organizationsByEvent: (root, args, context, info) => {
      return context.prisma.organizations({
        where: {
          events_some: {
            name_contains: args.name,
          },
        },
      })
    },
    organization: (root, args, context, info) => {
      return context.prisma.organization({id: args.id})
    },

    // Events
    events: (root, args, context, info) => {
      return context.prisma.events()
    },
    event: (root, args, context, info) => {
      return context.prisma.event({id: args.id})
    },

    // Locations
    locations: (root, args, context, info) => {
      return context.prisma.locations()
    },
    location: (root, args, context, info) => {
      return context.prisma.location({id: args.id})
    },
  },
  Mutation: {
    createEvent: (root, args, context) => {
      return context.prisma.createEvent({
        name: args.name,
        description: args.description,
        eventTime: args.eventTime,
        organization: {
          connect: {
            id: args.organizationId,
          },
        },
      })
    },
    updateEvent: (root, args, context) => {
      return context.prisma.updateEvent({
        data: {
          name: args.name,
          description: args.description,
          eventTime: args.eventTime,
        }, 
        where: {
          id: args.id,
        }
      })
    },
    deleteEvent: (root, args, context) => {
      return context.prisma.deleteEvent({
        id: args.id,
      })
    },
    createLocation: (root, args, context) => {
      return context.prisma.createLocation({
        name: args.name,
        address: args.address,
        latitude: args.latitude,
        longitude: args.longitude,
        organization: {
          connect: {
            id: args.organizationId,
          },
        },
      })
    },
    updateLocation: (root, args, context) => {
      return context.prisma.updateLocation({
        data: {
          name: args.name,
          address: args.address,
          latitude: args.latitude,
          longitude: args.longitude,
        }, 
        where: {
          id: args.id,
        }
      })
    },
    deleteLocation: (root, args, context) => {
      return context.prisma.deleteLocation({
        id: args.id,
      })
    },
  },
  // Defining object relationships
  Location: {
    organization(parent) {
      return prisma.location({ id: parent.id }).organization()
    },
  },
  Event: {
    organization(parent) {
      return prisma.event({ id: parent.id }).organization()
    },
  },
  Organization: {
    locations(parent) {
      return prisma.organization({ id: parent.id }).locations()
    },
    events(parent) {
      return prisma.organization({ id: parent.id }).events()
    },
  },
}

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: { prisma },
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
