class ApplicationController < ActionController::Base
    protect_from_forgery with: :exception
    helper_method :current_user, :logged_in?

    private

    def current_user
        @current_user ||= User.find_by(session_token: session[:session_token])
    end

    def logged_in?
        !!current_user
    end

    def login!(user)
        session[:session_token] = user.reset_session_token!
        @current_user = user
    end

    def user_params
        params.require(:user).permit(:username, :password)
    end

    def set_csrf_cookie
        cookies["CSRF-TOKEN"] = form_authenticity_token
    end
    
end
