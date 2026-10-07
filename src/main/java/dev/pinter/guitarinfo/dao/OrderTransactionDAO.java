package dev.pinter.guitarinfo.dao;

import dev.pinter.guitarinfo.Requests.CreateOrderItemRequest;
import dev.pinter.guitarinfo.Requests.CreateOrderRequest;
import jakarta.inject.Inject;
import org.jdbi.v3.core.Jdbi;

import java.time.LocalDate;

public class OrderTransactionDAO {
    @Inject
    private Jdbi jdbi;

    public long createOrder(CreateOrderRequest request) {
        return jdbi.inTransaction(handle -> {

            OrderDAO orderDAO = handle.attach(OrderDAO.class);
            OrderItemsDAO orderItemDAO = handle.attach(OrderItemsDAO.class);
            GuitarDAO guitarDAO = handle.attach(GuitarDAO.class);

            int totalPrice = 0;

            for (CreateOrderItemRequest item : request.items()) {

                Integer guitarPrice =
                        guitarDAO.getPriceById(item.guitarId());

                if (guitarPrice == null) {
                    throw new IllegalArgumentException(
                            "Guitar not found: " + item.guitarId()
                    );
                }

                totalPrice += guitarPrice * item.quantity();
            }

            long orderId = orderDAO.insert(
                    LocalDate.now(),
                    "PENDING",
                    String.valueOf(totalPrice)
            );

            for (CreateOrderItemRequest item : request.items()) {

                int guitarPrice =
                        guitarDAO.getPriceById(item.guitarId());

                orderItemDAO.insert(
                        orderId,
                        item.guitarId(),
                        item.quantity(),
                        guitarPrice
                );
            }

            return orderId;
        });
    }
}
