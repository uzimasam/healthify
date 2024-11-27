-- +goose Up
-- +goose StatementBegin
DROP TABLE IF EXISTS inventories;

CREATE TABLE inventories (
    id SERIAL PRIMARY KEY,
    supplier_hospital_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    unit VARCHAR(255) NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    min_stock INT NOT NULL DEFAULT 0,
    expiry_date TIMESTAMP NOT NULL,
    status VARCHAR(255) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP NOT NULL DEFAULT (NOW() AT TIME ZONE 'UTC' + INTERVAL '3 hours'),
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL
);

ALTER TABLE inventories
    ADD CONSTRAINT inventories_supplier_hospital_id_fk
    FOREIGN KEY (supplier_hospital_id)
    REFERENCES supplier_hospitals (id)
    ON DELETE CASCADE;

ALTER TABLE inventories
    ADD CONSTRAINT inventories_product_id_fk
    FOREIGN KEY (product_id)
    REFERENCES products (id)
    ON DELETE CASCADE;

CREATE INDEX inventories_supplier_hospital_id_index ON inventories (supplier_hospital_id);
CREATE INDEX inventories_product_id_index ON inventories (product_id);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP INDEX IF EXISTS inventories_supplier_hospital_id_index;
DROP INDEX IF EXISTS inventories_product_id_index;

ALTER TABLE inventories
    DROP CONSTRAINT inventories_supplier_hospital_id_fk;

ALTER TABLE inventories
    DROP CONSTRAINT inventories_product_id_fk;

DROP TABLE IF EXISTS inventories;
-- +goose StatementEnd
