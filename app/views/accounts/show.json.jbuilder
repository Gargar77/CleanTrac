
json.account_info do
    json.array!(@accounts) do |account|
        json.company_id account.id
        json.account_name account.name
        json.address account.address
        json.primary_contact_name account.primary_contact_name
        json.primary_contact_phone account.primary_contact_phone
        json.monday_cleaning account.monday_cleaning
        json.tuesday_cleaning account.tuesday_cleaning
        json.wednesday_cleaning account.wednesday_cleaning
        json.thursday_cleaning account.thursday_cleaning
        json.friday_cleaning account.friday_cleaning
        json.saturday_cleaning account.saturday_cleaning
        json.sunday_cleaning account.sunday_cleaning
        json.cleaning_timeframe_start account.cleaning_timeframe_start
        json.cleaning_timeframe_end account.cleaning_timeframe_end
    end
end

json.posts do
    json.array!(@accounts.posts) do |post|
        json.title post.title
        json.content post.content
        json.author post.author.first_name
        json.array!(post.comments) do |comment|
            json.author comment.author
            json.content comment.content
            json.likes comment.num_likes
        end
    end

end