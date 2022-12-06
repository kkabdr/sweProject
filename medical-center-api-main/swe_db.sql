
CREATE TABLE department (
    id serial PRIMARY KEY,
    department_name character varying(255) not null
);

CREATE TABLE specialization(
    id serial PRIMARY KEY,
    specialization_name character varying(255) not null
);

CREATE TABLE administration(
    admin_id serial PRIMARY KEY,
    name character varying(255) not null,
    surname character varying(255) not null,
    email character varying(255) not null unique,
    number character varying(255) not null unique,
    password character varying(255) not null
)

CREATE TABLE doctor (
    id  serial PRIMARY KEY NOT NULL,
    dateofbirth date NOT NULL,
    iin character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    surname character varying(255) NOT NULL,
    middlename character varying(255) NOT NULL,
    address character varying(255) NOT NULL ,
    email character varying(255) NOT NULL,
    number character varying(255) not null,
    created_at timestamp without time zone default now() NOT NULL,
    password character varying(255) NOT NULL,
    department_id integer NOT NULL ,
    specialization_id integer NOT NULL,
    experience integer NOT NULL,
    category text NOT NULL,
    price integer NOT NULL,
    degree character varying(255) NOT NULL,
    rating integer NOT NULL Default 0,

    FOREIGN KEY (specialization_id) REFERENCES specialization(id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);


CREATE TABLE patient (
    id  serial PRIMARY KEY NOT NULL,
    dateofbirth date NOT NULL,
    iin character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    surname character varying(255) NOT NULL,
    middlename character varying(255) NOT NULL,
    address character varying(255) NOT NULL ,
    email character varying(255) NOT NULL,
    number character varying(255) not null,
    created_at timestamp without time zone default now() NOT NULL,
    password character varying(255) NOT NULL,
    blood_group character varying(255),
    emergency_contact character varying(255),
    martial_status character varying(255),
    other character varying(255)
);

CREATE TABLE appointment(
    id serial PRIMARY KEY,
    patient_id integer not null,
    doctor_id integer not null,
    appointment_date date not null,
    appointment_time_from time not null,
    appointment_time_to time not null,
    other text,
    visited integer default 0
)

