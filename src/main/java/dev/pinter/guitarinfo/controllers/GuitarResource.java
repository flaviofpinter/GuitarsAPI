package dev.pinter.guitarinfo.controllers;

import dev.pinter.guitarinfo.dao.GuitarDAO;
import dev.pinter.guitarinfo.entity.Guitar;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.openapi.annotations.parameters.RequestBody;

import java.util.List;
import java.util.Map;

@Path("/guitars")
public class GuitarResource {

    @Inject
    private GuitarDAO dao;

    @GET
    @Path("")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getGuitarList(@QueryParam("brand") String brand) {
        return Response.ok().entity(dao.getByBrand(brand)).build();
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
