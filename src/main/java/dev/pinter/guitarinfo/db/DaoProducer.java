package dev.pinter.guitarinfo.db;

import dev.pinter.guitarinfo.dao.CheckDAO;
import dev.pinter.guitarinfo.dao.GuitarDAO;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.inject.Produces;
import org.jdbi.v3.core.Jdbi;

@ApplicationScoped
public class DaoProducer {
    @Produces
    public CheckDAO checkDao(Jdbi jdbi) {
        return jdbi.onDemand(CheckDAO.class);
    }

    @Produces
    public GuitarDAO guitarDao(Jdbi jdbi) {
        return jdbi.onDemand(GuitarDAO.class);
    }
}
