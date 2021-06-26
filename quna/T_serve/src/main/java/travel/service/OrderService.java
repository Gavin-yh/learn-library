package travel.service;

import travel.domain.Order;

import java.util.List;

public interface OrderService {
    Order findOrderById(Integer id);

    List<Order> findOrderByUser(Integer id);

    Order addOrder(Order order);

    Order updateOrder(Order order);
}
