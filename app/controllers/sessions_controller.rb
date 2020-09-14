class SessionsController < ApplicationController
  
  
    def create
      @user = User.find_by_credentials(user_params)
      if @user
        login!(@user)
        render :show
      else
        @user = User.new
        flash.now[:errors] = { base: ['Invalid username or password'] }
        render :error
      end
    end
  
    def destroy
      logout!
      # TODO: send status code
    end
  end
  