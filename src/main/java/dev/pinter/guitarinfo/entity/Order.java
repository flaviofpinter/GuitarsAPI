package dev.pinter.guitarinfo.entity;

import org.jdbi.v3.core.mapper.reflect.ColumnName;

import java.time.LocalDate;

public record Order(
        @ColumnName("orderDate") LocalDate orderDate,
        @ColumnName("status") String status,
        @ColumnName("totalPrice") String priceusd) {

    @Override
    public String toString() {
        return "Order{" +
                "orderDate='" + orderDate + '\'' +
                ", status='" + status + '\'' +
                ", priceusd='" + priceusd + '\'' +
                '}';
    }
}