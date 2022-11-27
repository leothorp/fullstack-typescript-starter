CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email character varying(255) NOT NULL UNIQUE,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
