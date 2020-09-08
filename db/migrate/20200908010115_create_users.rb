class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.integer :companyId, null:false
      t.string :email, null:false, unique:true
      t.string :password_digest, null:false
      t.string :session_token, null:false, unique:true
      t.string :role, null:false
      t.index :email,unique:true
      t.index :session_token,unique:true
      t.timestamps
    end
  end
end
