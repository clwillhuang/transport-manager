toc.dat                                                                                             0000600 0004000 0002000 00000127111 14716700732 0014451 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        PGDMP                   
    |            openttd_server    16.2    16.2 �    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false         �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false         �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false         �           1262    57415    openttd_server    DATABASE     �   CREATE DATABASE openttd_server WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE openttd_server;
                postgres    false                     2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                pg_database_owner    false         �           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   pg_database_owner    false    4         h           1247    57432    cargo_payment_model    TYPE     B   CREATE TYPE public.cargo_payment_model AS ENUM (
    'vanilla'
);
 &   DROP TYPE public.cargo_payment_model;
       public          postgres    false    4         e           1247    57427    circle_type    TYPE     M   CREATE TYPE public.circle_type AS ENUM (
    'manhattan',
    'euclidean'
);
    DROP TYPE public.circle_type;
       public          postgres    false    4         �            1259    57466    cargo_to_stations    TABLE     �   CREATE TABLE public.cargo_to_stations (
    id integer NOT NULL,
    save_id integer NOT NULL,
    cargo_id integer NOT NULL,
    station_id integer NOT NULL,
    rating integer DEFAULT 0 NOT NULL,
    last_updated date
);
 %   DROP TABLE public.cargo_to_stations;
       public         heap    postgres    false    4         �            1259    57465    cargo_to_stations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cargo_to_stations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.cargo_to_stations_id_seq;
       public          postgres    false    4    222         �           0    0    cargo_to_stations_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.cargo_to_stations_id_seq OWNED BY public.cargo_to_stations.id;
          public          postgres    false    221         �            1259    57436    cargoes    TABLE     >  CREATE TABLE public.cargoes (
    id integer NOT NULL,
    save_id integer NOT NULL,
    cargo_id integer,
    name character varying(256) NOT NULL,
    label character varying(4) NOT NULL,
    weight integer DEFAULT 0 NOT NULL,
    value integer DEFAULT 0 NOT NULL,
    is_passenger boolean DEFAULT false,
    is_mail boolean DEFAULT false NOT NULL,
    is_express boolean DEFAULT false NOT NULL,
    is_armoured boolean DEFAULT false NOT NULL,
    is_bulk boolean DEFAULT false NOT NULL,
    is_piece_goods boolean DEFAULT false NOT NULL,
    is_liquid boolean DEFAULT false NOT NULL,
    is_refrigerated boolean DEFAULT false NOT NULL,
    is_covered boolean DEFAULT false NOT NULL,
    is_hazardous boolean DEFAULT false NOT NULL,
    town_effect integer DEFAULT 0 NOT NULL,
    grf_data jsonb DEFAULT '{}'::jsonb NOT NULL
);
    DROP TABLE public.cargoes;
       public         heap    postgres    false    4         �            1259    57435    cargoes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cargoes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.cargoes_id_seq;
       public          postgres    false    4    219         �           0    0    cargoes_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.cargoes_id_seq OWNED BY public.cargoes.id;
          public          postgres    false    218         �            1259    57476    cargoes_waiting    TABLE     !  CREATE TABLE public.cargoes_waiting (
    id integer NOT NULL,
    save_id integer NOT NULL,
    at_station_id integer NOT NULL,
    from_station_id integer NOT NULL,
    via_station_id integer,
    cargo_id integer NOT NULL,
    units integer DEFAULT 0 NOT NULL,
    last_updated date
);
 #   DROP TABLE public.cargoes_waiting;
       public         heap    postgres    false    4         �            1259    57475    cargoes_waiting_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cargoes_waiting_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.cargoes_waiting_id_seq;
       public          postgres    false    224    4         �           0    0    cargoes_waiting_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.cargoes_waiting_id_seq OWNED BY public.cargoes_waiting.id;
          public          postgres    false    223         �            1259    57460    cargos_to_industry_types    TABLE     �   CREATE TABLE public.cargos_to_industry_types (
    cargo_id integer NOT NULL,
    industrytype_id integer NOT NULL,
    accepts boolean
);
 ,   DROP TABLE public.cargos_to_industry_types;
       public         heap    postgres    false    4         �            1259    57486    circles    TABLE     �  CREATE TABLE public.circles (
    id integer NOT NULL,
    save_id integer NOT NULL,
    name character varying(256) DEFAULT 'Distance Measure'::character varying NOT NULL,
    x integer NOT NULL,
    y integer NOT NULL,
    radius integer NOT NULL,
    color character varying(8) DEFAULT '000000ff'::character varying NOT NULL,
    circle_type public.circle_type DEFAULT 'euclidean'::public.circle_type NOT NULL
);
    DROP TABLE public.circles;
       public         heap    postgres    false    869    4    869         �            1259    57485    circles_id_seq    SEQUENCE     �   CREATE SEQUENCE public.circles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.circles_id_seq;
       public          postgres    false    226    4         �           0    0    circles_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.circles_id_seq OWNED BY public.circles.id;
          public          postgres    false    225         �            1259    57498 	   companies    TABLE     �  CREATE TABLE public.companies (
    id integer NOT NULL,
    company_id integer,
    save_id integer NOT NULL,
    name character varying(256),
    manager_name character varying(256) DEFAULT 'Firstname Lastname'::character varying NOT NULL,
    color integer DEFAULT 0 NOT NULL,
    start_date date,
    is_ai boolean DEFAULT true,
    trains integer DEFAULT 0 NOT NULL,
    lorries integer DEFAULT 0 NOT NULL,
    buses integer DEFAULT 0 NOT NULL,
    planes integer DEFAULT 0 NOT NULL,
    ships integer DEFAULT 0 NOT NULL,
    train_stations integer DEFAULT 0 NOT NULL,
    lorry_stations integer DEFAULT 0 NOT NULL,
    bus_stations integer DEFAULT 0 NOT NULL,
    airports integer DEFAULT 0 NOT NULL,
    harbors integer DEFAULT 0 NOT NULL
);
    DROP TABLE public.companies;
       public         heap    postgres    false    4         �            1259    57497    companies_id_seq    SEQUENCE     �   CREATE SEQUENCE public.companies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.companies_id_seq;
       public          postgres    false    228    4         �           0    0    companies_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.companies_id_seq OWNED BY public.companies.id;
          public          postgres    false    227         �            1259    57522 
   industries    TABLE     �   CREATE TABLE public.industries (
    id integer NOT NULL,
    industry_id integer,
    name character varying(256) NOT NULL,
    construction_date date,
    industry_type_id integer NOT NULL,
    x integer NOT NULL,
    y integer NOT NULL
);
    DROP TABLE public.industries;
       public         heap    postgres    false    4         �            1259    57521    industries_id_seq    SEQUENCE     �   CREATE SEQUENCE public.industries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.industries_id_seq;
       public          postgres    false    4    230         �           0    0    industries_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.industries_id_seq OWNED BY public.industries.id;
          public          postgres    false    229         �            1259    57531    industry_types    TABLE     z  CREATE TABLE public.industry_types (
    id integer NOT NULL,
    industry_type_id integer,
    save_id integer NOT NULL,
    name character varying(256) DEFAULT 'My Industry'::character varying NOT NULL,
    has_heliport boolean DEFAULT false NOT NULL,
    has_dock boolean DEFAULT false NOT NULL,
    hex character varying(8) DEFAULT '000000ff'::character varying NOT NULL
);
 "   DROP TABLE public.industry_types;
       public         heap    postgres    false    4         �            1259    57530    industry_types_id_seq    SEQUENCE     �   CREATE SEQUENCE public.industry_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.industry_types_id_seq;
       public          postgres    false    232    4         �           0    0    industry_types_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.industry_types_id_seq OWNED BY public.industry_types.id;
          public          postgres    false    231         �            1259    57544    monthly_stats    TABLE     �  CREATE TABLE public.monthly_stats (
    id integer NOT NULL,
    year integer NOT NULL,
    month integer NOT NULL,
    industry_id integer NOT NULL,
    cargo_id integer NOT NULL,
    stockpiled_cargo integer DEFAULT 0 NOT NULL,
    last_month_production integer DEFAULT 0 NOT NULL,
    last_month_transported integer DEFAULT 0 NOT NULL,
    last_month_transported_percentage integer DEFAULT 0 NOT NULL
);
 !   DROP TABLE public.monthly_stats;
       public         heap    postgres    false    4         �            1259    57543    monthly_stats_id_seq    SEQUENCE     �   CREATE SEQUENCE public.monthly_stats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.monthly_stats_id_seq;
       public          postgres    false    4    234         �           0    0    monthly_stats_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.monthly_stats_id_seq OWNED BY public.monthly_stats.id;
          public          postgres    false    233         �            1259    57557    saves    TABLE     |  CREATE TABLE public.saves (
    id integer NOT NULL,
    server_name character varying(256),
    game_version character varying(100),
    dedicated_flag boolean,
    map_name character varying(256),
    map_seed bigint DEFAULT 0 NOT NULL,
    landscape integer DEFAULT '-1'::integer NOT NULL,
    start_date bigint,
    map_width integer NOT NULL,
    map_height integer NOT NULL,
    industry_pack character varying(256),
    industry_version character varying(256),
    industry_economy character varying(256),
    time_fetched_cargos date,
    time_fetched_industry_types date,
    time_fetched_industries date,
    time_fetched_stations date,
    time_fetched_monthly_stats date,
    time_fetched_companies date,
    time_fetched_towns date,
    cargo_payment_model public.cargo_payment_model DEFAULT 'vanilla'::public.cargo_payment_model NOT NULL,
    time_fetched_cargo_waiting date
);
    DROP TABLE public.saves;
       public         heap    postgres    false    872    4    872         �            1259    57556    saves_id_seq    SEQUENCE     �   CREATE SEQUENCE public.saves_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.saves_id_seq;
       public          postgres    false    4    236         �           0    0    saves_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.saves_id_seq OWNED BY public.saves.id;
          public          postgres    false    235         �            1259    57571    signs    TABLE       CREATE TABLE public.signs (
    id integer NOT NULL,
    is_in_game boolean DEFAULT false,
    sign_id integer,
    save_id integer NOT NULL,
    name character varying(256) DEFAULT 'My Sign Text'::character varying NOT NULL,
    x integer NOT NULL,
    y integer NOT NULL
);
    DROP TABLE public.signs;
       public         heap    postgres    false    4         �            1259    57570    signs_id_seq    SEQUENCE     �   CREATE SEQUENCE public.signs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.signs_id_seq;
       public          postgres    false    238    4         �           0    0    signs_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.signs_id_seq OWNED BY public.signs.id;
          public          postgres    false    237         �            1259    57582    stations    TABLE     �  CREATE TABLE public.stations (
    id integer NOT NULL,
    name character varying(256),
    station_id integer,
    company_id integer NOT NULL,
    save_id integer NOT NULL,
    has_train boolean DEFAULT false NOT NULL,
    has_truck boolean DEFAULT false NOT NULL,
    has_bus boolean DEFAULT false NOT NULL,
    has_airport boolean DEFAULT false NOT NULL,
    has_dock boolean DEFAULT false NOT NULL,
    has_any boolean DEFAULT false NOT NULL,
    x integer NOT NULL,
    y integer NOT NULL
);
    DROP TABLE public.stations;
       public         heap    postgres    false    4         �            1259    57581    stations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.stations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.stations_id_seq;
       public          postgres    false    4    240         �           0    0    stations_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.stations_id_seq OWNED BY public.stations.id;
          public          postgres    false    239         �            1259    57597    towns    TABLE     @  CREATE TABLE public.towns (
    id integer NOT NULL,
    save_id integer NOT NULL,
    name character varying(256) DEFAULT 'My Town'::character varying NOT NULL,
    town_id integer,
    population integer DEFAULT 0 NOT NULL,
    is_city boolean DEFAULT false NOT NULL,
    x integer NOT NULL,
    y integer NOT NULL
);
    DROP TABLE public.towns;
       public         heap    postgres    false    4         �            1259    57596    towns_id_seq    SEQUENCE     �   CREATE SEQUENCE public.towns_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.towns_id_seq;
       public          postgres    false    242    4         �           0    0    towns_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.towns_id_seq OWNED BY public.towns.id;
          public          postgres    false    241         o           2604    57469    cargo_to_stations id    DEFAULT     |   ALTER TABLE ONLY public.cargo_to_stations ALTER COLUMN id SET DEFAULT nextval('public.cargo_to_stations_id_seq'::regclass);
 C   ALTER TABLE public.cargo_to_stations ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    222    222         `           2604    57439 
   cargoes id    DEFAULT     h   ALTER TABLE ONLY public.cargoes ALTER COLUMN id SET DEFAULT nextval('public.cargoes_id_seq'::regclass);
 9   ALTER TABLE public.cargoes ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    219    219         q           2604    57479    cargoes_waiting id    DEFAULT     x   ALTER TABLE ONLY public.cargoes_waiting ALTER COLUMN id SET DEFAULT nextval('public.cargoes_waiting_id_seq'::regclass);
 A   ALTER TABLE public.cargoes_waiting ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    224    224         s           2604    57489 
   circles id    DEFAULT     h   ALTER TABLE ONLY public.circles ALTER COLUMN id SET DEFAULT nextval('public.circles_id_seq'::regclass);
 9   ALTER TABLE public.circles ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    225    226    226         w           2604    57501    companies id    DEFAULT     l   ALTER TABLE ONLY public.companies ALTER COLUMN id SET DEFAULT nextval('public.companies_id_seq'::regclass);
 ;   ALTER TABLE public.companies ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    228    227    228         �           2604    57525    industries id    DEFAULT     n   ALTER TABLE ONLY public.industries ALTER COLUMN id SET DEFAULT nextval('public.industries_id_seq'::regclass);
 <   ALTER TABLE public.industries ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    229    230    230         �           2604    57534    industry_types id    DEFAULT     v   ALTER TABLE ONLY public.industry_types ALTER COLUMN id SET DEFAULT nextval('public.industry_types_id_seq'::regclass);
 @   ALTER TABLE public.industry_types ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    232    231    232         �           2604    57547    monthly_stats id    DEFAULT     t   ALTER TABLE ONLY public.monthly_stats ALTER COLUMN id SET DEFAULT nextval('public.monthly_stats_id_seq'::regclass);
 ?   ALTER TABLE public.monthly_stats ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    234    233    234         �           2604    57560    saves id    DEFAULT     d   ALTER TABLE ONLY public.saves ALTER COLUMN id SET DEFAULT nextval('public.saves_id_seq'::regclass);
 7   ALTER TABLE public.saves ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    235    236    236         �           2604    57574    signs id    DEFAULT     d   ALTER TABLE ONLY public.signs ALTER COLUMN id SET DEFAULT nextval('public.signs_id_seq'::regclass);
 7   ALTER TABLE public.signs ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    237    238    238         �           2604    57585    stations id    DEFAULT     j   ALTER TABLE ONLY public.stations ALTER COLUMN id SET DEFAULT nextval('public.stations_id_seq'::regclass);
 :   ALTER TABLE public.stations ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    240    239    240         �           2604    57600    towns id    DEFAULT     d   ALTER TABLE ONLY public.towns ALTER COLUMN id SET DEFAULT nextval('public.towns_id_seq'::regclass);
 7   ALTER TABLE public.towns ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    241    242    242         |          0    57466    cargo_to_stations 
   TABLE DATA           d   COPY public.cargo_to_stations (id, save_id, cargo_id, station_id, rating, last_updated) FROM stdin;
    public          postgres    false    222       4988.dat y          0    57436    cargoes 
   TABLE DATA           �   COPY public.cargoes (id, save_id, cargo_id, name, label, weight, value, is_passenger, is_mail, is_express, is_armoured, is_bulk, is_piece_goods, is_liquid, is_refrigerated, is_covered, is_hazardous, town_effect, grf_data) FROM stdin;
    public          postgres    false    219       4985.dat ~          0    57476    cargoes_waiting 
   TABLE DATA           �   COPY public.cargoes_waiting (id, save_id, at_station_id, from_station_id, via_station_id, cargo_id, units, last_updated) FROM stdin;
    public          postgres    false    224       4990.dat z          0    57460    cargos_to_industry_types 
   TABLE DATA           V   COPY public.cargos_to_industry_types (cargo_id, industrytype_id, accepts) FROM stdin;
    public          postgres    false    220       4986.dat �          0    57486    circles 
   TABLE DATA           V   COPY public.circles (id, save_id, name, x, y, radius, color, circle_type) FROM stdin;
    public          postgres    false    226       4992.dat �          0    57498 	   companies 
   TABLE DATA           �   COPY public.companies (id, company_id, save_id, name, manager_name, color, start_date, is_ai, trains, lorries, buses, planes, ships, train_stations, lorry_stations, bus_stations, airports, harbors) FROM stdin;
    public          postgres    false    228       4994.dat �          0    57522 
   industries 
   TABLE DATA           f   COPY public.industries (id, industry_id, name, construction_date, industry_type_id, x, y) FROM stdin;
    public          postgres    false    230       4996.dat �          0    57531    industry_types 
   TABLE DATA           j   COPY public.industry_types (id, industry_type_id, save_id, name, has_heliport, has_dock, hex) FROM stdin;
    public          postgres    false    232       4998.dat �          0    57544    monthly_stats 
   TABLE DATA           �   COPY public.monthly_stats (id, year, month, industry_id, cargo_id, stockpiled_cargo, last_month_production, last_month_transported, last_month_transported_percentage) FROM stdin;
    public          postgres    false    234       5000.dat �          0    57557    saves 
   TABLE DATA           �  COPY public.saves (id, server_name, game_version, dedicated_flag, map_name, map_seed, landscape, start_date, map_width, map_height, industry_pack, industry_version, industry_economy, time_fetched_cargos, time_fetched_industry_types, time_fetched_industries, time_fetched_stations, time_fetched_monthly_stats, time_fetched_companies, time_fetched_towns, cargo_payment_model, time_fetched_cargo_waiting) FROM stdin;
    public          postgres    false    236       5002.dat �          0    57571    signs 
   TABLE DATA           M   COPY public.signs (id, is_in_game, sign_id, save_id, name, x, y) FROM stdin;
    public          postgres    false    238       5004.dat �          0    57582    stations 
   TABLE DATA           �   COPY public.stations (id, name, station_id, company_id, save_id, has_train, has_truck, has_bus, has_airport, has_dock, has_any, x, y) FROM stdin;
    public          postgres    false    240       5006.dat �          0    57597    towns 
   TABLE DATA           V   COPY public.towns (id, save_id, name, town_id, population, is_city, x, y) FROM stdin;
    public          postgres    false    242       5008.dat �           0    0    cargo_to_stations_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.cargo_to_stations_id_seq', 1, false);
          public          postgres    false    221         �           0    0    cargoes_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.cargoes_id_seq', 96, true);
          public          postgres    false    218         �           0    0    cargoes_waiting_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.cargoes_waiting_id_seq', 1, false);
          public          postgres    false    223         �           0    0    circles_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.circles_id_seq', 4, true);
          public          postgres    false    225         �           0    0    companies_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.companies_id_seq', 2, true);
          public          postgres    false    227         �           0    0    industries_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.industries_id_seq', 854, true);
          public          postgres    false    229         �           0    0    industry_types_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.industry_types_id_seq', 30, true);
          public          postgres    false    231         �           0    0    monthly_stats_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.monthly_stats_id_seq', 1253, true);
          public          postgres    false    233         �           0    0    saves_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.saves_id_seq', 1, true);
          public          postgres    false    235         �           0    0    signs_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.signs_id_seq', 2, true);
          public          postgres    false    237         �           0    0    stations_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.stations_id_seq', 2, true);
          public          postgres    false    239         �           0    0    towns_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.towns_id_seq', 448, true);
          public          postgres    false    241         �           2606    57472 (   cargo_to_stations cargo_to_stations_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.cargo_to_stations
    ADD CONSTRAINT cargo_to_stations_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.cargo_to_stations DROP CONSTRAINT cargo_to_stations_pkey;
       public            postgres    false    222         �           2606    57457    cargoes cargoes_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.cargoes
    ADD CONSTRAINT cargoes_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.cargoes DROP CONSTRAINT cargoes_pkey;
       public            postgres    false    219         �           2606    57482 $   cargoes_waiting cargoes_waiting_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.cargoes_waiting
    ADD CONSTRAINT cargoes_waiting_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.cargoes_waiting DROP CONSTRAINT cargoes_waiting_pkey;
       public            postgres    false    224         �           2606    57464 M   cargos_to_industry_types cargos_to_industry_types_cargo_id_industrytype_id_pk 
   CONSTRAINT     �   ALTER TABLE ONLY public.cargos_to_industry_types
    ADD CONSTRAINT cargos_to_industry_types_cargo_id_industrytype_id_pk PRIMARY KEY (cargo_id, industrytype_id);
 w   ALTER TABLE ONLY public.cargos_to_industry_types DROP CONSTRAINT cargos_to_industry_types_cargo_id_industrytype_id_pk;
       public            postgres    false    220    220         �           2606    57494    circles circles_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.circles
    ADD CONSTRAINT circles_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.circles DROP CONSTRAINT circles_pkey;
       public            postgres    false    226         �           2606    57518    companies companies_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.companies DROP CONSTRAINT companies_pkey;
       public            postgres    false    228         �           2606    57527    industries industries_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.industries
    ADD CONSTRAINT industries_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.industries DROP CONSTRAINT industries_pkey;
       public            postgres    false    230         �           2606    57540 "   industry_types industry_types_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.industry_types
    ADD CONSTRAINT industry_types_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.industry_types DROP CONSTRAINT industry_types_pkey;
       public            postgres    false    232         �           2606    57553     monthly_stats monthly_stats_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.monthly_stats
    ADD CONSTRAINT monthly_stats_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.monthly_stats DROP CONSTRAINT monthly_stats_pkey;
       public            postgres    false    234         �           2606    57567    saves saves_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.saves
    ADD CONSTRAINT saves_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.saves DROP CONSTRAINT saves_pkey;
       public            postgres    false    236         �           2606    57569    saves server_name_idx 
   CONSTRAINT     W   ALTER TABLE ONLY public.saves
    ADD CONSTRAINT server_name_idx UNIQUE (server_name);
 ?   ALTER TABLE ONLY public.saves DROP CONSTRAINT server_name_idx;
       public            postgres    false    236         �           2606    57578    signs signs_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.signs
    ADD CONSTRAINT signs_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.signs DROP CONSTRAINT signs_pkey;
       public            postgres    false    238         �           2606    57593    stations stations_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.stations
    ADD CONSTRAINT stations_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.stations DROP CONSTRAINT stations_pkey;
       public            postgres    false    240         �           2606    57605    towns towns_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.towns
    ADD CONSTRAINT towns_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.towns DROP CONSTRAINT towns_pkey;
       public            postgres    false    242         �           2606    57474 *   cargo_to_stations unique_cargo_and_station 
   CONSTRAINT     u   ALTER TABLE ONLY public.cargo_to_stations
    ADD CONSTRAINT unique_cargo_and_station UNIQUE (cargo_id, station_id);
 T   ALTER TABLE ONLY public.cargo_to_stations DROP CONSTRAINT unique_cargo_and_station;
       public            postgres    false    222    222         �           2606    57459    cargoes unique_cargo_game 
   CONSTRAINT     a   ALTER TABLE ONLY public.cargoes
    ADD CONSTRAINT unique_cargo_game UNIQUE (save_id, cargo_id);
 C   ALTER TABLE ONLY public.cargoes DROP CONSTRAINT unique_cargo_game;
       public            postgres    false    219    219         �           2606    57484 *   cargoes_waiting unique_cargo_waiting_entry 
   CONSTRAINT     �   ALTER TABLE ONLY public.cargoes_waiting
    ADD CONSTRAINT unique_cargo_waiting_entry UNIQUE (at_station_id, from_station_id, via_station_id, cargo_id);
 T   ALTER TABLE ONLY public.cargoes_waiting DROP CONSTRAINT unique_cargo_waiting_entry;
       public            postgres    false    224    224    224    224         �           2606    57496    circles unique_circle_game 
   CONSTRAINT     k   ALTER TABLE ONLY public.circles
    ADD CONSTRAINT unique_circle_game UNIQUE (save_id, x, y, circle_type);
 D   ALTER TABLE ONLY public.circles DROP CONSTRAINT unique_circle_game;
       public            postgres    false    226    226    226    226         �           2606    57520    companies unique_company_game 
   CONSTRAINT     g   ALTER TABLE ONLY public.companies
    ADD CONSTRAINT unique_company_game UNIQUE (save_id, company_id);
 G   ALTER TABLE ONLY public.companies DROP CONSTRAINT unique_company_game;
       public            postgres    false    228    228         �           2606    57529 #   industries unique_industry_per_game 
   CONSTRAINT     w   ALTER TABLE ONLY public.industries
    ADD CONSTRAINT unique_industry_per_game UNIQUE (industry_id, industry_type_id);
 M   ALTER TABLE ONLY public.industries DROP CONSTRAINT unique_industry_per_game;
       public            postgres    false    230    230         �           2606    57542    industry_types unique_per_game 
   CONSTRAINT     n   ALTER TABLE ONLY public.industry_types
    ADD CONSTRAINT unique_per_game UNIQUE (save_id, industry_type_id);
 H   ALTER TABLE ONLY public.industry_types DROP CONSTRAINT unique_per_game;
       public            postgres    false    232    232         �           2606    57580    signs unique_sign_game 
   CONSTRAINT     ]   ALTER TABLE ONLY public.signs
    ADD CONSTRAINT unique_sign_game UNIQUE (save_id, sign_id);
 @   ALTER TABLE ONLY public.signs DROP CONSTRAINT unique_sign_game;
       public            postgres    false    238    238         �           2606    57595    stations unique_station_game 
   CONSTRAINT     f   ALTER TABLE ONLY public.stations
    ADD CONSTRAINT unique_station_game UNIQUE (save_id, station_id);
 F   ALTER TABLE ONLY public.stations DROP CONSTRAINT unique_station_game;
       public            postgres    false    240    240         �           2606    57555 &   monthly_stats unique_time_and_industry 
   CONSTRAINT        ALTER TABLE ONLY public.monthly_stats
    ADD CONSTRAINT unique_time_and_industry UNIQUE (year, month, industry_id, cargo_id);
 P   ALTER TABLE ONLY public.monthly_stats DROP CONSTRAINT unique_time_and_industry;
       public            postgres    false    234    234    234    234         �           2606    57607    towns unique_town_game 
   CONSTRAINT     ]   ALTER TABLE ONLY public.towns
    ADD CONSTRAINT unique_town_game UNIQUE (save_id, town_id);
 @   ALTER TABLE ONLY public.towns DROP CONSTRAINT unique_town_game;
       public            postgres    false    242    242         �           2606    57628 :   cargo_to_stations cargo_to_stations_cargo_id_cargoes_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.cargo_to_stations
    ADD CONSTRAINT cargo_to_stations_cargo_id_cargoes_id_fk FOREIGN KEY (cargo_id) REFERENCES public.cargoes(id) ON DELETE CASCADE;
 d   ALTER TABLE ONLY public.cargo_to_stations DROP CONSTRAINT cargo_to_stations_cargo_id_cargoes_id_fk;
       public          postgres    false    4771    222    219         �           2606    57623 7   cargo_to_stations cargo_to_stations_save_id_saves_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.cargo_to_stations
    ADD CONSTRAINT cargo_to_stations_save_id_saves_id_fk FOREIGN KEY (save_id) REFERENCES public.saves(id) ON DELETE CASCADE;
 a   ALTER TABLE ONLY public.cargo_to_stations DROP CONSTRAINT cargo_to_stations_save_id_saves_id_fk;
       public          postgres    false    222    236    4805         �           2606    57633 =   cargo_to_stations cargo_to_stations_station_id_stations_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.cargo_to_stations
    ADD CONSTRAINT cargo_to_stations_station_id_stations_id_fk FOREIGN KEY (station_id) REFERENCES public.stations(id) ON DELETE CASCADE;
 g   ALTER TABLE ONLY public.cargo_to_stations DROP CONSTRAINT cargo_to_stations_station_id_stations_id_fk;
       public          postgres    false    240    222    4813         �           2606    57608 #   cargoes cargoes_save_id_saves_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.cargoes
    ADD CONSTRAINT cargoes_save_id_saves_id_fk FOREIGN KEY (save_id) REFERENCES public.saves(id) ON DELETE CASCADE;
 M   ALTER TABLE ONLY public.cargoes DROP CONSTRAINT cargoes_save_id_saves_id_fk;
       public          postgres    false    4805    219    236         �           2606    57643 <   cargoes_waiting cargoes_waiting_at_station_id_stations_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.cargoes_waiting
    ADD CONSTRAINT cargoes_waiting_at_station_id_stations_id_fk FOREIGN KEY (at_station_id) REFERENCES public.stations(id) ON DELETE CASCADE;
 f   ALTER TABLE ONLY public.cargoes_waiting DROP CONSTRAINT cargoes_waiting_at_station_id_stations_id_fk;
       public          postgres    false    240    224    4813         �           2606    57658 6   cargoes_waiting cargoes_waiting_cargo_id_cargoes_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.cargoes_waiting
    ADD CONSTRAINT cargoes_waiting_cargo_id_cargoes_id_fk FOREIGN KEY (cargo_id) REFERENCES public.cargoes(id) ON DELETE CASCADE;
 `   ALTER TABLE ONLY public.cargoes_waiting DROP CONSTRAINT cargoes_waiting_cargo_id_cargoes_id_fk;
       public          postgres    false    224    219    4771         �           2606    57648 >   cargoes_waiting cargoes_waiting_from_station_id_stations_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.cargoes_waiting
    ADD CONSTRAINT cargoes_waiting_from_station_id_stations_id_fk FOREIGN KEY (from_station_id) REFERENCES public.stations(id) ON DELETE CASCADE;
 h   ALTER TABLE ONLY public.cargoes_waiting DROP CONSTRAINT cargoes_waiting_from_station_id_stations_id_fk;
       public          postgres    false    224    240    4813         �           2606    57638 3   cargoes_waiting cargoes_waiting_save_id_saves_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.cargoes_waiting
    ADD CONSTRAINT cargoes_waiting_save_id_saves_id_fk FOREIGN KEY (save_id) REFERENCES public.saves(id) ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public.cargoes_waiting DROP CONSTRAINT cargoes_waiting_save_id_saves_id_fk;
       public          postgres    false    236    4805    224         �           2606    57653 =   cargoes_waiting cargoes_waiting_via_station_id_stations_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.cargoes_waiting
    ADD CONSTRAINT cargoes_waiting_via_station_id_stations_id_fk FOREIGN KEY (via_station_id) REFERENCES public.stations(id) ON DELETE CASCADE;
 g   ALTER TABLE ONLY public.cargoes_waiting DROP CONSTRAINT cargoes_waiting_via_station_id_stations_id_fk;
       public          postgres    false    4813    240    224         �           2606    57613 H   cargos_to_industry_types cargos_to_industry_types_cargo_id_cargoes_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.cargos_to_industry_types
    ADD CONSTRAINT cargos_to_industry_types_cargo_id_cargoes_id_fk FOREIGN KEY (cargo_id) REFERENCES public.cargoes(id) ON DELETE CASCADE;
 r   ALTER TABLE ONLY public.cargos_to_industry_types DROP CONSTRAINT cargos_to_industry_types_cargo_id_cargoes_id_fk;
       public          postgres    false    219    220    4771         �           2606    57618 V   cargos_to_industry_types cargos_to_industry_types_industrytype_id_industry_types_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.cargos_to_industry_types
    ADD CONSTRAINT cargos_to_industry_types_industrytype_id_industry_types_id_fk FOREIGN KEY (industrytype_id) REFERENCES public.industry_types(id) ON DELETE CASCADE;
 �   ALTER TABLE ONLY public.cargos_to_industry_types DROP CONSTRAINT cargos_to_industry_types_industrytype_id_industry_types_id_fk;
       public          postgres    false    220    232    4797         �           2606    57663 #   circles circles_save_id_saves_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.circles
    ADD CONSTRAINT circles_save_id_saves_id_fk FOREIGN KEY (save_id) REFERENCES public.saves(id) ON DELETE CASCADE;
 M   ALTER TABLE ONLY public.circles DROP CONSTRAINT circles_save_id_saves_id_fk;
       public          postgres    false    226    236    4805         �           2606    57668 '   companies companies_save_id_saves_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_save_id_saves_id_fk FOREIGN KEY (save_id) REFERENCES public.saves(id) ON DELETE CASCADE;
 Q   ALTER TABLE ONLY public.companies DROP CONSTRAINT companies_save_id_saves_id_fk;
       public          postgres    false    228    236    4805         �           2606    57673 ;   industries industries_industry_type_id_industry_types_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.industries
    ADD CONSTRAINT industries_industry_type_id_industry_types_id_fk FOREIGN KEY (industry_type_id) REFERENCES public.industry_types(id) ON DELETE CASCADE;
 e   ALTER TABLE ONLY public.industries DROP CONSTRAINT industries_industry_type_id_industry_types_id_fk;
       public          postgres    false    232    230    4797         �           2606    57678 1   industry_types industry_types_save_id_saves_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.industry_types
    ADD CONSTRAINT industry_types_save_id_saves_id_fk FOREIGN KEY (save_id) REFERENCES public.saves(id) ON DELETE CASCADE;
 [   ALTER TABLE ONLY public.industry_types DROP CONSTRAINT industry_types_save_id_saves_id_fk;
       public          postgres    false    232    236    4805         �           2606    57688 2   monthly_stats monthly_stats_cargo_id_cargoes_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.monthly_stats
    ADD CONSTRAINT monthly_stats_cargo_id_cargoes_id_fk FOREIGN KEY (cargo_id) REFERENCES public.cargoes(id) ON DELETE CASCADE;
 \   ALTER TABLE ONLY public.monthly_stats DROP CONSTRAINT monthly_stats_cargo_id_cargoes_id_fk;
       public          postgres    false    234    219    4771         �           2606    57683 8   monthly_stats monthly_stats_industry_id_industries_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.monthly_stats
    ADD CONSTRAINT monthly_stats_industry_id_industries_id_fk FOREIGN KEY (industry_id) REFERENCES public.industries(id) ON DELETE CASCADE;
 b   ALTER TABLE ONLY public.monthly_stats DROP CONSTRAINT monthly_stats_industry_id_industries_id_fk;
       public          postgres    false    234    4793    230         �           2606    57693    signs signs_save_id_saves_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.signs
    ADD CONSTRAINT signs_save_id_saves_id_fk FOREIGN KEY (save_id) REFERENCES public.saves(id) ON DELETE CASCADE;
 I   ALTER TABLE ONLY public.signs DROP CONSTRAINT signs_save_id_saves_id_fk;
       public          postgres    false    4805    238    236         �           2606    57698 ,   stations stations_company_id_companies_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.stations
    ADD CONSTRAINT stations_company_id_companies_id_fk FOREIGN KEY (company_id) REFERENCES public.companies(id) ON DELETE CASCADE;
 V   ALTER TABLE ONLY public.stations DROP CONSTRAINT stations_company_id_companies_id_fk;
       public          postgres    false    4789    240    228         �           2606    57703 %   stations stations_save_id_saves_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.stations
    ADD CONSTRAINT stations_save_id_saves_id_fk FOREIGN KEY (save_id) REFERENCES public.saves(id) ON DELETE CASCADE;
 O   ALTER TABLE ONLY public.stations DROP CONSTRAINT stations_save_id_saves_id_fk;
       public          postgres    false    4805    236    240         �           2606    57708    towns towns_save_id_saves_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.towns
    ADD CONSTRAINT towns_save_id_saves_id_fk FOREIGN KEY (save_id) REFERENCES public.saves(id) ON DELETE CASCADE;
 I   ALTER TABLE ONLY public.towns DROP CONSTRAINT towns_save_id_saves_id_fk;
       public          postgres    false    242    236    4805                                                                                                                                                                                                                                                                                                                                                                                                                                                               4988.dat                                                                                            0000600 0004000 0002000 00000000005 14716700732 0014270 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           4985.dat                                                                                            0000600 0004000 0002000 00000013650 14716700732 0014277 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        18	1	30	Quicklime	QLME	1	0	f	f	f	f	t	f	f	f	t	f	0	{"price_factor": 112, "penalty_lowerbound": 8, "single_penalty_length": 255}
2	1	46	Zinc	ZINC	1	0	f	f	f	f	f	t	f	f	f	f	0	{"price_factor": 126, "penalty_lowerbound": 12, "single_penalty_length": 255}
4	1	44	Vehicle Engines	VENG	1	0	f	f	f	f	f	t	f	f	f	f	0	{"price_factor": 151, "penalty_lowerbound": 6, "single_penalty_length": 255}
43	1	5	Vehicles	VEHI	1	0	f	f	f	f	f	t	f	f	f	f	0	{"price_factor": 164, "penalty_lowerbound": 15, "single_penalty_length": 128}
7	1	41	Sulphur	SULP	1	0	f	f	f	f	t	f	t	f	t	f	0	{"price_factor": 105, "penalty_lowerbound": 30, "single_penalty_length": 255}
9	1	39	Steel Sheet	STSH	1	0	f	f	f	f	f	t	f	f	f	f	0	{"price_factor": 139, "penalty_lowerbound": 14, "single_penalty_length": 255}
11	1	37	Stainless Steel	STST	1	0	f	f	f	f	f	t	f	f	f	f	0	{"price_factor": 130, "penalty_lowerbound": 16, "single_penalty_length": 255}
13	1	35	Slag	SLAG	1	0	f	f	f	f	t	f	f	f	f	f	0	{"price_factor": 85, "penalty_lowerbound": 64, "single_penalty_length": 255}
15	1	33	Sand	SAND	1	0	f	f	f	f	t	f	f	f	f	f	0	{"price_factor": 93, "penalty_lowerbound": 64, "single_penalty_length": 255}
16	1	32	Salt	SALT	1	0	f	f	f	f	t	f	f	f	f	f	0	{"price_factor": 94, "penalty_lowerbound": 36, "single_penalty_length": 255}
17	1	31	Rubber	RUBR	1	0	f	f	f	f	f	f	t	f	f	f	0	{"price_factor": 110, "penalty_lowerbound": 10, "single_penalty_length": 36}
1	1	47	Potash	POTA	1	0	f	f	f	f	t	f	f	f	f	f	0	{"price_factor": 102, "penalty_lowerbound": 30, "single_penalty_length": 255}
19	1	29	Plastics	PLAS	1	0	f	f	f	f	t	t	f	f	t	f	0	{"price_factor": 141, "penalty_lowerbound": 12, "single_penalty_length": 36}
20	1	28	Pipe	PIPE	1	0	f	f	f	f	f	t	f	f	f	f	0	{"price_factor": 144, "penalty_lowerbound": 30, "single_penalty_length": 42}
21	1	27	Pig Iron	IRON	1	0	f	f	f	f	f	t	f	f	f	f	0	{"price_factor": 119, "penalty_lowerbound": 8, "single_penalty_length": 64}
22	1	26	Paints & Coatings	COAT	1	0	f	f	f	f	f	t	t	f	f	f	0	{"price_factor": 135, "penalty_lowerbound": 20, "single_penalty_length": 255}
48	1	0	Passengers	PASS	0	0	t	f	f	f	f	f	f	f	f	f	1	{"price_factor": 137, "penalty_lowerbound": 0, "single_penalty_length": 22}
26	1	22	Limestone	LIME	1	0	f	f	f	f	t	f	f	f	f	f	0	{"price_factor": 92, "penalty_lowerbound": 38, "single_penalty_length": 255}
25	1	23	Sodium Hydroxide	LYE_	1	0	f	f	f	f	f	f	t	f	f	t	0	{"price_factor": 108, "penalty_lowerbound": 30, "single_penalty_length": 255}
46	1	2	Mail	MAIL	0	0	f	t	f	f	f	f	f	f	f	f	2	{"price_factor": 167, "penalty_lowerbound": 6, "single_penalty_length": 24}
24	1	24	Manganese	MNO2	1	0	f	f	f	f	t	f	f	f	f	f	0	{"price_factor": 95, "penalty_lowerbound": 30, "single_penalty_length": 255}
23	1	25	Oxygen	O2__	1	0	f	f	f	f	f	f	t	f	f	f	0	{"price_factor": 152, "penalty_lowerbound": 22, "single_penalty_length": 44}
35	1	13	Coal	COAL	1	0	f	f	f	f	t	f	f	f	f	f	0	{"price_factor": 86, "penalty_lowerbound": 40, "single_penalty_length": 255}
34	1	14	Coal Tar	CTAR	1	0	f	f	f	f	f	f	t	f	f	t	0	{"price_factor": 98, "penalty_lowerbound": 64, "single_penalty_length": 255}
33	1	15	Coke	COKE	1	0	f	f	f	f	t	f	f	f	f	f	0	{"price_factor": 97, "penalty_lowerbound": 30, "single_penalty_length": 255}
32	1	16	Electrical Parts	POWR	1	0	f	f	f	f	f	t	f	f	f	f	0	{"price_factor": 148, "penalty_lowerbound": 7, "single_penalty_length": 255}
31	1	17	Engineering Supplies	ENSP	0	0	f	f	t	f	f	t	f	f	f	f	0	{"price_factor": 172, "penalty_lowerbound": 2, "single_penalty_length": 32}
30	1	18	Farm Supplies	FMSP	0	0	f	f	t	f	f	t	f	f	f	f	0	{"price_factor": 170, "penalty_lowerbound": 2, "single_penalty_length": 32}
29	1	19	Ferrochrome	FECR	1	0	f	f	f	f	t	f	f	f	f	f	0	{"price_factor": 106, "penalty_lowerbound": 40, "single_penalty_length": 255}
37	1	11	Food	FOOD	1	0	f	f	t	f	f	f	f	t	f	f	0	{"price_factor": 178, "penalty_lowerbound": 0, "single_penalty_length": 20}
28	1	20	Glass	GLAS	0	0	f	f	f	f	f	t	f	f	f	f	0	{"price_factor": 132, "penalty_lowerbound": 12, "single_penalty_length": 180}
47	1	1	Acid	ACID	1	0	f	f	f	f	f	f	t	f	f	t	0	{"price_factor": 109, "penalty_lowerbound": 24, "single_penalty_length": 48}
45	1	3	Alloy Steel	STAL	1	0	f	f	f	f	f	t	f	f	f	f	0	{"price_factor": 128, "penalty_lowerbound": 14, "single_penalty_length": 255}
44	1	4	Aluminium	ALUM	1	0	f	f	f	f	f	t	f	f	f	f	0	{"price_factor": 140, "penalty_lowerbound": 7, "single_penalty_length": 255}
42	1	6	Carbon Black	CBLK	1	0	f	f	f	f	t	t	f	f	t	f	0	{"price_factor": 153, "penalty_lowerbound": 40, "single_penalty_length": 255}
41	1	7	Carbon Steel	STCB	1	0	f	f	f	f	f	t	f	f	f	f	0	{"price_factor": 127, "penalty_lowerbound": 14, "single_penalty_length": 255}
40	1	8	Cast Iron	CSTI	1	0	f	f	f	f	f	t	f	f	f	f	0	{"price_factor": 120, "penalty_lowerbound": 15, "single_penalty_length": 255}
39	1	9	Cement	CMNT	1	0	f	f	f	f	t	f	f	f	t	f	0	{"price_factor": 118, "penalty_lowerbound": 18, "single_penalty_length": 255}
38	1	10	Chlorine	CHLO	2	0	f	f	f	f	f	f	t	f	f	t	0	{"price_factor": 115, "penalty_lowerbound": 20, "single_penalty_length": 40}
36	1	12	Cleaning Agents	SOAP	1	0	f	f	f	f	f	t	t	f	f	f	0	{"price_factor": 121, "penalty_lowerbound": 20, "single_penalty_length": 255}
27	1	21	Iron Ore	IORE	1	0	f	f	f	f	t	f	f	f	f	f	0	{"price_factor": 90, "penalty_lowerbound": 40, "single_penalty_length": 255}
14	1	34	Scrap Metal	SCMT	1	0	f	f	f	f	t	f	f	f	f	f	0	{"price_factor": 107, "penalty_lowerbound": 36, "single_penalty_length": 255}
12	1	36	Soda Ash	SASH	1	0	f	f	f	f	t	f	f	f	t	f	0	{"price_factor": 96, "penalty_lowerbound": 14, "single_penalty_length": 255}
10	1	38	Steel Sections	STSE	1	0	f	f	f	f	f	t	f	f	f	f	0	{"price_factor": 142, "penalty_lowerbound": 14, "single_penalty_length": 255}
8	1	40	Steel Wire Rod	STWR	1	0	f	f	f	f	f	t	f	f	f	f	0	{"price_factor": 138, "penalty_lowerbound": 30, "single_penalty_length": 42}
6	1	42	Tyres	TYRE	1	0	f	f	f	f	f	t	f	f	f	f	0	{"price_factor": 149, "penalty_lowerbound": 8, "single_penalty_length": 255}
5	1	43	Vehicle Bodies	VBOD	1	0	f	f	f	f	f	t	f	f	f	f	0	{"price_factor": 147, "penalty_lowerbound": 5, "single_penalty_length": 255}
3	1	45	Vehicle Parts	VPTS	1	0	f	f	f	f	f	t	f	f	f	f	0	{"price_factor": 150, "penalty_lowerbound": 7, "single_penalty_length": 255}
\.


                                                                                        4990.dat                                                                                            0000600 0004000 0002000 00000000005 14716700732 0014261 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           4986.dat                                                                                            0000600 0004000 0002000 00000001625 14716700732 0014277 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        2	1	t
41	1	t
47	1	t
9	1	f
20	1	f
31	1	f
26	2	t
9	3	t
22	3	t
18	2	f
28	3	t
30	2	f
5	3	f
36	4	t
41	4	t
47	4	t
8	4	f
10	4	f
31	4	f
11	5	t
19	5	t
32	5	t
45	5	t
3	5	f
16	6	t
25	6	f
38	6	f
47	6	f
31	7	t
12	7	f
16	7	f
34	8	t
42	8	f
15	9	t
40	9	t
44	9	t
4	9	f
13	10	t
30	10	f
39	10	f
14	11	t
18	11	t
23	11	t
29	11	t
35	12	t
11	11	f
7	12	f
13	11	f
33	12	f
41	11	f
34	12	f
7	13	t
8	13	t
17	13	t
42	13	t
6	13	f
8	14	t
10	14	t
15	14	t
20	14	t
26	14	t
31	15	t
28	14	t
1	15	f
39	14	t
37	16	t
16	15	f
31	17	t
26	17	f
1	18	t
37	18	t
38	18	t
17	18	f
19	18	f
24	18	f
29	18	f
44	18	f
10	19	t
20	19	t
25	19	t
39	19	t
2	19	f
43	20	t
22	19	f
31	19	f
32	19	f
36	19	f
30	21	t
37	21	f
14	22	f
12	23	t
15	23	t
28	23	f
18	24	t
21	24	t
23	24	t
24	24	t
13	24	f
41	24	f
45	24	f
26	25	t
27	25	t
33	25	t
13	25	f
21	25	f
40	25	f
31	26	t
27	26	f
23	27	f
31	28	t
35	28	f
31	29	t
3	30	t
15	29	f
4	30	t
26	29	f
5	30	t
6	30	t
30	30	f
31	30	f
43	30	f
\.


                                                                                                           4992.dat                                                                                            0000600 0004000 0002000 00000000274 14716700732 0014273 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	1	New Circle	677	290	57	00ff00ff	manhattan
2	1	New Circle	368	331	200	00ff00ff	euclidean
3	1	New Circle	595	560	200	00ff00ff	euclidean
4	1	New Circle	296	559	200	00ff00ff	euclidean
\.


                                                                                                                                                                                                                                                                                                                                    4994.dat                                                                                            0000600 0004000 0002000 00000000102 14716700732 0014263 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	0	1	Unnamed	C. Campbell	8	1970-01-01	f	0	0	0	0	0	0	0	0	0	0
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                              4996.dat                                                                                            0000600 0004000 0002000 00000133256 14716700732 0014306 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	853	Lenfingborough Market General Store	1899-12-31	16	860	618
2	852	Shornville Body Plant	1899-12-31	3	268	187
3	851	Wrinnbridge Assembly Plant	1899-12-31	30	206	530
4	850	Nonnville Basic Oxygen Furnace	1899-12-31	24	289	723
5	849	Penfingborough Potash Mine	1899-12-31	15	156	799
6	848	Gendworth Basic Oxygen Furnace	1899-12-31	24	710	485
7	847	Kedhattan Assembly Plant	1899-12-31	30	537	218
8	846	Sleningbury Assembly Plant	1899-12-31	30	808	331
9	845	Marnfield General Store	1899-12-31	16	348	254
10	844	Overnwell Builders Yard	1899-12-31	14	778	68
11	843	New Brintford General Store	1899-12-31	16	22	992
12	842	Ganley Builders Yard	1899-12-31	14	589	657
13	841	Sinningwell Vehicle Distributor	1899-12-31	20	977	995
14	840	Punttown Glass Works	1899-12-31	23	109	910
15	839	Prafingfield Scrap Yard	1899-12-31	22	867	1010
16	838	Lunnton Coke Oven	1899-12-31	12	579	917
17	837	Plufield Coke Oven	1899-12-31	12	901	247
18	836	Flufingway-on-sea Body Plant	1899-12-31	3	171	736
19	835	Pledhead Cross Farm	1899-12-31	21	947	241
20	834	Brunington Basic Oxygen Furnace	1899-12-31	24	178	280
21	833	Little Prenfingfield General Store	1899-12-31	16	459	852
22	832	Charnton Carbon Black Plant	1899-12-31	8	332	869
23	831	Plarthill Sheet and Pipe Mill	1899-12-31	1	720	682
24	830	Rarnbridge Electric Arc Furnace	1899-12-31	11	730	993
25	829	Seningway Farm	1899-12-31	21	102	636
26	828	Canway Coal Mine	1899-12-31	28	858	250
27	827	Gonfingfield General Store	1899-12-31	16	945	336
28	826	Tenhattan Wharf	1899-12-31	19	115	485
29	825	Little Pennbury Basic Oxygen Furnace	1899-12-31	24	380	290
30	824	Little Drinham Limestone Mine	1899-12-31	17	990	925
31	823	Dratbridge Slag Grinding Plant	1899-12-31	10	325	695
32	822	Fort Branington Bulk Terminal	1899-12-31	18	641	824
33	821	Plarthill Component Factory	1899-12-31	5	711	680
34	820	Gindingworth Coke Oven	1899-12-31	12	560	464
35	819	Flunpool Quarry	1899-12-31	29	272	118
36	818	Gredingbury Body Plant	1899-12-31	3	300	866
37	817	Chonthill Vehicle Distributor	1899-12-31	20	504	504
38	816	Sleningbury Potash Mine	1899-12-31	15	780	395
39	815	Tundworth Falls Component Factory	1899-12-31	5	495	401
40	814	Gruntwood Lime Kiln	1899-12-31	2	771	869
41	813	Sinfingbridge Tyre Plant	1899-12-31	13	127	213
42	812	Flentwood Scrap Yard	1899-12-31	22	530	308
43	811	Wunfingborough Market Glass Works	1899-12-31	23	870	852
44	810	Nunnwell Ridge Scrap Yard	1899-12-31	22	923	318
45	809	Narningpool Blast Furnace	1899-12-31	25	188	236
46	808	Slonfingley Carbon Black Plant	1899-12-31	8	550	548
47	807	Saningwell Ridge Scrap Yard	1899-12-31	22	892	610
48	806	Drendingstone Sheet and Pipe Mill	1899-12-31	1	335	236
49	805	Wedinghall Tyre Plant	1899-12-31	13	316	361
50	804	Dredinghattan Potash Mine	1899-12-31	15	243	670
51	803	Sadingworth Coal Mine	1899-12-31	28	420	813
52	802	Runston Scrap Yard	1899-12-31	22	59	216
53	801	Frindborough Bay Lime Kiln	1899-12-31	2	127	274
54	800	Gredingbury Scrap Yard	1899-12-31	22	296	849
55	799	Grunnley Builders Yard	1899-12-31	14	51	557
56	798	Sindinghead Soda Ash Mine	1899-12-31	7	357	754
57	797	Lunnton Coal Mine	1899-12-31	28	611	948
58	796	Penfingborough Vehicle Distributor	1899-12-31	20	160	792
59	795	Minbourne Soda Ash Mine	1899-12-31	7	991	999
60	794	Wrudhead Sheet and Pipe Mill	1899-12-31	1	214	871
61	793	Dreningstone General Store	1899-12-31	16	989	690
62	792	Bonborough Component Factory	1899-12-31	5	1001	354
63	791	Sennton Soda Ash Mine	1899-12-31	7	116	834
64	790	Gafingford Body Plant	1899-12-31	3	389	665
65	789	Grundhall Iron Ore Mine	1899-12-31	26	664	358
66	788	Fladinghattan Component Factory	1899-12-31	5	143	148
67	787	Great Fronfingford Scrap Yard	1899-12-31	22	43	533
68	786	Frudworth Vehicle Distributor	1899-12-31	20	228	326
69	785	Plundham General Store	1899-12-31	16	949	279
70	784	Prindingworth Iron Ore Mine	1899-12-31	26	657	772
71	783	Gafingford Vehicle Distributor	1899-12-31	20	402	650
72	782	Keningwell General Store	1899-12-31	16	234	940
73	781	Renfingbridge Carbon Black Plant	1899-12-31	8	422	892
74	780	Lintborough Limestone Mine	1899-12-31	17	255	231
75	779	Fladinghattan Cryo Plant	1899-12-31	27	188	129
76	778	Little Prufingpool General Store	1899-12-31	16	238	903
77	777	Sondworth General Store	1899-12-31	16	353	404
78	776	Condingworth Carbon Black Plant	1899-12-31	8	221	774
79	775	Hindham Farm	1899-12-31	21	408	741
80	774	Punttown Tyre Plant	1899-12-31	13	117	891
81	773	Flenfingburg Slag Grinding Plant	1899-12-31	10	843	309
82	772	Great Drindtown Scrap Yard	1899-12-31	22	929	855
83	771	Prundingham Soda Ash Mine	1899-12-31	7	933	571
84	770	Linningley Iron Ore Mine	1899-12-31	26	882	327
85	769	Muworth Falls Farm	1899-12-31	21	455	481
86	768	New Pinningwell Farm	1899-12-31	21	377	959
87	767	Frudington Tyre Plant	1899-12-31	13	560	753
88	766	Chindborough Bay Glass Works	1899-12-31	23	483	477
89	765	Sontbridge Farm	1899-12-31	21	233	690
90	764	Sinnpool Bridge Lime Kiln	1899-12-31	2	980	586
91	763	Kedhattan Potash Mine	1899-12-31	15	551	243
92	762	Kindingwell Wharf	1899-12-31	19	551	951
93	761	Gondston Scrap Yard	1899-12-31	22	877	429
94	760	Grunston Carbon Black Plant	1899-12-31	8	135	384
95	759	Slarningworth Falls Farm	1899-12-31	21	590	904
96	758	Maningbury Vehicle Distributor	1899-12-31	20	358	15
97	757	Hundhead Limestone Mine	1899-12-31	17	914	225
98	756	Fort Branington Scrap Yard	1899-12-31	22	655	834
99	755	Charnpool Glass Works	1899-12-31	23	544	146
100	754	Flinburg Springs Farm	1899-12-31	21	396	47
101	753	Wedinghall Scrap Yard	1899-12-31	22	331	349
102	752	Frudworth Limestone Mine	1899-12-31	17	259	321
103	751	Sondworth Component Factory	1899-12-31	5	337	389
104	750	Wrentown Carbon Black Plant	1899-12-31	8	382	149
105	749	Little Pronningstone-on-sea Vehicle Distributor	1899-12-31	20	392	775
106	748	Grunnley Cryo Plant	1899-12-31	27	17	576
107	747	Ginfingburg Chlor-alkali Plant	1899-12-31	6	91	277
108	746	Prinnford Potash Mine	1899-12-31	15	844	740
109	745	Gedingville General Store	1899-12-31	16	1002	973
110	744	Tedinghall Body Plant	1899-12-31	3	27	176
111	743	Nondhall Farm	1899-12-31	21	277	283
112	742	Little Pennbury Lime Kiln	1899-12-31	2	342	277
113	741	Dratbridge Blast Furnace	1899-12-31	25	313	702
114	740	Hundworth Falls Builders Yard	1899-12-31	14	446	393
115	739	Wenfingford General Store	1899-12-31	16	1009	121
116	738	Nonnville Sheet and Pipe Mill	1899-12-31	1	284	754
117	737	Frondston Carbon Black Plant	1899-12-31	8	491	49
118	736	Tredinghall Farm	1899-12-31	21	630	333
119	735	Chinfingford Scrap Yard	1899-12-31	22	284	59
120	734	Wunford Farm	1899-12-31	21	824	164
121	733	Wunfingley Builders Yard	1899-12-31	14	956	650
122	732	Little Prenfingfield Component Factory	1899-12-31	5	477	832
123	731	Narningstone Basic Oxygen Furnace	1899-12-31	24	886	31
124	730	Druntbourne Limestone Mine	1899-12-31	17	241	473
125	729	Slenfingford Farm	1899-12-31	21	886	176
126	728	Great Pindinghattan Iron Ore Mine	1899-12-31	26	905	963
127	727	Brufinghill Wire and Section Mill	1899-12-31	4	445	626
128	726	Little Punnington Sheet and Pipe Mill	1899-12-31	1	907	43
129	725	Chindborough Bay Wire and Section Mill	1899-12-31	4	507	477
130	724	Drutford Tyre Plant	1899-12-31	13	24	237
131	723	Laninghall Engine Plant	1899-12-31	9	511	53
132	722	Hindworth Glass Works	1899-12-31	23	805	89
133	721	Wrutford Vehicle Distributor	1899-12-31	20	273	746
134	720	Punninghall Farm	1899-12-31	21	228	15
135	719	Ratburg Farm	1899-12-31	21	426	95
136	718	Wrudhead Component Factory	1899-12-31	5	238	877
137	717	Badingtown Coal Mine	1899-12-31	28	168	320
138	716	Grenfinghill City Vehicle Distributor	1899-12-31	20	570	801
139	715	Garnfield Body Plant	1899-12-31	3	956	546
140	714	Brunington General Store	1899-12-31	16	175	265
141	713	Ponninghall General Store	1899-12-31	16	24	99
142	712	Larnpool Coal Mine	1899-12-31	28	55	286
143	711	Henwood Body Plant	1899-12-31	3	116	32
144	710	Saningbury Cryo Plant	1899-12-31	27	32	381
145	709	Slunfingbridge General Store	1899-12-31	16	81	696
146	708	Prardworth Falls General Store	1899-12-31	16	924	154
147	707	Wrennway Coal Mine	1899-12-31	28	176	668
148	706	Sadinghead General Store	1899-12-31	16	485	137
149	705	Garningpool Falls Sheet and Pipe Mill	1899-12-31	1	691	544
150	704	Lunningpool Vehicle Distributor	1899-12-31	20	67	820
151	703	Seningway Potash Mine	1899-12-31	15	90	627
152	702	Little Pennbury Soda Ash Mine	1899-12-31	7	357	266
153	701	Gratwood Assembly Plant	1899-12-31	30	543	516
154	700	Plarthill Quarry	1899-12-31	29	703	730
155	699	Muham Potash Mine	1899-12-31	15	694	210
156	698	Prenningstone Sheet and Pipe Mill	1899-12-31	1	221	645
157	697	Wrintburg Springs Component Factory	1899-12-31	5	830	590
158	696	Flenfingburg Quarry	1899-12-31	29	813	320
159	695	Prinfingbridge Scrap Yard	1899-12-31	22	798	285
160	694	Grinningpool Farm	1899-12-31	21	728	203
161	693	Sunthill Coal Mine	1899-12-31	28	72	212
162	692	Hindhead Lime Kiln	1899-12-31	2	214	598
163	691	Lenfingborough Market Wire and Section Mill	1899-12-31	4	854	605
164	690	Darhill Coal Mine	1899-12-31	28	860	150
165	689	Ratston Carbon Black Plant	1899-12-31	8	301	990
166	688	Futford Coke Oven	1899-12-31	12	393	858
167	687	Runninghall Scrap Yard	1899-12-31	22	754	321
168	686	Gadingbury Farm	1899-12-31	21	131	953
169	685	Sadinghead Scrap Yard	1899-12-31	22	487	131
170	684	Flunpool Builders Yard	1899-12-31	14	290	142
171	683	Flindham General Store	1899-12-31	16	861	718
172	682	Frudington Iron Ore Mine	1899-12-31	26	565	773
173	681	Brintford Farm	1899-12-31	21	345	116
174	680	Wardingham Scrap Yard	1899-12-31	22	218	557
175	679	Futford Quarry	1899-12-31	29	407	900
176	678	Narnhall Iron Ore Mine	1899-12-31	26	79	424
177	677	Great Drindtown Tyre Plant	1899-12-31	13	939	871
178	676	Gadingbury Cryo Plant	1899-12-31	27	116	976
179	675	Barnpool Slag Grinding Plant	1899-12-31	10	784	651
180	674	Little Batston Basic Oxygen Furnace	1899-12-31	24	617	476
181	673	Prinnford General Store	1899-12-31	16	859	752
182	672	Bredingtown Coke Oven	1899-12-31	12	184	406
183	671	Wrendtown Glass Works	1899-12-31	23	168	548
184	670	Wreninghall Limestone Mine	1899-12-31	17	955	711
185	669	Little Hatborough Vehicle Distributor	1899-12-31	20	117	722
186	668	Fort Wontborough Cryo Plant	1899-12-31	27	995	110
187	667	Pledhattan Springs Quarry	1899-12-31	29	794	552
188	666	Nardingstone Bulk Terminal	1899-12-31	18	1007	178
189	665	Slarningworth Falls Vehicle Distributor	1899-12-31	20	633	924
190	664	Linningley Carbon Black Plant	1899-12-31	8	923	356
191	663	Lunnton Glass Works	1899-12-31	23	604	932
192	662	Little Prenfingfield Vehicle Distributor	1899-12-31	20	469	840
193	661	Kedhattan Electric Arc Furnace	1899-12-31	11	537	263
194	660	Sleningpool Falls Potash Mine	1899-12-31	15	308	380
195	659	Lunningpool Bulk Terminal	1899-12-31	18	55	809
196	658	Marfingford Blast Furnace	1899-12-31	25	872	41
197	657	Gindingworth Quarry	1899-12-31	29	569	445
198	656	Druntbourne Vehicle Distributor	1899-12-31	20	236	480
199	655	Trintborough Iron Ore Mine	1899-12-31	26	128	869
200	654	Edinborough Bay General Store	1899-12-31	16	522	851
201	653	Detbridge Body Plant	1899-12-31	3	593	561
202	652	Prenningstone Vehicle Distributor	1899-12-31	20	234	641
203	651	Pratburg Glass Works	1899-12-31	23	166	695
204	650	Plarthill Soda Ash Mine	1899-12-31	7	718	697
205	649	Gunnway General Store	1899-12-31	16	703	144
206	648	Frindborough Bay Electric Arc Furnace	1899-12-31	11	138	247
207	647	Benningpool Soda Ash Mine	1899-12-31	7	52	940
208	646	Maningbury Electric Arc Furnace	1899-12-31	11	379	39
209	645	Fluningwell General Store	1899-12-31	16	412	383
210	644	Trarnfield Component Factory	1899-12-31	5	551	433
211	643	Prarnway-on-sea Coal Mine	1899-12-31	28	818	531
212	642	Fort Pindhattan Chlor-alkali Plant	1899-12-31	6	345	918
213	641	Ratston Sheet and Pipe Mill	1899-12-31	1	279	976
214	640	Tundtown Builders Yard	1899-12-31	14	768	761
215	639	Mendhead Cross Iron Ore Mine	1899-12-31	26	129	760
216	638	Wunfingley Vehicle Distributor	1899-12-31	20	946	641
217	637	Huston Soda Ash Mine	1899-12-31	7	503	733
218	636	Nonnville Potash Mine	1899-12-31	15	290	765
219	635	Wrintburg Springs Farm	1899-12-31	21	815	557
220	634	Nentston General Store	1899-12-31	16	193	786
221	633	Dratbridge General Store	1899-12-31	16	341	706
222	632	Slenfingley Market Electric Arc Furnace	1899-12-31	11	208	352
223	631	Bunnwell General Store	1899-12-31	16	995	386
224	630	Little Henston General Store	1899-12-31	16	720	950
225	629	Sutfield Slag Grinding Plant	1899-12-31	10	869	678
226	628	Marfingford General Store	1899-12-31	16	848	62
227	627	Tenhattan Slag Grinding Plant	1899-12-31	10	95	454
228	626	Carham Engine Plant	1899-12-31	9	132	456
229	625	Little Drinham Slag Grinding Plant	1899-12-31	10	959	934
230	624	Frindborough Bay Engine Plant	1899-12-31	9	112	254
231	623	Winfingpool Bridge Soda Ash Mine	1899-12-31	7	588	577
232	622	Flatown General Store	1899-12-31	16	922	276
233	621	Fennwell Bulk Terminal	1899-12-31	18	88	663
234	620	Brufinghill Builders Yard	1899-12-31	14	409	659
235	619	Little Prenfingfield Body Plant	1899-12-31	3	470	828
236	618	Runninghall Iron Ore Mine	1899-12-31	26	734	308
237	617	Narningpool Component Factory	1899-12-31	5	163	244
238	616	Frindborough Bay Component Factory	1899-12-31	5	115	264
239	615	Dredinghattan Scrap Yard	1899-12-31	22	234	664
240	614	Slonfingley Engine Plant	1899-12-31	9	558	589
241	613	Pledhead Cross Chlor-alkali Plant	1899-12-31	6	940	249
242	612	Dindingville General Store	1899-12-31	16	656	388
243	611	Weningwell General Store	1899-12-31	16	653	471
244	610	Senfinghill Vehicle Distributor	1899-12-31	20	683	789
245	609	Fennbury Limestone Mine	1899-12-31	17	551	99
246	608	Sarnbridge Lime Kiln	1899-12-31	2	328	982
247	607	Punttown Wire and Section Mill	1899-12-31	4	80	928
248	606	Slenfingley Market Soda Ash Mine	1899-12-31	7	234	361
249	605	Treston Quarry	1899-12-31	29	735	386
250	604	Gundhead Cryo Plant	1899-12-31	27	487	918
251	603	Suntborough Market Builders Yard	1899-12-31	14	676	838
252	602	Sadingworth Blast Furnace	1899-12-31	25	437	836
253	601	Chetfield Iron Ore Mine	1899-12-31	26	479	417
254	600	Frunnpool General Store	1899-12-31	16	896	884
255	599	Grinnpool Component Factory	1899-12-31	5	470	305
256	598	Lunnton Scrap Yard	1899-12-31	22	577	956
257	597	Pledhattan Springs Builders Yard	1899-12-31	14	785	495
258	596	Gredston Electric Arc Furnace	1899-12-31	11	861	388
259	595	Great Pudwood Scrap Yard	1899-12-31	22	182	495
260	594	Wunford Wire and Section Mill	1899-12-31	4	797	124
261	593	Tindhall Component Factory	1899-12-31	5	229	176
262	592	Peningville Iron Ore Mine	1899-12-31	26	614	288
263	591	Larnpool Component Factory	1899-12-31	5	12	266
264	590	Trinningstone-on-sea Farm	1899-12-31	21	110	579
265	589	Tufingway-on-sea Vehicle Distributor	1899-12-31	20	924	711
266	588	Barnpool Bulk Terminal	1899-12-31	18	814	654
267	587	Great Drudingbury Cryo Plant	1899-12-31	27	968	212
268	586	Slinnpool Bulk Terminal	1899-12-31	18	503	540
269	585	Flatown Potash Mine	1899-12-31	15	918	281
270	584	Plarthill Potash Mine	1899-12-31	15	696	711
271	583	Mendhead Cross General Store	1899-12-31	16	145	760
272	582	Muworth Falls Iron Ore Mine	1899-12-31	26	451	490
273	581	Gruntwood Quarry	1899-12-31	29	723	868
274	580	Punfingpool Cryo Plant	1899-12-31	27	850	199
275	579	Quarnville Sheet and Pipe Mill	1899-12-31	1	907	650
276	578	Trunnbury Builders Yard	1899-12-31	14	364	742
277	577	Slonfingley Tyre Plant	1899-12-31	13	535	595
278	576	Little Pennbury Electric Arc Furnace	1899-12-31	11	363	261
279	575	Ponninghall Bulk Terminal	1899-12-31	18	14	73
280	574	Ladinghead Soda Ash Mine	1899-12-31	7	600	1002
281	573	Frunnpool Electric Arc Furnace	1899-12-31	11	892	890
282	572	Sluwood Engine Plant	1899-12-31	9	224	392
283	571	Muham Glass Works	1899-12-31	23	703	197
284	570	Dreningstone Scrap Yard	1899-12-31	22	991	694
285	569	Ganley Basic Oxygen Furnace	1899-12-31	24	567	663
286	568	Faningwell General Store	1899-12-31	16	77	609
287	567	Tonborough Farm	1899-12-31	21	763	814
288	566	Hatown Soda Ash Mine	1899-12-31	7	320	437
289	565	Kindingwell Lime Kiln	1899-12-31	2	512	935
290	564	Tredinghall Potash Mine	1899-12-31	15	578	346
291	563	Slinnpool Coal Mine	1899-12-31	28	537	536
292	562	Trundhattan Blast Furnace	1899-12-31	25	395	251
293	561	Chanley Market General Store	1899-12-31	16	291	877
294	560	Abertbridge Scrap Yard	1899-12-31	22	969	98
295	559	Gonfingpool General Store	1899-12-31	16	954	527
296	558	Chufingford Builders Yard	1899-12-31	14	120	435
297	557	Kintfield Coal Mine	1899-12-31	28	959	409
298	556	Great Senninghead Assembly Plant	1899-12-31	30	43	209
299	555	Trarningville Basic Oxygen Furnace	1899-12-31	24	870	728
300	554	Menhill Potash Mine	1899-12-31	15	287	475
301	553	Hatown Basic Oxygen Furnace	1899-12-31	24	302	439
302	552	Muntfield General Store	1899-12-31	16	985	299
303	551	Sleningpool Falls Wire and Section Mill	1899-12-31	4	307	369
304	550	Gruntwood General Store	1899-12-31	16	755	872
305	549	Drutway Sheet and Pipe Mill	1899-12-31	1	169	887
306	548	Sadingworth Slag Grinding Plant	1899-12-31	10	420	804
307	547	Overnpool Sheet and Pipe Mill	1899-12-31	1	486	182
308	546	Abertbridge Electric Arc Furnace	1899-12-31	11	964	124
309	545	Abertbridge Coke Oven	1899-12-31	12	960	112
310	544	Plunton Limestone Mine	1899-12-31	17	197	593
311	543	Prinfingburg Basic Oxygen Furnace	1899-12-31	24	936	119
312	542	Larnway Carbon Black Plant	1899-12-31	8	265	923
313	541	Nonnville Carbon Black Plant	1899-12-31	8	290	732
314	540	Nardingstone Builders Yard	1899-12-31	14	995	175
315	539	Winfingpool Bridge Coke Oven	1899-12-31	12	584	597
316	538	Luburg General Store	1899-12-31	16	678	579
317	537	Trarningville Lime Kiln	1899-12-31	2	890	729
318	536	Frendhattan Potash Mine	1899-12-31	15	238	75
319	535	Slenfingley Market Coke Oven	1899-12-31	12	223	371
320	534	Fartbourne Tyre Plant	1899-12-31	13	980	128
321	533	Pinfingley Component Factory	1899-12-31	5	570	1001
322	532	Barnpool Farm	1899-12-31	21	790	650
323	531	Gadinghattan General Store	1899-12-31	16	767	897
324	530	Gruntwood Basic Oxygen Furnace	1899-12-31	24	725	877
325	529	Dindingville Engine Plant	1899-12-31	9	645	388
326	528	Chonnington General Store	1899-12-31	16	707	35
327	527	Gonfingford Wharf	1899-12-31	19	163	1013
328	526	Cufield Cryo Plant	1899-12-31	27	375	799
329	525	Nonnville Coal Mine	1899-12-31	28	291	748
330	524	Hindworth Engine Plant	1899-12-31	9	813	104
331	523	Chinnley Iron Ore Mine	1899-12-31	26	588	474
332	522	Tredinghall Vehicle Distributor	1899-12-31	20	608	331
333	521	Suthill Carbon Black Plant	1899-12-31	8	260	392
334	520	Chinfingford Farm	1899-12-31	21	280	64
335	519	Wruwood Component Factory	1899-12-31	5	969	326
336	518	Charnton Component Factory	1899-12-31	5	325	880
337	517	Seningway Lime Kiln	1899-12-31	2	111	610
338	516	Linningley Slag Grinding Plant	1899-12-31	10	897	329
339	515	Grunnley Farm	1899-12-31	21	10	557
340	514	Tredinghall Assembly Plant	1899-12-31	30	615	354
341	513	Tretbourne Chlor-alkali Plant	1899-12-31	6	79	1002
342	512	Tronfingburg Iron Ore Mine	1899-12-31	26	736	620
343	511	Tarfingbridge Scrap Yard	1899-12-31	22	314	633
344	510	Feston General Store	1899-12-31	16	83	842
345	509	Tronfingburg Builders Yard	1899-12-31	14	739	626
346	508	Printborough Coal Mine	1899-12-31	28	799	635
347	507	Great Drindtown Engine Plant	1899-12-31	9	936	853
348	506	Trundhattan Engine Plant	1899-12-31	9	395	233
349	505	Dondhattan Potash Mine	1899-12-31	15	908	1010
350	504	Trundhattan Scrap Yard	1899-12-31	22	373	208
351	503	Muham General Store	1899-12-31	16	707	212
352	502	Gadinghattan Carbon Black Plant	1899-12-31	8	800	897
353	501	Abernpool Farm	1899-12-31	21	841	984
354	500	Chanbridge Builders Yard	1899-12-31	14	536	439
355	499	Fenway Quarry	1899-12-31	29	93	306
356	498	Pletburg General Store	1899-12-31	16	462	376
357	497	Overnwell Body Plant	1899-12-31	3	774	121
358	496	Gontfield Coal Mine	1899-12-31	28	218	891
359	495	Dondhattan Tyre Plant	1899-12-31	13	878	971
360	494	Fort Flinfingfield Coal Mine	1899-12-31	28	281	391
361	493	Great Drudingbury General Store	1899-12-31	16	993	220
362	492	Fennbury General Store	1899-12-31	16	553	88
363	491	Wedinghall Limestone Mine	1899-12-31	17	339	372
364	490	Guntbourne Bridge Builders Yard	1899-12-31	14	680	289
365	489	Tindhall Coal Mine	1899-12-31	28	204	178
366	488	Slendham Wharf	1899-12-31	19	1017	806
367	487	Sadinghead Coke Oven	1899-12-31	12	474	103
368	486	Bunnwell Wharf	1899-12-31	19	1004	373
369	485	Tindhall Scrap Yard	1899-12-31	22	237	214
370	484	Plufield Component Factory	1899-12-31	5	901	279
371	483	Sadingworth Chlor-alkali Plant	1899-12-31	6	410	809
372	482	Maningbury Bulk Terminal	1899-12-31	18	341	52
373	481	Wundinghattan Wharf	1899-12-31	19	465	1
374	480	Tunborough Bay Quarry	1899-12-31	29	943	587
375	479	Larnway Scrap Yard	1899-12-31	22	271	911
376	478	Gendinghead Vehicle Distributor	1899-12-31	20	453	750
377	477	Fatborough Limestone Mine	1899-12-31	17	951	740
378	476	Wrendston Coke Oven	1899-12-31	12	790	937
379	475	Wruborough Iron Ore Mine	1899-12-31	26	749	285
380	474	Prutbourne Chlor-alkali Plant	1899-12-31	6	592	195
381	473	Guningwell Builders Yard	1899-12-31	14	461	162
382	472	Wedinghall Bulk Terminal	1899-12-31	18	318	342
383	471	Hudworth Cryo Plant	1899-12-31	27	774	20
384	470	Flunpool General Store	1899-12-31	16	294	139
385	469	Sondworth Electric Arc Furnace	1899-12-31	11	360	411
386	468	Grunfingley Potash Mine	1899-12-31	15	661	925
387	467	Cufield Carbon Black Plant	1899-12-31	8	278	804
388	466	Suthill Component Factory	1899-12-31	5	245	374
389	465	Dradston Slag Grinding Plant	1899-12-31	10	157	549
390	464	Fort Flinfingfield General Store	1899-12-31	16	289	408
391	463	Punttown Lime Kiln	1899-12-31	2	105	904
392	462	Keningwell Quarry	1899-12-31	29	226	928
393	461	Henwood Scrap Yard	1899-12-31	22	96	31
394	460	Prenningstone General Store	1899-12-31	16	230	636
395	459	Wronbourne Farm	1899-12-31	21	445	238
396	458	Marnfield Coal Mine	1899-12-31	28	373	254
397	457	Drutford Potash Mine	1899-12-31	15	9	227
398	456	Sindham Glass Works	1899-12-31	23	832	399
399	455	Sindinghead Farm	1899-12-31	21	345	758
400	454	Wunfingley Farm	1899-12-31	21	983	653
401	453	Wrendston Bulk Terminal	1899-12-31	18	805	921
402	452	Charnton Builders Yard	1899-12-31	14	337	865
403	451	Luntburg Lime Kiln	1899-12-31	2	805	606
404	450	Tondingstone Bay Coke Oven	1899-12-31	12	275	347
405	449	Aberwood Builders Yard	1899-12-31	14	661	177
406	448	Nundtown General Store	1899-12-31	16	543	361
407	447	Sinfingbridge Engine Plant	1899-12-31	9	121	181
408	446	Tenham Coal Mine	1899-12-31	28	904	101
409	445	Badingtown Farm	1899-12-31	21	151	345
410	444	Trendham Coke Oven	1899-12-31	12	273	435
411	443	Frunnpool Vehicle Distributor	1899-12-31	20	881	881
412	442	Chanbridge Coal Mine	1899-12-31	28	546	448
413	441	Gonfingford Farm	1899-12-31	21	180	975
414	440	Gredston General Store	1899-12-31	16	876	398
415	439	Bebourne Farm	1899-12-31	21	995	21
416	438	Nentston Coal Mine	1899-12-31	28	211	766
417	437	Buthill City Coal Mine	1899-12-31	28	40	400
418	436	Pledingham Builders Yard	1899-12-31	14	532	190
419	435	Little Pennbury General Store	1899-12-31	16	364	270
420	434	New Brintford Tyre Plant	1899-12-31	13	16	971
421	433	Plarfingbourne Farm	1899-12-31	21	912	537
422	432	Wrutford Component Factory	1899-12-31	5	258	726
423	431	Drenningbury Lime Kiln	1899-12-31	2	964	990
424	430	Kintfield Quarry	1899-12-31	29	966	420
425	429	Keningwell Iron Ore Mine	1899-12-31	26	251	952
426	428	Futford General Store	1899-12-31	16	400	876
427	427	Pletburg Chlor-alkali Plant	1899-12-31	6	470	407
428	426	Fluntfield Carbon Black Plant	1899-12-31	8	821	771
429	425	Sindtown Coal Mine	1899-12-31	28	156	582
430	424	Prarnway-on-sea Tyre Plant	1899-12-31	13	845	560
431	423	Hindham Wire and Section Mill	1899-12-31	4	425	753
432	422	Dondhattan General Store	1899-12-31	16	900	977
433	421	Gonfingfield Coke Oven	1899-12-31	12	936	344
434	420	Charnpool General Store	1899-12-31	16	539	177
435	419	Mudhead Cross General Store	1899-12-31	16	875	891
436	418	Tundtown Sheet and Pipe Mill	1899-12-31	1	724	756
437	417	Chenington Assembly Plant	1899-12-31	30	729	768
438	416	Futford Iron Ore Mine	1899-12-31	26	395	845
439	415	Puntburg General Store	1899-12-31	16	416	210
440	414	Condingworth Soda Ash Mine	1899-12-31	7	223	801
441	413	Plindingstone Bay Component Factory	1899-12-31	5	420	148
442	412	Flufingway-on-sea Vehicle Distributor	1899-12-31	20	199	740
443	411	Wruningwell Ridge Component Factory	1899-12-31	5	317	153
444	410	Little Prenfingfield Electric Arc Furnace	1899-12-31	11	441	848
445	409	Fatborough Builders Yard	1899-12-31	14	927	728
446	408	Chindborough Bay Scrap Yard	1899-12-31	22	487	469
447	407	Lintston Scrap Yard	1899-12-31	22	978	366
448	406	Gredingbury Farm	1899-12-31	21	301	819
449	405	Frendhattan Wire and Section Mill	1899-12-31	4	208	106
450	404	Tendstone Wire and Section Mill	1899-12-31	4	512	28
451	403	Nonnville Coke Oven	1899-12-31	12	284	772
452	402	Prardworth Falls Scrap Yard	1899-12-31	22	924	144
453	401	Munnington Wire and Section Mill	1899-12-31	4	480	872
454	400	Tenham Sheet and Pipe Mill	1899-12-31	1	878	114
455	399	Sluwood Coal Mine	1899-12-31	28	224	413
456	398	Druntbourne General Store	1899-12-31	16	236	490
457	397	Wrentfield Body Plant	1899-12-31	3	371	323
458	396	Suthill Lime Kiln	1899-12-31	2	247	406
459	395	Flufingway-on-sea Slag Grinding Plant	1899-12-31	10	208	727
460	394	Wrutford Coal Mine	1899-12-31	28	238	768
461	393	Pinfingley Assembly Plant	1899-12-31	30	579	992
462	392	Senfinghill General Store	1899-12-31	16	675	794
463	391	Prinnford Farm	1899-12-31	21	852	739
464	390	Luningley General Store	1899-12-31	16	971	39
465	389	Punninghall Cryo Plant	1899-12-31	27	234	14
466	388	Cundhall Lime Kiln	1899-12-31	2	940	668
467	387	Overnwell Component Factory	1899-12-31	5	787	55
468	386	Drendingstone Farm	1899-12-31	21	353	230
469	385	Maningbury Lime Kiln	1899-12-31	2	337	29
470	384	Flenfingburg Electric Arc Furnace	1899-12-31	11	864	322
471	383	Redtown Scrap Yard	1899-12-31	22	645	273
472	382	Sedwood Vehicle Distributor	1899-12-31	20	603	452
473	381	Sontbridge Chlor-alkali Plant	1899-12-31	6	187	700
474	380	Wrendston Tyre Plant	1899-12-31	13	802	942
475	379	Flindham Builders Yard	1899-12-31	14	870	710
476	378	Wedinghall Body Plant	1899-12-31	3	336	359
477	377	Slenfingley Market Sheet and Pipe Mill	1899-12-31	1	220	347
478	376	Plinston Glass Works	1899-12-31	23	770	175
479	375	Nunningstone-on-sea Soda Ash Mine	1899-12-31	7	949	320
480	374	Edinborough Bay Farm	1899-12-31	21	534	857
481	373	Fenfingwell Potash Mine	1899-12-31	15	566	893
482	372	Sindtown Vehicle Distributor	1899-12-31	20	141	585
483	371	Nundhattan Wharf	1899-12-31	19	964	748
484	370	Bindhattan Cryo Plant	1899-12-31	27	856	508
485	369	Wrendston Electric Arc Furnace	1899-12-31	11	795	962
486	368	Sontbridge Electric Arc Furnace	1899-12-31	11	235	736
487	367	Trutburg Farm	1899-12-31	21	699	346
488	366	Slonfingley Coke Oven	1899-12-31	12	543	562
489	365	Lintston Vehicle Distributor	1899-12-31	20	969	359
490	364	Sennway Coke Oven	1899-12-31	12	337	563
491	363	Ganpool Glass Works	1899-12-31	23	216	307
492	362	Carham Builders Yard	1899-12-31	14	153	469
493	361	Prindingworth Assembly Plant	1899-12-31	30	684	742
494	360	Nondhall Carbon Black Plant	1899-12-31	8	258	306
495	359	Tindhall Vehicle Distributor	1899-12-31	20	230	198
496	358	Wrendston Wire and Section Mill	1899-12-31	4	800	916
497	357	Ratburg Component Factory	1899-12-31	5	416	57
498	356	Detbridge Chlor-alkali Plant	1899-12-31	6	600	494
499	355	Luntburg Iron Ore Mine	1899-12-31	26	799	600
500	354	Sundinghead Sheet and Pipe Mill	1899-12-31	1	227	453
501	353	Fluningwell Cryo Plant	1899-12-31	27	400	394
502	352	Flunpool Glass Works	1899-12-31	23	240	132
503	351	Pledhattan Springs Farm	1899-12-31	21	794	484
504	350	Frondston Sheet and Pipe Mill	1899-12-31	1	464	62
505	349	Ratburg Carbon Black Plant	1899-12-31	8	421	111
506	348	Seningley Market Sheet and Pipe Mill	1899-12-31	1	994	868
507	347	Fenwell Vehicle Distributor	1899-12-31	20	59	348
508	346	Little Pronningstone-on-sea Potash Mine	1899-12-31	15	379	763
509	345	Brintford Limestone Mine	1899-12-31	17	354	66
510	344	Slarfingford Vehicle Distributor	1899-12-31	20	199	468
511	343	Runninghall General Store	1899-12-31	16	745	316
512	342	Bonborough Vehicle Distributor	1899-12-31	20	1001	348
513	341	Frendhattan Iron Ore Mine	1899-12-31	26	183	84
514	340	Fondingstone Quarry	1899-12-31	29	488	734
515	339	Nentston Vehicle Distributor	1899-12-31	20	197	776
516	338	Printborough Electric Arc Furnace	1899-12-31	11	794	617
517	337	Little Prenfingfield Glass Works	1899-12-31	23	494	844
518	336	Little Prenfingfield Scrap Yard	1899-12-31	22	468	850
519	335	Ganley Soda Ash Mine	1899-12-31	7	583	632
520	334	Gadinghattan Component Factory	1899-12-31	5	799	887
521	333	Gratwood Coal Mine	1899-12-31	28	560	487
522	332	Sleningpool Falls Sheet and Pipe Mill	1899-12-31	1	323	399
523	331	Bratwood Farm	1899-12-31	21	61	487
524	330	Little Menley Iron Ore Mine	1899-12-31	26	389	417
525	329	Runston General Store	1899-12-31	16	49	221
526	328	Dindingville Vehicle Distributor	1899-12-31	20	645	375
527	327	Nudhead Cross General Store	1899-12-31	16	935	625
529	326	Sutfield Quarry	1899-12-31	29	901	668
531	325	Bubourne Iron Ore Mine	1899-12-31	26	42	729
532	322	Brondingville Vehicle Distributor	1899-12-31	20	697	416
533	321	Pletburg Tyre Plant	1899-12-31	13	462	398
534	320	Punttown Component Factory	1899-12-31	5	96	946
535	319	Trundhattan General Store	1899-12-31	16	383	214
536	318	Fort Flinfingfield Blast Furnace	1899-12-31	25	289	444
537	317	Muworth Falls General Store	1899-12-31	16	460	447
538	316	Satfield Basic Oxygen Furnace	1899-12-31	24	403	788
539	315	Taninghall Slag Grinding Plant	1899-12-31	10	428	694
540	314	Suntbourne Quarry	1899-12-31	29	191	286
541	313	Ladinghead General Store	1899-12-31	16	636	991
542	312	Drutway Iron Ore Mine	1899-12-31	26	163	878
543	311	Muntfield Assembly Plant	1899-12-31	30	1002	289
544	310	Tretbourne Farm	1899-12-31	21	71	953
545	309	Hindhead Farm	1899-12-31	21	232	589
546	308	Prardworth Falls Body Plant	1899-12-31	3	918	165
547	307	Little Chendingbury Farm	1899-12-31	21	855	216
548	306	Wruningpool Falls Body Plant	1899-12-31	3	295	561
549	305	Fluntfield Basic Oxygen Furnace	1899-12-31	24	808	778
550	304	Keningwell Glass Works	1899-12-31	23	258	935
551	303	Trintborough Chlor-alkali Plant	1899-12-31	6	145	858
552	302	Pinnley Limestone Mine	1899-12-31	17	537	698
553	301	Sindinghead Sheet and Pipe Mill	1899-12-31	1	345	745
554	300	Rafingford Coke Oven	1899-12-31	12	96	498
555	299	Slarningworth Falls Body Plant	1899-12-31	3	611	907
556	298	Gedingville Quarry	1899-12-31	29	989	967
557	297	Fladinghattan Lime Kiln	1899-12-31	2	173	135
558	296	Laninghall Farm	1899-12-31	21	525	90
559	295	Ratborough Iron Ore Mine	1899-12-31	26	926	375
560	294	Frindborough Bay Vehicle Distributor	1899-12-31	20	121	260
561	293	Great Drindtown Wharf	1899-12-31	19	925	890
563	291	Donfingfield Body Plant	1899-12-31	3	716	177
564	290	Cundhall Farm	1899-12-31	21	948	696
565	289	Ratburg Coal Mine	1899-12-31	28	401	117
566	288	Chufingford Scrap Yard	1899-12-31	22	128	433
567	287	Hendinghall Vehicle Distributor	1899-12-31	20	775	233
568	286	Plarthill Builders Yard	1899-12-31	14	702	707
569	285	Minfingley Component Factory	1899-12-31	5	21	605
570	284	Flondstone Farm	1899-12-31	21	328	590
571	283	Wrentown Coke Oven	1899-12-31	12	409	170
572	282	Tronfingburg General Store	1899-12-31	16	736	632
573	281	Nunningstone-on-sea Coal Mine	1899-12-31	28	951	308
574	280	Little Frehill City Component Factory	1899-12-31	5	430	346
575	279	Wrutford Iron Ore Mine	1899-12-31	26	251	752
576	278	Fenwell General Store	1899-12-31	16	71	350
577	277	Sutfield Carbon Black Plant	1899-12-31	8	901	662
578	276	Flenfingburg Cryo Plant	1899-12-31	27	820	319
579	275	Grinnpool Builders Yard	1899-12-31	14	472	332
580	274	Keningwell Tyre Plant	1899-12-31	13	254	958
581	273	Darhill Basic Oxygen Furnace	1899-12-31	24	845	143
582	272	Wruningpool Falls Component Factory	1899-12-31	5	299	577
583	271	Gedingville Component Factory	1899-12-31	5	1001	962
584	270	Wrentown Scrap Yard	1899-12-31	22	410	182
585	269	Drutway Scrap Yard	1899-12-31	22	168	860
586	268	Ratston Coke Oven	1899-12-31	12	270	976
587	267	Bafingbridge Iron Ore Mine	1899-12-31	26	809	50
588	266	Great Pindinghattan Coke Oven	1899-12-31	12	923	951
589	265	Duntford Engine Plant	1899-12-31	9	615	766
590	264	Bafingbridge Farm	1899-12-31	21	832	33
591	263	Gonfingford General Store	1899-12-31	16	186	1004
592	262	Fenway Potash Mine	1899-12-31	15	116	325
593	261	Trundhattan Vehicle Distributor	1899-12-31	20	369	213
594	260	Little Prindstone Component Factory	1899-12-31	5	149	805
595	259	Fenfingwell Wharf	1899-12-31	19	603	883
596	258	Sadingham Potash Mine	1899-12-31	15	286	626
597	257	Flindham Carbon Black Plant	1899-12-31	8	842	707
598	256	Sundinghead Limestone Mine	1899-12-31	17	234	443
599	255	Treston Chlor-alkali Plant	1899-12-31	6	681	381
600	254	Great Pindinghattan Bulk Terminal	1899-12-31	18	858	935
601	253	Little Brutown Vehicle Distributor	1899-12-31	20	451	274
602	252	Suthill Builders Yard	1899-12-31	14	256	373
603	251	Tronfingburg Lime Kiln	1899-12-31	2	745	625
604	250	Plindingstone Bay Coal Mine	1899-12-31	28	442	141
605	249	Tundtown Glass Works	1899-12-31	23	751	723
606	248	Frendhattan Lime Kiln	1899-12-31	2	249	90
607	247	Prarfinghill Lime Kiln	1899-12-31	2	936	18
608	246	Tendhead Soda Ash Mine	1899-12-31	7	792	877
609	245	Trintborough Farm	1899-12-31	21	126	841
610	244	Frudington Farm	1899-12-31	21	506	769
611	243	Tundtown Potash Mine	1899-12-31	15	745	762
612	242	Weningwell Blast Furnace	1899-12-31	25	675	477
613	241	Flindham Sheet and Pipe Mill	1899-12-31	1	850	695
614	240	Hondingbury Component Factory	1899-12-31	5	900	69
615	239	Detbridge Cryo Plant	1899-12-31	27	585	520
616	238	Little Trunthill City Basic Oxygen Furnace	1899-12-31	24	882	791
617	237	Nindworth General Store	1899-12-31	16	677	868
618	236	Frendhattan Limestone Mine	1899-12-31	17	187	91
619	235	Little Trunthill City Farm	1899-12-31	21	914	824
620	234	Frudington Assembly Plant	1899-12-31	30	555	779
621	233	Hondingbury Scrap Yard	1899-12-31	22	879	82
622	232	Suthill Potash Mine	1899-12-31	15	246	353
623	231	Sennway Wharf	1899-12-31	19	348	559
624	230	Bardingstone Bay General Store	1899-12-31	16	350	676
625	229	Grinnpool Assembly Plant	1899-12-31	30	481	352
626	228	Drentston General Store	1899-12-31	16	96	774
627	227	Tronfingburg Quarry	1899-12-31	29	742	610
628	226	Tufingpool Bulk Terminal	1899-12-31	18	276	715
629	225	Narnhall Glass Works	1899-12-31	23	84	442
528	324	Slarfingford Lime Kiln	1899-12-31	2	221	469
530	323	Sindtown General Store	1899-12-31	16	150	587
562	292	Platburg Springs Component Factory	1899-12-31	5	511	128
630	224	Keningwell Builders Yard	1899-12-31	14	250	944
631	223	Dradston Cryo Plant	1899-12-31	27	128	565
632	222	Pledington Farm	1899-12-31	21	201	618
633	221	Ratston Coal Mine	1899-12-31	28	275	991
634	220	Prarfinghill Wire and Section Mill	1899-12-31	4	941	26
635	219	Edinborough Bay Tyre Plant	1899-12-31	13	538	883
636	218	Ganley Blast Furnace	1899-12-31	25	607	651
637	217	Mondinghead Cryo Plant	1899-12-31	27	528	223
638	216	Feston Wharf	1899-12-31	19	97	866
639	215	Sundinghead Glass Works	1899-12-31	23	208	427
640	214	Gredston Vehicle Distributor	1899-12-31	20	867	402
641	213	Tundtown Cryo Plant	1899-12-31	27	743	745
642	212	Charnpool Scrap Yard	1899-12-31	22	549	188
643	211	Ratburg Iron Ore Mine	1899-12-31	26	426	62
644	210	Tenhattan Electric Arc Furnace	1899-12-31	11	96	477
645	209	Overnwell Potash Mine	1899-12-31	15	769	102
646	208	Hondingbury Basic Oxygen Furnace	1899-12-31	24	867	85
647	207	Flondham Builders Yard	1899-12-31	14	848	583
648	206	Marfingford Iron Ore Mine	1899-12-31	26	834	64
649	205	Gunnway Slag Grinding Plant	1899-12-31	10	715	136
650	204	Huntburg Potash Mine	1899-12-31	15	849	514
651	203	Tendhead Wharf	1899-12-31	19	801	869
652	202	Dreningstone Glass Works	1899-12-31	23	987	706
653	201	Narnhall Wharf	1899-12-31	19	76	444
654	200	Narningpool Farm	1899-12-31	21	136	233
655	199	Dradston Basic Oxygen Furnace	1899-12-31	24	142	530
656	198	Hundworth Falls Chlor-alkali Plant	1899-12-31	6	429	380
657	197	Trarnfield Glass Works	1899-12-31	23	558	433
658	196	Renfingbridge General Store	1899-12-31	16	446	892
659	195	Cufield Farm	1899-12-31	21	374	805
660	194	Prinnford Coke Oven	1899-12-31	12	840	769
661	193	Sefingway Electric Arc Furnace	1899-12-31	11	171	479
662	192	Darhill Potash Mine	1899-12-31	15	855	95
663	191	Flinburg Springs Scrap Yard	1899-12-31	22	387	60
664	190	Little Brutown Limestone Mine	1899-12-31	17	476	292
665	189	Pratburg Lime Kiln	1899-12-31	2	129	665
666	188	Hetbridge Wharf	1899-12-31	19	114	101
667	187	Penfingborough Builders Yard	1899-12-31	14	155	784
668	186	Fenfingwell Vehicle Distributor	1899-12-31	20	551	866
669	185	Prinnford Slag Grinding Plant	1899-12-31	10	839	782
670	184	Canway Bulk Terminal	1899-12-31	18	824	243
671	183	Trintborough Body Plant	1899-12-31	3	142	821
672	182	Gruntford Body Plant	1899-12-31	3	775	539
673	181	Invedingbury Component Factory	1899-12-31	5	277	851
674	180	Frendhattan Sheet and Pipe Mill	1899-12-31	1	216	67
675	179	Duntford Tyre Plant	1899-12-31	13	654	778
676	178	Lunnton Component Factory	1899-12-31	5	574	911
677	177	Flontford General Store	1899-12-31	16	421	426
678	176	Little Chendingbury Component Factory	1899-12-31	5	858	201
679	175	Marfingford Engine Plant	1899-12-31	9	850	42
680	174	Plonnwell General Store	1899-12-31	16	998	597
681	173	Detbridge Glass Works	1899-12-31	23	595	519
682	172	Grunston Coal Mine	1899-12-31	28	124	379
683	171	Wruningpool Falls Coal Mine	1899-12-31	28	308	585
684	170	Hindham Electric Arc Furnace	1899-12-31	11	418	730
685	169	Fenfingwell Wire and Section Mill	1899-12-31	4	553	878
686	168	Wretwood Potash Mine	1899-12-31	15	222	978
687	167	Trarningville Component Factory	1899-12-31	5	893	736
688	166	Rarnbridge Bulk Terminal	1899-12-31	18	716	981
689	165	Chindborough Bay General Store	1899-12-31	16	502	483
690	164	Wrendingstone Quarry	1899-12-31	29	109	650
691	163	Dradston Scrap Yard	1899-12-31	22	160	568
692	162	Mutway Iron Ore Mine	1899-12-31	26	322	949
693	161	Kedinghall Limestone Mine	1899-12-31	17	176	904
694	160	Darhill Blast Furnace	1899-12-31	25	867	120
695	159	Nendstone Quarry	1899-12-31	29	128	31
696	158	Pinnley Sheet and Pipe Mill	1899-12-31	1	519	679
697	157	Flontford Scrap Yard	1899-12-31	22	430	417
698	156	Ratston Limestone Mine	1899-12-31	17	306	984
699	155	Brondingville Component Factory	1899-12-31	5	751	409
700	154	Little Drinham Electric Arc Furnace	1899-12-31	11	966	902
701	153	Bunnwell Body Plant	1899-12-31	3	996	390
702	152	Drendingstone Assembly Plant	1899-12-31	30	329	221
703	151	Fladinghattan Assembly Plant	1899-12-31	30	136	168
704	150	Fort Slarnwell Wharf	1899-12-31	19	789	423
705	149	Sadingham Farm	1899-12-31	21	293	662
706	148	New Flarningstone Vehicle Distributor	1899-12-31	20	259	887
707	147	Drutway Glass Works	1899-12-31	23	161	887
708	146	Lenfingborough Market Assembly Plant	1899-12-31	30	873	619
709	145	Benningpool Bulk Terminal	1899-12-31	18	33	921
710	144	Tundworth Falls Engine Plant	1899-12-31	9	507	390
711	143	Raningbury Soda Ash Mine	1899-12-31	7	925	492
712	142	Grunston General Store	1899-12-31	16	98	373
713	141	Fruntfield Builders Yard	1899-12-31	14	93	731
714	140	Sunnway Vehicle Distributor	1899-12-31	20	524	175
715	139	Drutford General Store	1899-12-31	16	19	227
716	138	Pratburg Farm	1899-12-31	21	150	669
717	137	Ganingway Farm	1899-12-31	21	411	862
718	136	Tufingway-on-sea Coke Oven	1899-12-31	12	902	713
719	135	Slinnpool Vehicle Distributor	1899-12-31	20	511	530
720	134	Tardingstone Bay Coal Mine	1899-12-31	28	554	614
721	133	Satown Sheet and Pipe Mill	1899-12-31	1	1002	715
722	132	Ganley Bulk Terminal	1899-12-31	18	617	642
723	131	Wrentown Sheet and Pipe Mill	1899-12-31	1	376	143
724	130	Kindingwell Quarry	1899-12-31	29	536	939
725	129	Harninghall Farm	1899-12-31	21	640	535
726	128	Wedinghall Iron Ore Mine	1899-12-31	26	350	311
727	127	Sadingworth Basic Oxygen Furnace	1899-12-31	24	448	818
728	126	Little Drinham Farm	1899-12-31	21	968	953
729	125	Winfingpool Bridge Vehicle Distributor	1899-12-31	20	602	605
730	124	Flindinghead Cross Potash Mine	1899-12-31	15	974	498
731	123	Suntbourne Carbon Black Plant	1899-12-31	8	194	282
732	122	Dradhattan General Store	1899-12-31	16	360	979
733	121	Sleningbury Tyre Plant	1899-12-31	13	805	347
734	120	Gredingbury General Store	1899-12-31	16	294	863
735	119	Gunnway Electric Arc Furnace	1899-12-31	11	736	134
736	118	Gundhead Wire and Section Mill	1899-12-31	4	461	926
737	117	Tredinghall Glass Works	1899-12-31	23	609	343
738	116	Winthill Limestone Mine	1899-12-31	17	937	67
739	115	Fenway Builders Yard	1899-12-31	14	83	326
740	114	Hindham Carbon Black Plant	1899-12-31	8	395	730
741	113	Tonston Blast Furnace	1899-12-31	25	872	780
742	112	Slonfingley Coal Mine	1899-12-31	28	561	578
743	111	Muworth Falls Vehicle Distributor	1899-12-31	20	462	448
744	110	Wreninghall Soda Ash Mine	1899-12-31	7	968	685
745	109	Sarnbridge General Store	1899-12-31	16	321	998
746	108	Linningley Limestone Mine	1899-12-31	17	929	352
747	107	Great Fronfingford Quarry	1899-12-31	29	9	496
748	106	Trundhattan Component Factory	1899-12-31	5	386	247
749	105	Gendinghead Basic Oxygen Furnace	1899-12-31	24	426	726
750	104	Ginfingburg General Store	1899-12-31	16	73	255
751	103	Sunthill Assembly Plant	1899-12-31	30	108	232
752	102	Tronfingburg Limestone Mine	1899-12-31	17	723	671
753	101	Little Pronningstone-on-sea Scrap Yard	1899-12-31	22	398	764
754	100	Plufield Glass Works	1899-12-31	23	908	258
755	99	Wrennway Builders Yard	1899-12-31	14	183	659
756	98	Gendinghead Potash Mine	1899-12-31	15	445	713
757	97	Frondston General Store	1899-12-31	16	469	52
758	96	Marnfield Limestone Mine	1899-12-31	17	339	258
759	95	Lindinghead Builders Yard	1899-12-31	14	725	555
760	94	Little Grundham Iron Ore Mine	1899-12-31	26	484	799
761	93	Brondingville Chlor-alkali Plant	1899-12-31	6	727	407
762	92	Punninghall Bulk Terminal	1899-12-31	18	199	36
763	91	Benningpool Builders Yard	1899-12-31	14	31	951
764	90	Nonnbridge Soda Ash Mine	1899-12-31	7	640	404
765	89	Wreninghall Component Factory	1899-12-31	5	946	665
766	88	Lintston Sheet and Pipe Mill	1899-12-31	1	988	349
767	87	Little Frehill City Scrap Yard	1899-12-31	22	418	346
768	86	Hardstone Scrap Yard	1899-12-31	22	596	672
769	85	Laninghall Limestone Mine	1899-12-31	17	528	78
770	84	Larnway Lime Kiln	1899-12-31	2	270	937
771	83	Tindworth Glass Works	1899-12-31	23	748	120
772	82	Sindham Wire and Section Mill	1899-12-31	4	854	422
773	81	Kintfield Vehicle Distributor	1899-12-31	20	961	398
774	80	Fenway Farm	1899-12-31	21	93	317
775	79	Tundtown Farm	1899-12-31	21	765	732
776	78	Cudingbury Farm	1899-12-31	21	500	285
777	77	Sadingworth Carbon Black Plant	1899-12-31	8	434	795
778	76	Punttown Cryo Plant	1899-12-31	27	125	900
779	75	Gendinghead Coke Oven	1899-12-31	12	426	744
780	74	Frunnpool Coal Mine	1899-12-31	28	917	907
781	73	Prufingburg Component Factory	1899-12-31	5	369	615
782	72	Tendhead Scrap Yard	1899-12-31	22	781	847
783	71	Seningway Glass Works	1899-12-31	23	121	614
784	70	Flinburg Springs Vehicle Distributor	1899-12-31	20	392	65
785	69	Wruwood Iron Ore Mine	1899-12-31	26	946	298
786	68	Little Grundham Chlor-alkali Plant	1899-12-31	6	456	783
787	67	Muworth Falls Builders Yard	1899-12-31	14	451	462
788	66	Sontbridge Soda Ash Mine	1899-12-31	7	232	729
789	65	Bonham Component Factory	1899-12-31	5	683	164
790	64	Gendinghead Blast Furnace	1899-12-31	25	447	763
791	63	Sluwood Scrap Yard	1899-12-31	22	199	402
792	62	Plarthill Lime Kiln	1899-12-31	2	731	706
793	61	Keningwell Limestone Mine	1899-12-31	17	227	923
794	60	Ginfingburg Iron Ore Mine	1899-12-31	26	43	260
795	59	Hunningbury Vehicle Distributor	1899-12-31	20	809	477
796	58	Sutfield Coal Mine	1899-12-31	28	874	687
797	57	Tondingstone Bay General Store	1899-12-31	16	280	341
798	56	Punttown Sheet and Pipe Mill	1899-12-31	1	70	941
799	55	Plarthill Tyre Plant	1899-12-31	13	725	707
800	54	Rafingford Blast Furnace	1899-12-31	25	104	552
801	53	Gadinghattan Builders Yard	1899-12-31	14	772	902
802	52	Wretwood Farm	1899-12-31	21	226	1003
803	51	Gratwood Potash Mine	1899-12-31	15	537	517
804	50	Prenfingwell Farm	1899-12-31	21	575	543
805	49	Wronbourne Glass Works	1899-12-31	23	468	226
806	48	Chanington Soda Ash Mine	1899-12-31	7	654	590
807	47	Trundston Farm	1899-12-31	21	257	466
808	46	Flenfingburg Builders Yard	1899-12-31	14	834	318
809	45	Plunton General Store	1899-12-31	16	200	579
810	44	Frondston Slag Grinding Plant	1899-12-31	10	478	56
811	43	Hendinghall Chlor-alkali Plant	1899-12-31	6	784	225
812	42	New Pinningwell Builders Yard	1899-12-31	14	396	957
813	41	Sindham Engine Plant	1899-12-31	9	806	391
814	40	Ganpool Coke Oven	1899-12-31	12	234	271
815	39	Prindingworth Quarry	1899-12-31	29	683	726
816	38	Grunfingley Wharf	1899-12-31	19	673	918
817	37	Ganley Potash Mine	1899-12-31	15	567	647
818	36	Huntburg Farm	1899-12-31	21	837	510
819	35	Wruborough Farm	1899-12-31	21	729	297
820	34	Garnfield General Store	1899-12-31	16	966	544
821	33	Dradhattan Quarry	1899-12-31	29	355	935
822	32	Slarningworth Falls Wire and Section Mill	1899-12-31	4	609	919
823	31	Taninghall Assembly Plant	1899-12-31	30	395	705
824	30	Plonnwell Potash Mine	1899-12-31	15	971	611
825	29	Gadinghattan Sheet and Pipe Mill	1899-12-31	1	761	908
826	28	Munnington Lime Kiln	1899-12-31	2	468	889
827	27	Prutbourne Body Plant	1899-12-31	3	616	156
828	26	Kedinghall Wire and Section Mill	1899-12-31	4	153	902
829	25	Little Brutown Component Factory	1899-12-31	5	407	288
830	24	Flindham Chlor-alkali Plant	1899-12-31	6	866	704
831	23	Wundinghattan Soda Ash Mine	1899-12-31	7	492	25
832	22	Little Henston Carbon Black Plant	1899-12-31	8	735	959
833	21	Dratbridge Engine Plant	1899-12-31	9	343	692
834	20	Rarnbridge Slag Grinding Plant	1899-12-31	10	742	963
835	19	Wundinghattan Electric Arc Furnace	1899-12-31	11	462	31
836	18	Rarnbridge Coke Oven	1899-12-31	12	727	979
837	17	Ratborough Potash Mine	1899-12-31	15	924	363
838	16	Luntbourne Tyre Plant	1899-12-31	13	913	416
839	15	Mutway Builders Yard	1899-12-31	14	301	951
840	14	Drendingstone General Store	1899-12-31	16	338	214
841	13	Ginfingburg Limestone Mine	1899-12-31	17	72	242
842	12	Invedingbury Bulk Terminal	1899-12-31	18	270	819
843	11	Fruntfield Wharf	1899-12-31	19	61	737
844	10	Sundinghead Vehicle Distributor	1899-12-31	20	222	444
845	9	Darhill Farm	1899-12-31	21	866	129
846	8	Great Pindinghattan Scrap Yard	1899-12-31	22	901	937
847	7	Slinnpool Glass Works	1899-12-31	23	549	539
848	6	Edinborough Bay Quarry	1899-12-31	29	508	857
849	5	Wrendston Basic Oxygen Furnace	1899-12-31	24	789	952
850	4	Little Henston Blast Furnace	1899-12-31	25	736	933
851	3	Flontford Iron Ore Mine	1899-12-31	26	423	429
852	2	Wretwood Cryo Plant	1899-12-31	27	256	976
853	1	Frudworth Coal Mine	1899-12-31	28	239	338
854	0	Chanbridge Assembly Plant	1899-12-31	30	521	458
\.


                                                                                                                                                                                                                                                                                                                                                  4998.dat                                                                                            0000600 0004000 0002000 00000002017 14716700732 0014276 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        30	0	1	Assembly Plant	f	f	8c68fcff
24	5	1	Basic Oxygen Furnace	f	f	fcbcc0ff
25	4	1	Blast Furnace	f	f	a8a8a8ff
3	27	1	Body Plant	f	f	fc9c00ff
14	15	1	Builders Yard	f	f	fcf4ecff
18	12	1	Bulk Terminal	f	f	e8d0fcff
8	22	1	Carbon Black Plant	f	f	3c0000ff
6	24	1	Chlor-alkali Plant	f	f	fcfc00ff
28	1	1	Coal Mine	f	f	101010ff
12	18	1	Coke Oven	f	f	e00000ff
5	25	1	Component Factory	f	f	fc907cff
27	2	1	Cryo Plant	f	f	fcc000ff
11	19	1	Electric Arc Furnace	f	f	fc6c00ff
9	21	1	Engine Plant	f	f	bc546cff
21	9	1	Farm	f	f	548414ff
16	14	1	General Store	f	f	fcd8c8ff
23	7	1	Glass Works	f	f	58a8f0ff
26	3	1	Iron Ore Mine	f	f	74581cff
17	13	1	Limestone Mine	f	f	fcfcc0ff
2	28	1	Lime Kiln	f	f	d49470ff
15	17	1	Potash Mine	f	f	8c4c40ff
29	6	1	Quarry	f	f	fc9c00ff
22	8	1	Scrap Yard	f	f	b87818ff
1	29	1	Sheet and Pipe Mill	f	f	9cccdcff
10	20	1	Slag Grinding Plant	f	f	6c7484ff
7	23	1	Soda Ash Mine	f	f	fcf4ecff
13	16	1	Tyre Plant	f	f	bca8fcff
20	10	1	Vehicle Distributor	f	f	6cb040ff
19	11	1	Wharf	f	f	b8a078ff
4	26	1	Wire and Section Mill	f	f	882034ff
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 5000.dat                                                                                            0000600 0004000 0002000 00000103510 14716700732 0014245 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	2200	1	2	5	-1	0	0	0
2	2200	1	3	30	-1	0	0	0
3	2200	1	3	31	-1	0	0	0
4	2200	1	3	43	-1	0	0	0
5	2200	1	4	13	-1	0	0	0
6	2200	1	4	41	-1	0	0	0
7	2200	1	4	45	-1	0	0	0
8	2200	1	5	1	-1	320	0	0
9	2200	1	5	16	-1	240	0	0
10	2200	1	6	13	-1	0	0	0
11	2200	1	6	41	-1	0	0	0
12	2200	1	6	45	-1	0	0	0
13	2200	1	7	30	-1	0	0	0
14	2200	1	7	31	-1	0	0	0
15	2200	1	7	43	-1	0	0	0
16	2200	1	8	30	-1	0	0	0
17	2200	1	8	31	-1	0	0	0
18	2200	1	8	43	-1	0	0	0
19	2200	1	14	28	-1	0	0	0
20	2200	1	15	14	-1	144	0	0
21	2200	1	16	7	-1	0	0	0
22	2200	1	16	33	-1	0	0	0
23	2200	1	16	34	-1	0	0	0
24	2200	1	17	7	-1	0	0	0
25	2200	1	17	33	-1	0	0	0
26	2200	1	17	34	-1	0	0	0
27	2200	1	18	5	-1	0	0	0
28	2200	1	19	37	-1	224	0	0
29	2200	1	20	13	-1	0	0	0
30	2200	1	20	41	-1	0	0	0
31	2200	1	20	45	-1	0	0	0
32	2200	1	22	42	-1	0	0	0
33	2200	1	23	9	-1	0	0	0
34	2200	1	23	20	-1	0	0	0
35	2200	1	23	31	-1	0	0	0
36	2200	1	24	11	-1	0	0	0
37	2200	1	24	13	-1	0	0	0
38	2200	1	24	41	-1	0	0	0
39	2200	1	25	37	-1	136	0	0
40	2200	1	26	35	-1	160	0	0
41	2200	1	28	2	-1	160	0	0
42	2200	1	28	22	-1	96	0	0
43	2200	1	28	31	-1	120	0	0
44	2200	1	28	32	-1	136	0	0
45	2200	1	28	36	-1	96	0	0
46	2200	1	29	13	-1	0	0	0
47	2200	1	29	41	-1	0	0	0
48	2200	1	29	45	-1	0	0	0
49	2200	1	30	26	-1	120	0	0
50	2200	1	31	30	-1	0	0	0
51	2200	1	31	39	-1	0	0	0
52	2200	1	32	17	-1	160	0	0
53	2200	1	32	19	-1	160	0	0
54	2200	1	32	24	-1	184	0	0
55	2200	1	32	29	-1	136	0	0
56	2200	1	32	44	-1	104	0	0
57	2200	1	33	3	-1	0	0	0
58	2200	1	34	7	-1	0	0	0
59	2200	1	34	33	-1	0	0	0
60	2200	1	34	34	-1	0	0	0
61	2200	1	35	15	-1	80	0	0
62	2200	1	35	26	-1	80	0	0
63	2200	1	36	5	-1	0	0	0
64	2200	1	38	1	-1	360	0	0
65	2200	1	38	16	-1	264	0	0
66	2200	1	39	3	-1	0	0	0
67	2200	1	40	18	-1	0	0	0
68	2200	1	40	30	-1	0	0	0
69	2200	1	41	6	-1	0	0	0
70	2200	1	42	14	-1	128	0	0
71	2200	1	43	28	-1	0	0	0
72	2200	1	44	14	-1	288	0	0
73	2200	1	45	13	-1	0	0	0
74	2200	1	45	21	-1	0	0	0
75	2200	1	45	40	-1	0	0	0
76	2200	1	46	42	-1	0	0	0
77	2200	1	47	14	-1	304	0	0
78	2200	1	48	9	-1	0	0	0
79	2200	1	48	20	-1	0	0	0
80	2200	1	49	6	-1	0	0	0
81	2200	1	48	31	-1	0	0	0
82	2200	1	50	1	-1	280	0	0
83	2200	1	50	16	-1	208	0	0
84	2200	1	51	35	-1	240	0	0
85	2200	1	52	14	-1	224	0	0
86	2200	1	53	18	-1	0	0	0
87	2200	1	53	30	-1	0	0	0
88	2200	1	54	14	-1	1056	0	0
89	2200	1	56	12	-1	128	0	0
90	2200	1	56	16	-1	144	0	0
91	2200	1	57	35	-1	200	0	0
92	2200	1	59	12	-1	192	0	0
93	2200	1	59	16	-1	216	0	0
94	2200	1	60	9	-1	0	0	0
95	2200	1	60	20	-1	0	0	0
96	2200	1	60	31	-1	0	0	0
97	2200	1	62	3	-1	0	0	0
98	2200	1	63	12	-1	128	0	0
99	2200	1	63	16	-1	144	0	0
100	2200	1	64	5	-1	0	0	0
101	2200	1	65	27	-1	160	0	0
102	2200	1	66	3	-1	0	0	0
103	2200	1	67	14	-1	784	0	0
104	2200	1	70	27	-1	120	0	0
105	2200	1	73	42	-1	0	0	0
106	2200	1	74	26	-1	240	0	0
107	2200	1	75	23	-1	224	0	0
108	2200	1	78	42	-1	0	0	0
109	2200	1	79	37	-1	112	0	0
110	2200	1	80	6	-1	0	0	0
111	2200	1	81	30	-1	0	0	0
112	2200	1	81	39	-1	0	0	0
113	2200	1	82	14	-1	112	0	0
114	2200	1	83	12	-1	128	0	0
115	2200	1	83	16	-1	144	0	0
116	2200	1	84	27	-1	200	0	0
117	2200	1	85	37	-1	112	0	0
118	2200	1	86	37	-1	112	0	0
119	2200	1	87	6	-1	0	0	0
120	2200	1	88	28	-1	0	0	0
121	2200	1	89	37	-1	136	0	0
122	2200	1	90	18	-1	0	0	0
123	2200	1	90	30	-1	0	0	0
124	2200	1	91	1	-1	240	0	0
125	2200	1	91	16	-1	176	0	0
126	2200	1	92	2	-1	160	0	0
127	2200	1	92	22	-1	96	0	0
128	2200	1	92	31	-1	120	0	0
129	2200	1	92	32	-1	136	0	0
130	2200	1	92	36	-1	96	0	0
131	2200	1	93	14	-1	208	0	0
132	2200	1	94	42	-1	0	0	0
133	2200	1	95	37	-1	112	0	0
134	2200	1	97	26	-1	160	0	0
135	2200	1	98	14	-1	144	0	0
136	2200	1	99	28	-1	0	0	0
137	2200	1	100	37	-1	136	0	0
138	2200	1	101	14	-1	112	0	0
139	2200	1	102	26	-1	120	0	0
140	2200	1	103	3	-1	0	0	0
141	2200	1	104	42	-1	0	0	0
142	2200	1	106	23	-1	136	0	0
143	2200	1	107	25	-1	0	0	0
144	2200	1	107	38	-1	0	0	0
145	2200	1	107	47	-1	0	0	0
146	2200	1	108	1	-1	240	0	0
147	2200	1	108	16	-1	176	0	0
148	2200	1	110	5	-1	0	0	0
149	2200	1	111	37	-1	248	0	0
150	2200	1	112	18	-1	0	0	0
151	2200	1	112	30	-1	0	0	0
152	2200	1	113	13	-1	0	0	0
153	2200	1	113	21	-1	0	0	0
154	2200	1	113	40	-1	0	0	0
155	2200	1	116	9	-1	0	0	0
156	2200	1	116	20	-1	0	0	0
157	2200	1	116	31	-1	0	0	0
158	2200	1	117	42	-1	0	0	0
159	2200	1	118	37	-1	112	0	0
160	2200	1	119	14	-1	208	0	0
161	2200	1	120	37	-1	112	0	0
162	2200	1	122	3	-1	0	0	0
163	2200	1	123	13	-1	0	0	0
164	2200	1	123	41	-1	0	0	0
165	2200	1	123	45	-1	0	0	0
166	2200	1	124	26	-1	160	0	0
167	2200	1	125	37	-1	136	0	0
168	2200	1	126	27	-1	160	0	0
169	2200	1	127	8	-1	0	0	0
170	2200	1	127	10	-1	0	0	0
171	2200	1	127	31	-1	0	0	0
172	2200	1	128	9	-1	0	0	0
173	2200	1	128	20	-1	0	0	0
174	2200	1	128	31	-1	0	0	0
175	2200	1	129	8	-1	0	0	0
176	2200	1	129	10	-1	0	0	0
177	2200	1	129	31	-1	0	0	0
178	2200	1	130	6	-1	0	0	0
179	2200	1	131	4	-1	0	0	0
180	2200	1	132	28	-1	0	0	0
181	2200	1	134	37	-1	80	0	0
182	2200	1	135	37	-1	112	0	0
183	2200	1	136	3	-1	0	0	0
184	2200	1	137	35	-1	240	0	0
185	2200	1	139	5	-1	0	0	0
186	2200	1	142	35	-1	320	0	0
187	2200	1	143	5	-1	0	0	0
188	2200	1	144	23	-1	224	0	0
189	2200	1	147	35	-1	160	0	0
190	2200	1	149	9	-1	0	0	0
191	2200	1	149	20	-1	0	0	0
192	2200	1	149	31	-1	0	0	0
193	2200	1	151	1	-1	200	0	0
194	2200	1	151	16	-1	144	0	0
195	2200	1	152	12	-1	128	0	0
196	2200	1	152	16	-1	144	0	0
197	2200	1	153	30	-1	0	0	0
198	2200	1	153	31	-1	0	0	0
199	2200	1	153	43	-1	0	0	0
200	2200	1	154	15	-1	112	0	0
201	2200	1	154	26	-1	112	0	0
202	2200	1	155	1	-1	160	0	0
203	2200	1	155	16	-1	120	0	0
204	2200	1	156	9	-1	0	0	0
205	2200	1	156	20	-1	0	0	0
206	2200	1	156	31	-1	0	0	0
207	2200	1	157	3	-1	0	0	0
208	2200	1	158	15	-1	136	0	0
209	2200	1	158	26	-1	136	0	0
210	2200	1	159	14	-1	384	0	0
211	2200	1	160	37	-1	136	0	0
212	2200	1	161	35	-1	360	0	0
213	2200	1	162	18	-1	0	0	0
214	2200	1	162	30	-1	0	0	0
215	2200	1	163	8	-1	0	0	0
216	2200	1	163	10	-1	0	0	0
217	2200	1	163	31	-1	0	0	0
218	2200	1	164	35	-1	200	0	0
219	2200	1	165	42	-1	0	0	0
220	2200	1	166	7	-1	0	0	0
221	2200	1	166	33	-1	0	0	0
222	2200	1	166	34	-1	0	0	0
223	2200	1	167	14	-1	336	0	0
224	2200	1	168	37	-1	168	0	0
225	2200	1	169	14	-1	256	0	0
226	2200	1	172	27	-1	320	0	0
227	2200	1	173	37	-1	168	0	0
228	2200	1	174	14	-1	80	0	0
229	2200	1	175	15	-1	192	0	0
230	2200	1	175	26	-1	192	0	0
231	2200	1	176	27	-1	200	0	0
232	2200	1	177	6	-1	0	0	0
233	2200	1	178	23	-1	192	0	0
234	2200	1	179	30	-1	0	0	0
235	2200	1	179	39	-1	0	0	0
236	2200	1	180	13	-1	0	0	0
237	2200	1	180	41	-1	0	0	0
238	2200	1	180	45	-1	0	0	0
239	2200	1	182	7	-1	0	0	0
240	2200	1	182	33	-1	0	0	0
241	2200	1	182	34	-1	0	0	0
242	2200	1	183	28	-1	0	0	0
243	2200	1	184	26	-1	160	0	0
244	2200	1	186	23	-1	56	0	0
245	2200	1	187	15	-1	136	0	0
246	2200	1	187	26	-1	136	0	0
247	2200	1	188	17	-1	128	0	0
248	2200	1	188	19	-1	128	0	0
249	2200	1	188	24	-1	152	0	0
250	2200	1	188	29	-1	112	0	0
251	2200	1	188	44	-1	88	0	0
252	2200	1	190	42	-1	0	0	0
253	2200	1	191	28	-1	0	0	0
254	2200	1	193	11	-1	0	0	0
255	2200	1	193	13	-1	0	0	0
256	2200	1	193	41	-1	0	0	0
257	2200	1	194	1	-1	200	0	0
258	2200	1	194	16	-1	144	0	0
259	2200	1	195	17	-1	96	0	0
260	2200	1	195	19	-1	96	0	0
261	2200	1	195	24	-1	112	0	0
262	2200	1	195	29	-1	80	0	0
263	2200	1	195	44	-1	64	0	0
264	2200	1	196	13	-1	0	0	0
265	2200	1	196	21	-1	0	0	0
266	2200	1	196	40	-1	0	0	0
267	2200	1	197	15	-1	136	0	0
268	2200	1	197	26	-1	136	0	0
269	2200	1	199	27	-1	200	0	0
270	2200	1	201	5	-1	0	0	0
271	2200	1	203	28	-1	0	0	0
272	2200	1	204	12	-1	128	0	0
273	2200	1	204	16	-1	144	0	0
274	2200	1	206	11	-1	0	0	0
275	2200	1	206	13	-1	0	0	0
276	2200	1	206	41	-1	0	0	0
277	2200	1	207	12	-1	128	0	0
278	2200	1	207	16	-1	144	0	0
279	2200	1	208	11	-1	0	0	0
280	2200	1	208	13	-1	0	0	0
281	2200	1	208	41	-1	0	0	0
282	2200	1	210	3	-1	0	0	0
283	2200	1	211	35	-1	200	0	0
284	2200	1	212	25	-1	0	0	0
285	2200	1	212	38	-1	0	0	0
286	2200	1	212	47	-1	0	0	0
287	2200	1	213	9	-1	0	0	0
288	2200	1	213	20	-1	0	0	0
289	2200	1	213	31	-1	0	0	0
290	2200	1	215	27	-1	160	0	0
291	2200	1	217	12	-1	192	0	0
292	2200	1	217	16	-1	216	0	0
293	2200	1	218	1	-1	200	0	0
294	2200	1	218	16	-1	144	0	0
295	2200	1	219	37	-1	136	0	0
296	2200	1	222	11	-1	0	0	0
297	2200	1	222	13	-1	0	0	0
298	2200	1	222	41	-1	0	0	0
299	2200	1	225	30	-1	0	0	0
300	2200	1	225	39	-1	0	0	0
301	2200	1	227	30	-1	0	0	0
302	2200	1	227	39	-1	0	0	0
303	2200	1	228	4	-1	0	0	0
304	2200	1	229	30	-1	0	0	0
305	2200	1	229	39	-1	0	0	0
306	2200	1	230	4	-1	0	0	0
307	2200	1	231	12	-1	128	0	0
308	2200	1	231	16	-1	144	0	0
309	2200	1	233	17	-1	96	0	0
310	2200	1	233	19	-1	96	0	0
311	2200	1	233	24	-1	112	0	0
312	2200	1	233	29	-1	80	0	0
313	2200	1	233	44	-1	64	0	0
314	2200	1	235	5	-1	0	0	0
315	2200	1	236	27	-1	240	0	0
316	2200	1	237	3	-1	0	0	0
317	2200	1	238	3	-1	0	0	0
318	2200	1	239	14	-1	80	0	0
319	2200	1	240	4	-1	0	0	0
320	2200	1	241	25	-1	0	0	0
321	2200	1	241	38	-1	0	0	0
322	2200	1	241	47	-1	0	0	0
323	2200	1	245	26	-1	240	0	0
324	2200	1	246	18	-1	0	0	0
325	2200	1	246	30	-1	0	0	0
326	2200	1	247	8	-1	0	0	0
327	2200	1	247	10	-1	0	0	0
328	2200	1	248	12	-1	128	0	0
329	2200	1	247	31	-1	0	0	0
330	2200	1	248	16	-1	144	0	0
331	2200	1	250	23	-1	248	0	0
332	2200	1	249	15	-1	112	0	0
333	2200	1	249	26	-1	112	0	0
334	2200	1	252	13	-1	0	0	0
335	2200	1	252	21	-1	0	0	0
336	2200	1	252	40	-1	0	0	0
337	2200	1	253	27	-1	160	0	0
338	2200	1	255	3	-1	0	0	0
339	2200	1	256	14	-1	160	0	0
340	2200	1	258	11	-1	0	0	0
341	2200	1	258	13	-1	0	0	0
342	2200	1	258	41	-1	0	0	0
343	2200	1	259	14	-1	336	0	0
344	2200	1	260	8	-1	0	0	0
345	2200	1	260	10	-1	0	0	0
346	2200	1	260	31	-1	0	0	0
347	2200	1	261	3	-1	0	0	0
348	2200	1	262	27	-1	200	0	0
349	2200	1	263	3	-1	0	0	0
350	2200	1	264	37	-1	168	0	0
351	2200	1	266	17	-1	192	0	0
352	2200	1	266	19	-1	192	0	0
353	2200	1	266	24	-1	224	0	0
354	2200	1	266	29	-1	168	0	0
355	2200	1	266	44	-1	128	0	0
356	2200	1	267	23	-1	136	0	0
357	2200	1	268	17	-1	128	0	0
358	2200	1	268	19	-1	128	0	0
359	2200	1	268	24	-1	152	0	0
360	2200	1	268	29	-1	112	0	0
361	2200	1	268	44	-1	88	0	0
362	2200	1	269	1	-1	80	0	0
363	2200	1	269	16	-1	56	0	0
364	2200	1	270	1	-1	80	0	0
365	2200	1	270	16	-1	56	0	0
366	2200	1	272	27	-1	200	0	0
367	2200	1	273	15	-1	112	0	0
368	2200	1	273	26	-1	112	0	0
369	2200	1	274	23	-1	168	0	0
370	2200	1	275	9	-1	0	0	0
371	2200	1	275	20	-1	0	0	0
372	2200	1	275	31	-1	0	0	0
373	2200	1	277	6	-1	0	0	0
374	2200	1	278	11	-1	0	0	0
375	2200	1	278	13	-1	0	0	0
376	2200	1	278	41	-1	0	0	0
377	2200	1	279	17	-1	160	0	0
378	2200	1	279	19	-1	160	0	0
379	2200	1	279	24	-1	184	0	0
380	2200	1	279	29	-1	136	0	0
381	2200	1	279	44	-1	104	0	0
382	2200	1	280	12	-1	192	0	0
384	2200	1	280	16	-1	216	0	0
475	2200	1	340	30	-1	0	0	0
476	2200	1	340	31	-1	0	0	0
477	2200	1	340	43	-1	0	0	0
478	2200	1	341	25	-1	0	0	0
479	2200	1	341	38	-1	0	0	0
480	2200	1	341	47	-1	0	0	0
481	2200	1	342	27	-1	160	0	0
482	2200	1	343	14	-1	112	0	0
483	2200	1	346	35	-1	200	0	0
484	2200	1	347	4	-1	0	0	0
485	2200	1	348	4	-1	0	0	0
486	2200	1	349	1	-1	200	0	0
487	2200	1	349	16	-1	144	0	0
488	2200	1	350	14	-1	272	0	0
489	2200	1	352	42	-1	0	0	0
490	2200	1	353	37	-1	112	0	0
491	2200	1	355	15	-1	112	0	0
492	2200	1	355	26	-1	112	0	0
493	2200	1	357	5	-1	0	0	0
494	2200	1	358	35	-1	160	0	0
495	2200	1	359	6	-1	0	0	0
496	2200	1	360	35	-1	160	0	0
497	2200	1	363	26	-1	200	0	0
498	2200	1	365	35	-1	200	0	0
499	2200	1	366	2	-1	192	0	0
500	2200	1	366	22	-1	120	0	0
501	2200	1	366	31	-1	144	0	0
502	2200	1	366	32	-1	168	0	0
503	2200	1	366	36	-1	120	0	0
504	2200	1	367	7	-1	0	0	0
505	2200	1	367	33	-1	0	0	0
506	2200	1	367	34	-1	0	0	0
507	2200	1	368	2	-1	128	0	0
508	2200	1	368	22	-1	80	0	0
509	2200	1	368	31	-1	96	0	0
510	2200	1	368	32	-1	112	0	0
511	2200	1	368	36	-1	80	0	0
512	2200	1	369	14	-1	160	0	0
513	2200	1	370	3	-1	0	0	0
514	2200	1	371	25	-1	0	0	0
515	2200	1	371	38	-1	0	0	0
516	2200	1	371	47	-1	0	0	0
517	2200	1	372	17	-1	192	0	0
518	2200	1	372	19	-1	192	0	0
519	2200	1	372	24	-1	224	0	0
520	2200	1	372	29	-1	168	0	0
521	2200	1	372	44	-1	128	0	0
522	2200	1	373	2	-1	128	0	0
523	2200	1	373	22	-1	80	0	0
524	2200	1	373	31	-1	96	0	0
525	2200	1	373	32	-1	112	0	0
526	2200	1	373	36	-1	80	0	0
527	2200	1	374	15	-1	168	0	0
528	2200	1	374	26	-1	168	0	0
529	2200	1	375	14	-1	96	0	0
530	2200	1	377	26	-1	160	0	0
531	2200	1	378	7	-1	0	0	0
532	2200	1	378	33	-1	0	0	0
533	2200	1	378	34	-1	0	0	0
534	2200	1	379	27	-1	200	0	0
535	2200	1	380	25	-1	0	0	0
536	2200	1	380	38	-1	0	0	0
537	2200	1	380	47	-1	0	0	0
538	2200	1	382	17	-1	96	0	0
539	2200	1	382	19	-1	96	0	0
540	2200	1	382	24	-1	112	0	0
541	2200	1	382	29	-1	80	0	0
542	2200	1	382	44	-1	64	0	0
543	2200	1	383	23	-1	136	0	0
544	2200	1	385	11	-1	0	0	0
545	2200	1	385	13	-1	0	0	0
546	2200	1	385	41	-1	0	0	0
547	2200	1	386	1	-1	200	0	0
548	2200	1	386	16	-1	144	0	0
549	2200	1	387	42	-1	0	0	0
550	2200	1	388	3	-1	0	0	0
551	2200	1	389	30	-1	0	0	0
552	2200	1	389	39	-1	0	0	0
553	2200	1	391	18	-1	0	0	0
554	2200	1	391	30	-1	0	0	0
555	2200	1	392	15	-1	80	0	0
556	2200	1	392	26	-1	80	0	0
557	2200	1	393	14	-1	1248	0	0
558	2200	1	395	37	-1	248	0	0
559	2200	1	396	35	-1	160	0	0
560	2200	1	397	1	-1	240	0	0
561	2200	1	397	16	-1	176	0	0
562	2200	1	398	28	-1	0	0	0
563	2200	1	399	37	-1	136	0	0
564	2200	1	400	37	-1	112	0	0
565	2200	1	401	17	-1	192	0	0
566	2200	1	401	19	-1	192	0	0
567	2200	1	401	24	-1	224	0	0
568	2200	1	401	29	-1	168	0	0
569	2200	1	401	44	-1	128	0	0
570	2200	1	403	18	-1	0	0	0
571	2200	1	403	30	-1	0	0	0
383	2200	1	281	11	-1	0	0	0
385	2200	1	281	13	-1	0	0	0
386	2200	1	281	41	-1	0	0	0
387	2200	1	282	4	-1	0	0	0
388	2200	1	283	28	-1	0	0	0
389	2200	1	284	14	-1	80	0	0
390	2200	1	285	13	-1	0	0	0
391	2200	1	285	41	-1	0	0	0
392	2200	1	285	45	-1	0	0	0
393	2200	1	287	37	-1	248	0	0
394	2200	1	288	12	-1	128	0	0
395	2200	1	288	16	-1	144	0	0
396	2200	1	289	18	-1	0	0	0
397	2200	1	289	30	-1	0	0	0
398	2200	1	290	1	-1	280	0	0
399	2200	1	290	16	-1	208	0	0
400	2200	1	291	35	-1	200	0	0
401	2200	1	292	13	-1	0	0	0
402	2200	1	292	21	-1	0	0	0
403	2200	1	292	40	-1	0	0	0
404	2200	1	294	14	-1	176	0	0
405	2200	1	297	35	-1	200	0	0
406	2200	1	298	30	-1	0	0	0
407	2200	1	298	31	-1	0	0	0
408	2200	1	298	43	-1	0	0	0
409	2200	1	299	13	-1	0	0	0
410	2200	1	299	41	-1	0	0	0
411	2200	1	299	45	-1	0	0	0
412	2200	1	300	1	-1	160	0	0
413	2200	1	300	16	-1	120	0	0
414	2200	1	301	13	-1	0	0	0
415	2200	1	301	41	-1	0	0	0
416	2200	1	301	45	-1	0	0	0
417	2200	1	303	8	-1	0	0	0
418	2200	1	303	10	-1	0	0	0
419	2200	1	303	31	-1	0	0	0
420	2200	1	305	9	-1	0	0	0
421	2200	1	305	20	-1	0	0	0
422	2200	1	305	31	-1	0	0	0
423	2200	1	306	30	-1	0	0	0
424	2200	1	306	39	-1	0	0	0
425	2200	1	307	9	-1	0	0	0
426	2200	1	307	20	-1	0	0	0
427	2200	1	307	31	-1	0	0	0
428	2200	1	308	11	-1	0	0	0
429	2200	1	308	13	-1	0	0	0
430	2200	1	308	41	-1	0	0	0
431	2200	1	309	7	-1	0	0	0
432	2200	1	309	33	-1	0	0	0
433	2200	1	309	34	-1	0	0	0
434	2200	1	310	26	-1	320	0	0
435	2200	1	311	13	-1	0	0	0
436	2200	1	311	41	-1	0	0	0
437	2200	1	311	45	-1	0	0	0
438	2200	1	312	42	-1	0	0	0
439	2200	1	313	42	-1	0	0	0
440	2200	1	315	7	-1	0	0	0
441	2200	1	315	33	-1	0	0	0
442	2200	1	315	34	-1	0	0	0
443	2200	1	317	18	-1	0	0	0
444	2200	1	317	30	-1	0	0	0
445	2200	1	318	1	-1	80	0	0
446	2200	1	318	16	-1	56	0	0
447	2200	1	319	7	-1	0	0	0
448	2200	1	319	33	-1	0	0	0
449	2200	1	319	34	-1	0	0	0
450	2200	1	320	6	-1	0	0	0
451	2200	1	321	3	-1	0	0	0
452	2200	1	322	37	-1	136	0	0
453	2200	1	324	13	-1	0	0	0
454	2200	1	324	41	-1	0	0	0
455	2200	1	324	45	-1	0	0	0
456	2200	1	325	4	-1	0	0	0
457	2200	1	327	2	-1	160	0	0
458	2200	1	327	22	-1	96	0	0
459	2200	1	327	31	-1	120	0	0
460	2200	1	327	32	-1	136	0	0
461	2200	1	327	36	-1	96	0	0
462	2200	1	328	23	-1	136	0	0
463	2200	1	329	35	-1	200	0	0
464	2200	1	330	4	-1	0	0	0
465	2200	1	331	27	-1	200	0	0
466	2200	1	333	42	-1	0	0	0
467	2200	1	334	37	-1	56	0	0
468	2200	1	335	3	-1	0	0	0
469	2200	1	336	3	-1	0	0	0
470	2200	1	337	18	-1	0	0	0
471	2200	1	337	30	-1	0	0	0
472	2200	1	338	30	-1	0	0	0
473	2200	1	338	39	-1	0	0	0
474	2200	1	339	37	-1	224	0	0
572	2200	1	404	7	-1	0	0	0
573	2200	1	404	33	-1	0	0	0
574	2200	1	404	34	-1	0	0	0
575	2200	1	407	4	-1	0	0	0
576	2200	1	408	35	-1	360	0	0
577	2200	1	409	37	-1	248	0	0
578	2200	1	410	7	-1	0	0	0
579	2200	1	410	33	-1	0	0	0
580	2200	1	410	34	-1	0	0	0
581	2200	1	412	35	-1	200	0	0
582	2200	1	413	37	-1	112	0	0
583	2200	1	415	37	-1	168	0	0
584	2200	1	416	35	-1	160	0	0
585	2200	1	417	35	-1	240	0	0
586	2200	1	420	6	-1	0	0	0
587	2200	1	421	37	-1	80	0	0
588	2200	1	422	3	-1	0	0	0
589	2200	1	423	18	-1	0	0	0
590	2200	1	423	30	-1	0	0	0
591	2200	1	424	15	-1	224	0	0
592	2200	1	424	26	-1	224	0	0
593	2200	1	425	27	-1	160	0	0
594	2200	1	427	25	-1	0	0	0
595	2200	1	427	38	-1	0	0	0
596	2200	1	427	47	-1	0	0	0
597	2200	1	428	42	-1	0	0	0
598	2200	1	429	35	-1	200	0	0
599	2200	1	430	6	-1	0	0	0
600	2200	1	431	8	-1	0	0	0
601	2200	1	431	10	-1	0	0	0
602	2200	1	431	31	-1	0	0	0
603	2200	1	433	7	-1	0	0	0
604	2200	1	433	33	-1	0	0	0
605	2200	1	433	34	-1	0	0	0
606	2200	1	436	9	-1	0	0	0
607	2200	1	436	20	-1	0	0	0
608	2200	1	436	31	-1	0	0	0
609	2200	1	437	30	-1	0	0	0
610	2200	1	437	31	-1	0	0	0
611	2200	1	437	43	-1	0	0	0
612	2200	1	438	27	-1	80	0	0
613	2200	1	440	12	-1	160	0	0
614	2200	1	440	16	-1	176	0	0
615	2200	1	441	3	-1	0	0	0
616	2200	1	443	3	-1	0	0	0
617	2200	1	444	11	-1	0	0	0
618	2200	1	444	13	-1	0	0	0
619	2200	1	444	41	-1	0	0	0
620	2200	1	446	14	-1	784	0	0
621	2200	1	447	14	-1	128	0	0
622	2200	1	448	37	-1	112	0	0
623	2200	1	449	8	-1	0	0	0
624	2200	1	449	10	-1	0	0	0
625	2200	1	449	31	-1	0	0	0
626	2200	1	450	8	-1	0	0	0
627	2200	1	450	10	-1	0	0	0
628	2200	1	450	31	-1	0	0	0
629	2200	1	451	7	-1	0	0	0
630	2200	1	451	33	-1	0	0	0
631	2200	1	451	34	-1	0	0	0
632	2200	1	452	14	-1	192	0	0
633	2200	1	453	8	-1	0	0	0
634	2200	1	453	10	-1	0	0	0
635	2200	1	453	31	-1	0	0	0
636	2200	1	454	9	-1	0	0	0
637	2200	1	454	20	-1	0	0	0
638	2200	1	454	31	-1	0	0	0
639	2200	1	455	35	-1	320	0	0
640	2200	1	457	5	-1	0	0	0
641	2200	1	458	18	-1	0	0	0
642	2200	1	458	30	-1	0	0	0
643	2200	1	459	30	-1	0	0	0
644	2200	1	459	39	-1	0	0	0
645	2200	1	460	35	-1	160	0	0
646	2200	1	461	30	-1	0	0	0
647	2200	1	461	31	-1	0	0	0
648	2200	1	461	43	-1	0	0	0
649	2200	1	463	37	-1	56	0	0
650	2200	1	465	23	-1	248	0	0
651	2200	1	466	18	-1	0	0	0
652	2200	1	466	30	-1	0	0	0
653	2200	1	467	3	-1	0	0	0
654	2200	1	468	37	-1	112	0	0
655	2200	1	469	18	-1	0	0	0
656	2200	1	469	30	-1	0	0	0
657	2200	1	470	11	-1	0	0	0
658	2200	1	470	13	-1	0	0	0
659	2200	1	470	41	-1	0	0	0
660	2200	1	471	14	-1	176	0	0
661	2200	1	473	25	-1	0	0	0
662	2200	1	473	38	-1	0	0	0
663	2200	1	473	47	-1	0	0	0
664	2200	1	474	6	-1	0	0	0
665	2200	1	476	5	-1	0	0	0
666	2200	1	477	9	-1	0	0	0
667	2200	1	477	20	-1	0	0	0
668	2200	1	477	31	-1	0	0	0
669	2200	1	478	28	-1	0	0	0
670	2200	1	479	12	-1	128	0	0
671	2200	1	479	16	-1	144	0	0
672	2200	1	480	37	-1	112	0	0
673	2200	1	481	1	-1	160	0	0
674	2200	1	481	16	-1	120	0	0
675	2200	1	483	2	-1	288	0	0
676	2200	1	483	22	-1	176	0	0
677	2200	1	483	31	-1	216	0	0
678	2200	1	483	32	-1	248	0	0
679	2200	1	483	36	-1	176	0	0
680	2200	1	484	23	-1	112	0	0
681	2200	1	485	11	-1	0	0	0
682	2200	1	485	13	-1	0	0	0
683	2200	1	485	41	-1	0	0	0
684	2200	1	486	11	-1	0	0	0
685	2200	1	486	13	-1	0	0	0
686	2200	1	486	41	-1	0	0	0
687	2200	1	487	37	-1	168	0	0
688	2200	1	488	7	-1	0	0	0
689	2200	1	488	33	-1	0	0	0
690	2200	1	488	34	-1	0	0	0
691	2200	1	490	7	-1	0	0	0
692	2200	1	490	33	-1	0	0	0
693	2200	1	490	34	-1	0	0	0
694	2200	1	491	28	-1	0	0	0
695	2200	1	493	30	-1	0	0	0
696	2200	1	493	31	-1	0	0	0
697	2200	1	493	43	-1	0	0	0
698	2200	1	494	42	-1	0	0	0
699	2200	1	496	8	-1	0	0	0
700	2200	1	496	10	-1	0	0	0
701	2200	1	496	31	-1	0	0	0
702	2200	1	497	3	-1	0	0	0
703	2200	1	498	25	-1	0	0	0
704	2200	1	498	38	-1	0	0	0
705	2200	1	498	47	-1	0	0	0
706	2200	1	499	27	-1	200	0	0
707	2200	1	500	9	-1	0	0	0
708	2200	1	500	20	-1	0	0	0
709	2200	1	500	31	-1	0	0	0
710	2200	1	501	23	-1	168	0	0
711	2200	1	502	28	-1	0	0	0
712	2200	1	503	37	-1	112	0	0
713	2200	1	504	9	-1	0	0	0
714	2200	1	504	20	-1	0	0	0
715	2200	1	504	31	-1	0	0	0
716	2200	1	505	42	-1	0	0	0
717	2200	1	506	9	-1	0	0	0
718	2200	1	506	20	-1	0	0	0
719	2200	1	506	31	-1	0	0	0
720	2200	1	508	1	-1	200	0	0
721	2200	1	508	16	-1	144	0	0
722	2200	1	509	26	-1	160	0	0
723	2200	1	513	27	-1	240	0	0
724	2200	1	514	15	-1	136	0	0
725	2200	1	514	26	-1	136	0	0
726	2200	1	516	11	-1	0	0	0
727	2200	1	516	13	-1	0	0	0
728	2200	1	516	41	-1	0	0	0
729	2200	1	517	28	-1	0	0	0
730	2200	1	518	14	-1	736	0	0
731	2200	1	519	12	-1	160	0	0
732	2200	1	519	16	-1	176	0	0
733	2200	1	520	3	-1	0	0	0
734	2200	1	521	35	-1	200	0	0
735	2200	1	522	9	-1	0	0	0
736	2200	1	522	20	-1	0	0	0
737	2200	1	522	31	-1	0	0	0
738	2200	1	523	37	-1	136	0	0
739	2200	1	524	27	-1	160	0	0
740	2200	1	529	15	-1	136	0	0
741	2200	1	529	26	-1	136	0	0
742	2200	1	531	27	-1	240	0	0
743	2200	1	528	18	-1	0	0	0
744	2200	1	528	30	-1	0	0	0
745	2200	1	533	6	-1	0	0	0
746	2200	1	534	3	-1	0	0	0
747	2200	1	536	13	-1	0	0	0
748	2200	1	536	21	-1	0	0	0
749	2200	1	536	40	-1	0	0	0
750	2200	1	538	13	-1	0	0	0
751	2200	1	538	41	-1	0	0	0
752	2200	1	538	45	-1	0	0	0
753	2200	1	539	30	-1	0	0	0
754	2200	1	539	39	-1	0	0	0
755	2200	1	540	15	-1	136	0	0
756	2200	1	540	26	-1	136	0	0
757	2200	1	542	27	-1	160	0	0
758	2200	1	543	30	-1	0	0	0
759	2200	1	543	31	-1	0	0	0
760	2200	1	543	43	-1	0	0	0
761	2200	1	544	37	-1	168	0	0
762	2200	1	545	37	-1	56	0	0
763	2200	1	546	5	-1	0	0	0
764	2200	1	547	37	-1	112	0	0
765	2200	1	548	5	-1	0	0	0
766	2200	1	549	13	-1	0	0	0
767	2200	1	549	41	-1	0	0	0
768	2200	1	549	45	-1	0	0	0
769	2200	1	550	28	-1	0	0	0
770	2200	1	551	25	-1	0	0	0
771	2200	1	551	38	-1	0	0	0
772	2200	1	551	47	-1	0	0	0
773	2200	1	552	26	-1	80	0	0
774	2200	1	553	9	-1	0	0	0
775	2200	1	553	20	-1	0	0	0
776	2200	1	553	31	-1	0	0	0
777	2200	1	554	7	-1	0	0	0
778	2200	1	554	33	-1	0	0	0
779	2200	1	554	34	-1	0	0	0
780	2200	1	555	5	-1	0	0	0
781	2200	1	556	15	-1	136	0	0
782	2200	1	556	26	-1	136	0	0
783	2200	1	557	18	-1	0	0	0
784	2200	1	557	30	-1	0	0	0
785	2200	1	558	37	-1	112	0	0
786	2200	1	559	27	-1	80	0	0
787	2200	1	561	2	-1	128	0	0
788	2200	1	561	22	-1	80	0	0
789	2200	1	561	31	-1	96	0	0
790	2200	1	561	32	-1	112	0	0
791	2200	1	561	36	-1	80	0	0
792	2200	1	562	3	-1	0	0	0
793	2200	1	563	5	-1	0	0	0
794	2200	1	564	37	-1	112	0	0
795	2200	1	565	35	-1	200	0	0
796	2200	1	566	14	-1	400	0	0
797	2200	1	569	3	-1	0	0	0
798	2200	1	570	37	-1	136	0	0
799	2200	1	571	7	-1	0	0	0
800	2200	1	571	33	-1	0	0	0
801	2200	1	571	34	-1	0	0	0
802	2200	1	573	35	-1	320	0	0
803	2200	1	574	3	-1	0	0	0
804	2200	1	575	27	-1	160	0	0
805	2200	1	577	42	-1	0	0	0
806	2200	1	578	23	-1	56	0	0
807	2200	1	580	6	-1	0	0	0
808	2200	1	581	13	-1	0	0	0
809	2200	1	581	41	-1	0	0	0
810	2200	1	581	45	-1	0	0	0
811	2200	1	582	3	-1	0	0	0
812	2200	1	583	3	-1	0	0	0
813	2200	1	584	14	-1	448	0	0
814	2200	1	585	14	-1	336	0	0
815	2200	1	586	7	-1	0	0	0
816	2200	1	586	33	-1	0	0	0
817	2200	1	586	34	-1	0	0	0
818	2200	1	587	27	-1	320	0	0
819	2200	1	588	7	-1	0	0	0
820	2200	1	588	33	-1	0	0	0
821	2200	1	588	34	-1	0	0	0
822	2200	1	589	4	-1	0	0	0
823	2200	1	590	37	-1	136	0	0
824	2200	1	592	1	-1	160	0	0
825	2200	1	592	16	-1	120	0	0
826	2200	1	594	3	-1	0	0	0
827	2200	1	595	2	-1	64	0	0
828	2200	1	595	22	-1	40	0	0
829	2200	1	595	31	-1	48	0	0
830	2200	1	595	32	-1	56	0	0
831	2200	1	595	36	-1	40	0	0
832	2200	1	596	1	-1	240	0	0
833	2200	1	596	16	-1	176	0	0
834	2200	1	597	42	-1	0	0	0
835	2200	1	598	26	-1	160	0	0
836	2200	1	599	25	-1	0	0	0
837	2200	1	599	38	-1	0	0	0
838	2200	1	599	47	-1	0	0	0
839	2200	1	600	17	-1	128	0	0
840	2200	1	600	19	-1	128	0	0
841	2200	1	600	24	-1	152	0	0
842	2200	1	600	29	-1	112	0	0
843	2200	1	600	44	-1	88	0	0
844	2200	1	603	18	-1	0	0	0
845	2200	1	603	30	-1	0	0	0
846	2200	1	604	35	-1	160	0	0
847	2200	1	605	28	-1	0	0	0
848	2200	1	606	18	-1	0	0	0
849	2200	1	606	30	-1	0	0	0
850	2200	1	607	18	-1	0	0	0
851	2200	1	607	30	-1	0	0	0
852	2200	1	608	12	-1	256	0	0
853	2200	1	608	16	-1	288	0	0
854	2200	1	609	37	-1	168	0	0
855	2200	1	610	37	-1	168	0	0
856	2200	1	611	1	-1	160	0	0
857	2200	1	611	16	-1	120	0	0
858	2200	1	612	13	-1	0	0	0
859	2200	1	612	21	-1	0	0	0
860	2200	1	612	40	-1	0	0	0
861	2200	1	613	9	-1	0	0	0
862	2200	1	613	20	-1	0	0	0
863	2200	1	613	31	-1	0	0	0
864	2200	1	614	3	-1	0	0	0
865	2200	1	615	23	-1	112	0	0
866	2200	1	616	13	-1	0	0	0
867	2200	1	616	41	-1	0	0	0
868	2200	1	616	45	-1	0	0	0
869	2200	1	618	26	-1	240	0	0
870	2200	1	619	37	-1	112	0	0
871	2200	1	620	30	-1	0	0	0
872	2200	1	620	31	-1	0	0	0
873	2200	1	620	43	-1	0	0	0
874	2200	1	621	14	-1	352	0	0
875	2200	1	622	1	-1	120	0	0
876	2200	1	622	16	-1	88	0	0
877	2200	1	623	2	-1	160	0	0
878	2200	1	623	22	-1	96	0	0
879	2200	1	623	31	-1	120	0	0
880	2200	1	623	32	-1	136	0	0
881	2200	1	623	36	-1	96	0	0
882	2200	1	625	30	-1	0	0	0
883	2200	1	625	31	-1	0	0	0
884	2200	1	625	43	-1	0	0	0
885	2200	1	627	15	-1	112	0	0
886	2200	1	627	26	-1	112	0	0
887	2200	1	628	17	-1	160	0	0
888	2200	1	628	19	-1	160	0	0
889	2200	1	628	24	-1	184	0	0
890	2200	1	628	29	-1	136	0	0
891	2200	1	628	44	-1	104	0	0
892	2200	1	629	28	-1	0	0	0
893	2200	1	631	23	-1	136	0	0
894	2200	1	632	37	-1	136	0	0
895	2200	1	633	35	-1	200	0	0
896	2200	1	634	8	-1	0	0	0
897	2200	1	634	10	-1	0	0	0
898	2200	1	634	31	-1	0	0	0
899	2200	1	635	6	-1	0	0	0
900	2200	1	636	13	-1	0	0	0
901	2200	1	636	21	-1	0	0	0
902	2200	1	636	40	-1	0	0	0
903	2200	1	637	23	-1	136	0	0
904	2200	1	638	2	-1	192	0	0
905	2200	1	638	22	-1	120	0	0
906	2200	1	638	31	-1	144	0	0
907	2200	1	638	32	-1	168	0	0
908	2200	1	638	36	-1	120	0	0
909	2200	1	639	28	-1	0	0	0
910	2200	1	641	23	-1	248	0	0
911	2200	1	642	14	-1	96	0	0
912	2200	1	643	27	-1	280	0	0
913	2200	1	644	11	-1	0	0	0
914	2200	1	644	13	-1	0	0	0
915	2200	1	644	41	-1	0	0	0
916	2200	1	645	1	-1	280	0	0
917	2200	1	645	16	-1	208	0	0
918	2200	1	646	13	-1	0	0	0
919	2200	1	646	41	-1	0	0	0
920	2200	1	646	45	-1	0	0	0
921	2200	1	648	27	-1	160	0	0
922	2200	1	649	30	-1	0	0	0
923	2200	1	649	39	-1	0	0	0
924	2200	1	650	1	-1	240	0	0
925	2200	1	650	16	-1	176	0	0
926	2200	1	651	2	-1	192	0	0
927	2200	1	651	22	-1	120	0	0
928	2200	1	651	31	-1	144	0	0
929	2200	1	651	32	-1	168	0	0
930	2200	1	651	36	-1	120	0	0
931	2200	1	652	28	-1	0	0	0
932	2200	1	653	2	-1	224	0	0
933	2200	1	653	22	-1	136	0	0
934	2200	1	653	31	-1	168	0	0
935	2200	1	653	32	-1	192	0	0
936	2200	1	653	36	-1	136	0	0
937	2200	1	654	37	-1	112	0	0
938	2200	1	655	13	-1	0	0	0
939	2200	1	655	41	-1	0	0	0
940	2200	1	655	45	-1	0	0	0
941	2200	1	656	25	-1	0	0	0
942	2200	1	656	38	-1	0	0	0
943	2200	1	656	47	-1	0	0	0
944	2200	1	657	28	-1	0	0	0
945	2200	1	659	37	-1	224	0	0
946	2200	1	660	7	-1	0	0	0
947	2200	1	660	33	-1	0	0	0
948	2200	1	660	34	-1	0	0	0
949	2200	1	661	11	-1	0	0	0
950	2200	1	661	13	-1	0	0	0
951	2200	1	661	41	-1	0	0	0
952	2200	1	662	1	-1	200	0	0
953	2200	1	662	16	-1	144	0	0
954	2200	1	663	14	-1	80	0	0
955	2200	1	664	26	-1	160	0	0
956	2200	1	665	18	-1	0	0	0
957	2200	1	665	30	-1	0	0	0
958	2200	1	666	2	-1	96	0	0
959	2200	1	666	22	-1	56	0	0
960	2200	1	666	31	-1	72	0	0
961	2200	1	666	32	-1	80	0	0
962	2200	1	666	36	-1	56	0	0
963	2200	1	669	30	-1	0	0	0
964	2200	1	669	39	-1	0	0	0
965	2200	1	670	17	-1	160	0	0
966	2200	1	670	19	-1	160	0	0
967	2200	1	670	24	-1	184	0	0
968	2200	1	670	29	-1	136	0	0
969	2200	1	670	44	-1	104	0	0
970	2200	1	671	5	-1	0	0	0
971	2200	1	672	5	-1	0	0	0
972	2200	1	673	3	-1	0	0	0
973	2200	1	674	9	-1	0	0	0
974	2200	1	674	20	-1	0	0	0
975	2200	1	674	31	-1	0	0	0
976	2200	1	675	6	-1	0	0	0
977	2200	1	676	3	-1	0	0	0
978	2200	1	678	3	-1	0	0	0
979	2200	1	679	4	-1	0	0	0
980	2200	1	681	28	-1	0	0	0
981	2200	1	682	35	-1	200	0	0
982	2200	1	683	35	-1	80	0	0
983	2200	1	684	11	-1	0	0	0
984	2200	1	684	13	-1	0	0	0
985	2200	1	684	41	-1	0	0	0
986	2200	1	685	8	-1	0	0	0
987	2200	1	685	10	-1	0	0	0
988	2200	1	685	31	-1	0	0	0
989	2200	1	686	1	-1	280	0	0
990	2200	1	686	16	-1	208	0	0
991	2200	1	687	3	-1	0	0	0
992	2200	1	688	17	-1	64	0	0
993	2200	1	688	19	-1	64	0	0
994	2200	1	688	24	-1	72	0	0
995	2200	1	688	29	-1	56	0	0
996	2200	1	688	44	-1	40	0	0
997	2200	1	690	15	-1	136	0	0
998	2200	1	690	26	-1	136	0	0
999	2200	1	691	14	-1	192	0	0
1000	2200	1	692	27	-1	200	0	0
1001	2200	1	693	26	-1	160	0	0
1002	2200	1	694	13	-1	0	0	0
1003	2200	1	694	21	-1	0	0	0
1004	2200	1	694	40	-1	0	0	0
1005	2200	1	695	15	-1	112	0	0
1006	2200	1	695	26	-1	112	0	0
1007	2200	1	696	9	-1	0	0	0
1008	2200	1	696	20	-1	0	0	0
1009	2200	1	696	31	-1	0	0	0
1010	2200	1	697	14	-1	112	0	0
1011	2200	1	698	26	-1	160	0	0
1012	2200	1	699	3	-1	0	0	0
1013	2200	1	700	11	-1	0	0	0
1014	2200	1	700	13	-1	0	0	0
1015	2200	1	700	41	-1	0	0	0
1016	2200	1	701	5	-1	0	0	0
1017	2200	1	702	30	-1	0	0	0
1018	2200	1	702	31	-1	0	0	0
1019	2200	1	702	43	-1	0	0	0
1020	2200	1	703	30	-1	0	0	0
1021	2200	1	703	31	-1	0	0	0
1022	2200	1	703	43	-1	0	0	0
1023	2200	1	704	2	-1	288	0	0
1024	2200	1	704	22	-1	176	0	0
1025	2200	1	704	31	-1	216	0	0
1026	2200	1	704	32	-1	248	0	0
1027	2200	1	704	36	-1	176	0	0
1028	2200	1	705	37	-1	112	0	0
1029	2200	1	707	28	-1	0	0	0
1030	2200	1	708	30	-1	0	0	0
1031	2200	1	708	31	-1	0	0	0
1032	2200	1	708	43	-1	0	0	0
1033	2200	1	709	17	-1	192	0	0
1034	2200	1	709	19	-1	192	0	0
1035	2200	1	709	24	-1	224	0	0
1036	2200	1	709	29	-1	168	0	0
1037	2200	1	709	44	-1	128	0	0
1038	2200	1	710	4	-1	0	0	0
1039	2200	1	711	12	-1	128	0	0
1040	2200	1	711	16	-1	144	0	0
1041	2200	1	716	37	-1	112	0	0
1042	2200	1	717	37	-1	112	0	0
1043	2200	1	718	7	-1	0	0	0
1044	2200	1	718	33	-1	0	0	0
1045	2200	1	718	34	-1	0	0	0
1046	2200	1	720	35	-1	160	0	0
1047	2200	1	721	9	-1	0	0	0
1048	2200	1	721	20	-1	0	0	0
1049	2200	1	721	31	-1	0	0	0
1050	2200	1	722	17	-1	288	0	0
1051	2200	1	722	19	-1	288	0	0
1052	2200	1	722	24	-1	336	0	0
1053	2200	1	722	29	-1	248	0	0
1054	2200	1	722	44	-1	192	0	0
1055	2200	1	723	9	-1	0	0	0
1056	2200	1	723	20	-1	0	0	0
1057	2200	1	723	31	-1	0	0	0
1058	2200	1	724	15	-1	112	0	0
1059	2200	1	724	26	-1	112	0	0
1060	2200	1	725	37	-1	136	0	0
1061	2200	1	726	27	-1	80	0	0
1062	2200	1	727	13	-1	0	0	0
1063	2200	1	727	41	-1	0	0	0
1064	2200	1	727	45	-1	0	0	0
1065	2200	1	728	37	-1	112	0	0
1066	2200	1	730	1	-1	320	0	0
1067	2200	1	730	16	-1	240	0	0
1068	2200	1	731	42	-1	0	0	0
1069	2200	1	733	6	-1	0	0	0
1070	2200	1	735	11	-1	0	0	0
1071	2200	1	735	13	-1	0	0	0
1072	2200	1	735	41	-1	0	0	0
1073	2200	1	736	8	-1	0	0	0
1074	2200	1	736	10	-1	0	0	0
1075	2200	1	736	31	-1	0	0	0
1076	2200	1	737	28	-1	0	0	0
1077	2200	1	738	26	-1	200	0	0
1078	2200	1	740	42	-1	0	0	0
1079	2200	1	741	13	-1	0	0	0
1080	2200	1	741	21	-1	0	0	0
1081	2200	1	741	40	-1	0	0	0
1082	2200	1	742	35	-1	240	0	0
1083	2200	1	744	12	-1	192	0	0
1084	2200	1	744	16	-1	216	0	0
1085	2200	1	746	26	-1	160	0	0
1086	2200	1	747	15	-1	112	0	0
1087	2200	1	747	26	-1	112	0	0
1088	2200	1	748	3	-1	0	0	0
1089	2200	1	749	13	-1	0	0	0
1090	2200	1	749	41	-1	0	0	0
1091	2200	1	749	45	-1	0	0	0
1092	2200	1	751	30	-1	0	0	0
1093	2200	1	751	31	-1	0	0	0
1094	2200	1	751	43	-1	0	0	0
1095	2200	1	752	26	-1	160	0	0
1096	2200	1	753	14	-1	80	0	0
1097	2200	1	754	28	-1	0	0	0
1098	2200	1	756	1	-1	320	0	0
1099	2200	1	756	16	-1	240	0	0
1100	2200	1	758	26	-1	160	0	0
1101	2200	1	760	27	-1	200	0	0
1102	2200	1	761	25	-1	0	0	0
1103	2200	1	761	38	-1	0	0	0
1104	2200	1	761	47	-1	0	0	0
1105	2200	1	762	17	-1	160	0	0
1106	2200	1	762	19	-1	160	0	0
1107	2200	1	762	24	-1	184	0	0
1108	2200	1	762	29	-1	136	0	0
1109	2200	1	762	44	-1	104	0	0
1110	2200	1	764	12	-1	192	0	0
1111	2200	1	764	16	-1	216	0	0
1112	2200	1	765	3	-1	0	0	0
1113	2200	1	766	9	-1	0	0	0
1114	2200	1	766	20	-1	0	0	0
1115	2200	1	766	31	-1	0	0	0
1116	2200	1	767	14	-1	304	0	0
1117	2200	1	768	14	-1	224	0	0
1118	2200	1	769	26	-1	200	0	0
1119	2200	1	770	18	-1	0	0	0
1120	2200	1	770	30	-1	0	0	0
1121	2200	1	771	28	-1	0	0	0
1122	2200	1	772	8	-1	0	0	0
1123	2200	1	772	10	-1	0	0	0
1124	2200	1	772	31	-1	0	0	0
1125	2200	1	774	37	-1	56	0	0
1126	2200	1	775	37	-1	136	0	0
1127	2200	1	776	37	-1	80	0	0
1128	2200	1	777	42	-1	0	0	0
1129	2200	1	778	23	-1	192	0	0
1130	2200	1	779	7	-1	0	0	0
1131	2200	1	779	33	-1	0	0	0
1132	2200	1	779	34	-1	0	0	0
1133	2200	1	780	35	-1	160	0	0
1134	2200	1	781	3	-1	0	0	0
1135	2200	1	782	14	-1	240	0	0
1136	2200	1	783	28	-1	0	0	0
1137	2200	1	785	27	-1	120	0	0
1138	2200	1	786	25	-1	0	0	0
1139	2200	1	786	38	-1	0	0	0
1140	2200	1	786	47	-1	0	0	0
1141	2200	1	788	12	-1	96	0	0
1142	2200	1	788	16	-1	104	0	0
1143	2200	1	789	3	-1	0	0	0
1144	2200	1	790	13	-1	0	0	0
1145	2200	1	790	21	-1	0	0	0
1146	2200	1	790	40	-1	0	0	0
1147	2200	1	791	14	-1	96	0	0
1148	2200	1	792	18	-1	0	0	0
1149	2200	1	792	30	-1	0	0	0
1150	2200	1	793	26	-1	160	0	0
1151	2200	1	794	27	-1	160	0	0
1152	2200	1	796	35	-1	160	0	0
1153	2200	1	798	9	-1	0	0	0
1154	2200	1	798	20	-1	0	0	0
1155	2200	1	798	31	-1	0	0	0
1156	2200	1	799	6	-1	0	0	0
1157	2200	1	800	13	-1	0	0	0
1158	2200	1	800	21	-1	0	0	0
1159	2200	1	800	40	-1	0	0	0
1160	2200	1	802	37	-1	112	0	0
1161	2200	1	803	1	-1	200	0	0
1162	2200	1	803	16	-1	144	0	0
1163	2200	1	804	37	-1	136	0	0
1164	2200	1	805	28	-1	0	0	0
1165	2200	1	806	12	-1	256	0	0
1166	2200	1	806	16	-1	288	0	0
1167	2200	1	807	37	-1	136	0	0
1168	2200	1	810	30	-1	0	0	0
1169	2200	1	810	39	-1	0	0	0
1170	2200	1	811	25	-1	0	0	0
1171	2200	1	811	38	-1	0	0	0
1172	2200	1	811	47	-1	0	0	0
1173	2200	1	813	4	-1	0	0	0
1174	2200	1	814	7	-1	0	0	0
1175	2200	1	814	33	-1	0	0	0
1176	2200	1	814	34	-1	0	0	0
1177	2200	1	815	15	-1	168	0	0
1178	2200	1	815	26	-1	168	0	0
1179	2200	1	816	2	-1	96	0	0
1180	2200	1	816	22	-1	56	0	0
1181	2200	1	816	31	-1	72	0	0
1182	2200	1	816	32	-1	80	0	0
1183	2200	1	816	36	-1	56	0	0
1184	2200	1	817	1	-1	80	0	0
1185	2200	1	817	16	-1	56	0	0
1186	2200	1	818	37	-1	168	0	0
1187	2200	1	819	37	-1	112	0	0
1188	2200	1	821	15	-1	168	0	0
1189	2200	1	821	26	-1	168	0	0
1190	2200	1	822	8	-1	0	0	0
1191	2200	1	822	10	-1	0	0	0
1192	2200	1	822	31	-1	0	0	0
1193	2200	1	823	30	-1	0	0	0
1194	2200	1	823	31	-1	0	0	0
1195	2200	1	823	43	-1	0	0	0
1196	2200	1	824	1	-1	200	0	0
1197	2200	1	824	16	-1	144	0	0
1198	2200	1	825	9	-1	0	0	0
1199	2200	1	825	20	-1	0	0	0
1200	2200	1	825	31	-1	0	0	0
1201	2200	1	826	18	-1	0	0	0
1202	2200	1	826	30	-1	0	0	0
1203	2200	1	827	5	-1	0	0	0
1204	2200	1	828	8	-1	0	0	0
1205	2200	1	828	10	-1	0	0	0
1206	2200	1	828	31	-1	0	0	0
1207	2200	1	829	3	-1	0	0	0
1208	2200	1	830	25	-1	0	0	0
1209	2200	1	830	38	-1	0	0	0
1210	2200	1	830	47	-1	0	0	0
1211	2200	1	832	42	-1	0	0	0
1212	2200	1	831	12	-1	64	0	0
1213	2200	1	831	16	-1	72	0	0
1214	2200	1	833	4	-1	0	0	0
1215	2200	1	834	30	-1	0	0	0
1216	2200	1	834	39	-1	0	0	0
1217	2200	1	835	11	-1	0	0	0
1218	2200	1	835	13	-1	0	0	0
1219	2200	1	835	41	-1	0	0	0
1220	2200	1	836	7	-1	0	0	0
1221	2200	1	836	33	-1	0	0	0
1222	2200	1	836	34	-1	0	0	0
1223	2200	1	837	1	-1	240	0	0
1224	2200	1	837	16	-1	176	0	0
1225	2200	1	838	6	-1	0	0	0
1226	2200	1	841	26	-1	160	0	0
1227	2200	1	842	17	-1	128	0	0
1228	2200	1	842	19	-1	128	0	0
1229	2200	1	842	24	-1	152	0	0
1230	2200	1	842	29	-1	112	0	0
1231	2200	1	842	44	-1	88	0	0
1232	2200	1	843	2	-1	128	0	0
1233	2200	1	843	22	-1	80	0	0
1234	2200	1	843	31	-1	96	0	0
1235	2200	1	843	32	-1	112	0	0
1236	2200	1	843	36	-1	80	0	0
1237	2200	1	845	37	-1	112	0	0
1238	2200	1	846	14	-1	224	0	0
1239	2200	1	847	28	-1	0	0	0
1240	2200	1	848	15	-1	136	0	0
1241	2200	1	848	26	-1	136	0	0
1242	2200	1	849	13	-1	0	0	0
1243	2200	1	849	41	-1	0	0	0
1244	2200	1	849	45	-1	0	0	0
1245	2200	1	850	13	-1	0	0	0
1246	2200	1	850	21	-1	0	0	0
1247	2200	1	850	40	-1	0	0	0
1248	2200	1	851	27	-1	240	0	0
1249	2200	1	852	23	-1	168	0	0
1250	2200	1	853	35	-1	200	0	0
1251	2200	1	854	30	-1	0	0	0
1252	2200	1	854	31	-1	0	0	0
1253	2200	1	854	43	-1	0	0	0
\.


                                                                                                                                                                                        5002.dat                                                                                            0000600 0004000 0002000 00000000274 14716700732 0014252 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	Example Map	jgrpp-0.50.0	f		765502551	0	803534	1024	1024	FIRS Industry Pack	4.15.0	Steeltown	2024-11-18	2024-11-18	2024-11-18	2024-11-18	2024-11-18	\N	2024-11-18	vanilla	2024-11-18
\.


                                                                                                                                                                                                                                                                                                                                    5004.dat                                                                                            0000600 0004000 0002000 00000000115 14716700732 0014246 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	f	\N	1	Area of Interest A	681	299
2	f	\N	1	Area of Interest B	452	475
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                   5006.dat                                                                                            0000600 0004000 0002000 00000000145 14716700732 0014253 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	Train Station A	\N	1	1	t	f	f	f	f	f	698	304
2	Train and Bus Station	\N	1	1	t	f	t	f	f	f	463	467
\.


                                                                                                                                                                                                                                                                                                                                                                                                                           5008.dat                                                                                            0000600 0004000 0002000 00000037112 14716700732 0014261 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	1	Wruningwell Ridge	447	1762	f	309	151
2	1	Sadingham	446	1778	f	285	653
3	1	Little Chendingbury	445	517	f	876	232
4	1	Senfinghill	444	3744	t	678	800
5	1	Ratborough	443	860	f	918	384
6	1	Paningstone	442	357	f	744	233
7	1	Mutway	441	2450	f	313	948
8	1	Wedinghall	440	656	f	333	343
9	1	Hindingville	439	167	f	455	368
10	1	Satfield	438	222	f	426	788
11	1	Detbridge	437	205	f	594	518
12	1	Chufingford	436	2100	f	123	441
13	1	Tronfingburg	435	1388	f	737	630
14	1	Flarfinghill City	434	719	f	662	975
15	1	Frondston	433	4885	t	468	47
16	1	Bindhattan	432	745	f	863	535
17	1	Wrendtown	431	136	f	192	557
18	1	Ladinghead	430	331	f	635	993
19	1	Bruntbourne	429	2175	t	436	461
20	1	Flondstone	428	509	f	336	607
21	1	Trendham	427	287	f	271	415
22	1	Ganpool	426	2605	f	224	300
23	1	Luningwell Ridge	425	1674	f	253	861
24	1	Tonston	424	237	f	883	752
25	1	Sinningwell	423	1753	f	978	1004
26	1	Narningstone	422	169	f	919	24
27	1	Fluntfield	421	1734	f	803	765
28	1	Little Punnington	420	1118	f	930	46
29	1	Dronfingford	419	264	f	629	571
30	1	Nindworth	418	1337	t	678	871
31	1	Marfingford	417	339	f	848	59
32	1	Bubourne	416	2144	t	40	706
33	1	Nentston	415	588	f	198	786
34	1	Renfingbridge	414	1532	f	445	896
35	1	Nundtown	413	4696	t	543	360
36	1	Wruwood	412	1529	f	965	300
37	1	Satown	411	231	f	998	720
38	1	Punfingpool	410	1310	f	794	201
39	1	Guntbourne Bridge	409	2274	t	671	286
40	1	Wrintburg Springs	408	1524	f	825	588
41	1	Chenville	407	182	f	43	989
42	1	Redtown	406	914	f	642	269
43	1	Canway	405	635	f	841	249
44	1	Plundham	404	1189	f	947	277
45	1	Nundhattan	403	1336	f	982	742
46	1	Hudworth	402	1003	f	769	33
47	1	Great Pudwood	401	1774	f	190	484
48	1	Great Drudingbury	400	206	f	992	222
49	1	Pledington	399	314	f	223	615
50	1	Gundhead	398	2087	f	473	922
51	1	Slarnway	397	332	f	998	809
52	1	Linningley	396	1670	f	916	336
53	1	Prundingham	395	152	f	923	566
54	1	Ratburg	394	703	f	412	68
55	1	New Brintford	393	1537	f	20	989
56	1	Ganley	392	2127	f	584	649
57	1	Treston	391	2875	t	689	368
58	1	Gruntwood	390	1164	f	749	873
59	1	Huntburg	389	1002	f	847	482
60	1	Wrudhead	388	226	f	228	878
61	1	Drutway	387	1780	f	169	850
62	1	Luningley	386	998	f	971	36
63	1	Ponninghall	385	1492	f	21	101
64	1	Fludingville	384	304	f	906	88
65	1	Hindston	383	865	f	894	638
66	1	Little Pennbury	382	589	f	363	274
67	1	Tretbourne	381	1674	f	77	983
68	1	Gafingford	380	925	f	393	651
69	1	Minningpool	379	1696	f	779	615
70	1	Laninghall	378	196	f	535	75
71	1	Pledhattan Springs	377	946	f	796	503
72	1	Dratbridge	376	515	f	342	704
73	1	Gendworth	375	214	f	702	485
74	1	Flindham	374	2686	t	863	719
75	1	Fort Slarnwell	373	675	f	783	472
76	1	Prinfingburg	372	1696	f	912	119
77	1	Printborough	371	2243	f	793	631
78	1	Feston	370	1176	f	82	841
79	1	Hindhead	369	265	f	220	591
80	1	Great Wintborough	368	247	f	277	360
81	1	Lenfingborough Market	367	301	f	861	614
82	1	Sinfingbridge	366	466	f	111	176
83	1	Tardingstone Bay	365	1089	f	547	651
84	1	Brondingville	364	2045	f	690	423
85	1	Nendstone	363	2992	t	126	21
86	1	Raningbury	362	793	f	932	500
87	1	Preningbury	361	695	f	40	59
88	1	Dredinghattan	360	419	f	228	663
89	1	Pletburg	359	1007	f	463	382
90	1	Wonston	358	2077	t	523	999
91	1	Puntburg	357	445	f	417	211
92	1	Flartbridge	356	3034	t	675	318
93	1	Fredhead Cross	355	1036	f	445	440
94	1	Pinnley	354	1745	t	543	674
95	1	Tredinghall	353	1134	f	602	336
96	1	Grunfingley	352	1004	f	670	923
97	1	Badingtown	351	1326	f	183	348
98	1	Fruntfield	350	1296	f	90	732
99	1	Luntburg	349	4619	t	818	606
100	1	Warthill City	348	233	f	131	286
101	1	Luburg	347	708	f	681	580
102	1	Newood	346	635	f	898	479
103	1	Fennwell	345	787	f	88	660
104	1	Little Menley	344	1204	f	392	428
105	1	Plarthill	343	239	f	696	704
106	1	Gronnville	342	1274	f	945	374
107	1	Wrutford	341	1156	f	266	751
108	1	Carham	340	528	f	143	464
109	1	Ninningpool Falls	339	319	f	669	489
110	1	Suntburg	338	826	f	537	981
111	1	Great Fronfingford	337	4134	t	43	525
112	1	Huston	336	353	f	493	703
113	1	Gindingworth	335	1763	t	570	450
114	1	Bardingstone Bay	334	4675	t	354	678
115	1	Fort Flinfingfield	333	1156	f	288	408
116	1	Prinnford	332	704	f	859	750
117	1	Montfield	331	1384	f	450	342
118	1	Frendhattan	330	211	f	227	84
119	1	Plunton	329	848	t	202	582
120	1	Hunningbury	328	1264	f	803	471
121	1	Dindingville	327	1227	t	653	385
122	1	Quardingbury	326	200	f	207	656
123	1	Chanley Market	325	669	f	292	883
124	1	Suntbourne	324	4739	t	208	290
125	1	Grefingfield	323	565	f	563	397
126	1	Wrendingstone	322	160	f	107	678
127	1	Saningbury	321	2331	f	33	352
128	1	Marnfield	320	751	f	349	259
129	1	Tuston	319	507	f	47	649
130	1	Druntbourne	318	1298	f	232	491
131	1	Sluwood	317	517	f	206	410
132	1	Frunnpool	316	1135	f	893	879
133	1	Tondingstone Bay	315	666	f	279	339
134	1	Platburg Springs	314	1165	t	505	131
135	1	Flehill	313	728	f	222	318
136	1	Menhill	312	180	f	296	481
137	1	Senwell	311	740	f	144	950
138	1	Lintborough	310	802	f	244	221
139	1	Bunnwell	309	5067	t	989	385
140	1	Gadinghattan	308	1056	f	769	896
141	1	New Marnway-on-sea	307	1246	f	327	526
142	1	Dindinghattan	306	311	f	942	789
143	1	Hondingbury	305	1869	f	890	81
144	1	Tarfingbridge	304	608	f	315	625
145	1	Puston	303	708	f	29	21
146	1	Pranfield	302	1316	t	80	643
147	1	Little Brutown	301	1607	f	450	286
148	1	Henfingford	300	723	f	939	144
149	1	Little Henston	299	750	f	721	946
150	1	Grunston	298	452	f	97	371
151	1	Pinfingley	297	508	f	551	1002
152	1	Larnway	296	546	f	277	921
153	1	Wrentfield	295	421	f	359	355
154	1	Aberwood	294	1839	f	655	173
155	1	Nudhead Cross	293	193	f	934	624
156	1	Seningley Market	292	1137	f	1008	862
157	1	Plartown	291	1665	f	635	164
158	1	Dondhattan	290	2157	f	899	980
159	1	Tindingworth Falls	289	613	f	649	147
160	1	Cufield	288	1341	f	334	805
161	1	Sadinghead	287	1209	f	483	140
162	1	Sindtown	286	1495	t	152	589
163	1	Nunningstone-on-sea	285	876	f	942	318
164	1	Wruningpool Falls	284	1483	f	292	579
165	1	Dradston	283	1015	f	150	571
166	1	Punttown	282	610	f	90	920
167	1	Londborough	281	348	f	329	168
168	1	Sleningbury	280	1207	f	792	334
169	1	Munnington	279	789	f	478	889
170	1	Grenfinghill City	278	1838	f	583	802
171	1	Little Prenfingfield	277	3706	t	460	851
172	1	Fatborough	276	606	f	936	730
173	1	Nonnville	275	476	f	295	754
174	1	Charnpool	274	527	f	541	179
175	1	Narnhall	273	275	f	88	415
176	1	Minbourne	272	1415	f	1004	994
177	1	Tundworth Falls	271	1504	f	502	428
178	1	Flenfingburg	270	265	f	831	321
179	1	Little Frehill City	269	1778	f	427	336
180	1	Sinnpool Bridge	268	927	f	994	571
181	1	Hatown	267	247	f	327	436
182	1	Flufingway-on-sea	266	208	f	193	740
183	1	Kintfield	265	173	f	971	400
184	1	Brendingham	264	967	f	967	813
185	1	Hundworth Falls	263	1314	f	439	393
186	1	Great Drindtown	262	659	f	923	852
187	1	Sunnway	261	2224	f	516	174
188	1	Sleningpool Falls	260	353	f	301	397
189	1	Taninghall	259	1033	f	385	693
190	1	Hendinghall	258	1041	f	772	227
191	1	Muworth Falls	257	1310	f	456	451
192	1	Sefingway	256	1203	f	150	482
193	1	Pledhead Cross	255	568	f	934	251
194	1	Garningpool Falls	254	405	f	685	541
195	1	Overnwell	253	502	f	780	77
196	1	Drentston	252	1142	f	92	777
197	1	Barnpool	251	484	f	802	648
198	1	Bonham	250	160	f	667	163
199	1	Chinfingford	249	1150	f	284	50
200	1	Prindingworth	248	1221	f	668	740
201	1	Bafingbridge	247	826	f	825	39
202	1	Slunfingbridge	246	903	f	83	692
203	1	Overnpool	245	1733	f	481	187
204	1	Chanington	244	186	f	645	593
205	1	Charnton	243	318	f	329	862
206	1	Little Prindstone	242	466	f	132	796
207	1	Slenfingford	241	425	f	902	190
208	1	Pledingham	240	786	f	532	201
209	1	Sarnway	239	196	f	965	248
210	1	Wreninghall	238	175	f	957	675
211	1	Bondtown	237	451	f	270	213
212	1	Fenfingwell	236	510	f	561	859
213	1	Henwood	235	6541	t	107	26
214	1	Bintston	234	294	f	693	562
215	1	Fort Pindhattan	233	1245	f	337	897
216	1	Plinston	232	120	f	778	182
217	1	Gadingbury	231	378	f	135	963
218	1	Brudingbury	230	721	f	355	885
219	1	Sontbridge	229	639	f	230	701
220	1	Plufield	228	575	f	889	266
221	1	Sarnbridge	227	1866	f	318	1000
222	1	Londingville	226	596	f	359	866
223	1	Bardington	225	2102	f	984	255
224	1	Cundhall	224	1227	f	936	679
225	1	Flindinghead Cross	223	1961	f	955	503
226	1	Prennton	222	4138	t	1003	213
227	1	Flentwood	221	692	f	537	298
228	1	Prardworth Falls	220	833	f	925	153
229	1	Great Pindinghattan	219	1194	f	900	951
230	1	Trintborough	218	927	f	152	839
231	1	Prinfingbridge	217	2170	f	792	295
232	1	Sedwood	216	559	f	596	450
233	1	Keningwell	215	5805	t	239	936
234	1	Trarningville	214	2160	f	882	725
235	1	Wunfingborough Market	213	173	f	889	843
236	1	Fondingstone	212	174	f	478	756
237	1	Bebourne	211	1721	t	1001	40
238	1	Gonfingpool	210	283	f	953	526
239	1	Flondham	209	1067	f	841	573
240	1	Little Hatborough	208	187	f	121	720
241	1	Rafingford	207	305	f	104	505
242	1	Mondinghead	206	403	f	517	218
243	1	Brintford	205	1021	f	357	93
244	1	Invedingbury	204	1811	f	281	863
245	1	Slinnpool	203	501	f	514	539
246	1	Duntford	202	1354	f	621	784
247	1	Lindinghead	201	1741	f	736	556
248	1	Ganingway	200	1589	f	422	859
249	1	Tindhall	199	901	f	237	208
250	1	Darhill	198	511	f	850	105
251	1	Sindinghead	197	310	f	344	764
252	1	Trundhattan	196	1461	f	379	216
253	1	Rundstone Bay	195	1081	f	678	967
254	1	Runninghall	194	1962	f	745	315
255	1	Slonfingley	193	1592	f	541	574
256	1	Fedhattan	192	1542	f	636	213
257	1	Fladinghattan	191	1335	f	138	160
258	1	Tendhead	190	1316	f	792	853
259	1	Great Senninghead	189	1038	f	25	210
260	1	Penfingborough	188	290	f	164	783
261	1	Dreningstone	187	422	f	988	689
262	1	Chetbridge	186	197	f	877	653
263	1	Tenfinghill	185	743	f	921	636
264	1	Wenfingford	184	1592	f	1011	121
265	1	Fartbourne	183	835	f	1000	143
266	1	Shornville	182	278	f	260	191
267	1	Fluningwell	181	2382	f	407	383
268	1	Sunthill	180	2701	t	72	220
269	1	Tufingway-on-sea	179	420	f	922	705
270	1	Hundhead	178	256	f	912	212
271	1	Chetfield	177	178	f	475	442
272	1	Sennway	176	157	f	343	559
273	1	Flunpool	175	537	f	291	140
274	1	Chenbridge	174	236	f	353	716
275	1	Prarnway-on-sea	173	2373	t	847	547
276	1	Nonnbridge	172	1070	f	629	386
277	1	Wrentown	171	2413	f	402	177
278	1	Tundtown	170	922	f	764	754
279	1	Great Brunninghead	169	1230	f	252	431
280	1	Plinthill City	168	1496	f	890	222
281	1	Seningway	167	755	t	96	623
282	1	Futford	166	1786	f	401	872
283	1	Punninghall	165	6947	t	209	29
284	1	Minfingley	164	1271	f	43	614
285	1	Muham	163	121	f	703	213
286	1	Prenningstone	162	4027	t	231	631
287	1	Chaston	161	966	f	558	197
288	1	Ginfingburg	160	2417	f	66	254
289	1	Trundston	159	991	f	270	473
290	1	Slarfingford	158	367	f	197	460
291	1	Gontfield	157	983	f	209	892
292	1	Grinnpool	156	185	f	482	327
293	1	Invedingham	155	334	f	756	302
294	1	Sundinghead	154	1262	f	216	437
295	1	Great Sundingham	153	1820	f	693	114
296	1	Tindworth	152	796	f	731	93
297	1	Wundinghattan	151	290	f	470	21
298	1	Weningwell	150	1293	f	659	475
299	1	Grundhall	149	2961	t	672	341
300	1	Sennton	148	4225	t	113	801
301	1	Rarnbridge	147	691	f	719	975
302	1	Hardstone	146	1213	f	594	670
303	1	Gonfingford	145	133	f	185	1005
304	1	Cudingbury	144	1184	f	514	275
305	1	Bondhattan	143	421	f	672	106
306	1	Fort Branington	142	849	f	655	826
307	1	Frutbridge	141	406	f	67	142
308	1	Little Drinham	140	1438	f	979	945
309	1	Chindborough Bay	139	4145	t	496	479
310	1	Sardwood	138	496	f	807	707
311	1	Kindingwell	137	401	f	553	937
312	1	Dradhattan	136	974	f	364	976
313	1	Fort Chentwood	135	227	f	22	40
314	1	Tenhattan	134	1025	f	89	481
315	1	Abernpool	133	580	f	848	997
316	1	Narnwell	132	504	f	198	252
317	1	Harninghall	131	929	f	616	519
318	1	Little Grundham	130	1233	f	466	776
319	1	Gondston	129	1098	f	875	437
320	1	Suntborough Market	128	561	f	670	833
321	1	Little Pronningstone-on-sea	127	488	f	395	771
322	1	Gendinghead	126	2356	f	453	743
323	1	Guningwell	125	1736	t	470	164
324	1	Slarningworth Falls	124	1063	f	643	916
325	1	Little Trunthill City	123	668	f	911	792
326	1	Sadingworth	122	1463	f	439	803
327	1	Winfingpool Bridge	121	799	f	611	601
328	1	Wronbourne	120	813	f	464	218
329	1	Wunfingley	119	236	f	952	647
330	1	Tenham	118	457	f	895	106
331	1	Grunnley	117	456	f	46	554
332	1	Chinnley	116	263	f	583	469
333	1	Wrinnbridge	115	1593	f	195	527
334	1	Wretwood	114	1856	f	234	993
335	1	Chanbridge	113	1541	f	528	448
336	1	Laningwell	112	909	f	159	754
337	1	Chenington	111	208	f	696	779
338	1	Drendingstone	110	188	f	339	216
339	1	Tufingpool	109	1468	f	276	680
340	1	Sunthill City	108	3485	t	998	407
341	1	Gunston	107	1126	f	885	383
342	1	Ranford	106	485	f	705	323
343	1	Suthill	105	653	f	253	382
344	1	Luntbourne	104	181	f	902	407
345	1	Bredingtown	103	3528	t	177	401
346	1	Grinningpool	102	213	f	748	194
347	1	Brufinghill	101	465	f	414	652
348	1	Tendstone	100	1442	f	528	12
349	1	Pratburg	99	370	f	143	683
350	1	Gonfingfield	98	623	f	946	337
351	1	Condingworth	97	218	f	214	801
352	1	New Pinningwell	96	1119	f	403	955
353	1	Plindingstone Bay	95	847	f	446	159
354	1	Bonborough	94	3418	t	997	342
355	1	Narningpool	93	304	f	169	235
356	1	Fort Wontborough	92	383	f	1002	99
357	1	Wrendston	91	661	f	802	953
358	1	Slendham	90	1635	f	1011	795
359	1	Frindborough Bay	89	750	f	132	266
360	1	Trutburg	88	769	f	714	334
361	1	Puhill	87	2018	f	233	562
362	1	Flontford	86	615	f	424	427
363	1	Gredingbury	85	5567	t	298	858
364	1	Winthill	84	2034	f	940	91
365	1	Prenfingwell	83	4610	t	573	527
366	1	Wruborough	82	2489	t	734	287
367	1	Gredston	81	922	f	874	401
368	1	Trunnbury	80	768	f	372	736
369	1	Gedingville	79	647	f	998	974
370	1	Pluntown	78	209	f	793	240
371	1	Prarfinghill	77	440	f	936	14
372	1	Hardington	76	143	f	267	166
373	1	Kedhattan	75	391	f	541	232
374	1	Senfingburg	74	942	f	495	198
375	1	Tonborough	73	91	f	759	803
376	1	Neburg	72	656	f	299	246
377	1	Buthill City	71	910	f	25	430
378	1	Nardingstone	70	391	f	1000	186
379	1	Overtbridge	69	489	f	18	362
380	1	Nunnwell Ridge	68	1544	f	916	311
381	1	Tedinghall	67	1485	f	37	172
382	1	Flinburg Springs	66	457	f	387	69
383	1	Slenfingley Market	65	1710	f	215	344
384	1	Nondhall	64	799	f	249	302
385	1	Wrennway	63	487	f	177	661
386	1	Hindham	62	2049	f	397	748
387	1	Tanley	61	1423	f	72	712
388	1	Mudhead Cross	60	1416	f	875	893
389	1	Trarnfield	59	497	f	576	423
390	1	Abertbridge	58	946	f	965	102
391	1	Quarnville	57	3376	t	905	647
392	1	Tunborough Bay	56	393	f	941	592
393	1	Parnfield	55	2114	f	236	857
394	1	Little Batston	54	1619	f	616	461
395	1	Sutfield	53	375	f	896	672
396	1	Sindham	52	763	f	841	416
397	1	Frudington	51	89	f	534	765
398	1	Ratston	50	284	f	293	981
399	1	Runston	49	1172	f	53	226
400	1	Plonnwell	48	701	f	1003	597
401	1	Donfingfield	47	664	f	687	184
402	1	Luntway	46	1540	f	376	389
403	1	Trunthill	45	414	f	17	193
404	1	Lintston	44	757	f	981	356
405	1	Sondworth	43	1016	f	349	401
406	1	Little Prufingpool	42	400	f	238	905
407	1	Wunford	41	339	f	802	161
408	1	New Flarningstone	40	1526	f	261	896
409	1	Prafingfield	39	817	f	861	1008
410	1	Fenwell	38	1763	t	70	348
411	1	Prutbourne	37	218	f	611	178
412	1	Wardingham	36	653	f	213	570
413	1	Plarfingbourne	35	907	f	912	510
414	1	Peningville	34	1339	f	629	280
415	1	Drenhill	33	320	f	813	18
416	1	Maningbury	32	379	f	366	23
417	1	Larnpool	31	311	f	15	283
418	1	Letbridge	30	493	f	609	62
419	1	Saningwell Ridge	29	1605	f	882	605
420	1	Fenway	28	1048	f	77	330
421	1	Edinborough Bay	27	1134	f	523	857
422	1	Chonthill	26	177	f	499	513
423	1	Mendhead Cross	25	3652	t	141	759
424	1	Lunningpool	24	3818	t	54	821
425	1	Frudworth	23	541	f	239	323
426	1	Lunnton	22	892	f	572	954
427	1	Rudinghall	21	2158	f	962	368
428	1	Grunnford	20	938	f	309	231
429	1	Drenningbury	19	1212	f	953	1005
430	1	Bratwood	18	1454	f	53	472
431	1	Drutford	17	1411	f	21	226
432	1	Tonfingway	16	240	f	817	1000
433	1	Chonnington	15	1298	f	710	32
434	1	Gunnway	14	1860	f	706	146
435	1	Gruntford	13	2356	f	752	527
436	1	Kedinghall	12	2061	f	165	933
437	1	Muntfield	11	1278	f	984	296
438	1	Garnfield	10	2333	f	960	542
439	1	Faningwell	9	2142	f	76	604
440	1	Trinningstone-on-sea	8	508	f	70	575
441	1	Prufingburg	7	821	f	353	597
442	1	Flatown	6	246	f	924	276
443	1	Hetbridge	5	335	f	60	96
444	1	Gratwood	4	623	f	545	488
445	1	Fennbury	3	847	f	555	89
446	1	Benningpool	2	355	f	21	947
447	1	Brunington	1	1777	f	172	260
448	1	Hindworth	0	537	f	816	73
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                      restore.sql                                                                                         0000600 0004000 0002000 00000104710 14716700732 0015376 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        --
-- NOTE:
--
-- File paths need to be edited. Search for $$PATH$$ and
-- replace it with the path to the directory containing
-- the extracted data files.
--
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

DROP DATABASE openttd_server;
--
-- Name: openttd_server; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE openttd_server WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';


ALTER DATABASE openttd_server OWNER TO postgres;

\connect openttd_server

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
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: cargo_payment_model; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.cargo_payment_model AS ENUM (
    'vanilla'
);


ALTER TYPE public.cargo_payment_model OWNER TO postgres;

--
-- Name: circle_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.circle_type AS ENUM (
    'manhattan',
    'euclidean'
);


ALTER TYPE public.circle_type OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cargo_to_stations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cargo_to_stations (
    id integer NOT NULL,
    save_id integer NOT NULL,
    cargo_id integer NOT NULL,
    station_id integer NOT NULL,
    rating integer DEFAULT 0 NOT NULL,
    last_updated date
);


ALTER TABLE public.cargo_to_stations OWNER TO postgres;

--
-- Name: cargo_to_stations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cargo_to_stations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cargo_to_stations_id_seq OWNER TO postgres;

--
-- Name: cargo_to_stations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cargo_to_stations_id_seq OWNED BY public.cargo_to_stations.id;


--
-- Name: cargoes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cargoes (
    id integer NOT NULL,
    save_id integer NOT NULL,
    cargo_id integer,
    name character varying(256) NOT NULL,
    label character varying(4) NOT NULL,
    weight integer DEFAULT 0 NOT NULL,
    value integer DEFAULT 0 NOT NULL,
    is_passenger boolean DEFAULT false,
    is_mail boolean DEFAULT false NOT NULL,
    is_express boolean DEFAULT false NOT NULL,
    is_armoured boolean DEFAULT false NOT NULL,
    is_bulk boolean DEFAULT false NOT NULL,
    is_piece_goods boolean DEFAULT false NOT NULL,
    is_liquid boolean DEFAULT false NOT NULL,
    is_refrigerated boolean DEFAULT false NOT NULL,
    is_covered boolean DEFAULT false NOT NULL,
    is_hazardous boolean DEFAULT false NOT NULL,
    town_effect integer DEFAULT 0 NOT NULL,
    grf_data jsonb DEFAULT '{}'::jsonb NOT NULL
);


ALTER TABLE public.cargoes OWNER TO postgres;

--
-- Name: cargoes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cargoes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cargoes_id_seq OWNER TO postgres;

--
-- Name: cargoes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cargoes_id_seq OWNED BY public.cargoes.id;


--
-- Name: cargoes_waiting; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cargoes_waiting (
    id integer NOT NULL,
    save_id integer NOT NULL,
    at_station_id integer NOT NULL,
    from_station_id integer NOT NULL,
    via_station_id integer,
    cargo_id integer NOT NULL,
    units integer DEFAULT 0 NOT NULL,
    last_updated date
);


ALTER TABLE public.cargoes_waiting OWNER TO postgres;

--
-- Name: cargoes_waiting_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cargoes_waiting_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cargoes_waiting_id_seq OWNER TO postgres;

--
-- Name: cargoes_waiting_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cargoes_waiting_id_seq OWNED BY public.cargoes_waiting.id;


--
-- Name: cargos_to_industry_types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cargos_to_industry_types (
    cargo_id integer NOT NULL,
    industrytype_id integer NOT NULL,
    accepts boolean
);


ALTER TABLE public.cargos_to_industry_types OWNER TO postgres;

--
-- Name: circles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.circles (
    id integer NOT NULL,
    save_id integer NOT NULL,
    name character varying(256) DEFAULT 'Distance Measure'::character varying NOT NULL,
    x integer NOT NULL,
    y integer NOT NULL,
    radius integer NOT NULL,
    color character varying(8) DEFAULT '000000ff'::character varying NOT NULL,
    circle_type public.circle_type DEFAULT 'euclidean'::public.circle_type NOT NULL
);


ALTER TABLE public.circles OWNER TO postgres;

--
-- Name: circles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.circles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.circles_id_seq OWNER TO postgres;

--
-- Name: circles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.circles_id_seq OWNED BY public.circles.id;


--
-- Name: companies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.companies (
    id integer NOT NULL,
    company_id integer,
    save_id integer NOT NULL,
    name character varying(256),
    manager_name character varying(256) DEFAULT 'Firstname Lastname'::character varying NOT NULL,
    color integer DEFAULT 0 NOT NULL,
    start_date date,
    is_ai boolean DEFAULT true,
    trains integer DEFAULT 0 NOT NULL,
    lorries integer DEFAULT 0 NOT NULL,
    buses integer DEFAULT 0 NOT NULL,
    planes integer DEFAULT 0 NOT NULL,
    ships integer DEFAULT 0 NOT NULL,
    train_stations integer DEFAULT 0 NOT NULL,
    lorry_stations integer DEFAULT 0 NOT NULL,
    bus_stations integer DEFAULT 0 NOT NULL,
    airports integer DEFAULT 0 NOT NULL,
    harbors integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.companies OWNER TO postgres;

--
-- Name: companies_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.companies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.companies_id_seq OWNER TO postgres;

--
-- Name: companies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.companies_id_seq OWNED BY public.companies.id;


--
-- Name: industries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.industries (
    id integer NOT NULL,
    industry_id integer,
    name character varying(256) NOT NULL,
    construction_date date,
    industry_type_id integer NOT NULL,
    x integer NOT NULL,
    y integer NOT NULL
);


ALTER TABLE public.industries OWNER TO postgres;

--
-- Name: industries_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.industries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.industries_id_seq OWNER TO postgres;

--
-- Name: industries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.industries_id_seq OWNED BY public.industries.id;


--
-- Name: industry_types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.industry_types (
    id integer NOT NULL,
    industry_type_id integer,
    save_id integer NOT NULL,
    name character varying(256) DEFAULT 'My Industry'::character varying NOT NULL,
    has_heliport boolean DEFAULT false NOT NULL,
    has_dock boolean DEFAULT false NOT NULL,
    hex character varying(8) DEFAULT '000000ff'::character varying NOT NULL
);


ALTER TABLE public.industry_types OWNER TO postgres;

--
-- Name: industry_types_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.industry_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.industry_types_id_seq OWNER TO postgres;

--
-- Name: industry_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.industry_types_id_seq OWNED BY public.industry_types.id;


--
-- Name: monthly_stats; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.monthly_stats (
    id integer NOT NULL,
    year integer NOT NULL,
    month integer NOT NULL,
    industry_id integer NOT NULL,
    cargo_id integer NOT NULL,
    stockpiled_cargo integer DEFAULT 0 NOT NULL,
    last_month_production integer DEFAULT 0 NOT NULL,
    last_month_transported integer DEFAULT 0 NOT NULL,
    last_month_transported_percentage integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.monthly_stats OWNER TO postgres;

--
-- Name: monthly_stats_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.monthly_stats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.monthly_stats_id_seq OWNER TO postgres;

--
-- Name: monthly_stats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.monthly_stats_id_seq OWNED BY public.monthly_stats.id;


--
-- Name: saves; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.saves (
    id integer NOT NULL,
    server_name character varying(256),
    game_version character varying(100),
    dedicated_flag boolean,
    map_name character varying(256),
    map_seed bigint DEFAULT 0 NOT NULL,
    landscape integer DEFAULT '-1'::integer NOT NULL,
    start_date bigint,
    map_width integer NOT NULL,
    map_height integer NOT NULL,
    industry_pack character varying(256),
    industry_version character varying(256),
    industry_economy character varying(256),
    time_fetched_cargos date,
    time_fetched_industry_types date,
    time_fetched_industries date,
    time_fetched_stations date,
    time_fetched_monthly_stats date,
    time_fetched_companies date,
    time_fetched_towns date,
    cargo_payment_model public.cargo_payment_model DEFAULT 'vanilla'::public.cargo_payment_model NOT NULL,
    time_fetched_cargo_waiting date
);


ALTER TABLE public.saves OWNER TO postgres;

--
-- Name: saves_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.saves_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.saves_id_seq OWNER TO postgres;

--
-- Name: saves_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.saves_id_seq OWNED BY public.saves.id;


--
-- Name: signs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.signs (
    id integer NOT NULL,
    is_in_game boolean DEFAULT false,
    sign_id integer,
    save_id integer NOT NULL,
    name character varying(256) DEFAULT 'My Sign Text'::character varying NOT NULL,
    x integer NOT NULL,
    y integer NOT NULL
);


ALTER TABLE public.signs OWNER TO postgres;

--
-- Name: signs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.signs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.signs_id_seq OWNER TO postgres;

--
-- Name: signs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.signs_id_seq OWNED BY public.signs.id;


--
-- Name: stations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.stations (
    id integer NOT NULL,
    name character varying(256),
    station_id integer,
    company_id integer NOT NULL,
    save_id integer NOT NULL,
    has_train boolean DEFAULT false NOT NULL,
    has_truck boolean DEFAULT false NOT NULL,
    has_bus boolean DEFAULT false NOT NULL,
    has_airport boolean DEFAULT false NOT NULL,
    has_dock boolean DEFAULT false NOT NULL,
    has_any boolean DEFAULT false NOT NULL,
    x integer NOT NULL,
    y integer NOT NULL
);


ALTER TABLE public.stations OWNER TO postgres;

--
-- Name: stations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.stations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.stations_id_seq OWNER TO postgres;

--
-- Name: stations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.stations_id_seq OWNED BY public.stations.id;


--
-- Name: towns; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.towns (
    id integer NOT NULL,
    save_id integer NOT NULL,
    name character varying(256) DEFAULT 'My Town'::character varying NOT NULL,
    town_id integer,
    population integer DEFAULT 0 NOT NULL,
    is_city boolean DEFAULT false NOT NULL,
    x integer NOT NULL,
    y integer NOT NULL
);


ALTER TABLE public.towns OWNER TO postgres;

--
-- Name: towns_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.towns_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.towns_id_seq OWNER TO postgres;

--
-- Name: towns_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.towns_id_seq OWNED BY public.towns.id;


--
-- Name: cargo_to_stations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cargo_to_stations ALTER COLUMN id SET DEFAULT nextval('public.cargo_to_stations_id_seq'::regclass);


--
-- Name: cargoes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cargoes ALTER COLUMN id SET DEFAULT nextval('public.cargoes_id_seq'::regclass);


--
-- Name: cargoes_waiting id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cargoes_waiting ALTER COLUMN id SET DEFAULT nextval('public.cargoes_waiting_id_seq'::regclass);


--
-- Name: circles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.circles ALTER COLUMN id SET DEFAULT nextval('public.circles_id_seq'::regclass);


--
-- Name: companies id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.companies ALTER COLUMN id SET DEFAULT nextval('public.companies_id_seq'::regclass);


--
-- Name: industries id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.industries ALTER COLUMN id SET DEFAULT nextval('public.industries_id_seq'::regclass);


--
-- Name: industry_types id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.industry_types ALTER COLUMN id SET DEFAULT nextval('public.industry_types_id_seq'::regclass);


--
-- Name: monthly_stats id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.monthly_stats ALTER COLUMN id SET DEFAULT nextval('public.monthly_stats_id_seq'::regclass);


--
-- Name: saves id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saves ALTER COLUMN id SET DEFAULT nextval('public.saves_id_seq'::regclass);


--
-- Name: signs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.signs ALTER COLUMN id SET DEFAULT nextval('public.signs_id_seq'::regclass);


--
-- Name: stations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stations ALTER COLUMN id SET DEFAULT nextval('public.stations_id_seq'::regclass);


--
-- Name: towns id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.towns ALTER COLUMN id SET DEFAULT nextval('public.towns_id_seq'::regclass);


--
-- Data for Name: cargo_to_stations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cargo_to_stations (id, save_id, cargo_id, station_id, rating, last_updated) FROM stdin;
\.
COPY public.cargo_to_stations (id, save_id, cargo_id, station_id, rating, last_updated) FROM '$$PATH$$/4988.dat';

--
-- Data for Name: cargoes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cargoes (id, save_id, cargo_id, name, label, weight, value, is_passenger, is_mail, is_express, is_armoured, is_bulk, is_piece_goods, is_liquid, is_refrigerated, is_covered, is_hazardous, town_effect, grf_data) FROM stdin;
\.
COPY public.cargoes (id, save_id, cargo_id, name, label, weight, value, is_passenger, is_mail, is_express, is_armoured, is_bulk, is_piece_goods, is_liquid, is_refrigerated, is_covered, is_hazardous, town_effect, grf_data) FROM '$$PATH$$/4985.dat';

--
-- Data for Name: cargoes_waiting; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cargoes_waiting (id, save_id, at_station_id, from_station_id, via_station_id, cargo_id, units, last_updated) FROM stdin;
\.
COPY public.cargoes_waiting (id, save_id, at_station_id, from_station_id, via_station_id, cargo_id, units, last_updated) FROM '$$PATH$$/4990.dat';

--
-- Data for Name: cargos_to_industry_types; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cargos_to_industry_types (cargo_id, industrytype_id, accepts) FROM stdin;
\.
COPY public.cargos_to_industry_types (cargo_id, industrytype_id, accepts) FROM '$$PATH$$/4986.dat';

--
-- Data for Name: circles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.circles (id, save_id, name, x, y, radius, color, circle_type) FROM stdin;
\.
COPY public.circles (id, save_id, name, x, y, radius, color, circle_type) FROM '$$PATH$$/4992.dat';

--
-- Data for Name: companies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.companies (id, company_id, save_id, name, manager_name, color, start_date, is_ai, trains, lorries, buses, planes, ships, train_stations, lorry_stations, bus_stations, airports, harbors) FROM stdin;
\.
COPY public.companies (id, company_id, save_id, name, manager_name, color, start_date, is_ai, trains, lorries, buses, planes, ships, train_stations, lorry_stations, bus_stations, airports, harbors) FROM '$$PATH$$/4994.dat';

--
-- Data for Name: industries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.industries (id, industry_id, name, construction_date, industry_type_id, x, y) FROM stdin;
\.
COPY public.industries (id, industry_id, name, construction_date, industry_type_id, x, y) FROM '$$PATH$$/4996.dat';

--
-- Data for Name: industry_types; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.industry_types (id, industry_type_id, save_id, name, has_heliport, has_dock, hex) FROM stdin;
\.
COPY public.industry_types (id, industry_type_id, save_id, name, has_heliport, has_dock, hex) FROM '$$PATH$$/4998.dat';

--
-- Data for Name: monthly_stats; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.monthly_stats (id, year, month, industry_id, cargo_id, stockpiled_cargo, last_month_production, last_month_transported, last_month_transported_percentage) FROM stdin;
\.
COPY public.monthly_stats (id, year, month, industry_id, cargo_id, stockpiled_cargo, last_month_production, last_month_transported, last_month_transported_percentage) FROM '$$PATH$$/5000.dat';

--
-- Data for Name: saves; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.saves (id, server_name, game_version, dedicated_flag, map_name, map_seed, landscape, start_date, map_width, map_height, industry_pack, industry_version, industry_economy, time_fetched_cargos, time_fetched_industry_types, time_fetched_industries, time_fetched_stations, time_fetched_monthly_stats, time_fetched_companies, time_fetched_towns, cargo_payment_model, time_fetched_cargo_waiting) FROM stdin;
\.
COPY public.saves (id, server_name, game_version, dedicated_flag, map_name, map_seed, landscape, start_date, map_width, map_height, industry_pack, industry_version, industry_economy, time_fetched_cargos, time_fetched_industry_types, time_fetched_industries, time_fetched_stations, time_fetched_monthly_stats, time_fetched_companies, time_fetched_towns, cargo_payment_model, time_fetched_cargo_waiting) FROM '$$PATH$$/5002.dat';

--
-- Data for Name: signs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.signs (id, is_in_game, sign_id, save_id, name, x, y) FROM stdin;
\.
COPY public.signs (id, is_in_game, sign_id, save_id, name, x, y) FROM '$$PATH$$/5004.dat';

--
-- Data for Name: stations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.stations (id, name, station_id, company_id, save_id, has_train, has_truck, has_bus, has_airport, has_dock, has_any, x, y) FROM stdin;
\.
COPY public.stations (id, name, station_id, company_id, save_id, has_train, has_truck, has_bus, has_airport, has_dock, has_any, x, y) FROM '$$PATH$$/5006.dat';

--
-- Data for Name: towns; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.towns (id, save_id, name, town_id, population, is_city, x, y) FROM stdin;
\.
COPY public.towns (id, save_id, name, town_id, population, is_city, x, y) FROM '$$PATH$$/5008.dat';

--
-- Name: cargo_to_stations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cargo_to_stations_id_seq', 1, false);


--
-- Name: cargoes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cargoes_id_seq', 96, true);


--
-- Name: cargoes_waiting_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cargoes_waiting_id_seq', 1, false);


--
-- Name: circles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.circles_id_seq', 4, true);


--
-- Name: companies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.companies_id_seq', 2, true);


--
-- Name: industries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.industries_id_seq', 854, true);


--
-- Name: industry_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.industry_types_id_seq', 30, true);


--
-- Name: monthly_stats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.monthly_stats_id_seq', 1253, true);


--
-- Name: saves_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.saves_id_seq', 1, true);


--
-- Name: signs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.signs_id_seq', 2, true);


--
-- Name: stations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.stations_id_seq', 2, true);


--
-- Name: towns_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.towns_id_seq', 448, true);


--
-- Name: cargo_to_stations cargo_to_stations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cargo_to_stations
    ADD CONSTRAINT cargo_to_stations_pkey PRIMARY KEY (id);


--
-- Name: cargoes cargoes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cargoes
    ADD CONSTRAINT cargoes_pkey PRIMARY KEY (id);


--
-- Name: cargoes_waiting cargoes_waiting_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cargoes_waiting
    ADD CONSTRAINT cargoes_waiting_pkey PRIMARY KEY (id);


--
-- Name: cargos_to_industry_types cargos_to_industry_types_cargo_id_industrytype_id_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cargos_to_industry_types
    ADD CONSTRAINT cargos_to_industry_types_cargo_id_industrytype_id_pk PRIMARY KEY (cargo_id, industrytype_id);


--
-- Name: circles circles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.circles
    ADD CONSTRAINT circles_pkey PRIMARY KEY (id);


--
-- Name: companies companies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_pkey PRIMARY KEY (id);


--
-- Name: industries industries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.industries
    ADD CONSTRAINT industries_pkey PRIMARY KEY (id);


--
-- Name: industry_types industry_types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.industry_types
    ADD CONSTRAINT industry_types_pkey PRIMARY KEY (id);


--
-- Name: monthly_stats monthly_stats_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.monthly_stats
    ADD CONSTRAINT monthly_stats_pkey PRIMARY KEY (id);


--
-- Name: saves saves_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saves
    ADD CONSTRAINT saves_pkey PRIMARY KEY (id);


--
-- Name: saves server_name_idx; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saves
    ADD CONSTRAINT server_name_idx UNIQUE (server_name);


--
-- Name: signs signs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.signs
    ADD CONSTRAINT signs_pkey PRIMARY KEY (id);


--
-- Name: stations stations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stations
    ADD CONSTRAINT stations_pkey PRIMARY KEY (id);


--
-- Name: towns towns_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.towns
    ADD CONSTRAINT towns_pkey PRIMARY KEY (id);


--
-- Name: cargo_to_stations unique_cargo_and_station; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cargo_to_stations
    ADD CONSTRAINT unique_cargo_and_station UNIQUE (cargo_id, station_id);


--
-- Name: cargoes unique_cargo_game; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cargoes
    ADD CONSTRAINT unique_cargo_game UNIQUE (save_id, cargo_id);


--
-- Name: cargoes_waiting unique_cargo_waiting_entry; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cargoes_waiting
    ADD CONSTRAINT unique_cargo_waiting_entry UNIQUE (at_station_id, from_station_id, via_station_id, cargo_id);


--
-- Name: circles unique_circle_game; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.circles
    ADD CONSTRAINT unique_circle_game UNIQUE (save_id, x, y, circle_type);


--
-- Name: companies unique_company_game; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.companies
    ADD CONSTRAINT unique_company_game UNIQUE (save_id, company_id);


--
-- Name: industries unique_industry_per_game; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.industries
    ADD CONSTRAINT unique_industry_per_game UNIQUE (industry_id, industry_type_id);


--
-- Name: industry_types unique_per_game; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.industry_types
    ADD CONSTRAINT unique_per_game UNIQUE (save_id, industry_type_id);


--
-- Name: signs unique_sign_game; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.signs
    ADD CONSTRAINT unique_sign_game UNIQUE (save_id, sign_id);


--
-- Name: stations unique_station_game; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stations
    ADD CONSTRAINT unique_station_game UNIQUE (save_id, station_id);


--
-- Name: monthly_stats unique_time_and_industry; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.monthly_stats
    ADD CONSTRAINT unique_time_and_industry UNIQUE (year, month, industry_id, cargo_id);


--
-- Name: towns unique_town_game; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.towns
    ADD CONSTRAINT unique_town_game UNIQUE (save_id, town_id);


--
-- Name: cargo_to_stations cargo_to_stations_cargo_id_cargoes_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cargo_to_stations
    ADD CONSTRAINT cargo_to_stations_cargo_id_cargoes_id_fk FOREIGN KEY (cargo_id) REFERENCES public.cargoes(id) ON DELETE CASCADE;


--
-- Name: cargo_to_stations cargo_to_stations_save_id_saves_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cargo_to_stations
    ADD CONSTRAINT cargo_to_stations_save_id_saves_id_fk FOREIGN KEY (save_id) REFERENCES public.saves(id) ON DELETE CASCADE;


--
-- Name: cargo_to_stations cargo_to_stations_station_id_stations_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cargo_to_stations
    ADD CONSTRAINT cargo_to_stations_station_id_stations_id_fk FOREIGN KEY (station_id) REFERENCES public.stations(id) ON DELETE CASCADE;


--
-- Name: cargoes cargoes_save_id_saves_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cargoes
    ADD CONSTRAINT cargoes_save_id_saves_id_fk FOREIGN KEY (save_id) REFERENCES public.saves(id) ON DELETE CASCADE;


--
-- Name: cargoes_waiting cargoes_waiting_at_station_id_stations_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cargoes_waiting
    ADD CONSTRAINT cargoes_waiting_at_station_id_stations_id_fk FOREIGN KEY (at_station_id) REFERENCES public.stations(id) ON DELETE CASCADE;


--
-- Name: cargoes_waiting cargoes_waiting_cargo_id_cargoes_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cargoes_waiting
    ADD CONSTRAINT cargoes_waiting_cargo_id_cargoes_id_fk FOREIGN KEY (cargo_id) REFERENCES public.cargoes(id) ON DELETE CASCADE;


--
-- Name: cargoes_waiting cargoes_waiting_from_station_id_stations_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cargoes_waiting
    ADD CONSTRAINT cargoes_waiting_from_station_id_stations_id_fk FOREIGN KEY (from_station_id) REFERENCES public.stations(id) ON DELETE CASCADE;


--
-- Name: cargoes_waiting cargoes_waiting_save_id_saves_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cargoes_waiting
    ADD CONSTRAINT cargoes_waiting_save_id_saves_id_fk FOREIGN KEY (save_id) REFERENCES public.saves(id) ON DELETE CASCADE;


--
-- Name: cargoes_waiting cargoes_waiting_via_station_id_stations_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cargoes_waiting
    ADD CONSTRAINT cargoes_waiting_via_station_id_stations_id_fk FOREIGN KEY (via_station_id) REFERENCES public.stations(id) ON DELETE CASCADE;


--
-- Name: cargos_to_industry_types cargos_to_industry_types_cargo_id_cargoes_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cargos_to_industry_types
    ADD CONSTRAINT cargos_to_industry_types_cargo_id_cargoes_id_fk FOREIGN KEY (cargo_id) REFERENCES public.cargoes(id) ON DELETE CASCADE;


--
-- Name: cargos_to_industry_types cargos_to_industry_types_industrytype_id_industry_types_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cargos_to_industry_types
    ADD CONSTRAINT cargos_to_industry_types_industrytype_id_industry_types_id_fk FOREIGN KEY (industrytype_id) REFERENCES public.industry_types(id) ON DELETE CASCADE;


--
-- Name: circles circles_save_id_saves_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.circles
    ADD CONSTRAINT circles_save_id_saves_id_fk FOREIGN KEY (save_id) REFERENCES public.saves(id) ON DELETE CASCADE;


--
-- Name: companies companies_save_id_saves_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_save_id_saves_id_fk FOREIGN KEY (save_id) REFERENCES public.saves(id) ON DELETE CASCADE;


--
-- Name: industries industries_industry_type_id_industry_types_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.industries
    ADD CONSTRAINT industries_industry_type_id_industry_types_id_fk FOREIGN KEY (industry_type_id) REFERENCES public.industry_types(id) ON DELETE CASCADE;


--
-- Name: industry_types industry_types_save_id_saves_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.industry_types
    ADD CONSTRAINT industry_types_save_id_saves_id_fk FOREIGN KEY (save_id) REFERENCES public.saves(id) ON DELETE CASCADE;


--
-- Name: monthly_stats monthly_stats_cargo_id_cargoes_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.monthly_stats
    ADD CONSTRAINT monthly_stats_cargo_id_cargoes_id_fk FOREIGN KEY (cargo_id) REFERENCES public.cargoes(id) ON DELETE CASCADE;


--
-- Name: monthly_stats monthly_stats_industry_id_industries_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.monthly_stats
    ADD CONSTRAINT monthly_stats_industry_id_industries_id_fk FOREIGN KEY (industry_id) REFERENCES public.industries(id) ON DELETE CASCADE;


--
-- Name: signs signs_save_id_saves_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.signs
    ADD CONSTRAINT signs_save_id_saves_id_fk FOREIGN KEY (save_id) REFERENCES public.saves(id) ON DELETE CASCADE;


--
-- Name: stations stations_company_id_companies_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stations
    ADD CONSTRAINT stations_company_id_companies_id_fk FOREIGN KEY (company_id) REFERENCES public.companies(id) ON DELETE CASCADE;


--
-- Name: stations stations_save_id_saves_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stations
    ADD CONSTRAINT stations_save_id_saves_id_fk FOREIGN KEY (save_id) REFERENCES public.saves(id) ON DELETE CASCADE;


--
-- Name: towns towns_save_id_saves_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.towns
    ADD CONSTRAINT towns_save_id_saves_id_fk FOREIGN KEY (save_id) REFERENCES public.saves(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        