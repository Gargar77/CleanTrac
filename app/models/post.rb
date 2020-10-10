# == Schema Information
#
# Table name: posts
#
#  id         :bigint           not null, primary key
#  title      :string           not null
#  content    :text
#  author_id  :integer          not null
#  account_id :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Post < ApplicationRecord
    validates :title, :author_id,:account_id,  presence:true

    belongs_to :author,
    class_name: 'User',
    foreign_key: :author_id

    has_many :comments,
    class_name: "Comment",
    foreign_key: :author_id,
    primary_key: :id

end
