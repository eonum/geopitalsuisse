class CreateHospitalAttributes < ActiveRecord::Migration[5.2]
  def change
    create_table :hospital_attributes do |t|
      t.string :code
      t.integer :year
      t.string :value
      t.references :hospital, foreign_key: true

      t.timestamps
    end
  end
end
