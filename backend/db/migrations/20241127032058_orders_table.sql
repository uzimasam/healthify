-- +goose Up
-- +goose StatementBegin
DROP TABLE IF EXISTS orders;

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    order_number VARCHAR(255) NOT NULL UNIQUE,
    supplier_hospital_id INT NOT NULL,
    priority INT NOT NULL DEFAULT 0,
    required_by TIMESTAMP NOT NULL,
    notes TEXT,
    status VARCHAR(255) NOT NULL DEFAULT 'pending',
    rating INT,
    created_at TIMESTAMP NOT NULL DEFAULT (NOW() AT TIME ZONE 'UTC' + INTERVAL '3 hours'),
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL
);

ALTER TABLE orders
    ADD CONSTRAINT orders_supplier_hospital_id_fk
    FOREIGN KEY (supplier_hospital_id)
    REFERENCES supplier_hospitals (id)
    ON DELETE CASCADE;

CREATE INDEX orders_supplier_hospital_id_index ON orders (supplier_hospital_id);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP INDEX IF EXISTS orders_supplier_hospital_id_index;

ALTER TABLE orders
    DROP CONSTRAINT orders_supplier_hospital_id_fk;

DROP TABLE IF EXISTS orders;
-- +goose StatementEnd
