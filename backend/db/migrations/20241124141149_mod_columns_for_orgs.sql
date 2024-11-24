-- +goose Up
-- +goose StatementBegin
DROP TYPE IF EXISTS org_status;

CREATE TYPE org_status AS ENUM ('active', 'inactive');

ALTER TABLE organizations
    ADD COLUMN phone VARCHAR(20) NULL,
    ADD COLUMN city VARCHAR(255) NULL,
    ADD COLUMN code VARCHAR(20) NULL,
    ADD COLUMN niche VARCHAR(255) NULL,
    ADD COLUMN compliance BOOLEAN NOT NULL DEFAULT FALSE,
    ADD COLUMN business_license BOOLEAN NOT NULL DEFAULT FALSE,
    ADD COLUMN insurance BOOLEAN NOT NULL DEFAULT FALSE,
    ADD COLUMN status org_status NOT NULL DEFAULT 'active';
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
ALTER TABLE organizations
    DROP COLUMN phone,
    DROP COLUMN city,
    DROP COLUMN code,
    DROP COLUMN niche,
    DROP COLUMN compliance,
    DROP COLUMN business_license,
    DROP COLUMN insurance,
    DROP COLUMN status;

DROP TYPE IF EXISTS org_status;
-- +goose StatementEnd