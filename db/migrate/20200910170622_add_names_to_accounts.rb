class AddNamesToAccounts < ActiveRecord::Migration[5.2]
  def change
    add_column :accounts, :name, :string, null:false
  end
end
