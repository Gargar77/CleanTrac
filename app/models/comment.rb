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

    def num_likes
        count = Comment.count_by_sql "
        SELECT COUNT(*) 
        FROM comments
        JOIN 
            likes ON comments.id = likes.comment_id
        GROUP BY comments.id
        HAVING comments.id = #{self.id}
        "
        return count
    end

end
