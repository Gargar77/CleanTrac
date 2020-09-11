require 'rails_helper'
# == Schema Information
#
# Table name: companies
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  website    :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
RSpec.describe Company, type: :model do
    subject(:company) do
        FactoryBot.create(:company)
    end


    describe "validations" do
        it { should validate_presence_of(:name) }
        it { should have_many(:users) }
    end
end