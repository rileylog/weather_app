$ ->
  $.get "http://ipinfo.io", ((response) ->
    $('.my-location').html(
     "<h2>#{response.city}, #{response.region} #{response.country} </h2> <p>IP Address: #{response.ip}</p> <p> Latitude/Longitude : #{response.loc}")
    gps = response.loc.split(',')
    latitude = gps[0]
    longitude = gps[1]    
    $('#forecast_embed').attr('src', "http://forecast.io/embed/#lat=#{ latitude }&lon=#{ longitude }&name=#{ response.city }")
  ), "jsonp"