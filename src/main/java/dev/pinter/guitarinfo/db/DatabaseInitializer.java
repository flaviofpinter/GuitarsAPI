package dev.pinter.guitarinfo.db;

import org.jdbi.v3.core.Jdbi;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DatabaseInitializer {
    private static final Logger logger = LoggerFactory.getLogger(DatabaseInitializer.class);
    private final Jdbi jdbi;
    private static final String INSERT_GUITARS = """
            INSERT INTO guitars (
                brand,
                model
            ) VALUES (
                :brand,
                :model
            )
            """;

    public DatabaseInitializer(Jdbi jdbi) {
        this.jdbi = jdbi;
    }

    public int initDatabase() {
        return 0;
    }

    private CsvRow parseCsv() {
        return null;
    }

    private record CsvRow(String brand,
                          String model,
                          String launchYear,
                          String mostFamousUser,
                          String primaryColorOrFinish,
                          String guitarType,
                          String countryOfOrigin,
                          String pickupConfiguration,
                          String bodyWood,
                          String neckConstruction,
                          String status) {}
}
