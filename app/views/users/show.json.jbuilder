
json.extract! @user
leaderId = nil
if @user.leader
    leaderId = @user.leader.id
end
json.user do
    json.userId @user.id
    json.firstName @user.first_name
    json.lastName @user.last_name
    json.role @user.role
    json.email @user.email
    json.phone @user.phone
    json.leaderId leaderId
end