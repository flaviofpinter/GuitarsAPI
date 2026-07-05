package dev.pinter.guitarinfo.db;

import dev.pinter.guitarinfo.dao.CheckDAO;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.inject.Produces;
import org.jdbi.v3.core.Jdbi;

@ApplicationScoped
public class DaoProducer {
    @Produces
    public CheckDAO checkDao(Jdbi jdbi){
        return jdbi.onDemand(CheckDAO.class);
    }
}
