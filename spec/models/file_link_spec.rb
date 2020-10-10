# == Schema Information
#
# Table name: file_links
#
#  id          :bigint           not null, primary key
#  uploader_id :integer          not null
#  account_id  :integer          not null
#  link        :text             not null
#
require 'rails_helper'

RSpec.describe FileLink, type: :model do
    subject(:file_link) do
        user = double("user",:id=>1) 
        account = double("account",:id=>1) 
        FileLink.create(uploader_id: user.id, account_id: account.id, link: "www.youtube.com")
    end

    it { should validate_presence_of(:uploader_id) }
    it { should validate_presence_of(:account_id) }
    it { should validate_presence_of(:link) }
    it { should belong_to(:uploader) }
    it { should belong_to(:account) }
end
