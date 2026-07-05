package dev.pinter.guitarinfo.controllers;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.WebApplicationException;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;
import java.util.Map;

@Path("/guitars")
public class GuitarResource {
    @GET
    @Path("")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getGuitarList() {
        return Response.ok().entity(Map.of(
                "fender", "Stratocaster",
                "gibson", "Les Paul"
        )).build();
    }

    @GET
    @Path("teste")
    @Produces(MediaType.APPLICATION_JSON)
    public Response teste() {
        throw new WebApplicationException("deu erro ta", Response.Status.BAD_REQUEST);
    }
}
