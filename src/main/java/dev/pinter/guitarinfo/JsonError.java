package dev.pinter.guitarinfo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.eclipse.microprofile.openapi.annotations.media.Schema;

import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.io.PrintWriter;
import java.io.StringWriter;

@Schema
public class JsonError {
    @Schema
    @JsonProperty("status")
    private int status;

    @Schema
    @JsonProperty("message")
    private String message;

    @Schema
    @JsonProperty("errorDetail")
    private String errorDetail;

    @JsonIgnore
    private String exceptionName;

    @JsonIgnore
    private long errorTimestamp = System.currentTimeMillis() / 1000;

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getErrorDetail() {
        return errorDetail;
    }

    public void setErrorDetail(String errorDetail) {
        this.errorDetail = errorDetail;
    }

    public String getExceptionName() {
        return exceptionName;
    }

    public void setExceptionName(String exceptionName) {
        this.exceptionName = exceptionName;
    }

    public long getErrorTimestamp() {
        return errorTimestamp;
    }

    public void setErrorTimestamp(long errorTimestamp) {
        this.errorTimestamp = errorTimestamp;
    }

    public static Response createMessage(Response.Status status, String message, Throwable exception) {
        Throwable targetException = exception;
        if (exception.getCause() != null) {
            targetException = exception.getCause();
        }

        StringWriter errorStackTrace = new StringWriter();
        targetException.printStackTrace(new PrintWriter(errorStackTrace));

        String exceptionName = targetException.getClass().getName();

        return createMessage(status, message, errorStackTrace.toString(), exceptionName);
    }

    public static Response createMessage(Response.Status status) {
        return createMessage(status, status.getReasonPhrase(), null, null);
    }

    public static Response createMessage(Response.Status status, String message) {
        return createMessage(status, message, null, null);
    }

    public static Response createMessage(Response.Status status, String message, String errorDetail) {
        JsonError error = new JsonError();
        error.setMessage(message);
        error.setStatus(status.getStatusCode());
        error.setErrorDetail(errorDetail);
        error.setErrorTimestamp(System.currentTimeMillis() / 1000);

        return Response.status(status)
                .entity(error)
                .type(MediaType.APPLICATION_JSON)
                .build();
    }

    public static Response createMessage(Response.Status status, String message, String errorDetail, String exceptionName) {
        JsonError error = new JsonError();
        error.setMessage(message);
        error.setStatus(status.getStatusCode());
        if (errorDetail != null) {
            error.setErrorDetail(errorDetail);
        }
        error.setErrorTimestamp(System.currentTimeMillis() / 1000);
        error.setExceptionName(exceptionName);

        return Response.status(status)
                .entity(error)
                .type(MediaType.APPLICATION_JSON)
                .build();
    }
}
