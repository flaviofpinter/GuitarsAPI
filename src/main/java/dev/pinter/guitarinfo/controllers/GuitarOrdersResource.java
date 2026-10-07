package dev.pinter.guitarinfo.controllers;

import dev.pinter.guitarinfo.Requests.CreateOrderRequest;
import dev.pinter.guitarinfo.dao.GuitarDAO;
import dev.pinter.guitarinfo.db.OrderService;
import dev.pinter.guitarinfo.entity.Guitar;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.openapi.annotations.parameters.RequestBody;

@Path("/orders")
public class GuitarOrdersResource {

    @Inject
    private OrderService orderService;

    @POST
    @Path("/new")
    @Produces(MediaType.APPLICATION_JSON)
    public Response createOrder(CreateOrderRequest request) {

        long orderId = orderService.createOrder(request);

        return Response
                .status(Response.Status.CREATED)
                .entity(orderId)
                .build();
    }

}
