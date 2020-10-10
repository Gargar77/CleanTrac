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
#  leader_id       :integer
#  phone           :string
#
class User < ApplicationRecord
    VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i.freeze

    has_secure_password
    # attr_reader :password
    before_validation :ensure_session_token
    validates :first_name, :last_name, :phone, presence:true
    validates :email, presence: true,uniqueness: true, format: { with: VALID_EMAIL_REGEX }
    validates :session_token, presence:true, uniqueness:true
    validates :password_digest, presence: { message: 'password must not be blank'}
    # validates :password, length: {minimum:8, allow_nil:true}

    belongs_to :company, 
    class_name: "Company",
    foreign_key: :company_id,
    primary_key: :id

    
    belongs_to :leader, 
    class_name: "User",
    foreign_key: :leader_id,
    primary_key: :id,
    optional:true

    

    has_many :active_cleanings,
    class_name: 'ActiveCleaning',
    foreign_key: :user_id,
    primary_key: :id

    has_many :accounts, through: :active_cleanings, source: :user


    def generate_session_token
        token = SecureRandom.urlsafe_base64(16)

        while self.class.exists?(session_token: token)
            token = SecureRandom.urlsafe_base64(16)
        end

        token
    end

    def reset_session_token!
        self.session_token = generate_session_token
        self.save!

        self.session_token
    end

    def ensure_session_token
        self.session_token ||= generate_session_token
    end


end
