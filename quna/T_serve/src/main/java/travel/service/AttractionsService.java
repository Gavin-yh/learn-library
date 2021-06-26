package travel.service;

import travel.domain.Attractions;

import java.util.List;

public interface AttractionsService {
    List<Attractions> findAttractionsByCity(Integer cityId);

    Attractions findAttractionsById(Integer id);

    List<Attractions> findWeekendHot();

    List<Attractions> findRecomment();

    List<Attractions> findWeekendGo();

    Attractions findByName(String name);

    List<Attractions> findAll();
}
