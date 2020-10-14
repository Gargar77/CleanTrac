class CommentsController < ApplicationController

    def create
        @comment = Comment.new(comment_create_params)
        @comment.author_id = current_user.id

        if @comment.save
            render json: @comment.id
        else
            render json: @like.errors, status: :unprocessable_entity
        end
    end

    def delete
        @comment = Comment.find(params[:id])

        if @comment.nil?
            render json: "no comment deleted"
        else
            render json: "comment deleted!"
        end
    end

    def comment_create_params
        params.require(:comment).permit(:post_id,:content)
    end

end