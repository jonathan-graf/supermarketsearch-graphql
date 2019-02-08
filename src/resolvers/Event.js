// This function defines the Many -> One relationship between Events and Organization

function organization(parent, args, context, info) {
  return context.prisma.event({ id: parent.id }).organization()
}

module.exports = {
  organization
}