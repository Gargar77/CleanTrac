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

    belongs_to :account,
    class_name: 'Account',
    foreign_key: :account_id,
    primary_key: :id

    has_many :comments,
    class_name: "Comment",
    foreign_key: :post_id,
    primary_key: :id

    def creation_days_ago
       return Date.today - self.created_at.to_date
    end

end
