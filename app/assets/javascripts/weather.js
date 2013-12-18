var map;
var geocoder;
var address;
var city_name;
var city_name1;
function initialize()
{
var mapProp = {
  center:new google.maps.LatLng(39.8888,-98.5555),
  zoom:3,
  mapTypeId:google.maps.MapTypeId.ROADMAP,
  styles: [
    {
        "featureType": "road",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "stylers": [
            {
                "color": "#004b76"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#fff6cb"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#7f7d7a"
            },
            {
                "lightness": 10
            },
            {
                "weight": 1
            }
        ]
    }
]

  };

window.map=new google.maps.Map(document.getElementById("googleMap"),mapProp);

geocoder = new google.maps.Geocoder();

google.maps.event.addListener(window.map, 'click', addPoint);


}

var main_marker = null;
function clearOverlays() {
  if (main_marker != null) {
    main_marker.setMap(null);
  }
  main_marker = null;
}

var create_new_iframe = function(latitude_param, longitude_param, name_param){
  var url = 'http://forecast.io/embed/#';
  var weather_div = $('#weather_div');
  var new_iframe = $('<iframe></iframe>');
  var new_url = url+'lat='+latitude_param+'&'+'lon='+longitude_param;
  if (name_param != null) {
    new_url += '&name='+name_param;
  }
  weather_div.html('');
  new_iframe.attr('type','text/html');
  new_iframe.attr('frameborder','0');
  new_iframe.attr('height','245px');
  new_iframe.attr('width','100%');
  new_iframe.attr('src', new_url);
  weather_div.html(new_iframe);
};

function addPoint(event) {
  clearOverlays();
  console.log (event)
  var latlngpoint = event.latLng;

  var url = 'http://forecast.io/embed/#';
  var latitude_param = latlngpoint.nb;
  var longitude_param = latlngpoint.ob;

  var latlng = new google.maps.LatLng(latlngpoint.nb, latlngpoint.ob);
  create_new_iframe(latitude_param, longitude_param, null);

  geocoder.geocode({'latLng': latlng}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        
        main_marker = new google.maps.Marker({
            position: latlng,
            map: map
        });
        // city_name = results[1].formatted_address;
        create_new_iframe(latitude_param, longitude_param, results[1].formatted_address)
      } 
    } 
  }); 
}

function codeAddress() {
  clearOverlays();
  var address = document.getElementById('address').value;
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      main_marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });
      // city_name1 = results[0].geometry.location;
      create_new_iframe(results[0].geometry.location.nb, results[0].geometry.location.ob, address);
    } 
  });
}



google.maps.event.addDomListener(window, 'load', initialize);