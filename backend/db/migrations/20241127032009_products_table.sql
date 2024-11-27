-- +goose Up
-- +goose StatementBegin
DROP TABLE IF EXISTS products;

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    code VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category_id INT NOT NULL,
    image_url TEXT,
    sku VARCHAR(255),
    unit VARCHAR(255),
    stock INT NOT NULL DEFAULT 0,
    min_stock INT NOT NULL DEFAULT 0,
    supplier_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT (NOW() AT TIME ZONE 'UTC' + INTERVAL '3 hours'),
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL
);

ALTER TABLE products
    ADD CONSTRAINT products_category_id_fk
    FOREIGN KEY (category_id)
    REFERENCES product_categories (id)
    ON DELETE CASCADE;

ALTER TABLE products
    ADD CONSTRAINT products_supplier_id_fk
    FOREIGN KEY (supplier_id)
    REFERENCES suppliers (id)
    ON DELETE CASCADE;

CREATE INDEX products_category_id_index ON products (category_id);
CREATE INDEX products_supplier_id_index ON products (supplier_id);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP INDEX IF EXISTS products_category_id_index;
DROP INDEX IF EXISTS products_supplier_id_index;

ALTER TABLE products
    DROP CONSTRAINT products_category_id_fk;

ALTER TABLE products
    DROP CONSTRAINT products_supplier_id_fk;

DROP TABLE IF EXISTS products;
-- +goose StatementEnd
