package travel.web;

import travel.domain.User;
import travel.service.UserService;
import travel.service.impl.UserServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Hashtable;

@WebServlet("/register")
public class RegisterServlet extends HttpServlet {

    private UserService userService = new UserServiceImpl();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String name = request.getParameter("name");
        String password = request.getParameter("password");
        String tel = request.getParameter("tel");

        HashMap<String, String> map  = new HashMap<>();
        if (name == null || password == null) {
            map.put("message", "输入错误");
            Util.outJson(map, response);
            return;
        }

        if (userService.findUserByName(name) != null) {
            map.put("message", "该用户已存在");
            Util.outJson(map, response);
            return;
        }

        User user = new User(name, password, tel);
        User u = userService.addUser(user);
        if (u == null) {
            map.put("message", "注册失败");
            Util.outJson(map, response);
        } else {
            map.put("message", "注册成功");
            Util.outJson(map,response);
        }
    }
}
