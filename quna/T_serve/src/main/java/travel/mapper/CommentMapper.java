package travel.mapper;

import travel.domain.Comment;

import java.util.List;

public interface CommentMapper {
    Comment findCommentById(Integer id);

    List<Comment> findCommentByAttractions(Integer id);
}
