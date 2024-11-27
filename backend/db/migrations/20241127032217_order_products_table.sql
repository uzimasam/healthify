-- +goose Up
-- +goose StatementBegin
DROP TABLE IF EXISTS order_products;

CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    unit VARCHAR(255) NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT (NOW() AT TIME ZONE 'UTC' + INTERVAL '3 hours'),
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL
);

ALTER TABLE order_products
    ADD CONSTRAINT order_products_order_id_fk
    FOREIGN KEY (order_id)
    REFERENCES orders (id)
    ON DELETE CASCADE;

ALTER TABLE order_products
    ADD CONSTRAINT order_products_product_id_fk
    FOREIGN KEY (product_id)
    REFERENCES products (id)
    ON DELETE CASCADE;

CREATE INDEX order_products_order_id_index ON order_products (order_id);
CREATE INDEX order_products_product_id_index ON order_products (product_id);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP INDEX IF EXISTS order_products_order_id_index;
DROP INDEX IF EXISTS order_products_product_id_index;

ALTER TABLE order_products
    DROP CONSTRAINT order_products_order_id_fk;

ALTER TABLE order_products
    DROP CONSTRAINT order_products_product_id_fk;
    
DROP TABLE IF EXISTS order_products;
-- +goose StatementEnd
