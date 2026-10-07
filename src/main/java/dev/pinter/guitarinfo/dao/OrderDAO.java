package dev.pinter.guitarinfo.dao;

import dev.pinter.guitarinfo.entity.Order;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.customizer.BindMethods;
import org.jdbi.v3.sqlobject.statement.GetGeneratedKeys;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;

import java.time.LocalDate;


public interface OrderDAO {

    @SqlUpdate("""
        INSERT INTO orders (orderDate, status, totalPrice)
        VALUES (:orderDate, :status, :totalPrice)
    """)
    @GetGeneratedKeys
    long insert(@Bind("orderDate") LocalDate orderDate,
                @Bind("status") String status,
                @Bind("totalPrice") String totalPrice);
}
