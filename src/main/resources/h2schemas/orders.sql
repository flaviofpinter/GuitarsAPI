CREATE TABLE orders
(
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    orderDate   DATE NOT NULL,
    status      VARCHAR(255),
    totalPrice  INTEGER NOT NULL
);