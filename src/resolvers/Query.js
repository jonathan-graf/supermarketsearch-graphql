function info() {
    return `This is the API of Staten Island Supermarket Search`
}

// Organizations
function organizations(root, args, context, info) {
  return context.prisma.organizations()
}

function organizationsByName(root, args, context, info) {
  return context.prisma.organizations({
    where: {
      name_contains: args.name,
    },
  })        
}

function organizationsByLocation(root, args, context, info) {
  return context.prisma.organizations({
    where: {
      locations_some: {
        name_contains: args.name,
      },
    },
  })   
}

function organizationsByEvent(root, args, context, info) {
  return context.prisma.organizations({
    where: {
      events_some: {
        name_contains: args.name,
      },
    },
  })
}

function organization(root, args, context, info) {
  return context.prisma.organization({id: args.id})
}

// Events
function events(root, args, context, info) {
  return context.prisma.events()
}

function event(root, args, context, info)  {
  return context.prisma.event({id: args.id})
}

// Locations
function locations(root, args, context, info) {
  return context.prisma.locations()
}

function location (root, args, context, info) {
  return context.prisma.location({id: args.id})
}

module.exports = {
  info, organizations, organizationsByName, organizationsByLocation, organizationsByLocation, organizationsByEvent, organization, events, event, locations, location
}
  