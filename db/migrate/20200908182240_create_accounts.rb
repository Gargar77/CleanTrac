class CreateAccounts < ActiveRecord::Migration[5.2]
  def change
    create_table :accounts do |t|
      t.integer :company_id, null: false
      t.string :address, null:false
      t.string :primary_contact_name, null:false
      t.string :primary_contact_phone, null: false
      t.boolean :monday_cleaning, null:false
      t.boolean :tuesday_cleaning, null:false
      t.boolean :wednesday_cleaning, null:false
      t.boolean :thursday_cleaning, null:false
      t.boolean :friday_cleaning, null:false
      t.boolean :saturday_cleaning, null:false
      t.boolean :sunday_cleaning, null:false
      t.time :cleaning_timeframe_start
      t.time :cleaning_timeframe_end
      t.index :primary_contact_name
      t.timestamps
    end
  end
end
