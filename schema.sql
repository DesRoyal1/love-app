create table notes (
  id uuid primary key default gen_random_uuid(),
  content text
);

create table ideas (
  id uuid primary key default gen_random_uuid(),
  content text,
  planned boolean default false
);