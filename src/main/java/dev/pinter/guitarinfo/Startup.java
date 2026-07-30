package dev.pinter.guitarinfo;

import dev.pinter.guitarinfo.dao.CheckDAO;
import dev.pinter.guitarinfo.dao.GuitarDAO;
import dev.pinter.guitarinfo.entity.Guitar;
import jakarta.annotation.PostConstruct;
import jakarta.ejb.Singleton;
import jakarta.inject.Inject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@jakarta.ejb.Startup
@Singleton
public class Startup {
    private static final Logger logger = LoggerFactory.getLogger(Startup.class);

    @Inject
    private CheckDAO checkDAO;

    @Inject
    private GuitarDAO guitarDAO;

    @PostConstruct
    public void init() {
        if (checkDAO.ping() == 1) {
            logger.info("database initialized");
        }
        List<Guitar> g = guitarDAO.getByBrand("Fender");
        logger.info("guitars: {}", g.toString());
        logger.info("brands: {}", guitarDAO.getBrands().toString());
    }
}
