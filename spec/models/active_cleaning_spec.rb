# == Schema Information
#
# Table name: active_cleanings
#
#  id         :bigint           not null, primary key
#  account_id :integer          not null
#  user_id    :integer          not null
#
require 'rails_helper'

RSpec.describe ActiveCleaning, type: :model do
    subject(:active_cleaning) do
        user = double("user",:id=>1)
        account = double("account",:id=>1)
        ActiveCleaning.create(account_id:account.id,user_id:user.id)
    end


    it { should validate_presence_of(:account_id)}
    it { should validate_presence_of(:account_id)}
    it { should belong_to(:user)}
    it { should belong_to(:account)}
end
