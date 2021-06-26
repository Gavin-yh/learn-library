package travel.service;

import travel.domain.AttractionsImage;

import java.util.List;

public interface ImageService {
    AttractionsImage findImageById(Integer id);

    List<AttractionsImage> findImageByType(String type);

    List<AttractionsImage> findImageByAttractions(Integer id);
}
