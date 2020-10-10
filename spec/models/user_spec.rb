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


require 'rails_helper'

RSpec.describe User, type: :model do
    subject(:company) do
        company = FactoryBot.create(:company)
    end
    subject(:owner) do
        FactoryBot.create(:owner,company_id: company.id)
    end
    subject(:supervisor) do  
        FactoryBot.create(:leader,company_id: company.id,leader_id:owner.id)
    end
    subject(:cleaner) do
        FactoryBot.build(:cleaner,leader_id: supervisor.id, company_id: company.id)
    end


    describe "validations" do
        it { should validate_presence_of(:first_name)}
        it { should validate_presence_of(:last_name)}
        it { should validate_presence_of(:email)}
        it { should validate_presence_of(:password_digest)
            .with_message('password must not be blank')}
        it { should validate_length_of(:password).is_at_least(8)}
        it {should belong_to(:company)}
        it "should have a leader if the user is not an owner" do
            expect(cleaner.leader).to_not eq(nil)
            expect(owner.leader).to be nil
        end

        


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

      describe "authorization logic" do 
        describe "#password=" do
          it "saves a password_digest using bcrypt" do
            cleaner.valid?
            expect(cleaner.password_digest).to_not be_nil
            expect(cleaner.password).to_not eq(cleaner.password_digest)
          end
    
          it "creates a password instance variable" do
            expect(cleaner.password).to_not be_nil
          end
        end
    
        describe "#is_password?" do
          it "should verify that the password is correct" do
            cleaner.password= 'good_password'
            expect(cleaner.is_password?('good_password')).to be true
          end
    
          it "should verify that the password is incorrect" do
            cleaner.password = 'good_password'
            expect(cleaner.is_password?('bad_password')).to be false
          end
        end
    
        describe "::find_by_credentials(email,password)" do
          before(:each) do
            cleaner.email = 'mail@gmail.com'
            cleaner.password = 'good_password'
            cleaner.session_token = "token"
            cleaner.save!
          end
          it "returns the user if the credentials are correct" do
            expect(User.find_by_credentials('mail@gmail.com','good_password')).to eq(cleaner)
          end
          it "returns nil if credentials are incorrect" do
            expect(User.find_by_credentials('mail@gmail.com','bad_password')).to eq(nil)
            expect(User.find_by_credentials('not_my@email.com','good_password')).to eq(nil) 
          end
        end
        describe "session token" do
          describe "#generate_session_token" do 
            it "returns a new session token" do
              cleaner.valid?
              expect(cleaner.generate_session_token).to_not be_nil
            end
    
            it "must produce a unique session_token each time(small chance of failing)" do
              cleaner.valid?
              first_token = cleaner.generate_session_token
              second_token = cleaner.generate_session_token
              expect(first_token).to_not eq(second_token)
            end
          end
          describe "#reset_session_token!" do
            it "sets a new session token on the user" do
              cleaner.valid?
              old_session_token = cleaner.session_token
              cleaner.reset_session_token!
    
              expect(cleaner.session_token).to_not eq(old_session_token)
              expect(User.last.session_token).to_not eq(old_session_token)
            end
    
            it "returns the new session token" do
              expect(cleaner.reset_session_token!).to eq(cleaner.session_token)
            end
          end
    
          it "creates a session token before validation" do
            cleaner.valid?
            expect(cleaner.session_token).to_not be_nil
          end
        end
      end

end
