package travel.service.impl;

import org.apache.ibatis.session.SqlSession;
import travel.domain.Order;
import travel.mapper.OrderMapper;
import travel.service.OrderService;

import java.util.List;

public class OrderServiceImpl extends DBUtil
        implements OrderService {

    @Override
    public Order findOrderById(Integer id) {
        try(SqlSession session = getSession()) {
            OrderMapper mapper = session.getMapper(OrderMapper.class);
            return mapper.findOrderById(id);
        }
    }

    @Override
    public List<Order> findOrderByUser(Integer id) {
        try(SqlSession session = getSession()) {
            OrderMapper mapper = session.getMapper(OrderMapper.class);
            return mapper.findOrderByUser(id);
        }
    }

    @Override
    public Order addOrder(Order order) {
        try(SqlSession session = getSession()) {
            OrderMapper mapper = session.getMapper(OrderMapper.class);
            int result = mapper.addOrder(order);
            session.commit();
            if (result > 0) {
                return mapper.findOrderById(order.getId());
            }
            return null;
        }
    }

    @Override
    public Order updateOrder(Order order) {
        try(SqlSession session = getSession()) {
            OrderMapper mapper = session.getMapper(OrderMapper.class);
            int result = mapper.updateOrder(order);
            session.commit();
            if (result > 0) {
                return mapper.findOrderById(order.getId());
            }
            return null;
        }
    }
}
