import console from 'console'
import { gethospitalNameResponse } from './lib/HospitalAPI.js'
import { calculateDistance } from './lib/calculateDistance.js'
import { getHospitalDiv, getHospitalSelect } from './lib/getHospitalDiv.js'

export default function showHospitalList(input) {
  const { locationName, HospitalDiv, myPosition, Near } = input

  var filteredHospitals = []
  let nearestCityhallHospitals = []
  let myNearestHospitals = []
  const gethospitalData = gethospitalNameResponse(locationName, HospitalDiv, myPosition, Near)
  const hospitalData = gethospitalData.response.body.items.item
  const hospitalLocationLatPoint = locationName.point.latitude
  const hospitalLocationLonPoint = locationName.point.longitude
  const myPos = myPosition.myPos
  var namedpoint = locationName.name
  var firstaddress = locationName.unstructuredAddress

  if (!hospitalData || hospitalData.length == 0) {
    return []
  }
  if (namedpoint == null) {
    console.log(firstaddress)
  }

  for (let i = 0; i < hospitalData.length; i++) {
    var locationAddr = hospitalData[i].dutyAddr
    var hospitalLocationName = hospitalData[i].dutyName
    var hospitalLatitude = hospitalData[i].wgs84Lat
    var hospitalLongitude = hospitalData[i].wgs84Lon
    var hospitalDivide = hospitalData[i].dutyDiv
    var hospitalTel = hospitalData[i].dutyTel1
    var dutinfo = hospitalData[i].dutyInf
    var dutyTime1c = hospitalData[i].dutyTime1c
    var dutyTime2c = hospitalData[i].dutyTime2c
    var dutyTime3c = hospitalData[i].dutyTime3c
    var dutyTime4c = hospitalData[i].dutyTime4c
    var dutyTime5c = hospitalData[i].dutyTime5c
    var dutyTime6c = hospitalData[i].dutyTime6c
    var dutyTime7c = hospitalData[i].dutyTime7c
    var dutyTime8c = hospitalData[i].dutyTime8c
    var dutyTime1s = hospitalData[i].dutyTime1s
    var dutyTime2s = hospitalData[i].dutyTime2s
    var dutyTime3s = hospitalData[i].dutyTime3s
    var dutyTime4s = hospitalData[i].dutyTime4s
    var dutyTime5s = hospitalData[i].dutyTime5s
    var dutyTime6s = hospitalData[i].dutyTime6s
    var dutyTime7s = hospitalData[i].dutyTime7s
    var dutyTime8s = hospitalData[i].dutyTime8s
    
    var cityhallNearestDistance = calculateDistance(hospitalLocationLatPoint, hospitalLocationLonPoint, hospitalLatitude, hospitalLongitude).toFixed(2)
    var mynearDistance = calculateDistance(myPos.latitude, myPos.longitude, hospitalLatitude, hospitalLongitude).toFixed(2)

    const nearCityhallHospitals = {
      HospitalName: hospitalLocationName,
      HospitalAddr: locationAddr,
      HospitalDivs: getHospitalDiv(hospitalDivide),
      HospitalSelect: getHospitalSelect(hospitalDivide),
      DutyTel1: hospitalTel,
      Info: dutinfo,
      Namedlocation: namedpoint,
      Firstaddress: firstaddress,
      DutyTime1c: dutyTime1c,
      DutyTime2c: dutyTime2c,
      DutyTime3c: dutyTime3c,
      DutyTime4c: dutyTime4c,
      DutyTime5c: dutyTime5c,
      DutyTime6c: dutyTime6c,
      DutyTime7c: dutyTime7c,
      DutyTime8c: dutyTime8c,
      DutyTime1s: dutyTime1s,
      DutyTime2s: dutyTime2s,
      DutyTime3s: dutyTime3s,
      DutyTime4s: dutyTime4s,
      DutyTime5s: dutyTime5s,
      DutyTime6s: dutyTime6s,
      DutyTime7s: dutyTime7s,
      DutyTime8s: dutyTime8s,
      HospitalPoint: {
        latitude: hospitalLatitude,
        longitude: hospitalLongitude
      },
      Maindistance: cityhallNearestDistance
    }

    const myNearHospitals = {
      HospitalName: hospitalLocationName,
      HospitalAddr: locationAddr,
      HospitalDivs: getHospitalDiv(hospitalDivide),
      HospitalSelect: getHospitalSelect(hospitalDivide),
      DutyTel1: hospitalTel,
      Info: dutinfo,
      Namedlocation: namedpoint,
      Firstaddress: firstaddress,
      DutyTime1c: dutyTime1c,
      DutyTime2c: dutyTime2c,
      DutyTime3c: dutyTime3c,
      DutyTime4c: dutyTime4c,
      DutyTime5c: dutyTime5c,
      DutyTime6c: dutyTime6c,
      DutyTime7c: dutyTime7c,
      DutyTime8c: dutyTime8c,
      DutyTime1s: dutyTime1s,
      DutyTime2s: dutyTime2s,
      DutyTime3s: dutyTime3s,
      DutyTime4s: dutyTime4s,
      DutyTime5s: dutyTime5s,
      DutyTime6s: dutyTime6s,
      DutyTime7s: dutyTime7s,
      DutyTime8s: dutyTime8s,
      HospitalPoint: {
        latitude: hospitalLatitude,
        longitude: hospitalLongitude
      },
      Nears: mynearDistance
    }
    nearestCityhallHospitals.push(nearCityhallHospitals)
    myNearestHospitals.push(myNearHospitals)
  }
  nearestCityhallHospitals.sort((a, b) => a.Maindistance - b.Maindistance)
  myNearestHospitals.sort((a, b) => a.Nears - b.Nears)

  if (locationName && HospitalDiv && !Near) {
    filteredHospitals = nearestCityhallHospitals.filter(hospital1 => hospital1.HospitalAddr.includes(locationName.name) && hospital1.HospitalDivs === HospitalDiv)
    console.log(filteredHospitals)
  }
  if (locationName && !HospitalDiv && !Near) {
    filteredHospitals = nearestCityhallHospitals.filter(hospital1 => hospital1.HospitalAddr.includes(locationName.name))
  }
  if (Near && locationName && HospitalDiv) {
    filteredHospitals = myNearestHospitals.filter(hospital2 => hospital2.HospitalAddr.includes(locationName.name) && hospital2.Nears != null && hospital2.HospitalDivs === HospitalDiv)
  }
  if (Near && locationName && !HospitalDiv) {
    filteredHospitals = myNearestHospitals.filter(hospital2 => hospital2.HospitalAddr.includes(locationName.name))
  }
  return filteredHospitals.slice(0, 1000)
}

