class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.string :title, null:false
      t.text :content
      t.integer :author_id, null:false
      t.integer :account_id, null:false
      t.timestamps
    end
  end
end
