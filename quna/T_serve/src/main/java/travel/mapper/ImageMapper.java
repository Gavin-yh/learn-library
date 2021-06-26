package travel.mapper;

import travel.domain.Attractions;
import travel.domain.AttractionsImage;

import java.util.List;

public interface ImageMapper {
    AttractionsImage findImageById(Integer id);

    List<AttractionsImage> findImageByType(String type);

    List<AttractionsImage> findImageByAttractions(Integer attractionsId);
}
