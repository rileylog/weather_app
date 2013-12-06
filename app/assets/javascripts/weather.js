// var marker;
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
        "featureType": "landscape",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 65
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 51
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 30
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.local",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 40
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "visibility": "simplified"
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
        "featureType": "water",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "lightness": -25
            },
            {
                "saturation": -100
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#ffff00"
            },
            {
                "lightness": -25
            },
            {
                "saturation": -97
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
  var latlngpoint = event.latLng;
  // main_marker = new google.maps.Marker({
  //   position: latlngpoint,
  //   map: window.map
  // })
  // main_marker = marker;
  var url = 'http://forecast.io/embed/#';
  var latitude_param = latlngpoint.pb;
  var longitude_param = latlngpoint.qb;
  // var weather_div = $('#weather_div');
  // var new_iframe = $('<iframe></iframe>');
  var latlng = new google.maps.LatLng(latlngpoint.pb, latlngpoint.qb);
  create_new_iframe(latitude_param, longitude_param, null);
  // var create_new_iframe = function(){
  //   weather_div.html('');
  //   new_iframe.attr('type','text/html');
  //   new_iframe.attr('frameborder','0');
  //   new_iframe.attr('height','245px');
  //   new_iframe.attr('width','100%');
  //   new_iframe.attr('src',url+latitude_param+'&'+longitude_param+'&name='+city_name);
  //   weather_div.html(new_iframe);
  // };

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
      create_new_iframe(results[0].geometry.location.pb, results[0].geometry.location.qb, address);
    } 
  });
}



google.maps.event.addDomListener(window, 'load', initialize);