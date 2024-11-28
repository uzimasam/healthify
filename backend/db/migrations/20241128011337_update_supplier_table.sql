-- +goose Up
-- +goose StatementBegin
ALTER TABLE supplier_hospitals
    ADD COLUMN request_code VARCHAR(255) NOT NULL,
    ADD COLUMN request_status VARCHAR(255) NOT NULL DEFAULT 'pending',
    ADD COLUMN requirements JSONB NOT NULL DEFAULT '{}',
    ADD COLUMN rating INT NOT NULL DEFAULT 0,
    ADD COLUMN supply_status VARCHAR(255) NOT NULL DEFAULT 'pending',
    ADD COLUMN status VARCHAR(255) NOT NULL DEFAULT 'active';

CREATE INDEX supplier_hospitals_request_code_index ON supplier_hospitals (request_code);
CREATE INDEX supplier_hospitals_request_status_index ON supplier_hospitals (request_status);
CREATE INDEX supplier_hospitals_requirements_index ON supplier_hospitals (requirements);
CREATE INDEX supplier_hospitals_rating_index ON supplier_hospitals (rating);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
ALTER TABLE supplier_hospitals
    DROP COLUMN request_code,
    DROP COLUMN request_status,
    DROP COLUMN requirements,
    DROP COLUMN rating,
    DROP COLUMN supply_status,
    DROP COLUMN status;

DROP INDEX IF EXISTS supplier_hospitals_request_code_index;
DROP INDEX IF EXISTS supplier_hospitals_request_status_index;
DROP INDEX IF EXISTS supplier_hospitals_requirements_index;
DROP INDEX IF EXISTS supplier_hospitals_rating_index;
-- +goose StatementEnd
