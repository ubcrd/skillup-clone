# Setup local

Este proyecto usa Supabase (Auth + Postgres con RLS) y un frontend CRA. El backend FastAPI incluido queda en desuso para la app (se mantiene para referencia y posibles utilidades).

## Requisitos
- Node.js 18+
- Yarn 1.x
- Cuenta de Supabase y proyecto configurado (ya provisto)

## 1) Supabase: ejecutar migraciones

1. Abre el SQL Editor del proyecto Supabase.
2. Copia y ejecuta el contenido de:
   - `supabase/migrations/20250812_init_supabase_auth.sql`

Esto crea:
- `profiles` (vinculada a `auth.users`), `courses`, `enrollments`, `certificates`, `status_checks`.
- RLS por rol y dueño.
- Trigger para crear `profiles` en cada alta de usuario.

## 2) Frontend: variables de entorno

Crea `frontend/.env.local` con:

```
REACT_APP_SUPABASE_URL=https://jdoaiegobgezzgiquhay.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impkb2FpZWdvYmdlenpnaXF1aGF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5NzE5ODAsImV4cCI6MjA3MDU0Nzk4MH0.3UDHixDbwzXRcnsihF-XJL4chtNX7UgRXbg1VA0Viy0
```

## 3) Instalar y correr

```
cd frontend
yarn
yarn start
```

Abrir `http://localhost:3000`.

## 4) Cuentas y flujo base
- Registro/Login usan Supabase Auth.
- Al registrarse, se crea/actualiza el perfil en `profiles` vía trigger y `upsert`.
- Cursos, inscripciones y certificados operan directamente sobre Supabase con RLS.

## Notas
- El backend FastAPI no es necesario para correr la app. No hay datos a migrar.
- Si se usa el backend para utilidades, requerirá `SUPABASE_*` con `SERVICE_ROLE` exclusivamente en servidor.


