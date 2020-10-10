# == Schema Information
#
# Table name: comments
#
#  id         :bigint           not null, primary key
#  content    :string           not null
#  author_id  :integer          not null
#  post_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Comment < ApplicationRecord
    validates :content,:author_id,:post_id, presence:true

    belongs_to :author,
    class_name:'User',
    foreign_key: :author_id,
    primary_key: :id,
    inverse_of: :comments

    belongs_to :post,
    class_name: 'Post',
    foreign_key: :author_id,
    primary_key: :id,
    inverse_of: :comments
end
