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
    primary_key: :id

    belongs_to :post,
    class_name: 'Post',
    foreign_key: :post_id,
    primary_key: :id

    has_many :likes, as: :likeable

    def user_liked(id)
        user_id = id
        likes = self.likes.where('likes.user_id = ?',user_id)

        return !likes.empty?
    end
end
