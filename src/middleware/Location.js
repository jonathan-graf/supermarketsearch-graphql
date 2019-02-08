const { prisma } = require('../generated/prisma-client')
const config = require ('../config')
const util = require('../util')

// This function will call the Google Places API and update the 
// geometry (latitude and longitude) for a new address or a changed address
exports.updateGeometry = async (resolve, root, args, context, info) => {
  const middlewareResult = await resolve(root, args, context, info)
    
  // Only use this middleware if the address is different from before
  if (args.address != middlewareResult) {
    // Setup options for the Google Places API
    let options = {
      host: 'maps.googleapis.com',
      port: 443,
      path: '/maps/api/place/findplacefromtext/json?input=' + 
        encodeURIComponent(args.address) + 
        '&inputtype=textquery&fields=geometry&key=' + config.options.GOOGLE_API_KEY,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    // HTTP Request 
    util.getJSON(options, function(statusCode, httpResult) {
      console.log("onResult: (" + statusCode + ")" + JSON.stringify(httpResult))

      if (httpResult.candidates[0]) {
        let lat = httpResult.candidates[0].geometry.location.lat
        let lng = httpResult.candidates[0].geometry.location.lng

        updateGeo(lat, lng, middlewareResult);
      } else {
        console.log("No geometry data found for: " + middlewareResult.address)
      }
    })  
  }

  return middlewareResult;
}

// Prisma Client writes the updated lat/lng
async function updateGeo(lat, lng, middlewareResult) {
  await prisma.updateLocation({
    data: {
      latitude: lat,
      longitude: lng,
    },
    where: {
      id: middlewareResult.id,
    }
  });
}