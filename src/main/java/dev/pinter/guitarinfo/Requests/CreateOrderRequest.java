package dev.pinter.guitarinfo.Requests;

import java.util.List;

public record CreateOrderRequest(
        List<CreateOrderItemRequest> items
) {}