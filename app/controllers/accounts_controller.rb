require 'byebug'

class AccountsController < ApplicationController
    before_action :authenticate_user

    def show
        @accounts = current_user.accounts
        # debugger
        render :show
    end
end