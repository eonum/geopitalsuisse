class CreateHospitalLocations < ActiveRecord::Migration[5.2]
  def change
    create_table :hospital_locations do |t|
      t.string :name
      t.string :kanton
      t.string :streetAndNumber
      t.string :zipCodeAndCity
      t.float :longitude
      t.float :latitude
      t.string :la
      t.references :hospital, foreign_key: true

      t.timestamps
    end
  end
end
