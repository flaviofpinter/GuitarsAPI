package dev.pinter.guitarinfo.dao;

import dev.pinter.guitarinfo.entity.Guitar;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.statement.SqlQuery;

public interface GuitarDAO {
    @SqlQuery("SELECT * FROM guitars WHERE Brand = :brand")
    Guitar getGuitarsByBrand(@Bind("brand") String brand);
}
