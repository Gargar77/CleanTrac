class ApplicationController < ActionController::API
    include Knock::Authenticable
    #helper_method :current_user, :logged_in?

    private

    # def current_user
    #     @current_user ||= User.find_by(session_token: session[:session_token])
    # end

   
    
end
