package dev.pinter.guitarinfo.dao;

import dev.pinter.guitarinfo.entity.Guitar;
import org.jdbi.v3.sqlobject.config.RegisterConstructorMapper;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.customizer.BindBean;
import org.jdbi.v3.sqlobject.customizer.BindMethods;
import org.jdbi.v3.sqlobject.statement.GetGeneratedKeys;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;

import java.util.List;

public interface GuitarDAO {
    @SqlQuery("SELECT * FROM guitars WHERE Brand = :brand")
    @RegisterConstructorMapper(Guitar.class)
    List<Guitar> getByBrand(@Bind("brand") String brand);

    @SqlQuery("SELECT * FROM guitars WHERE Id = :id")
    @RegisterConstructorMapper(Guitar.class)
    List<Guitar> getById(@Bind("id") String id);

    @SqlQuery("SELECT DISTINCT(brand) FROM guitars")
    List<String> getBrands();

    @SqlUpdate("""
            INSERT INTO guitars
            (
                brand,
                model,
                launchYear,
                mostFamousUser,
                primaryColor,
                colorOrFinish,
                guitarType,
                countryOfOrigin,
                pickupConfiguration,
                bodyWood,
                neckConstruction,
                status
            )
            VALUES
            (
                :brand,
                :model,
                :launchYear,
                :mostFamousUser,
                :primaryColor,
                :colorOrFinish,
                :guitarType,
                :countryOfOrigin,
                :pickupConfiguration,
                :bodyWood,
                :neckConstruction,
                :status
            )
            """)
    @GetGeneratedKeys
    long insert(@BindMethods Guitar guitar);
}
