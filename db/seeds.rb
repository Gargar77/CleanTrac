require 'faker'
require'byebug'
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Like.delete_all
Comment.delete_all
Post.delete_all
FileLink.delete_all
ActiveCleaning.delete_all
Account.delete_all
User.delete_all
Company.delete_all

#seed config----
COMPANY_NUM = 4
LEADER_NUM = 8
CLEANER_NUM = 16
UPLOADS_NUM = 35
ACCOUNTS_NUM = 20
POSTS_NUM = 70
COMMENTS_NUM = 85
LIKES_NUM = 300
#---------------


    #creating company and respective owners
    COMPANY_NUM.times do 
        FactoryBot.create(:company)
        FactoryBot.create(:owner,company_id: Company.last.id)
    end

    
    owners = User.all
    #random  accounts
    ACCOUNTS_NUM.times do
        company = owners[rand(COMPANY_NUM)].company_id
        FactoryBot.create(:account, company_id: company )
    end

    #random leaders for companies
    LEADER_NUM.times do
        owner = owners[rand(COMPANY_NUM)]
        FactoryBot.create(:leader, leader_id: owner.id, company_id: owner.company_id)
    end
    #random cleaners for companies
    leaders = User.all.select { |user| user.role == "leader"}
    CLEANER_NUM.times do
        leader = leaders[rand(LEADER_NUM)]
        FactoryBot.create(:cleaner,company_id: leader.company_id, leader_id: leader.id)
    end

    #assigning accounts to companies
    accounts = Account.all
    employees = User.all.select { |user| user.role != 'owner'}
    companies = Company.all.map { |account| account}
    ACCOUNTS_NUM.times do
        # account = accounts[rand(ACCOUNTS_NUM)]
        # employee = employees[rand(CLEANER_NUM + LEADER_NUM)] 
        # ActiveCleaning.create(account_id: account.id, user_id: employee.id)

        company = companies[rand(companies.length)]
        break if company == nil
        current_company_employees = User.where("company_id = #{company.id}").map { |e| e}
        account_set = Account.where("company_id = #{company.id}").map { |e| e}
        # debugger
        until current_company_employees.length == 0
            employee = current_company_employees.pop
            num = account_set.length - 2
            idx = rand(num)
            account = account_set[idx]
            next if !account || !employee
            ActiveCleaning.create(account_id: account.id, user_id: employee.id)
        end
    end


    #random uploads
    UPLOADS_NUM.times do
        uploader = employees[rand(CLEANER_NUM + LEADER_NUM)] 
        account = accounts[rand(ACCOUNTS_NUM)]
        FileLink.create(uploader_id: uploader.id, account_id: account.id, link:"https://www.youtube.com/watch?v=Ds6IwEKRLUU" )
    end

    #random posts

    POSTS_NUM.times do
        uploader = employees[rand(CLEANER_NUM + LEADER_NUM)]
        account = accounts[rand(ACCOUNTS_NUM)] 
        FactoryBot.create(:post,author_id: uploader.id,account_id: account.id)
    end

    #random comments on posts
    posts = Post.all
    COMMENTS_NUM.times do
        uploader = employees[rand(CLEANER_NUM + LEADER_NUM)]
        post = posts[rand(POSTS_NUM)]
        FactoryBot.create(:comment, author_id: uploader.id,post_id: post.id)
    end

    #random likes
    comments = Comment.all
    type = ['Post','Comment']
    count = 0
    LIKES_NUM.times do
        index = count % 2
        liker = employees[rand(CLEANER_NUM + LEADER_NUM)]
        type_id = nil
        if index == 0
            type_id = posts[rand(POSTS_NUM)]
        else
            type_id = comments[rand(COMMENTS_NUM)]
        end
        
        Like.create( likeable_id:type_id.id, likeable_type:type[index], user_id:liker.id )
        count += 1
    end








        




