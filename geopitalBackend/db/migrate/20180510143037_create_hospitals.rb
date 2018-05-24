class CreateHospitals < ActiveRecord::Migration[5.2]
  def change
    create_table :hospitals do |t|
      t.string :name
      t.string :streetAndNumber
      t.string :zipCodeAndCity
      t.float :longitude
      t.float :latitude


      t.timestamps
    end
  end
end
