package dev.pinter.guitarinfo;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import jakarta.ws.rs.BadRequestException;
import jakarta.ws.rs.ForbiddenException;
import jakarta.ws.rs.InternalServerErrorException;
import jakarta.ws.rs.NotAcceptableException;
import jakarta.ws.rs.NotAllowedException;
import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.NotSupportedException;
import jakarta.ws.rs.WebApplicationException;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Map;

import static java.util.Map.entry;

@Provider
public class GenericExceptionMapper implements ExceptionMapper<Throwable> {
    private static final Map<Class<? extends Throwable>, Response.Status> STATUS_MAP = Map.ofEntries(
            entry(NotFoundException.class, Response.Status.NOT_FOUND),
            entry(NotAllowedException.class, Response.Status.METHOD_NOT_ALLOWED),
            entry(NotAcceptableException.class, Response.Status.NOT_ACCEPTABLE),
            entry(ForbiddenException.class, Response.Status.FORBIDDEN),
            entry(InternalServerErrorException.class, Response.Status.INTERNAL_SERVER_ERROR),
            entry(BadRequestException.class, Response.Status.BAD_REQUEST),
            entry(NumberFormatException.class, Response.Status.BAD_REQUEST),
            entry(NotSupportedException.class, Response.Status.UNSUPPORTED_MEDIA_TYPE)
    );
    private static final Logger logger = LoggerFactory.getLogger(GenericExceptionMapper.class);

    @Override
    public Response toResponse(Throwable throwable) {
        Throwable exception = throwable;
        if (throwable.getCause() != null) {
            exception = throwable.getCause();
        }

        StringWriter stackTrace = new StringWriter();
        exception.printStackTrace(new PrintWriter(stackTrace));

        Response.Status responseStatus = fromException(exception);
        String message = exception.getMessage();
        if (responseStatus == Response.Status.SERVICE_UNAVAILABLE && exception instanceof WebApplicationException wae) {
            Response res = wae.getResponse();

            if (res != null) {
                if (wae.getMessage() != null && !wae.getMessage().equals(responseStatus.getReasonPhrase())) {
                    message = wae.getMessage();
                    responseStatus = Response.Status.fromStatusCode(wae.getResponse().getStatus());
                } else if (wae.getResponse().getStatusInfo() != null) {
                    String reasonPhrase = wae.getResponse().getStatusInfo().getReasonPhrase();
                    if (reasonPhrase != null && !reasonPhrase.equals(responseStatus.getReasonPhrase())) {
                        responseStatus = Response.Status.fromStatusCode(wae.getResponse().getStatus());
                        message = reasonPhrase;
                    }
                }
            }
        }

        return JsonError.createMessage(responseStatus, message, exception);
    }

    private boolean exceptionEquals(Throwable ex1, Class<? extends Throwable> cls) {
        return cls.isInstance(ex1);
    }

    private Response.Status fromException(Throwable ex) {
        return STATUS_MAP.entrySet().stream()
                .filter(entry -> exceptionEquals(ex, entry.getKey()))
                .map(Map.Entry::getValue)
                .findFirst().orElse(Response.Status.SERVICE_UNAVAILABLE);
    }
}
