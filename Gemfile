source 'https://rubygems.org'
ruby '2.0.0'
gem 'rails', '3.2.15'
gem 'jquery-rails'
gem 'cancan'
gem 'devise'
gem 'figaro'
gem 'rolify'
gem 'simple_form'
gem "activeadmin", :git => "git://github.com/gregbell/active_admin.git"

group :assets do
  gem 'sass-rails', '>= 3.2'
  gem 'coffee-rails', '~> 3.2.1'
  gem 'uglifier', '>= 1.0.3'
  gem 'bootstrap-sass', '~> 3.0.3.0'
end

group :production do
  gem 'pg'
end


group :development do
  gem 'better_errors'
  gem 'binding_of_caller', :platforms=>[:mri_19, :mri_20, :rbx]
  gem 'hub', :require=>nil
  gem 'quiet_assets'
  gem 'rails_layout'
end

group :development, :test do
  gem "sqlite3", "~> 1.3.7", :require => "sqlite3"
end


