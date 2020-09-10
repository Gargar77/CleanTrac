class AddLeaderId < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :leader_id, :integer
  end
end
