package travel.service;

import travel.domain.User;

public interface UserService {
    User validateUser(String name, String password);

    User addUser(User user);

    User findUserByName(String name);
}
