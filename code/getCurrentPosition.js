import console from 'console'

export default function (input) {
  const { point } = input;
  console.log(point)
  return {
    myPos: {
      latitude: point.latitude,
      longitude: point.longitude
    }
  }
}
