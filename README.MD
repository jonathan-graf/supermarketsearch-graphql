# Introduction
Originally completed for the job interview at Econify. 

Requirements
- Create, Read, Update, & Delete Locations & Events
- Query and find all the locations & events belonging to an organization
- Query a location(s) / event(s) and having the ability to find the organization it belongs to
- (Bonus) When a user submits a location with an address, the latitude & longitude is gathered via the Google Places API

References
https://www.prisma.io/docs/
https://www.howtographql.com
https://codesandbox.io/s/github/prisma-csb/graphql-example-ts/

Technology Stack
https://i.imgur.com/URyxmnZ.png

Econify-Server API (Staten Island Supermarket Search)
Serves as a GraphQL-based facade layer to expose the application schema
Running on graphql-yoga
http://localhost:4000

Prisma ORM Server
Access to all generated ORM data schema functions
http://localhost:4466/

MySQL database access
Direct access to the SQL database
http://localhost:8000

Sample GraphQL requests:

/* organizations */

query {
  organizations {
      id
      name
      locations {
        name
        address
      }
      events {
        name
        eventTime
      }
    }
}

/* create event */

mutation {
  createEvent (
    name: "Free gas bonanza"
    eventTime: "2020-08-22T06:16:12.123Z"
    description: "It is literally free gas and Americans love that."
    organizationId: "cjruwgj050007082790pnr52g"
  ) {
    id
    name
  }
}

mutation {
  updateEvent (
    id: "cjruwgj3b000a0827a2tk0eub"
    name: "25 Years Ago, Our Opening Date"   
  ) {
    id
    name
  }
}

/* get events */

query {
  events {
    name
    eventTime
    organization {
      name
    }
  }
}

/* query organizations by location */

query {
  organizationsByLocation (
    name: "Richmond"
  ) {
    id
    name
    locations {
      name
    }
    events {
      name
    }
  }
}

/* organizations by name */

query {
  organizationsByName (
    name: "Costco"
  ) {
    id
    name
    events {
      name
      eventTime
    }
  }
}

/* single organization */

query {
  organization(id: "cjruwgj050007082790pnr52g") {id name}
}

mutation {
  updateEvent (
    id: "cjruwgj3b000a0827a2tk0eub"
    name: "25 Years Ago, Our Opening Date"   
  ) {
    id
    name
  }
}

mutation {
  deleteEvent(
    where: {
      id: "cjruwgj3b000a0827a2tk0eub"
    }) { id
  }
}

mutation {
  createLocation (
    name: "My house"
    address:"619 Klondike"
    latitude: 0
    longitude: 0
    organizationId:"cjruwgj050007082790pnr52g"
  ) {
    id
    name
  }
}

mutation {
  updateLocation (
    name: "My house"
    id:"cjrv3w6g300mr0827zizd5n41"
  ) {
    id
    name
  }
}

mutation {
  deleteLocation (
    id: "cjrv3w6g300mr0827zizd5n41"
  ) {
    id
    name
  }
}
