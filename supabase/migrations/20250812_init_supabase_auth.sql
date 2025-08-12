-- Types
do $$ begin
  create type user_role as enum ('student','instructor','admin');
exception when duplicate_object then null; end $$;

-- Profiles (linked to auth.users)
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  name text not null,
  role user_role not null default 'student',
  avatar text,
  bio text,
  phone text,
  created_at timestamptz default now(),
  updated_at timestamptz
);

-- If legacy FKs exist referencing public.users, move them to profiles
do $$ begin
  alter table if exists courses drop constraint if exists courses_instructor_id_fkey;
exception when undefined_object then null; end $$;
create table if not exists courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  category text not null,
  duration text not null,
  image text not null,
  gradient text not null,
  icon text not null,
  instructor_id uuid references profiles(id) on delete cascade,
  video_url text,
  lessons integer default 0,
  price numeric default 0,
  students integer default 0,
  rating numeric default 0,
  created_at timestamptz default now(),
  updated_at timestamptz
);

do $$ begin
  alter table if exists enrollments drop constraint if exists enrollments_user_id_fkey;
  alter table if exists enrollments drop constraint if exists enrollments_course_id_fkey;
exception when undefined_object then null; end $$;
create table if not exists enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  course_id uuid references courses(id) on delete cascade,
  progress numeric default 0,
  completed_lessons integer default 0,
  enrolled_at timestamptz default now(),
  completed_at timestamptz,
  unique (user_id, course_id)
);

do $$ begin
  alter table if exists certificates drop constraint if exists certificates_user_id_fkey;
  alter table if exists certificates drop constraint if exists certificates_course_id_fkey;
  alter table if exists certificates drop constraint if exists certificates_instructor_id_fkey;
exception when undefined_object then null; end $$;
create table if not exists certificates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  course_id uuid references courses(id) on delete cascade,
  instructor_id uuid references profiles(id) on delete cascade,
  certificate_id text unique not null,
  grade text not null,
  issued_at timestamptz default now()
);

-- Status checks (open demo)
create table if not exists status_checks (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  timestamp timestamptz default now()
);

-- RLS
alter table profiles enable row level security;
alter table courses enable row level security;
alter table enrollments enable row level security;
alter table certificates enable row level security;
alter table status_checks enable row level security;

-- Profiles RLS
create policy if not exists "Read own profile" on profiles for select
  using (auth.uid() = id);
create policy if not exists "Update own profile" on profiles for update
  using (auth.uid() = id);
create policy if not exists "Insert own profile" on profiles for insert
  with check (auth.uid() = id);
create policy if not exists "Admin read all profiles" on profiles for select
  using (exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin'));

-- Courses RLS
create policy if not exists "Anyone can read courses" on courses for select using (true);
create policy if not exists "Instructors can insert courses" on courses for insert
  with check (exists (select 1 from profiles p where p.id = auth.uid() and p.role in ('instructor','admin')));
create policy if not exists "Owner or admin can update courses" on courses for update
  using (instructor_id = auth.uid() or exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin'));
create policy if not exists "Admin can delete courses" on courses for delete
  using (exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin'));

-- Enrollments RLS
create policy if not exists "User read own enrollments" on enrollments for select
  using (user_id = auth.uid());
create policy if not exists "User insert own enrollments" on enrollments for insert
  with check (user_id = auth.uid());
create policy if not exists "User update own enrollments" on enrollments for update
  using (user_id = auth.uid());
create policy if not exists "Instructor read course enrollments" on enrollments for select
  using (exists (select 1 from courses c where c.id = enrollments.course_id and c.instructor_id = auth.uid()));

-- Certificates RLS
create policy if not exists "User read own certificates" on certificates for select
  using (user_id = auth.uid());
create policy if not exists "Instructor/admin insert certificates" on certificates for insert
  with check (exists (select 1 from profiles p where p.id = auth.uid() and p.role in ('instructor','admin')));
create policy if not exists "Admin read all certificates" on certificates for select
  using (exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin'));

-- Status checks (open)
create policy if not exists "Anyone manage status_checks" on status_checks for all using (true) with check (true);

-- Trigger to auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, name, role)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'name', split_part(new.email,'@',1)), 'student')
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();


