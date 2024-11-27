-- +goose Up
-- +goose StatementBegin
DROP TABLE IF EXISTS suppliers;

CREATE TABLE suppliers (
    id SERIAL PRIMARY KEY,
    org_id INT NOT NULL,
    compliance BOOLEAN NOT NULL DEFAULT FALSE,
    business_license BOOLEAN NOT NULL DEFAULT FALSE,
    insurance BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT (NOW() AT TIME ZONE 'UTC' + INTERVAL '3 hours'),
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL
);

ALTER TABLE suppliers
    ADD CONSTRAINT suppliers_org_id_fk
    FOREIGN KEY (org_id)
    REFERENCES organizations (id)
    ON DELETE CASCADE;

CREATE INDEX suppliers_org_id_index ON suppliers (org_id);

-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP INDEX IF EXISTS suppliers_org_id_index;

ALTER TABLE suppliers
    DROP CONSTRAINT suppliers_org_id_fk;

DROP TABLE IF EXISTS suppliers;
-- +goose StatementEnd
