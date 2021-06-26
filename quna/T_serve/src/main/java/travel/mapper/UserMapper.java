package travel.mapper;

import travel.domain.User;

public interface UserMapper {
//    接收一个string的name返回一个User对象
    User findUserByName(String name);
//在UserMapper.xml中实现
    int addUser(User user);
}
