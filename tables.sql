create table greetings(
	id serial primary key,
    name text not null,
	counter int not null
);

-- drop table if exists greetings;
-- insert into greetings(name,counter) values ($1,$2),rs [name, 1]