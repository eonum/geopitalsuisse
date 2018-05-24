class CreateAttributeTypes < ActiveRecord::Migration[5.2]
  def change
    create_table :attribute_types do |t|
      t.string :code
      t.string :category
      t.string :nameDE
      t.string :nameFR
      t.string :nameIT

      t.timestamps
    end
  end
end
