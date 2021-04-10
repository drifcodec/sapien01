
getLocation()
function getLocation() {
  if (navigator.geolocation) {
    console.log("location current is:",navigator.geolocation)
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
  }
}
var cur_lat = -24.80603
var cur_lng = 23.209105
var cur_coords = [{"lat":-2444.80603,"lng":23.209105}]
function showPosition(position) {
  cur_lat = position.coords.latitude
  cur_lng = position.coords.longitude
  if (cur_lat&&cur_lat){
     cur_coords.length=0
     cur_coords.push({"lat":cur_lat,"lng":cur_lng})
  }
}





var lat1=cur_coords[0].lat
var long1=cur_coords[0].lng
//console.log(cur_coords)
//sitedistance 
var lat2=-25.7294336
var long2=28.2532943
function distance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat2 * p) * 
          (1 - c((lon2 - lon1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

var km_distance=distance(lat1, long1, lat2, long2)
if (km_distance){
 // console.log("you have not arrived yet you are "+km_distance+"away" )
}else {
  
//console.log("you have arrive"+km_distance)
}

//console.log(""+km_distance)