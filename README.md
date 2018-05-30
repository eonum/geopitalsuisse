## Contributors PSE Group 2

	Nathalie Froidevaux
	Manuela Eschler
	Corina Masanti
	Julien Del Don
	Angela Keller
	Dominic Schweizer
## Setup
### Backend Dev
 1. Install rails - http://installrails.com/ (DB SQLite included)
 2. Optional: To use PostgreSQL database - https://www.digitalocean.com/community/tutorials/how-to-setup-ruby-on-rails-with-postgres
 3. Clone Repository
 4. Change to geopitalBackend
 5. Run bundle install; this will install gems listed in the gemfile
 6. Insert your API-Key into geopitalBackend/config/initializers/geocoder.rb 'GEO-KEY': get google API key here - https://developers.google.com/maps/documentation/geocoding/get-api-key?hl=de
 7. Run rails db:migrate; this will setup the database
 8. Run rails server; this will start a dev server
 9. The app should answer on localhost:3000; as default rails will use a sqlite3 db which doesnt need to be set up.
 
 ### Backend Productive
 If you want to install the rails in productive mode, please follow this guide https://gorails.com/deploy/ubuntu/18.04
 

## Frontend
Please visit https://github.com/eonum/geopitalsuisse/wiki/Setup for setup guidance

## Frontend
The frontend is documented here: https://github.com/eonum/geopitalsuisse/wiki/Frontend-Angular-en

## Backend
The backend is documented here: https://github.com/eonum/geopitalsuisse/wiki/Backend_Rails
A how to for inserting data is here: https://github.com/eonum/geopitalsuisse/wiki/Manual:-Backend

## General
If you seek further information, feel free to visit our wiki. 
https://github.com/eonum/geopitalsuisse/wiki



  

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE5Mjk4MDY1MzZdfQ==
-->
