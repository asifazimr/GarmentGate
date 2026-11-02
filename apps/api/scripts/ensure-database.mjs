// Creates the database in DATABASE_URL if it doesn't exist yet (for e2e and fresh environments).
import pg from 'pg';

const url = new URL(process.env.DATABASE_URL ?? '');
const name = url.pathname.slice(1);
if (!/^[a-z0-9_]+$/.test(name)) throw new Error(`Unexpected database name: ${name}`);
url.pathname = '/postgres';
const admin = new pg.Client({ connectionString: url.toString() });
await admin.connect();
const { rowCount } = await admin.query('SELECT 1 FROM pg_database WHERE datname = $1', [name]);
if (rowCount === 0) {
  await admin.query(`CREATE DATABASE "${name}"`);
  console.warn(`Created database ${name}`);
}
await admin.end();
