-- +goose Up
-- +goose StatementBegin
DROP TABLE IF EXISTS hospitals;

CREATE TABLE hospitals (
    id SERIAL PRIMARY KEY,
    org_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT (NOW() AT TIME ZONE 'UTC' + INTERVAL '3 hours'),
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL
);

ALTER TABLE hospitals
    ADD CONSTRAINT hospitals_org_id_fk
    FOREIGN KEY (org_id)
    REFERENCES organizations (id)
    ON DELETE CASCADE;

CREATE INDEX hospitals_org_id_index ON hospitals (org_id);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP INDEX IF EXISTS hospitals_org_id_index;

ALTER TABLE hospitals
    DROP CONSTRAINT hospitals_org_id_fk;

DROP TABLE IF EXISTS hospitals;
-- +goose StatementEnd
