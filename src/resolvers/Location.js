// This function defines the Many -> One relationship between Locations and Organization

function organization(parent, args, context, info) {
  return context.prisma.location({ id: parent.id }).organization()
}
  
module.exports = {
  organization
}