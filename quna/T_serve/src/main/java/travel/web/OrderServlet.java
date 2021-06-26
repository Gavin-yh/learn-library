package travel.web;

import travel.domain.Order;
import travel.domain.User;
import travel.service.OrderService;
import travel.service.impl.OrderServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;

@WebServlet("/order")
public class OrderServlet extends HttpServlet {

    private OrderService orderService = new OrderServiceImpl();

    @Override
    protected void doGet(HttpServletRequest request,
                         HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        User currentUser = (User) session.getAttribute("user");

        String id = request.getParameter("id");
        if (id != null) {
            Integer orderId = Integer.valueOf(id);
            Order order = orderService.findOrderById(orderId);
            if (order != null && order.getUserId() == currentUser.getId()) {
                Util.outJson(order,response);
            }
            return;
        }

        /* 如果 id 为空则返回用户所有的订单 */
        List<Order> orders =  orderService.findOrderByUser(currentUser.getId());
        Util.outJson(orders, response);
    }

    @Override
    protected void doPost(HttpServletRequest request,
                          HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        User currentUser = (User) session.getAttribute("user");

        Order order;
        try {

            String name = request.getParameter("name");
            Float price = Float.valueOf(request.getParameter("price"));
            Integer count = Integer.valueOf(request.getParameter("count"));
            Integer userId = currentUser.getId();
            Integer attractionsId = Integer.valueOf(request.getParameter("attractionsId"));
            System.out.printf("%s ", count);
            order = new Order(name, price, count, attractionsId, userId);
        } catch (Exception e) {
            response.sendError(400,"Bad Request");
            return;
        }

        order = orderService.addOrder(order);
        Util.outJson(order, response);
    }
}
