package dev.pinter.guitarinfo.entity;

import org.jdbi.v3.core.mapper.reflect.ColumnName;

public record Guitar(
        @ColumnName("brand") String brand,
        @ColumnName("model") String model) {

}
