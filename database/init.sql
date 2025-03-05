DROP TABLE IF EXISTS ANSWERS CASCADE;

DROP TABLE IF EXISTS QUESTIONS CASCADE;

DROP TABLE IF EXISTS THEMES CASCADE;

DROP TABLE IF EXISTS USERS CASCADE;
 
-- Activation de l'extension UUID

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
 
-- Table USERS avec UUID

CREATE TABLE USERS (

    id_users UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    firstname VARCHAR(255),

    lastname VARCHAR(255),

    email VARCHAR(255),

    password VARCHAR(255)

);
 
-- Table THEMES avec UUID

CREATE TABLE THEMES (

    id_themes UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    name VARCHAR(255)

);
 
-- Table QUESTIONS avec UUID

CREATE TABLE QUESTIONS (

    id_questions UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    content TEXT,

    users_id UUID NOT NULL,

    themes_id UUID NOT NULL

);
 
-- Table ANSWERS avec UUID

CREATE TABLE ANSWERS (

    id_answers UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    content TEXT,

    nb_like INT,

    nb_dislike INT,

    users_id UUID NOT NULL

);
 
-- Ajout des clés étrangères

ALTER TABLE ANSWERS ADD FOREIGN KEY (users_id) REFERENCES USERS (id_users);

ALTER TABLE QUESTIONS ADD FOREIGN KEY (themes_id) REFERENCES THEMES (id_themes);

ALTER TABLE QUESTIONS ADD FOREIGN KEY (users_id) REFERENCES USERS (id_users);
 
 
-- Insertion dans la table USERS (sans spécifier id_users)

INSERT INTO USERS (firstname, lastname, email, password) VALUES

('Alice', 'Dubois', 'alice.dubois@example.com', 'hashed_password_alice'),

('Bob', 'Martin', 'bob.martin@example.com', 'hashed_password_bob'),

('Chloé', 'Lefevre', 'chloe.lefevre@example.com', 'hashed_password_chloe'),

('David', 'Garcia', 'david.garcia@example.com', 'hashed_password_david'),

('Emilie', 'Thomas', 'emilie.thomas@example.com', 'hashed_password_emilie');
 
-- Insertion dans la table THEMES (sans spécifier id_themes)

INSERT INTO THEMES (name) VALUES

('Informatique'),

('Sciences'),

('Littérature'),

('Histoire'),

('Art');
 
-- Insertion dans la table QUESTIONS (sans spécifier id_questions)

INSERT INTO QUESTIONS (content, users_id, themes_id) VALUES

('Quels sont les avantages de l IA ?', (SELECT id_users FROM USERS WHERE firstname = 'Alice'), (SELECT id_themes FROM THEMES WHERE name = 'Informatique')),

('Comment fonctionne la photosynthèse ?', (SELECT id_users FROM USERS WHERE firstname = 'Bob'), (SELECT id_themes FROM THEMES WHERE name = 'Sciences')),

('Qui a écrit Les Misérables ?', (SELECT id_users FROM USERS WHERE firstname = 'Chloé'), (SELECT id_themes FROM THEMES WHERE name = 'Littérature')),

('Quelle était la cause de la Révolution française ?', (SELECT id_users FROM USERS WHERE firstname = 'David'), (SELECT id_themes FROM THEMES WHERE name = 'Histoire')),

('Quels sont les principaux mouvements artistiques du XXe siècle ?', (SELECT id_users FROM USERS WHERE firstname = 'Emilie'), (SELECT id_themes FROM THEMES WHERE name = 'Art'));
 
-- Insertion dans la table ANSWERS (sans spécifier id_answers)

INSERT INTO ANSWERS (content, nb_like, nb_dislike, users_id) VALUES

('L IA peut automatiser les tâches répétitives et améliorer la prise de décision.', 10, 2, (SELECT id_users FROM USERS WHERE firstname = 'Bob')),

('La photosynthèse est le processus par lequel les plantes convertissent la lumière en énergie.', 15, 1, (SELECT id_users FROM USERS WHERE firstname = 'Chloé')),

('Victor Hugo a écrit Les Misérables.', 20, 0, (SELECT id_users FROM USERS WHERE firstname = 'David')),

('Les inégalités sociales et la crise économique ont été les principales causes de la Révolution française.', 12, 3, (SELECT id_users FROM USERS WHERE firstname = 'Emilie')),

('Le cubisme, le surréalisme et l expressionnisme sont quelques-uns des principaux mouvements artistiques du XXe siècle.', 18, 2, (SELECT id_users FROM USERS WHERE firstname = 'Alice'));
 