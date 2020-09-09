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

ActiveRecord::Schema.define(version: 2020_09_08_192239) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accounts", force: :cascade do |t|
    t.integer "company_id", null: false
    t.string "address", null: false
    t.string "primary_contact_name", null: false
    t.boolean "monday_cleaning", null: false
    t.boolean "tuesday_cleaning", null: false
    t.boolean "wednesday_cleaning", null: false
    t.boolean "thursday_cleaning", null: false
    t.boolean "friday_cleaning", null: false
    t.boolean "saturday_cleaning", null: false
    t.boolean "sunday_cleaning", null: false
    t.time "cleaning_timeframe_start"
    t.time "cleaning_timeframe_end"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "primary_contact_phone", null: false
    t.index ["address"], name: "index_accounts_on_address"
    t.index ["primary_contact_name"], name: "index_accounts_on_primary_contact_name"
  end

  create_table "companies", force: :cascade do |t|
    t.string "name", null: false
    t.string "website"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.integer "company_id", null: false
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.string "role", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

end