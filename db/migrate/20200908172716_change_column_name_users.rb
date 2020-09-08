class ChangeColumnNameUsers < ActiveRecord::Migration[5.2]
  def change
    rename_column :users, :companyId, :company_id
  end
end
