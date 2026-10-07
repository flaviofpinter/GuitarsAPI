CREATE TABLE order_items
(
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    orderId     BIGINT NOT NULL,
    guitarId    BIGINT NOT NULL,
    quantity    INTEGER NOT NULL,
    unitPrice   INTEGER NOT NULL,

    CONSTRAINT fk_order_item_order
        FOREIGN KEY (orderId)
            REFERENCES orders(id),

    CONSTRAINT fk_order_item_guitar
        FOREIGN KEY (guitarId)
            REFERENCES guitars(id)
);