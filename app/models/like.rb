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

end
