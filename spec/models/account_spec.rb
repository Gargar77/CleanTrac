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
#  primary_contact_phone    :string           not null
#  name                     :string           not null
#

require 'rails_helper'

RSpec.describe Company, type: :model do
    subject(:company) do
        FactoryBot.create(:company)
    end

    subject(:account) do
        FactoryBot.create(:account,company_id: company.id)
    end


    describe "validations" do
        it { should validate_presence_of(:name) }
        it { should validate_presence_of(:address) }
        it { should validate_presence_of(:primary_contact_name) }
        it { should validate_presence_of(:primary_contact_phone) }
        #TODO: figure out how to test have_many through
        # it { should have_many(:cleaners) }
        it { should belong_to(:company) }
        it { should have_many(:cleaners)}
    end
end
