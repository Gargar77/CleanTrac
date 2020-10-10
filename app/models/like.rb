# == Schema Information
#
# Table name: likes
#
#  id         :bigint           not null, primary key
#  user_id    :integer          not null
#  comment_id :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Like < ApplicationRecord
# ensure only one like per unique post
validates_uniqueness_of :user_id, :scope => [:comment_id]

belongs_to :user,
class_name: 'User',
foreign_key: :user_id,
primary_key: :id

belongs_to :comment,
class_name: 'Comment',
foreign_key: :comment_id,
primary_key: :id

end
