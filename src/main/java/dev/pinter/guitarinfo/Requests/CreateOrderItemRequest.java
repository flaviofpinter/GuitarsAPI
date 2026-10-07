package dev.pinter.guitarinfo.Requests;

public record CreateOrderItemRequest(
        long guitarId,
        int quantity
) {}
