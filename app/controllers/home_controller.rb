class HomeController < ApplicationController
  def index
    @ip_info = IpInfo.new().get_ip_info
  end
end
