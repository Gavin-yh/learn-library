package travel.mapper;

import travel.domain.City;

import java.util.List;

public interface CityMapper {

    List<City> findAll();

    List<City> findCityByKeyword(String keyword);

    City findCityById(Integer id);

    List<City> findHotCity();

    List<City> findCityByName(String name);
}
