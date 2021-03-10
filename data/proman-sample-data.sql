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
    order_n integer,
    is_archived boolean
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

INSERT INTO boards VALUES (1, 'PA to-do', 0);
INSERT INTO boards VALUES (2, 'Zen to-do', 0);
SELECT pg_catalog.setval('boards_id_seq', 3, true);

INSERT INTO statuses VALUES (0, 'new');
INSERT INTO statuses VALUES (1, 'in progress');
INSERT INTO statuses VALUES (2, 'testing');
INSERT INTO statuses VALUES (3, 'done');
SELECT pg_catalog.setval('statuses_id_seq', 3, true);

INSERT INTO cards VALUES (0, 'WEB PA practice exercises!!!', 1, 0, 0, false);
INSERT INTO cards VALUES (1, 'Book a consultation', 1, 0, 0, false);
INSERT INTO cards VALUES (2, 'Practice on Codewars', 1, 1, 0, false);
INSERT INTO cards VALUES (22, 'Archived', 1, 1, 0, true);

INSERT INTO cards VALUES (3, 'Pair programming', 1, 2, 3, false);
INSERT INTO cards VALUES (4, 'Flexbox Froggy', 1, 2, 0, false);
INSERT INTO cards VALUES (5, 'Finish SI exercises', 1, 2, 4, false);
INSERT INTO cards VALUES (6, 'Check fetch()', 1, 2, 2, false);
INSERT INTO cards VALUES (7, 'Finish workbook', 1, 2, 1, false);

INSERT INTO cards VALUES (8, 'Practice with team', 1, 3, 0, false);
INSERT INTO cards VALUES (9, 'What is defer?', 1, 3, 0, false);
INSERT INTO cards VALUES (10, 'API / AJAX', 1, 3, 0, false);
INSERT INTO cards VALUES (11, 'HTTP request types', 1, 3, 0, false);
INSERT INTO cards VALUES (12, 'Check milestone description', 1, 3, 0, false);
INSERT INTO cards VALUES (13, 'SQL practice', 1, 3, 0, false);

INSERT INTO cards VALUES (14, 'Stay calm', 2, 0, 0, false);
INSERT INTO cards VALUES (15, 'Sleep enough', 2, 0, 0, false);
INSERT INTO cards VALUES (16, 'Talk to friends', 2, 0, 0, false);

INSERT INTO cards VALUES (19, 'Meditate', 2, 2, 0, false);
INSERT INTO cards VALUES (20, 'Do yoga', 2, 2, 0, false);

INSERT INTO cards VALUES (21, 'Watch a movie', 2, 3, 0, false);


SELECT pg_catalog.setval('cards_id_seq', 41, true);


