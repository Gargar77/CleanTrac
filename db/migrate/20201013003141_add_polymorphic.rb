class AddPolymorphic < ActiveRecord::Migration[5.2]
  def change
    add_column :likes, :likeable_id, :bigint
    add_column :likes, :likeable_type, :string
  end
end
