
json.extract! @user

json.user do
    json.userId @user.id
    json.firstName @user.first_name
    json.lastName @user.last_name
    json.email @user.email
    json.phone @user.phone
end

json.random "hello"