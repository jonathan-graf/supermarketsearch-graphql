# Introduction
Originally completed for the job interview at Econify.  Themed as the "Staten Island Supermarket Search".

# Requirements
- Create, Read, Update, & Delete Locations & Events
- Query and find all the locations & events belonging to an organization
- Query a location(s) / event(s) and having the ability to find the organization it belongs to
- (Bonus) When a user submits a location with an address, the latitude & longitude is gathered via the Google Places API

# References
- https://www.prisma.io/docs/
- https://www.howtographql.com
- https://codesandbox.io/s/github/prisma-csb/graphql-example-ts/

# Technology Stack
<img src="https://i.imgur.com/URyxmnZ.png">
Image is from the Prisma documentation.

## Staten Island Supermarket Search API
- Serves as a GraphQL-based facade layer to expose the application schema
- Running on graphql-yoga
http://localhost:4000

## Prisma ORM Server (on Docker)
- Access to all generated ORM data schema functions
- http://localhost:4466/

## MySQL database access (on Docker via phpmyadmin)
- Direct access to the SQL database
- http://localhost:8000

# Getting started
```sh
npm install
cd prisma
docker-compose up -d
```
Wait for docker to start or view docker logs with docker-compose logs
```sh
prisma deploy
```
Prisma ORM should now have created the tables and inserted seed data in MySQL.  It's time to hit the Staten Island Supermarket Search API.
```sh
cd ..
node ./src/index.js
```

# Configuration
Located in `./src/config.js`

# Sample GraphQL requests
Note: When adding or updating `Locations`, the middleware layer will determine if the address has changed and get geometry data from the Google Places API.  You should get the `Location` from the API afterwards to see the geometry data.  In order for it to work, you must enter a Google-friendly address, i.e. Beverly Hills, CA or 123 Main Street, Oklahoma City, OK

### Query all organizations 
```graphql
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
```

### Query a single organization
```graphql
query {
  organization(
    id: "cjruwgj050007082790pnr52g"
  ) {
    id 
    name
  }
}
```

### Query organizations by location */
```graphql
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
```

### Query organizations by name (optionally add events or location to output) 
```graphql
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
```

### Create event
```graphql
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
```
### Update event
```graphql
mutation {
  updateEvent (
    id: "cjruwgj3b000a0827a2tk0eub"
    name: "25 Years Ago, Our Opening Date"   
  ) {
    id
    name
  }
}
```

### Query all events
```graphql
query {
  events {
    name
    eventTime
    organization {
      name
    }
  }
}
```

### Delete an event
```graphql
mutation {
  deleteEvent(
    where: {
      id: "cjruwgj3b000a0827a2tk0eub"
    }) { 
    id
  }
}
```

### Create location (asynchronously adds latitude & longitude)
```graphql
mutation {
  createLocation (
    name: "My house"
    address:"619 Klondike"
    organizationId:"cjruwgj050007082790pnr52g"
  ) {
    id
    name
  }
}
```

### Update location (asynchronously adds latitude & longitude)
```graphql
mutation {
  updateLocation (
    name: "My house"
    id:"cjrv3w6g300mr0827zizd5n41"
  ) {
    id
    name
  }
}
```

### Delete location
```graphql
mutation {
  deleteLocation (
    id: "cjrv3w6g300mr0827zizd5n41"
  ) {
    id
    name
  }
}
```
