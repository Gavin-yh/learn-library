package travel.service;

import travel.domain.Comment;

import java.util.List;

public interface CommentService {
    Comment findCommentById(Integer id);
    List<Comment> findCommentByAttractions(Integer id);
}
