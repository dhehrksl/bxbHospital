export function getHospitalDiv(hospitalDivide) {
  switch (hospitalDivide) {
    case 'A':
      return 'jong'
    case 'B':
    case 'C':
      return 'one'
    case 'D':
      return 'yo'
    case 'E':
    case 'F':
    case 'G':
      return 'han'
    case 'M':
    case 'N':
      return 'ci'
    default:
      return ''
  }
}
export function getHospitalSelect(hospitalDivide) {
  switch (hospitalDivide) {
    case 'A':
      return '종합병원'
    case 'B':
    case 'C':
      return '병원'
    case 'D':
      return '요양병원'
    case 'E':
    case 'F':
    case 'G':
      return '한의원'
    case 'M':
    case 'N':
      return '치과'
    default:
      return ''
  }
}