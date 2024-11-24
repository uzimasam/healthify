-- +goose Up
-- +goose StatementBegin
DROP TABLE IF EXISTS organizations;

DROP TYPE IF EXISTS org_type;

CREATE TYPE org_type AS ENUM ('supplier', 'hospital', 'admin');

CREATE TABLE
    organizations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        type org_type NOT NULL DEFAULT 'supplier',
        email VARCHAR(500) NOT NULL,
        password VARCHAR(800) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT (NOW() AT TIME ZONE 'UTC' + INTERVAL '3 hours'),
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

CREATE UNIQUE INDEX organizations_email_uindex ON organizations (email);

-- +goose StatementEnd
-- +goose Down
-- +goose StatementBegin

DROP INDEX IF EXISTS organizations_email_uindex;

DROP TABLE IF EXISTS organizations;

DROP TYPE IF EXISTS org_type;
-- +goose StatementEnd