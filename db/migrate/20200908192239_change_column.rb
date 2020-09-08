class ChangeColumn < ActiveRecord::Migration[5.2]
  def change
    remove_column :accounts, :primary_contact_phone
    add_column :accounts, :primary_contact_phone, :integer, null:false
  end
end
