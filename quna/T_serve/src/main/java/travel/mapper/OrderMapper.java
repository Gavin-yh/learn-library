package travel.mapper;

import travel.domain.Order;

import java.util.List;

public interface OrderMapper {
    Order findOrderById(Integer id);

    List<Order> findOrderByUser(Integer id);

    int addOrder(Order order);

    int updateOrder(Order order);
}
