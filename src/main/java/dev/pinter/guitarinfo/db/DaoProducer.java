package dev.pinter.guitarinfo.db;

import dev.pinter.guitarinfo.dao.CheckDAO;
import dev.pinter.guitarinfo.dao.GuitarDAO;
import dev.pinter.guitarinfo.dao.OrderDAO;
import dev.pinter.guitarinfo.dao.OrderItemsDAO;
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

    @Produces
    public OrderDAO orderDAO(Jdbi jdbi) {
        return jdbi.onDemand(OrderDAO.class);
    }

    @Produces
    public OrderItemsDAO orderItemsDAO(Jdbi jdbi) {
        return jdbi.onDemand(OrderItemsDAO.class);
    }
}
