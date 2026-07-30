package dev.pinter.guitarinfo.db;

import jakarta.annotation.sql.DataSourceDefinition;

@DataSourceDefinition(
        name = "java:app/datasource",
        className = "org.h2.jdbcx.JdbcDataSource",
        url = "jdbc:h2:mem:db;IGNORECASE=TRUE",
//        url = "jdbc:h2:file:./dist/database",
        user = "sa",
        password = "changeit"
)
public class DatasourceConfig {

}
