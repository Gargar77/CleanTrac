# == Schema Information
#
# Table name: file_links
#
#  id          :bigint           not null, primary key
#  uploader_id :integer          not null
#  account_id  :integer          not null
#  link        :text             not null
#
class FileLink < ApplicationRecord
validates :uploader_id, :account_id, :link presence:true

belongs_to :uploader,
class_name: 'User',
foreign_key: :uploader_id,
primary_key: :id

belongs_to :account,
class_name: 'Account',
foreign_key: :account_id,
primary_key: :id


end
