export function MapPunchOut (input) {
  const { HospitalPoint, HospitalAddr } = input
  
  var result = "geo:"+ HospitalPoint.latitude+","+ HospitalPoint.longitude+ "?q=" +HospitalAddr
  return result
}

export function TelPunchOut (input) {
  const { DutyTel1 } = input

  var result = "tel:"+DutyTel1
  return result
}