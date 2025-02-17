--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

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
-- Name: answers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.answers (
    id integer NOT NULL,
    answer text NOT NULL,
    question_id integer NOT NULL,
    user_id integer NOT NULL,
    likes integer DEFAULT 0,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    liked_by integer[]
);


ALTER TABLE public.answers OWNER TO postgres;

--
-- Name: answers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.answers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.answers_id_seq OWNER TO postgres;

--
-- Name: answers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.answers_id_seq OWNED BY public.answers.id;


--
-- Name: farmer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.farmer (
    id integer NOT NULL,
    name character varying(255),
    surname character varying(255),
    home_address character varying(255),
    username character varying(255),
    email character varying(255),
    phone_number character varying(20),
    password character varying(255),
    role text
);


ALTER TABLE public.farmer OWNER TO postgres;

--
-- Name: farmer_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.farmer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.farmer_id_seq OWNER TO postgres;

--
-- Name: farmer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.farmer_id_seq OWNED BY public.farmer.id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    user_id integer,
    text text NOT NULL,
    image character varying(255),
    likes integer[] DEFAULT '{}'::integer[],
    comments jsonb[] DEFAULT '{}'::jsonb[],
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.posts OWNER TO postgres;

--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.posts_id_seq OWNER TO postgres;

--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- Name: productions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.productions (
    id integer NOT NULL,
    user_id integer,
    quarter integer,
    maize_units integer,
    tomato_units integer,
    potato_units integer,
    year integer
);


ALTER TABLE public.productions OWNER TO postgres;

--
-- Name: productions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.productions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.productions_id_seq OWNER TO postgres;

--
-- Name: productions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.productions_id_seq OWNED BY public.productions.id;


--
-- Name: questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.questions (
    id integer NOT NULL,
    question text NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.questions OWNER TO postgres;

--
-- Name: questions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.questions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.questions_id_seq OWNER TO postgres;

--
-- Name: questions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.questions_id_seq OWNED BY public.questions.id;


--
-- Name: sensor_data; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sensor_data (
    id integer NOT NULL,
    soil_moisture integer,
    temperature double precision,
    humidity double precision,
    "timestamp" timestamp without time zone
);


ALTER TABLE public.sensor_data OWNER TO postgres;

--
-- Name: sensor_data_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sensor_data_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sensor_data_id_seq OWNER TO postgres;

--
-- Name: sensor_data_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sensor_data_id_seq OWNED BY public.sensor_data.id;


--
-- Name: answers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answers ALTER COLUMN id SET DEFAULT nextval('public.answers_id_seq'::regclass);


--
-- Name: farmer id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.farmer ALTER COLUMN id SET DEFAULT nextval('public.farmer_id_seq'::regclass);


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Name: productions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productions ALTER COLUMN id SET DEFAULT nextval('public.productions_id_seq'::regclass);


--
-- Name: questions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions ALTER COLUMN id SET DEFAULT nextval('public.questions_id_seq'::regclass);


--
-- Name: sensor_data id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sensor_data ALTER COLUMN id SET DEFAULT nextval('public.sensor_data_id_seq'::regclass);


--
-- Data for Name: answers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.answers (id, answer, question_id, user_id, likes, created_at, liked_by) FROM stdin;
35	dd	53	5	34	2024-04-04 15:37:47.038887	\N
36	ss	57	5	1	2024-04-04 15:51:31.38627	\N
37	ss	58	5	0	2024-04-04 16:06:45.474808	\N
38	tsepnag	58	5	0	2024-04-04 16:07:02.968722	\N
39	dds	59	5	0	2024-04-04 16:19:43.501548	\N
30	ee	50	5	0	2024-04-04 14:52:51.391597	{}
34	Today is rainny	52	5	15	2024-04-04 15:28:26.091578	\N
31	sdd	51	5	2	2024-04-04 15:09:14.449336	{}
32	sd	51	5	1	2024-04-04 15:19:43.794104	{}
33	today is sunny	52	5	1	2024-04-04 15:28:13.618181	{5}
40	It belongs to lesotho	60	5	0	2024-04-17 17:55:04.90133	{}
\.


--
-- Data for Name: farmer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.farmer (id, name, surname, home_address, username, email, phone_number, password, role) FROM stdin;
5	troy	way	123 Main St	troyway	john.doe@email.com	555-1234	$2b$10$pXWzu5rPCsvSojVp.y.bRuh0GizyqHyRLAxwr7ST1lU9cqIZZ1hze	User
\.


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.posts (id, user_id, text, image, likes, comments, created_at) FROM stdin;
1	5	nothingd	1714565952772-Buidling-Blocks-1822x0-c-default-1.webp	{}	{}	2024-05-01 14:19:12.827794
2	5	jThie=s Lavavav ushblcuijnwcliujkbe lh  ch j alihb ilajb ihkjabnlh v   eyguyhbweuhb  uibcgvc yh	\N	{5,5,5,5,5,5}	{"{\\"text\\": \\"sweet\\", \\"user_id\\": 5, \\"created_at\\": \\"2024-05-01T12:22:31.003Z\\"}"}	2024-05-01 14:21:43.395193
3	5	from lesotho	1714566181347-OIP.jpeg	{}	{}	2024-05-01 14:23:01.419221
4	5	me	1714566491156-71egVIyZw5L._AC_SL1500_.jpg	{}	{}	2024-05-01 14:28:11.2095
5	5	sfd	\N	{}	{}	2024-05-01 14:28:33.14172
6	5	dd	1714566520605-R (1).png	{}	{}	2024-05-01 14:28:40.637984
7	5	Our government crest	1714567301032-R.png	{}	{}	2024-05-01 14:41:41.088403
8	5	CBS	1714568009257-ourlogo.png	{}	{}	2024-05-01 14:53:29.316434
9	5	gdf	1714570108181-ourlogo.png	{}	{}	2024-05-01 15:28:28.243536
10	5	hello	1714574672632-Buidling-Blocks-1822x0-c-default-1.webp	{}	{}	2024-05-01 16:44:32.690285
\.


--
-- Data for Name: productions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.productions (id, user_id, quarter, maize_units, tomato_units, potato_units, year) FROM stdin;
1	5	1	500	800	600	2024
2	5	2	600	750	700	2024
3	5	3	700	900	800	2024
4	5	4	550	850	650	2024
5	5	1	4555	300	200	2025
6	5	2	332	333	344	2025
8	5	4	2112	3323	222	2025
9	5	1	322	222	2113	2026
7	5	3	223	122	500	2025
\.


--
-- Data for Name: questions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.questions (id, question, user_id, created_at) FROM stdin;
50	ee	5	2024-04-04 14:52:48.106165
51	dds	5	2024-04-04 15:09:10.385141
52	What is the weather today ?	5	2024-04-04 15:27:49.917635
53	dd	5	2024-04-04 15:37:44.323762
54	dd	5	2024-04-04 15:51:01.053488
55	dddd	5	2024-04-04 15:51:03.466946
56	dddd	5	2024-04-04 15:51:03.705349
57	ss	5	2024-04-04 15:51:28.880076
58	vv	5	2024-04-04 16:05:37.865403
59	ds	5	2024-04-04 16:19:38.207094
60	What is Machobane system	5	2024-04-17 17:54:45.360353
\.


--
-- Data for Name: sensor_data; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sensor_data (id, soil_moisture, temperature, humidity, "timestamp") FROM stdin;
1	589	30	37.6	2024-03-10 13:08:52.75793
2	589	30	37.6	2024-03-10 13:09:54.485163
3	589	30	37.6	2024-03-10 13:10:52.84055
4	1021	30	38.7	2024-03-10 13:13:10.8088
5	1021	30	38.7	2024-03-10 13:14:10.669123
6	1021	30	38.7	2024-03-10 13:15:10.592561
7	1021	29.9	38.3	2024-03-10 13:16:30.190491
8	1021	29.9	38.3	2024-03-10 13:17:29.961271
9	1021	30	39.1	2024-03-10 13:19:52.367134
10	1021	30	39.1	2024-03-10 13:20:52.095482
11	489	30.1	55.5	2024-03-10 13:22:13.527405
12	489	30.1	55.5	2024-03-10 13:23:18.116441
13	477	30	38.1	2024-03-10 13:24:40.155057
14	477	30	38.1	2024-03-10 13:25:40.014104
15	477	30	38.1	2024-03-10 13:26:40.034186
16	477	30	38.1	2024-03-10 13:27:39.837181
17	477	30	38.1	2024-03-10 13:28:39.821204
18	589	30	37.6	2024-03-10 13:08:52.75793
19	589	30	37.6	2024-03-10 13:09:54.485163
20	589	30	37.6	2024-03-10 13:10:52.84055
21	1021	30	38.7	2024-03-10 13:13:10.8088
22	1021	30	38.7	2024-03-10 13:14:10.669123
23	1021	30	38.7	2024-03-10 13:15:10.592561
24	1021	29.9	38.3	2024-03-10 13:16:30.190491
25	1021	29.9	38.3	2024-03-10 13:17:29.961271
26	1021	30	39.1	2024-03-10 13:19:52.367134
27	1021	30	39.1	2024-03-10 13:20:52.095482
28	489	30.1	55.5	2024-03-10 13:22:13.527405
29	489	30.1	55.5	2024-03-10 13:23:18.116441
30	477	30	38.1	2024-03-10 13:24:40.155057
31	477	30	38.1	2024-03-10 13:25:40.014104
32	477	30	38.1	2024-03-10 13:26:40.034186
33	477	30	38.1	2024-03-10 13:27:39.837181
34	477	30	38.1	2024-03-10 13:28:39.821204
35	1021	30	38.7	\N
36	1021	30	38.7	\N
37	1021	30	38.7	\N
38	1021	30	38.7	\N
39	1021	30	38.7	\N
40	1021	30	38.7	\N
41	1021	30	38.7	\N
42	1021	30	38.7	\N
43	1021	30	38.7	\N
44	1021	30	38.7	\N
45	1021	30	38.7	\N
46	1021	30	38.7	\N
47	1021	30	38.7	\N
48	1021	30	38.7	\N
49	1021	30	38.7	\N
50	1021	30	38.7	\N
51	1021	30	38.7	\N
52	1021	30	38.7	\N
\.


--
-- Name: answers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.answers_id_seq', 40, true);


--
-- Name: farmer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.farmer_id_seq', 5, true);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.posts_id_seq', 10, true);


--
-- Name: productions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.productions_id_seq', 9, true);


--
-- Name: questions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.questions_id_seq', 60, true);


--
-- Name: sensor_data_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sensor_data_id_seq', 52, true);


--
-- Name: answers answers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT answers_pkey PRIMARY KEY (id);


--
-- Name: farmer farmer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.farmer
    ADD CONSTRAINT farmer_pkey PRIMARY KEY (id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: productions productions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productions
    ADD CONSTRAINT productions_pkey PRIMARY KEY (id);


--
-- Name: questions questions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (id);


--
-- Name: sensor_data sensor_data_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sensor_data
    ADD CONSTRAINT sensor_data_pkey PRIMARY KEY (id);


--
-- Name: answers answers_question_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT answers_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.questions(id);


--
-- Name: answers answers_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT answers_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.farmer(id);


--
-- Name: posts posts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.farmer(id);


--
-- Name: productions productions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productions
    ADD CONSTRAINT productions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.farmer(id);


--
-- Name: questions questions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.farmer(id);


--
-- PostgreSQL database dump complete
--

