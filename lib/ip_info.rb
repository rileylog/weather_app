require 'net/http'
require 'uri'

class IpInfo
  
  def get_ip_info(ip_address = nil)
    uri = URI("http://ipinfo.io/#{ ip_address + '/' if ip_address.present? }json")
    data = Net::HTTP.start(uri.host, uri.port) do |http|
      request = Net::HTTP::Get.new uri
      response = http.request request
    end
    ipinfo = JSON.parse(data.body)
  end

end