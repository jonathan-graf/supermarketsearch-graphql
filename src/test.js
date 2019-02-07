const { prisma } = require('./generated/prisma-client')

async function main() {
  
  await prisma.createOrganization({
    name: 'Costco Wholesale',
    locations : {
        create : [
            {
                name: 'Richmond Avenue',
                address: '2975 Richmond Ave, Staten Island, NY 10314',
                latitude: 40.5727027,
                longitude: -74.1706382
            }
        ]
    },
    events : {
        create : [
            {
                name: 'Opening Date',
                description: 'On this day, Staten Island was blessed with its first and only Costco.',
                eventTime: '1995-12-15T06:16:12.123Z',
            }
        ]
    }
  })

  await prisma.createOrganization({
    name: 'Shop & Stop',
    locations : {
        create : [
            {
                name: 'Expressway Plaza',
                address: '1441 Richmond Ave, Staten Island, NY 10314',
                latitude: 40.5831971,
                longitude: -74.1976326
            },
            {
                name: 'Pergament Mall',
                address: '2795 Richmond Ave, Staten Island, NY 10314',
                latitude: 40.5727666,
                longitude: -74.2034691
            },
            {
                name: 'Tysens Park Shopping Center',
                address: '2754 Hylan Blvd, Staten Island, NY 10306',
                latitude: 40.5831971,
                longitude: -74.1976326
            },
            {
                name: 'Eltingville Shopping Center',
                address: '4343 Amboy Rd, Staten Island, NY 10312',
                latitude: 40.5831971,
                longitude: -74.1976326
            },
        ]
    },
    events : {
        create : [
            {
                name: 'Stop & Shop unveils new look',
                description: 'Refreshed store format piloted as prelude to chainwide rollout.',
                eventTime: '2018-10-04T06:16:12.123Z',
            },
            {
                name: 'Stop & Shop to acquire King Kullen',
                description: 'Long Island chain credited by Smithsonian with nation’s first supermarket.',
                eventTime: '2019-01-04T06:16:12.123Z',
            }
        ]
    }
  })

  await prisma.createOrganization({
    name: 'ShopRite',
    locations : {
        create : [
            {
                name: 'ShopRite of Forest & Richmond',
                address: '985 Richmond Ave, Staten Island, NY 10314',
                latitude: 40.6228576,
                longitude: -74.183562
            },
            {
                name: 'ShopRite of Hylan Blvd',
                address: '2424 Hylan Blvd, Staten Island, NY 10306',
                latitude: 40.6141227,
                longitude: -74.1910103
            },
            {
                name: 'ShopRite of Veterans Rd',
                address: '3010 Veterans Rd W, Staten Island, NY 10309',
                latitude: 40.6039429,
                longitude: -74.2474699
            },
        ]
    },
    events : {
        create : [
            {
                name: 'Weeknight Winter Meals',
                description: 'Boneless Beef Roast Sale',
                eventTime: '2019-02-06T06:16:12.123Z',
            },
            {
                name: 'Valentine\'s Day Roses',
                description: 'Order your Valentine\'s Day Roses Today!',
                eventTime: '2019-02-14T06:16:12.123Z',
            }
        ]
    }
  })

}

main()
