package travel.service.impl;

import travel.domain.Comment;
import travel.mapper.CommentMapper;
import org.apache.ibatis.session.SqlSession;
import travel.service.CommentService;

import java.util.List;

public class CommentServiceImpl extends DBUtil
        implements CommentService {
    @Override
    public Comment findCommentById(Integer id) {
        try(SqlSession session = getSession()) {
            CommentMapper mapper = session.getMapper(CommentMapper.class);
            return mapper.findCommentById(id);
        }
    }

    @Override
    public List<Comment> findCommentByAttractions(Integer id) {
        try(SqlSession session = getSession()) {
            CommentMapper mapper = session.getMapper(CommentMapper.class);
            return mapper.findCommentByAttractions(id);
        }
    }
}
