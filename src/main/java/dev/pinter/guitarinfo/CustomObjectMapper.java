package dev.pinter.guitarinfo;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.json.JsonMapper;

import jakarta.ws.rs.ext.ContextResolver;
import jakarta.ws.rs.ext.Provider;

import java.util.TimeZone;

@Provider
public class CustomObjectMapper implements ContextResolver<ObjectMapper> {
    private final ObjectMapper mapper;

    public CustomObjectMapper() {
        mapper = JsonMapper.builder()
                .defaultPropertyInclusion(JsonInclude.Value.ALL_NON_NULL)
                .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)
                .build();
    }

    @Override
    public ObjectMapper getContext(Class<?> type) {
        return mapper;
    }
}
