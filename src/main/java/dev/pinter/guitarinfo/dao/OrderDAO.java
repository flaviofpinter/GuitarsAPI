package dev.pinter.guitarinfo.dao;

import dev.pinter.guitarinfo.entity.Guitar;
import dev.pinter.guitarinfo.entity.Order;
import org.jdbi.v3.sqlobject.config.RegisterConstructorMapper;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.customizer.BindMethods;
import org.jdbi.v3.sqlobject.statement.GetGeneratedKeys;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;

import java.time.LocalDate;
import java.util.List;


public interface OrderDAO {

    @SqlUpdate("""
        INSERT INTO orders (orderDate, status, totalPrice)
        VALUES (:orderDate, :status, :totalPrice)
    """)
    @GetGeneratedKeys
    long insert(@Bind("orderDate") LocalDate orderDate,
                @Bind("status") String status,
                @Bind("totalPrice") String totalPrice);

    @SqlQuery("""
            SELECT * FROM orders WHERE status = 'PENDING'
            """)
    @RegisterConstructorMapper(Order.class)
    List<Order> getPendingOrders();

}
