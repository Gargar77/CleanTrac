# == Schema Information
#
# Table name: likes
#
#  id            :bigint           not null, primary key
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  likeable_id   :bigint
#  likeable_type :string
#
class Like < ApplicationRecord
# ensure only one like per unique post
validates_uniqueness_of :user_id, :scope => [:likeable_type,:likeable_id]


belongs_to :likeable, polymorphic: true


end
