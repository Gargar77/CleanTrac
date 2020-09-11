require 'faker'
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
FileLink.delete_all
ActiveCleaning.delete_all
Account.delete_all
User.delete_all
Company.delete_all


    #creating company and respective owners
    3.times do 
        FactoryBot.create(:company)
        FactoryBot.create(:owner,company_id: Company.last.id)
    end

    
    owners = User.all
    #random  accounts
    9.times do
        company = owners[rand(3)].company_id
        FactoryBot.create(:account, company_id: company )
    end

    #creating 5 random leaders for companies
    5.times do
        owner = owners[rand(3)]
        FactoryBot.create(:leader, leader_id: owner.id, company_id: owner.company_id)
    end
    # 12 random cleaners for companies
    leaders = User.all.select { |user| user.role == "leader"}
    12.times do
        leader = leaders[rand(5)]
        FactoryBot.create(:cleaner,company_id: leader.company_id, leader_id: leader.id)
    end

    #assigning accounts to companies
    accounts = Account.all
    employees = User.all.select { |user| user.role != 'owner'}
    companies = Company.all.map { |account| account}
    3.times do
        company = companies.pop
        current_company_employees = User.where("company_id = #{company.id}").map { |e| e}
        account_set = Account.where("company_id = #{company.id}")
        until current_company_employees.length <= 0
            employee = current_company_employees.pop
            account = account_set[rand(account_set.length - 1)]
            ActiveCleaning.create(account_id: account.id, user_id: employee.id)
        end
    end


    #random uploads
    6.times do
        uploader = employees[rand(17)]
        account = accounts[rand(6)]
        FileLink.create(uploader_id: uploader.id, account_id: account.id, link:"https://www.youtube.com/watch?v=Ds6IwEKRLUU" )
    end
        




