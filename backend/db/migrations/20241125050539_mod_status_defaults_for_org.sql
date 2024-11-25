-- +goose Up
-- +goose StatementBegin
ALTER TABLE organizations
  ALTER COLUMN status SET DEFAULT 'inactive';
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
ALTER TABLE organizations
  ALTER COLUMN status SET DEFAULT 'active';
-- +goose StatementEnd
