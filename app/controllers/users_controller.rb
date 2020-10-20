class UsersController < ApplicationController
    before_action :authenticate_user, except: [:create]
  
    def show
       @user = current_user
    end

    def create
      @user = User.new(user_create_params)
      if @user.save
        render json: "#{@user.first_name} created!", status: :created 
      else
        render json: @user.errors.full_messages, status: :unprocessable_entity
      end
    end



    def user_create_params
      params.require(:user).permit(:email, :password,:role,:first_name,:last_name,:company_id,:leader_id,:phone)
    end

  end