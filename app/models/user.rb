# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  company_id      :integer          not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  role            :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  first_name      :string           not null
#  last_name       :string           not null
#
class User < ApplicationRecord
    attr_reader :password

    validates :email, :first_name, :last_name, :session_token, presence:true, uniqueness:true
    validates :password_digest, presence: { message: 'password must not be blank'}
    validates :password, length: {minimum:8, allow_nil:true}

    belongs_to :company,
    class_name: "Company",
    foreign_key: :company_id,
    primary_key: :id

    


end
