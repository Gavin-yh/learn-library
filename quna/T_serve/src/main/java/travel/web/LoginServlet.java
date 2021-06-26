package travel.web;

import travel.domain.User;
import travel.service.UserService;
import travel.service.impl.UserServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.HashMap;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {

    private UserService userService = new UserServiceImpl();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String name = request.getParameter("name");
        String password = request.getParameter("password");
        /*System.out.printf("%s ", name);*/
        /*System.out.printf("%s ", password);*/
        User user = userService.validateUser(name, password);
        if (user != null) {
            /* 隐藏密码 */
            user.setPassword(null);
            Util.outJson(user,response);
            HttpSession session = request.getSession();
            session.setAttribute("user", user);
        } else {
            HashMap<String, String> map = new HashMap<>();
            map.put("message", "用户名或密码错误");
            Util.outJson(map, response);
        }
    }
}
