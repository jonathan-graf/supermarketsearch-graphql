function locations(parent, args, context, info) {
  return context.prisma.organization({ id: parent.id }).locations()
}

function events(parent, args, context, info) {
  return context.prisma.organization({ id: parent.id }).events()
}

module.exports = {
  locations, events
}