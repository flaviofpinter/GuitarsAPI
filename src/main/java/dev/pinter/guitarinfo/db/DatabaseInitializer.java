package dev.pinter.guitarinfo.db;

import com.fasterxml.jackson.annotation.JsonProperty;
import dev.pinter.guitarinfo.entity.Guitar;
import org.jdbi.v3.core.Jdbi;
import org.jdbi.v3.core.mapper.reflect.ColumnName;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.fasterxml.jackson.databind.MappingIterator;
import com.fasterxml.jackson.dataformat.csv.CsvMapper;
import com.fasterxml.jackson.dataformat.csv.CsvSchema;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

public class DatabaseInitializer {
    private static final Logger logger = LoggerFactory.getLogger(DatabaseInitializer.class);
    private final Jdbi jdbi;
    private static final String INSERT_GUITARS = """
            INSERT INTO guitars (
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
            ) VALUES (
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
            """;

    public DatabaseInitializer(Jdbi jdbi) {
        this.jdbi = jdbi;
    }

    public int initDatabase() {
        try {
            createTableJdbi("/h2schemas/guitars.sql", jdbi);
        } catch (IOException e) {
            logger.error("Erro criando tabela", e);
        }
        List<CsvRow> guitarras = parseCsv();

        for (CsvRow g : guitarras) {
            jdbi.useHandle(handle -> {
                handle.createUpdate(INSERT_GUITARS)
                        .bind("brand", g.brand)
                        .bind("model", g.model)
                        .bind("launchYear", g.launchYear)
                        .bind("mostFamousUser", g.mostFamousUser)
                        .bind("primaryColor", g.primaryColorOrFinish)
                        .bind("colorOrFinish", g.primaryColorOrFinish)
                        .bind("guitarType", g.guitarType)
                        .bind("countryOfOrigin", g.countryOfOrigin)
                        .bind("pickupConfiguration", g.pickupConfiguration)
                        .bind("bodyWood", g.bodyWood)
                        .bind("neckConstruction", g.neckConstruction)
                        .bind("status", g.status)
                        .execute();
            });
        }
        return 0;
    }

    private List<CsvRow> parseCsv() {
        CsvMapper csvMapper = new CsvMapper();
        CsvSchema schema = CsvSchema.emptySchema().withHeader();

        List<CsvRow> data;
        Path filePath = Paths.get("dist", "guitarmodels.csv");

        try {
            MappingIterator<CsvRow> iterator = csvMapper.
                    readerFor(CsvRow.class)
                    .with(schema)
                    .readValues(filePath.toFile());
            data = iterator.readAll();

            return data;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private void createTableJdbi(String schemaFile, Jdbi jdbi) throws IOException {
        String schema;
        try (InputStream is = getClass().getResourceAsStream(schemaFile)) {
            schema = new String(is.readAllBytes(), StandardCharsets.UTF_8);
        }

        if (schema.trim().isEmpty()) {
            throw new IOException("schema is empty");
        }
        jdbi.withHandle(handle -> handle.execute(schema));
    }

    private record CsvRow(@JsonProperty("Brand") String brand,
                          @JsonProperty("Model") String model,
                          @JsonProperty("Launch_Year") int launchYear,
                          @JsonProperty("Most_Famous_User") String mostFamousUser,
                          @JsonProperty("Primary_Color_or_Finish") String primaryColorOrFinish,
                          @JsonProperty("Guitar_Type") String guitarType,
                          @JsonProperty("Country_of_Origin") String countryOfOrigin,
                          @JsonProperty("Pickup_Configuration") String pickupConfiguration,
                          @JsonProperty("Body_Wood") String bodyWood,
                          @JsonProperty("Neck_Construction") String neckConstruction,
                          @JsonProperty("Status") String status) {
    }
}
