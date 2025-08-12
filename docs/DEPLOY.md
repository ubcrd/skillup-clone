# Deploy

## Frontend (Vercel o Netlify)

- Conecta el repositorio.
- Variables de entorno:
  - `REACT_APP_SUPABASE_URL = https://jdoaiegobgezzgiquhay.supabase.co`
  - `REACT_APP_SUPABASE_ANON_KEY = <anon>`
- Build: `yarn build`
- Output: `build`

DNS: apunta tu dominio al proveedor del frontend. El backend no es necesario.

## Supabase

- Ejecuta `supabase/migrations/20250812_init_supabase_auth.sql` en el SQL Editor.
- Verifica RLS y el trigger de `profiles`.

## Smoke tests
- Registro y login.
- Listado de cursos (vacío inicialmente).
- Crear curso (con usuario `instructor` o `admin`).
- Inscribirse a un curso y ver dashboard.


