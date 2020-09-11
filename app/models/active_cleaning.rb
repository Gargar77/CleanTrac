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

    belongs_to :user,
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id

    belongs_to :account,
    class_name: "Account",
    foreign_key: :account_id,
    primary_key: :id 
end
