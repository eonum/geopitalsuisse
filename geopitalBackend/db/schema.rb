# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_05_12_134321) do

  create_table "attribute_types", force: :cascade do |t|
    t.string "code"
    t.string "category"
    t.string "nameDE"
    t.string "nameFR"
    t.string "nameIT"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "hospital_attributes", force: :cascade do |t|
    t.string "code"
    t.integer "year"
    t.string "value"
    t.integer "hospital_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["hospital_id"], name: "index_hospital_attributes_on_hospital_id"
  end

  create_table "hospital_locations", force: :cascade do |t|
    t.string "name"
    t.string "kanton"
    t.string "streetAndNumber"
    t.string "zipCodeAndCity"
    t.float "longitude"
    t.float "latitude"
    t.string "la"
    t.integer "hospital_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["hospital_id"], name: "index_hospital_locations_on_hospital_id"
  end

  create_table "hospitals", force: :cascade do |t|
    t.string "name"
    t.string "streetAndNumber"
    t.string "zipCodeAndCity"
    t.float "longitude"
    t.float "latitude"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "uploads", force: :cascade do |t|
    t.string "name"
    t.string "attachment"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
