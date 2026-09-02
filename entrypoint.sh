#!/bin/sh
# Wacht tot de DB klaar is (bijv. met een tool als 'wait-for-it' of simpel script)
# npx prisma migrate deploy -f --schema=./prisma/schema.prisma
# npm install prisma@7.8.0
npx prisma db push
npx prisma db seed
exec node server.js