// These functions define the API for CRUD operations

function createEvent(root, args, context) {
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
}

function updateEvent(root, args, context) {
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
}

function deleteEvent(root, args, context) {
  return context.prisma.deleteEvent({
    id: args.id,
  })
}

function createLocation(root, args, context) {
  // Initial save
  let location = context.prisma.createLocation({
    name: args.name,
    address: args.address,
    latitude: 0,
    longitude: 0,
    organization: {
      connect: {
        id: args.organizationId,
      },
    },
  })

  return location;
}

function updateLocation(root, args, context) {
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
}

function deleteLocation(root, args, context) {
  return context.prisma.deleteLocation({
    id: args.id,
  })
}

module.exports = {
  createEvent, updateEvent, deleteEvent, createLocation, updateLocation, deleteLocation
}