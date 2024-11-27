-- +goose Up
-- +goose StatementBegin
ALTER TABLE organizations
    DROP COLUMN compliance,
    DROP COLUMN business_license,
    DROP COLUMN insurance
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
ALTER TABLE organizations
    ADD COLUMN compliance BOOLEAN NOT NULL DEFAULT FALSE,
    ADD COLUMN business_license BOOLEAN NOT NULL DEFAULT FALSE,
    ADD COLUMN insurance BOOLEAN NOT NULL DEFAULT FALSE
-- +goose StatementEnd
