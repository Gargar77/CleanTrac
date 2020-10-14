class LikesController < ApplicationController
    before_action :authenticate_user


    def create
        @like = Like.new(like_create_params)
        @like.user_id = current_user.id
        if @like.save
            render json: "Success!"
        else
            render json: @like.errors, status: :unprocessable_entity
        end
    end

    def delete
        @like = Like.find_by(likeable_id: params[:like][:likeable_id],likeable_type: params[:like][:likeable_type])
        if @like.nil?
            render json: "no like found"
        else
            @like.delete
            render json: "deleted like!"
        end
    end


    def like_create_params
        params.require(:like).permit(:likeable_id,:likeable_type)
    end

    def like_delete_params
        params.require(:like).permit(:likeable_id,:likeable_type)
    end


end