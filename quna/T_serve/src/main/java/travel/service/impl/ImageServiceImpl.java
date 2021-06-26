package travel.service.impl;

import org.apache.ibatis.session.SqlSession;
import travel.domain.AttractionsImage;
import travel.mapper.ImageMapper;
import travel.service.ImageService;

import java.util.List;

public class ImageServiceImpl extends DBUtil
        implements ImageService {

    @Override
    public AttractionsImage findImageById(Integer id) {
        try(SqlSession session = getSession()) {
            ImageMapper mapper = session.getMapper(ImageMapper.class);
            return mapper.findImageById(id);
        }
    }

    @Override
    public List<AttractionsImage> findImageByType(String type) {
        try(SqlSession session = getSession()) {
            ImageMapper mapper = session.getMapper(ImageMapper.class);
            return mapper.findImageByType(type);
        }
    }

    @Override
    public List<AttractionsImage> findImageByAttractions(Integer id) {
        try(SqlSession session = getSession()) {
            ImageMapper mapper = session.getMapper(ImageMapper.class);
            return mapper.findImageByAttractions(id);
        }
    }
}
