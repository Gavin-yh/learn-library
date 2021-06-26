package travel.service.impl;

import org.apache.ibatis.session.SqlSession;
import travel.domain.User;
import travel.mapper.UserMapper;
import travel.service.UserService;

public class UserServiceImpl extends DBUtil implements UserService {
    @Override
    public User validateUser(String name, String password) {
        try(SqlSession session = getSession()) {
            UserMapper mapper = session.getMapper(UserMapper.class);
            User user = mapper.findUserByName(name);
            if (user != null && password.equals(user.getPassword())) {
                return user;
            }
            return null;
        }
    }

    @Override
    public User addUser(User user) {
        try(SqlSession session = getSession()) {
            UserMapper mapper = session.getMapper(UserMapper.class);
            int result = mapper.addUser(user);
            session.commit();
            if (result > 0) {
                return user;
            }
            return null;
        }
    }

    @Override
    public User findUserByName(String name) {
        try(SqlSession session = getSession()) {
            UserMapper mapper = session.getMapper(UserMapper.class);
            return mapper.findUserByName(name);
        }
    }
}
