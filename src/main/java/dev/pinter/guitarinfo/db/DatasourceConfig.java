package dev.pinter.guitarinfo.db;

import jakarta.annotation.sql.DataSourceDefinition;

@DataSourceDefinition(
        name = "java:app/datasource",
        className = "org.h2.jdbcx.JdbcDataSource",
        url = "jdbc:h2:mem:db",
        user = "sa",
        password = "changeit"
)
public class DatasourceConfig {

}
