# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#

require_relative "./city_specific_seeds/melbourne_seeds.rb"
require_relative "./city_specific_seeds/chiang_mai_seeds.rb"
require_relative "./user_seeds/user_seeds.rb"

# ----------CLEAN DB----------
puts 'Cleaning database...'
Review.destroy_all
Venue.destroy_all
User.destroy_all

# ----------USER SEEDS----------
create_user_seeds

# ----------COFFEE SHOP SEEDS----------
# CHIANG MAI
create_chiang_mai_venues
create_chiang_mai_venue_reviews

# MELBOURE
create_melbourne_venues(melbourne_venue_attributes)
create_melbourne_venue_reviews(melbourne_venue_attributes, melbourne_venue_review_attributes)

#----------CLOUDINARY IMAGE SEEDS----------
# url = "http://static.giantbomb.com/uploads/original/9/99864/2419866-nes_console_set.png"
# article = Article.new(title: 'NES', body: "A great console")
# article.remote_photo_url = url
# article.save