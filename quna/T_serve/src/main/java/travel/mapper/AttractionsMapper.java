package travel.mapper;

import travel.domain.Attractions;

import java.util.List;

public interface AttractionsMapper {
    Attractions findAttractionById(Integer id);

    List<Attractions> findAttractionByCity(Integer cityId);

    List<Attractions> findWeekendHot();

    List<Attractions> findRecomment();

    List<Attractions> findWeekendGo();

    Attractions findByName(String name);

    List<Attractions> findAll();
}
