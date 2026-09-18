package dev.pinter.guitarinfo.controllers;

import dev.pinter.guitarinfo.dao.GuitarDAO;
import dev.pinter.guitarinfo.entity.Guitar;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.openapi.annotations.parameters.RequestBody;

@Path("/guitars")
public class GuitarResource {

    @Inject
    private GuitarDAO dao;

    @GET
    @Path("")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getGuitarPaginated(
            @QueryParam("limit") int limit,
            @QueryParam("offset") int offset,
            @QueryParam("brand") String brand) {
        return Response.ok().entity(dao.getPaginated(limit, offset, brand)).build();
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getGuitarById(@PathParam("id") String id) {
        return Response.ok().entity(dao.getById(id)).build();
    }

    @GET
    @Path("teste")
    @Produces(MediaType.APPLICATION_JSON)
    public Response teste() {
        throw new WebApplicationException("deu erro ta", Response.Status.BAD_REQUEST);
    }

    @POST
    @Path("/new")
    @Produces(MediaType.APPLICATION_JSON)
    public Response insertNewGuitar(@RequestBody Guitar guitar) {
        long createdGuitar = dao.insert(guitar);
        return Response.ok().entity(createdGuitar).build();
    }
}
