# == Schema Information
#
# Table name: companies
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  website    :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Company < ApplicationRecord

    validates :name, presence:true, uniqueness:true
    validates :website, length: {in: 4..60}

    has_many :users,
    class_name: "User",
    foreign_key: :company_id,
    primary_key: :id

    has_many :accounts,
    class_name: "Account",
    foreign_key: :company_id,
    primary_key: :id
end
