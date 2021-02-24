ALTER TABLE IF EXISTS ONLY public.boards DROP CONSTRAINT IF EXISTS pk_boards_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS pk_users_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.boards DROP CONSTRAINT IF EXISTS fk_users_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.cards DROP CONSTRAINT IF EXISTS pk_cards_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.statuses DROP CONSTRAINT IF EXISTS pk_statuses_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.cards DROP CONSTRAINT IF EXISTS fk_boards_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.cards DROP CONSTRAINT IF EXISTS fk_statuses_id CASCADE;

DROP TABLE IF EXISTS public.users;
CREATE TABLE users (
    id serial NOT NULL,
    username varchar,
    hashed_password varchar
);

DROP TABLE IF EXISTS public.boards;
CREATE TABLE boards (
    id serial NOT NULL,
    title varchar,
    user_id integer
);


DROP TABLE IF EXISTS public.statuses;
CREATE TABLE statuses (
    id serial NOT NULL,
    title varchar
);


DROP TABLE IF EXISTS public.cards;
CREATE TABLE cards (
    id serial NOT NULL,
    title varchar,
    board_id integer,
    status_id integer,
    order_n integer
);



ALTER TABLE ONLY users
    ADD CONSTRAINT pk_users_id PRIMARY KEY (id);

ALTER TABLE ONLY boards
    ADD CONSTRAINT pk_boards_id PRIMARY KEY (id);

ALTER TABLE ONLY boards
    ADD CONSTRAINT fk_users_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE ONLY statuses
    ADD CONSTRAINT pk_statuses_id PRIMARY KEY (id);

ALTER TABLE ONLY cards
    ADD CONSTRAINT pk_card_id PRIMARY KEY (id);
    
ALTER TABLE ONLY cards
    ADD CONSTRAINT fk_statuses_id FOREIGN KEY (status_id) REFERENCES statuses(id) ON DELETE CASCADE;

ALTER TABLE ONLY cards
    ADD CONSTRAINT fk_boards_id FOREIGN KEY (board_id) REFERENCES boards(id) ON DELETE CASCADE;


INSERT INTO users VALUES (0, 'Anonymous', 'password');
SELECT pg_catalog.setval('users_id_seq', 1, true);

INSERT INTO boards VALUES (1, 'Board 1', 0);
INSERT INTO boards VALUES (2, 'Board 2', 0);
INSERT INTO boards VALUES (3, 'Board 3', 0);
SELECT pg_catalog.setval('boards_id_seq', 3, true);

INSERT INTO statuses VALUES (0, 'new');
INSERT INTO statuses VALUES (1, 'in progress');
INSERT INTO statuses VALUES (2, 'testing');
INSERT INTO statuses VALUES (3, 'done');
SELECT pg_catalog.setval('statuses_id_seq', 3, true);

INSERT INTO cards VALUES (0, 'Card 1', 1, 0, 0);
INSERT INTO cards VALUES (1, 'Card 2', 1, 0, 0);
INSERT INTO cards VALUES (2, 'Card 1', 1, 1, 0);

INSERT INTO cards VALUES (3, 'Card 1', 1, 2, 0);
INSERT INTO cards VALUES (4, 'Card 2', 1, 2, 0);
INSERT INTO cards VALUES (5, 'Card 3', 1, 2, 0);
INSERT INTO cards VALUES (6, 'Card 4', 1, 2, 0);
INSERT INTO cards VALUES (7, 'Card 5', 1, 2, 0);

INSERT INTO cards VALUES (8, 'Card 1', 1, 3, 0);
INSERT INTO cards VALUES (9, 'Card 2', 1, 3, 0);
INSERT INTO cards VALUES (10, 'Card 3', 1, 3, 0);
INSERT INTO cards VALUES (11, 'Card 4', 1, 3, 0);
INSERT INTO cards VALUES (12, 'Card 5', 1, 3, 0);
INSERT INTO cards VALUES (13, 'Card 6', 1, 3, 0);

INSERT INTO cards VALUES (14, 'Card 1', 2, 0, 0);
INSERT INTO cards VALUES (15, 'Card 2', 2, 0, 0);
INSERT INTO cards VALUES (16, 'Card 3', 2, 0, 0);
INSERT INTO cards VALUES (17, 'Card 4', 2, 0, 0);
INSERT INTO cards VALUES (18, 'Card 5', 2, 0, 0);

INSERT INTO cards VALUES (19, 'Card 1', 2, 2, 0);
INSERT INTO cards VALUES (20, 'Card 2', 2, 2, 0);

INSERT INTO cards VALUES (21, 'Card 1', 2, 3, 0);

INSERT INTO cards VALUES (22, 'Card 1', 3, 0, 0);
INSERT INTO cards VALUES (23, 'Card 2', 3, 0, 0);
INSERT INTO cards VALUES (24, 'Card 3', 3, 0, 0);
INSERT INTO cards VALUES (25, 'Card 4', 3, 0, 0);
INSERT INTO cards VALUES (26, 'Card 5', 3, 0, 0);

INSERT INTO cards VALUES (27, 'Card 1', 3, 1, 0);
INSERT INTO cards VALUES (28, 'Card 2', 3, 1, 0);
INSERT INTO cards VALUES (29, 'Card 3', 3, 1, 0);
INSERT INTO cards VALUES (30, 'Card 4', 3, 1, 0);
INSERT INTO cards VALUES (31, 'Card 5', 3, 1, 0);

INSERT INTO cards VALUES (32, 'Card 1', 3, 2, 0);
INSERT INTO cards VALUES (33, 'Card 2', 3, 2, 0);
INSERT INTO cards VALUES (34, 'Card 3', 3, 2, 0);
INSERT INTO cards VALUES (35, 'Card 4', 3, 2, 0);
INSERT INTO cards VALUES (36, 'Card 5', 3, 2, 0);

INSERT INTO cards VALUES (37, 'Card 1', 3, 3, 0);
INSERT INTO cards VALUES (38, 'Card 2', 3, 3, 0);
INSERT INTO cards VALUES (39, 'Card 3', 3, 3, 0);
INSERT INTO cards VALUES (40, 'Card 4', 3, 3, 0);
INSERT INTO cards VALUES (41, 'Card 5', 3, 3, 0);

SELECT pg_catalog.setval('cards_id_seq', 41, true);


