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

require 'rails_helper'

RSpec.describe Account, type: :model do
    subject(:company) do
        FactoryBot.create(:company)
    end


    describe "validations" do
        it { should validate_presence_of(:name) }
        # it { should have_many(:cleaners) }
        # it { should have_one(:company) }
        
    end
end