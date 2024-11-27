-- +goose Up
-- +goose StatementBegin
DROP TABLE IF EXISTS supplier_hospitals;

CREATE TABLE supplier_hospitals (
    id SERIAL PRIMARY KEY,
    supplier_id INT NOT NULL,
    hospital_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT (NOW() AT TIME ZONE 'UTC' + INTERVAL '3 hours'),
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL
);

ALTER TABLE supplier_hospitals
    ADD CONSTRAINT supplier_hospitals_supplier_id_fk
    FOREIGN KEY (supplier_id)
    REFERENCES suppliers (id)
    ON DELETE CASCADE;

ALTER TABLE supplier_hospitals
    ADD CONSTRAINT supplier_hospitals_hospital_id_fk
    FOREIGN KEY (hospital_id)
    REFERENCES hospitals (id)
    ON DELETE CASCADE;

CREATE INDEX supplier_hospitals_supplier_id_index ON supplier_hospitals (supplier_id);
CREATE INDEX supplier_hospitals_hospital_id_index ON supplier_hospitals (hospital_id);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP INDEX IF EXISTS supplier_hospitals_supplier_id_index;
DROP INDEX IF EXISTS supplier_hospitals_hospital_id_index;

ALTER TABLE supplier_hospitals
    DROP CONSTRAINT supplier_hospitals_supplier_id_fk;

ALTER TABLE supplier_hospitals
    DROP CONSTRAINT supplier_hospitals_hospital_id_fk;

DROP TABLE IF EXISTS supplier_hospitals;
-- +goose StatementEnd
