# == Schema Information
#
# Table name: active_cleanings
#
#  id         :bigint           not null, primary key
#  account_id :integer          not null
#  user_id    :integer          not null
#
class ActiveCleaning < ApplicationRecord
    
    validates :account_id, :user_id, presence:true

    has_many :users,
    class_name: "User",
    foreign_key: :user_id,
    primary_key :id

    has_many :accounts,
    class_name: "Account",
    foreign_key: :account_id,
    primary_key: :id 
end
