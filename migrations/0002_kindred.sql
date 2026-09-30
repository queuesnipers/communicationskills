-- Kindred: private practice conversations, messages, and care flags.
create table if not exists conversations (
  id serial primary key,
  user_id text not null,
  mode text not null check (mode in ('her', 'him')),
  scenario_id text not null,
  partner_name text not null,
  title text not null,
  flagged boolean not null default false,
  flag_kind text,
  locked boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists conversations_user_id_idx on conversations (user_id, updated_at desc);

create table if not exists messages (
  id serial primary key,
  conversation_id integer not null references conversations(id) on delete cascade,
  user_id text not null,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  coach_note text,
  emotion text,
  flagged boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists messages_conversation_idx on messages (conversation_id, id);

create table if not exists care_flags (
  id serial primary key,
  user_id text not null,
  conversation_id integer not null references conversations(id) on delete cascade,
  message_id integer references messages(id) on delete set null,
  kind text not null,
  excerpt text,
  created_at timestamptz not null default now()
);
create index if not exists care_flags_user_idx on care_flags (user_id, created_at desc);
