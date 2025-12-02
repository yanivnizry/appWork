export const CREATE_TIMEZONES_TABLE = `
  CREATE TABLE IF NOT EXISTS timezones (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    gmtOffset INTEGER NOT NULL
  );
`;

