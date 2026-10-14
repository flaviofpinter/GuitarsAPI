package dev.pinter.guitarinfo.db;

import dev.pinter.guitarinfo.Requests.CreateOrderRequest;
import dev.pinter.guitarinfo.dao.OrderDAO;
import dev.pinter.guitarinfo.dao.OrderTransactionDAO;
import dev.pinter.guitarinfo.entity.Order;
import jakarta.inject.Inject;

import java.util.List;

public class OrderService {

    @Inject
    private OrderTransactionDAO orderTransactionDAO;

    @Inject
    private OrderDAO orderDAO;


    public long createOrder(CreateOrderRequest request) {
        return orderTransactionDAO.createOrder(request);
    }

    public List<Order> getPendingOrders() {
        List<Order> orders = orderDAO.getPendingOrders();
        return orders != null ? orders : List.of();
    }


//    @Inject
//    private OrderDAO orderDAO;
//
//    @Inject
//    private OrderItemsDAO orderItemsDAO;


}