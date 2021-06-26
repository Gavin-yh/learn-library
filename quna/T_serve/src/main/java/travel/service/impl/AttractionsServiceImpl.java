package travel.service.impl;

import travel.domain.Attractions;
import travel.domain.Comment;
import travel.mapper.AttractionsMapper;
import org.apache.ibatis.session.SqlSession;
import travel.service.AttractionsService;
import travel.service.CommentService;

import java.util.List;

public class AttractionsServiceImpl extends DBUtil
        implements AttractionsService {

    private CommentService service = new CommentServiceImpl();

    @Override
    public List<Attractions> findAttractionsByCity(Integer cityId) {
        try(SqlSession session = getSession()) {
            AttractionsMapper mapper = session.getMapper(AttractionsMapper.class);
            List<Attractions> attractionsList = mapper.findAttractionByCity(cityId);

            for (Attractions attractions : attractionsList) {
                 Integer id = attractions.getId();
                List<Comment> comments = service.findCommentByAttractions(id);
                attractions.setComments(comments);
            }
            return attractionsList;
        }
    }

    private void setComment(Attractions attractions) {
        Integer id = attractions.getId();
        List<Comment> comments = service.findCommentByAttractions(id);
        attractions.setComments(comments);
    }

    @Override
    public Attractions findAttractionsById(Integer id) {
        try(SqlSession session = getSession()) {
            AttractionsMapper mapper = session.getMapper(AttractionsMapper.class);
            Attractions attractions =  mapper.findAttractionById(id);

            List<Comment> comments = service.findCommentByAttractions(id);
            attractions.setComments(comments);
            return attractions;
        }
    }

    @Override
    public List<Attractions> findWeekendHot() {

        try(SqlSession session = getSession()) {
            AttractionsMapper mapper = session.getMapper(AttractionsMapper.class);
            return mapper.findWeekendHot();
        }
    }

    @Override
    public List<Attractions> findRecomment() {

        try(SqlSession session = getSession()) {
            AttractionsMapper mapper = session.getMapper(AttractionsMapper.class);
            return mapper.findRecomment();
        }
    }

    @Override
    public List<Attractions> findWeekendGo() {

        try(SqlSession session = getSession()) {
            AttractionsMapper mapper = session.getMapper(AttractionsMapper.class);
            return mapper.findWeekendGo();
        }
    }

    @Override
    public Attractions findByName(String name) {

        try(SqlSession session = getSession()) {
            AttractionsMapper mapper = session.getMapper(AttractionsMapper.class);
            return mapper.findByName(name);
        }

    }

    @Override
    public List<Attractions> findAll() {

        try(SqlSession session = getSession()) {
            AttractionsMapper mapper = session.getMapper(AttractionsMapper.class);
            return mapper.findAll();
        }
    }
}
