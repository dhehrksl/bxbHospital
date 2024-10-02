import http from 'http';
import console from 'console'
import fail from 'fail'

var url = 'https://apis.data.go.kr/B552657/HsptlAsembySearchService/getHsptlMdcncListInfoInqire';
var queryParams = '?' + ('serviceKey') + '=' + '6xDCU4xNjopLKyyZBDXErrOte7lmAuT4OxjpaU/OHlQvcX6/QPolXVkrUzDhFkGrBTJ7jDfE/QWKh3zxcZwdqQ==';
var q0Name, q1Name
const options = {
  "format": "xmljs"
}
export function gethospitalNameResponse(locationName, HospitalDiv, MyPos, Near) {
  var gethospitalData
  if (!locationName || !locationName.name && HospitalDiv || !locationName && Near && HospitalDiv || !locationName && Near && !HospitalDiv) { //지역명이 없거나, 지역명 이름이 없고, 병원종류가 없거나, 지역명이 없고, 주변과 병원명만 있거나, 지역명이 없고 주변만 있을 경우  
    console.log("잘못된 지역명입니다. 정확한 지역명을 입력해주세요.")
    throw fail.checkedError('NoMatchdiv', 'NoMatchdiv') // 잘못된 지역명입니다 NLG 출력
  }

  if (locationName.name == "구리시") {
    //지역명이름에 구리가 포함되어 있거나 "도"가 마지막으로 포함 되어있을경우
  } else { // 그 외 지역명이름 마지막에 "동","군","도","면","리" 가 있으면 
    if (locationName.name.slice(-1) == "동" || locationName.name.slice(-1) == "군" || locationName.name.slice(-1) == "읍" || locationName.name.slice(-1) == "면" || locationName.name.slice(-1) == "리") {//시,구를 포함해주세요 출력
      throw fail.checkedError('Nodonggu', 'Nodonggu')
    }
    if (locationName.name.slice(-1) == "시" || locationName.name.slice(-1) == "구"|| locationName.name.slice(-1) == "도") { //"시","구" 를 포함 했을경우
    } else { // 그 외엔 시,구를 포함해주세요 출력
      throw fail.checkedError('Nodonggu', 'Nodonggu')
    }
  }

  // api 검색 조건 q0 00시,q1 00구
  if (locationName.name) {
    q0Name = locationName.unstructuredAddress
    q1Name = locationName.name
    if (q0Name.indexOf("한국") >= 0) {
      q0Name = q0Name.split(" ")[0]
    } else {
      var temp = q0Name.split(" ")
      q0Name = temp[0]
      q1Name = q1Name && q1Name[q1Name.length - 1] != "동" ? q1Name : temp[1]
      if (q1Name.indexOf(q0Name) >= 0) {
        q1Name = q1Name.replace(q0Name, "")
      }
    }
  } else {
    q0Name = locationName.address.locality
    q1Name = locationName.address.subLocalityTwo
  }

  queryParams += '&Q0=' + q0Name
  if (q0Name != q1Name) queryParams += '&Q1=' + q1Name
  console.log("112")
  queryParams += '&' + ('pageNo') + '=' + ('1');
  queryParams += '&' + ('numOfRows') + '=' + ('300');
  gethospitalData = http.getUrl(url + queryParams, options)
  console.log(gethospitalData)
  //시를 기준으로 자르기 떄문에 시흥시가 출력이 안되기 떄문에 예외로 바로 출력
  if (locationName.name.includes('시')) {
    if (locationName.name == "시흥시") {
      return gethospitalData
    }
    locationName.name = locationName.name.split('시')[1].trim()
    if (locationName.name == null) { //잘라서 지역이름이 없는 경우에 q0를 넣어서 00시로 넣어줌
      locationName.name.push(q0Name)
    }
  }
  return gethospitalData
}

