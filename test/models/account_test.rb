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
require 'test_helper'

class AccountTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
