package travel.service;

import travel.domain.City;

import java.util.List;

public interface CityService {
    City findCityById(Integer id);

    List<City> findHotCity();

    List<City> findCityByName(String name);

    List<City> findCityByKeyword(String keyword);

    List<City> findAll();
}
