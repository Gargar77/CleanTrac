class AccountsController < ApplicationController
    before_action :authenticate_user

    def show
        @accounts = current_user.accounts
        render :show
    end
end