// Creates (or promotes) a GarmentGate staff account. For the first admin of a new environment;
// after that, use Admin → Users. Usage:
//   DATABASE_URL=… node scripts/create-admin.mjs admin@garmentgate.com "First" "Last"
// The password is read from ADMIN_PASSWORD, or prompted for, never from the command line.
import { randomUUID } from 'node:crypto';
import { createInterface } from 'node:readline/promises';
import { hash } from '@node-rs/argon2';
import pg from 'pg';

const [email, firstName = 'GarmentGate', lastName = 'Admin'] = process.argv.slice(2);
if (!email?.includes('@')) {
  console.error('Usage: node scripts/create-admin.mjs <email> [first name] [last name]');
  process.exit(1);
}
let password = process.env.ADMIN_PASSWORD;
if (!password) {
  const rl = createInterface({ input: process.stdin, output: process.stderr });
  password = await rl.question('Password (12+ characters): ');
  rl.close();
}
if (password.length < 12) {
  console.error('Use at least 12 characters.');
  process.exit(1);
}

const db = new pg.Client({ connectionString: process.env.DATABASE_URL });
await db.connect();
const { rowCount } = await db.query(
  `INSERT INTO users (id, email, "passwordHash", role, status, "firstName", "lastName", "emailVerifiedAt", "updatedAt")
   VALUES ($1, $2, $3, 'ADMIN', 'ACTIVE', $4, $5, now(), now())
   ON CONFLICT (email) DO UPDATE SET role = 'ADMIN', status = 'ACTIVE', "passwordHash" = EXCLUDED."passwordHash", "updatedAt" = now()`,
  [randomUUID(), email.trim().toLowerCase(), await hash(password), firstName, lastName],
);
await db.end();
console.warn(rowCount === 1 ? `Admin ready: ${email}` : 'Nothing changed');
