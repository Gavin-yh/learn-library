package travel.service.impl;

import travel.domain.City;
import travel.mapper.CityMapper;
import org.apache.ibatis.session.SqlSession;
import travel.service.CityService;

import java.util.List;

public class CityServiceImpl extends DBUtil
        implements CityService {


    @Override
    public City findCityById(Integer id) {
        try(SqlSession session = getSession()) {
            CityMapper cityMapper = session.getMapper(CityMapper.class);
            return cityMapper.findCityById(id);
        }
    }

    @Override
    public List<City> findHotCity() {
        try(SqlSession session = getSession()) {
            CityMapper cityMapper = session.getMapper(CityMapper.class);
            return cityMapper.findHotCity();
        }
    }

    @Override
    public List<City> findCityByName(String name) {
        try(SqlSession session = getSession()) {
            CityMapper cityMapper = session.getMapper(CityMapper.class);
            return cityMapper.findCityByName(name);
        }
    }

    @Override
    public List<City> findCityByKeyword(String keyword) {
        try(SqlSession session = getSession()) {
            CityMapper cityMapper = session.getMapper(CityMapper.class);
            return cityMapper.findCityByKeyword(keyword);
        }
    }

    @Override
    public List<City> findAll() {
        try(SqlSession session = getSession()) {
            CityMapper cityMapper = session.getMapper(CityMapper.class);
            return cityMapper.findAll();
        }
    }
}
