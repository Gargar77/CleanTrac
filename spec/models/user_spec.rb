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
#


require 'rails_helper'

RSpec.describe User, type: :model do
    subject(:cleaner) do
        FactoryBot.build(:cleaner)
    end


    describe "validations" do
        it { should validate_presence_of(:first_name)}
        it { should validate_presence_of(:last_name)}
        it { should validate_presence_of(:email)}
        it { should validate_presence_of(:password_digest)}
        it { should validate_length_of(:password).is_at_least(8)}
        
        describe "ensure uniqueness" do
          it "ensures uniqueness of email" do
            cleaner.email = "mail@gmail.com"
            cleaner.session_token = "token"
            cleaner.save!

            cleaner2 = FactoryBot.build(:cleaner,email: "mail@gmail.com",session_token: "another token")
            cleaner2.save
            expect(cleaner2.errors.full_messages).to_not eq(nil)
          end
          it "ensures uniqeness of password_digest" do
            cleaner.password_digest = "password_digest"
            cleaner.session_token = "token"
            cleaner.save!
    
            cleaner2 = FactoryBot.build(:cleaner,session_token:"another_token")
            cleaner2.password_digest = "password_digest"
            cleaner2.save
    
            expect(cleaner2.errors.full_messages).to_not eq(nil)
          end
    
        end
      end
end