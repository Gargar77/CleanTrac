class AddIndex < ActiveRecord::Migration[5.2]
  def change
    add_index(:accounts,:address)
  end
end
