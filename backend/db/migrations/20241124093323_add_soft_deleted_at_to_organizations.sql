-- +goose Up
-- +goose StatementBegin
ALTER TABLE organizations 
    ADD COLUMN deleted_at TIMESTAMP NULL;
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
ALTER TABLE organizations 
    DROP COLUMN deleted_at;
-- +goose StatementEnd
