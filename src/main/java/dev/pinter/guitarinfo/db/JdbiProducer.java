package dev.pinter.guitarinfo.db;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.Resource;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.inject.Produces;
import org.jdbi.v3.core.Jdbi;
import org.jdbi.v3.sqlobject.SqlObjectPlugin;

import javax.sql.DataSource;

@ApplicationScoped
public class JdbiProducer {
    @Resource(lookup = "java:app/datasource")
    private DataSource ds;
    private Jdbi jdbi;

    @PostConstruct
    public void init() {
        this.jdbi = Jdbi.create(ds);
        this.jdbi.installPlugin(new SqlObjectPlugin());
        new DatabaseInitializer(this.jdbi).initDatabase();
    }

    @Produces
    public Jdbi jdbi() {
        return jdbi;
    }
}
