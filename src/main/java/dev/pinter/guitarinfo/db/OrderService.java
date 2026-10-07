package dev.pinter.guitarinfo.db;

import dev.pinter.guitarinfo.Requests.CreateOrderItemRequest;
import dev.pinter.guitarinfo.Requests.CreateOrderRequest;
import dev.pinter.guitarinfo.dao.GuitarDAO;
import dev.pinter.guitarinfo.dao.OrderDAO;
import dev.pinter.guitarinfo.dao.OrderItemsDAO;
import dev.pinter.guitarinfo.dao.OrderTransactionDAO;
import dev.pinter.guitarinfo.entity.Order;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.jdbi.v3.core.Jdbi;

import java.time.LocalDate;
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
        return orderDAO.getPendingOrders();
    }


//    @Inject
//    private OrderDAO orderDAO;
//
//    @Inject
//    private OrderItemsDAO orderItemsDAO;


}