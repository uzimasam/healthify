-- +goose Up
-- +goose StatementBegin
DROP TABLE IF EXISTS deliveries;

CREATE TABLE deliveries (
    id SERIAL PRIMARY KEY,
    supplier_hospital_id INT NOT NULL,
    order_id INT NOT NULL,
    driver VARCHAR(255) NOT NULL,
    truck_number VARCHAR(255) NOT NULL,
    required_by TIMESTAMP NOT NULL,
    delivery_date DATE NOT NULL,
    notes TEXT,
    status VARCHAR(255) NOT NULL DEFAULT 'pending',
    rating INT,
    created_at TIMESTAMP NOT NULL DEFAULT (NOW() AT TIME ZONE 'UTC' + INTERVAL '3 hours'),
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL
);

ALTER TABLE deliveries
    ADD CONSTRAINT deliveries_supplier_hospital_id_fk
    FOREIGN KEY (supplier_hospital_id)
    REFERENCES supplier_hospitals (id)
    ON DELETE CASCADE;

ALTER TABLE deliveries
    ADD CONSTRAINT deliveries_order_id_fk
    FOREIGN KEY (order_id)
    REFERENCES orders (id)
    ON DELETE CASCADE;

CREATE INDEX deliveries_supplier_hospital_id_index ON deliveries (supplier_hospital_id);
CREATE INDEX deliveries_order_id_index ON deliveries (order_id);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP INDEX IF EXISTS deliveries_supplier_hospital_id_index;
DROP INDEX IF EXISTS deliveries_order_id_index;

ALTER TABLE deliveries
    DROP CONSTRAINT deliveries_supplier_hospital_id_fk;

ALTER TABLE deliveries
    DROP CONSTRAINT deliveries_order_id_fk;

DROP TABLE IF EXISTS deliveries;
-- +goose StatementEnd
