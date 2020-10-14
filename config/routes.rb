Rails.application.routes.draw do
  post 'user_token' => 'user_token#create'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

 

  scope '/api', defaults: {format: :json} do
    get '/user', to: 'users#show'
    get '/accounts', to: 'accounts#show'
    post '/likes', to: 'likes#create'
    delete '/likes', to: 'likes#delete'
    post '/comments', to: 'comments#create'
    delete '/comments', to: 'comments#delete'
  end

  scope '/auth' do
    post '/signin', to: 'user_token#create'
    post '/signup', to: 'users#create'
  end

 

end
