class LikesController < ApplicationController
    before_action :authenticate_user


    def create
        @like = Like.new(like_create_params)
        @like.user_id = current_user.id
        puts @like.user_id
        if @like.save
            render json: "Success!"
        else
            render json: @like.errors, status: :unprocessable_entity
        end
    end

    def delete

    end


    def like_create_params
        params.require(:like).permit(:likeable_id,:likeable_type)
    end


end