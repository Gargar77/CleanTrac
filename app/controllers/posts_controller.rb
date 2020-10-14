class PostsController < ApplicationController
    before_action :authenticate_user

    def create
        @Post = Post.new(post_create_params)
        @post.author_id = current_user.id

        if @post.save
            render json: @post.id
        else
            render json: @like.errors, status: :unprocessable_entity
        end
    end

    def delete
        @post = post.find(params[:id])

        if @post.nil?
            render json: "no post deleted"
        else
            @post.delete
            render json: @post.id
        end
    end

    def post_create_params
        params.require(:post).permit(:title,:content,:account_id)
    end
    

end