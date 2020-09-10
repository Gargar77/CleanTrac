class CreateActiveCleaning < ActiveRecord::Migration[5.2]
  def change
    create_table :active_cleanings do |t|
      t.integer :account_id, null:false
      t.integer :user_id, null:false
    end
  end
end
