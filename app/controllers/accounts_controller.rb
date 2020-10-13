require 'byebug'

class AccountsController < ApplicationController
    before_action :authenticate_user

    def show
        @accounts = current_user.accounts
        @user = current_user
        # debugger
        render :show
    end
end