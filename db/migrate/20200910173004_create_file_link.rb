class CreateFileLink < ActiveRecord::Migration[5.2]
  def change
    create_table :file_links do |t|
      t.integer :uploader_id, null:false
      t.integer :account_id, null:false
      t.text :link, null:false
    end
  end
end
