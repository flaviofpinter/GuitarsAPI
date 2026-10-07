package dev.pinter.guitarinfo.entity;

import org.jdbi.v3.core.mapper.reflect.ColumnName;

public record OrderItem(
        @ColumnName("unitPrice") String unitPrice,
        @ColumnName("quantity") String quantity,
        @ColumnName("orderId") String orderId,
        @ColumnName("guitarId") String guitarId
) {

    @Override
    public String toString() {
        return "OrderItem{" +
                "unitPrice='" + unitPrice + '\'' +
                ", quantity='" + quantity + '\'' +
                ", orderId='" + orderId + '\'' +
                ", guitarId='" + guitarId + '\'' +
                '}';
    }
}