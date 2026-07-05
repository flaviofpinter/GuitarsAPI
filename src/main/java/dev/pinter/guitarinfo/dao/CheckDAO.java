package dev.pinter.guitarinfo.dao;

import org.jdbi.v3.core.Jdbi;
import org.jdbi.v3.sqlobject.statement.SqlQuery;

public interface CheckDAO {
    @SqlQuery("SELECT 1")
    int ping();
}
