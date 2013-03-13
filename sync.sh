psql -c  "drop schema public cascade;"
psql -c  "create schema public;"
node sync.js
