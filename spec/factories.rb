


FactoryBot.define do
    factory :company do
        name { Faker::Company.name }
        website { Faker::Internet.domain_name}
    end

    factory :user aliases:[:leader,:owner] do
        first_name { Faker::Name.first_name }
        last_name { Faker::Name.last_name }
        email { Faker::Internet.email(name: "#{first_name} #{last_name}",seperators:'.') }
        password { Faker::Internet.password(min_length:6) }
        session_token {nil}
        company_id {nil}
        role {nil}
        leader_id {nil}
    end

    factory :account do
        company_id {nil}
        name { Faker::Company.name }
        address { Faker::Address.full_address }
        primary_contact_name { Faker::Name.name }
        primary_contact_phone { Faker::PhoneNumber.phone_number }
        monday_cleaning { Faker::Boolean.boolean }
        tuesday_cleaning { Faker::Boolean.boolean }
        wednesday_cleaning { Faker::Boolean.boolean }
        thursday_cleaning { Faker::Boolean.boolean }
        friday_cleaning { Faker::Boolean.boolean }
        saturday_cleaning { Faker::Boolean.boolean }
        sunday_cleaning { Faker::Boolean.boolean }
        cleaning_timeframe_start { Faker::Time.between_dates(from: Date.today - 1, to: Date.today, period: :afternoon) }
        cleaning_timeframe_end { Faker::Time.between_dates(from: Date.today - 1, to: Date.today, period: :evening) }
    end


    
end

# == Schema Information
#
# Table name: accounts
#
#  id                       :bigint           not null, primary key
#  company_id               :integer          not null
#  address                  :string           not null
#  primary_contact_name     :string           not null
#  monday_cleaning          :boolean          not null
#  tuesday_cleaning         :boolean          not null
#  wednesday_cleaning       :boolean          not null
#  thursday_cleaning        :boolean          not null
#  friday_cleaning          :boolean          not null
#  saturday_cleaning        :boolean          not null
#  sunday_cleaning          :boolean          not null
#  cleaning_timeframe_start :time
#  cleaning_timeframe_end   :time
#  created_at               :datetime         not null
#  updated_at               :datetime         not null
#  primary_contact_phone    :integer          not null
#  name                     :string           not null
#