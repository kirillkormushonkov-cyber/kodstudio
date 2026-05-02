-- KodStudio: reviews schema.
-- Run once in Neon SQL Editor (or psql) to bootstrap the database.

CREATE TABLE IF NOT EXISTS reviews (
  id           BIGSERIAL PRIMARY KEY,
  name         TEXT        NOT NULL,
  position     TEXT,
  company      TEXT,
  rating       SMALLINT    NOT NULL CHECK (rating BETWEEN 1 AND 5),
  text         TEXT        NOT NULL CHECK (length(text) BETWEEN 30 AND 2000),
  email        TEXT        NOT NULL,
  avatar_color TEXT        NOT NULL,
  status       TEXT        NOT NULL DEFAULT 'pending'
                 CHECK (status IN ('pending', 'approved', 'rejected')),
  ip           TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS reviews_status_created_idx
  ON reviews (status, created_at DESC);
