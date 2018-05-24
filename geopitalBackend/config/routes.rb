Rails.application.routes.draw do

  # Hospital Locations
  post 'locations/parse'
  # Hospitals
  get 'hospitals/coords'
  get 'hospitals/details'
  get 'hospitals/index'
  get 'hospitals/edit'
  post 'hospitals/delete'
  post 'hospitals/coords_single'
  post 'hospitals/parse'
  # API
  get 'api/hospitals'
  get 'api/attributeTypes'
  # attribute types
  get 'attribute_types/index'
  post 'attribute_types/parse'

  # Excel Parser
  get 'parsers/details'
  get 'parsers/parse'

  # Uploads
  resources :uploads, only: [:index, :new, :create, :destroy]
  get 'uploads/index'
  get 'uploads/new'
  get 'uploads/create'
  get 'uploads/destroy'

  root 'uploads#index'
end
