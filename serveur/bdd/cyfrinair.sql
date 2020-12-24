--
-- PostgreSQL database dump
--

-- Dumped from database version 12.4
-- Dumped by pg_dump version 12.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: cyfrinair; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE cyfrinair WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'French_Canada.1252' LC_CTYPE = 'French_Canada.1252';


ALTER DATABASE cyfrinair OWNER TO postgres;

\connect cyfrinair

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: infos_client; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.infos_client (
    id integer NOT NULL,
    "website " text,
    "user" text,
    description text,
    template character varying(7),
    type character varying(14)
);


ALTER TABLE public.infos_client OWNER TO postgres;

--
-- Name: infos_client_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.infos_client_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.infos_client_id_seq OWNER TO postgres;

--
-- Name: infos_client_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.infos_client_id_seq OWNED BY public.infos_client.id;


--
-- Name: infos_client id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.infos_client ALTER COLUMN id SET DEFAULT nextval('public.infos_client_id_seq'::regclass);


--
-- Data for Name: infos_client; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Name: infos_client_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.infos_client_id_seq', 1, false);


--
-- Name: infos_client infos_client_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.infos_client
    ADD CONSTRAINT infos_client_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

