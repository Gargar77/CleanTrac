class ChangePhoneTypeInAccounts < ActiveRecord::Migration[5.2]
  def change
    change_column :accounts, :primary_contact_phone, :string, null:false
  end
end
