package dev.pinter.guitarinfo;

import com.fasterxml.jackson.core.util.JacksonFeature;
import dev.pinter.guitarinfo.controllers.GuitarResource;
import jakarta.ws.rs.ApplicationPath;
import jakarta.ws.rs.core.Application;
import org.glassfish.jersey.server.ServerProperties;

import java.util.Map;
import java.util.Set;

@ApplicationPath("/")
public class Api extends Application {
    @Override
    public Set<Class<?>> getClasses() {
        return Set.of(
                JacksonFeature.class,
                CustomObjectMapper.class,
                GenericExceptionMapper.class,
                GuitarResource.class
        );
    }

    @Override
    public Map<String, Object> getProperties() {
        return Map.of(
                ServerProperties.MOXY_JSON_FEATURE_DISABLE, true
        );
    }
}
