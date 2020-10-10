
#factoryBot gem will generates a model with the attributes we choose. this can be used for seeding and rspec testing.
#Faker gem is used to create a random variation of data among our facotries.
#the attributes that are left nill, will be filled in during the callback.

FactoryBot.define do
    factory :company do
        name { Faker::Company.name }
        website { Faker::Internet.domain_name}
    end

    factory :user do
        first_name { Faker::Name.first_name }
        last_name { Faker::Name.last_name }
        phone { Faker::PhoneNumber.phone_number }
        email { Faker::Internet.email(name: "#{first_name} #{last_name}",separators:'.') }
        password { Faker::Internet.password(min_length:8) }
        session_token {nil}
        company_id {nil}
        role {nil}
        leader_id {nil}

        factory :owner do
            role {  "owner" }
        end

        factory :cleaner do
            role { "cleaner" }
        end

        factory :leader do
            role { "leader" }
        end
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

    factory :post do
        author_id {nil}
        account_id {nil}
        title {Faker::Games::Zelda.game }
        content { Faker::ChuckNorris.fact }
    end

    factory :comment do 
        author_id {nil}
        post_id {nil}
        content { Faker::Quotes::Shakespeare.hamlet_quote }

    end


end

