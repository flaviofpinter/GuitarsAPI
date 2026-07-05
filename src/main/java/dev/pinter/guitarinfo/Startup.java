package dev.pinter.guitarinfo;

import dev.pinter.guitarinfo.dao.CheckDAO;
import jakarta.annotation.PostConstruct;
import jakarta.ejb.Singleton;
import jakarta.inject.Inject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@jakarta.ejb.Startup
@Singleton
public class Startup {
    private static final Logger logger = LoggerFactory.getLogger(Startup.class);

    @Inject
    private CheckDAO checkDAO;

    @PostConstruct
    public void init() {
        if (checkDAO.ping() == 1) {
            logger.info("database initialized");
        }
    }
}
