CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS app_users (
  uuid uuid DEFAULT uuid_generate_v4() NOT NULL,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY (uuid)
);

INSERT INTO app_users (username, password) VALUES 
('admin', crypt('admin', 'aqui vai o mesmo valor de ELEPHANTSQL_HASH_PWD do .env')),
('jardel', crypt('jardel', 'aqui vai o mesmo valor de ELEPHANTSQL_HASH_PWD do .env'));

