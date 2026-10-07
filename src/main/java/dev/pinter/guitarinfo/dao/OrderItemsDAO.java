package dev.pinter.guitarinfo.dao;

import dev.pinter.guitarinfo.entity.OrderItem;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.customizer.BindMethods;
import org.jdbi.v3.sqlobject.statement.GetGeneratedKeys;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;


public interface OrderItemsDAO {

    @SqlUpdate("""
                INSERT INTO order_items
                    (orderId, guitarId, quantity, unitPrice)
                VALUES
                    (:orderId, :guitarId, :quantity, :unitPrice)
            """)
    @GetGeneratedKeys
    long insert(@Bind("orderId") long orderId,
                @Bind("guitarId") long guitarId,
                @Bind("quantity") int quantity,
                @Bind("unitPrice") int unitPrice);
}
