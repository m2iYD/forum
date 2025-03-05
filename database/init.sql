-- Désactiver temporairement les contraintes de clé étrangère
SET session_replication_role = 'replica';

-- Supprimer toutes les tables, vues et séquences
DO $$ 
DECLARE 
    r RECORD;
BEGIN
    -- Supprimer les tables
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
        EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
    END LOOP;

    -- Supprimer les vues
    FOR r IN (SELECT viewname FROM pg_views WHERE schemaname = 'public') LOOP
        EXECUTE 'DROP VIEW IF EXISTS ' || quote_ident(r.viewname) || ' CASCADE';
    END LOOP;

    -- Supprimer les séquences (auto-incrément)
    FOR r IN (SELECT relname FROM pg_class WHERE relkind = 'S' AND relnamespace = 'public'::regnamespace) LOOP
        EXECUTE 'DROP SEQUENCE IF EXISTS ' || quote_ident(r.relname) || ' CASCADE';
    END LOOP;
END $$;

-- Réactiver les contraintes de clé étrangère
SET session_replication_role = 'origin';

-- Création de la table "user" (mot-clé réservé, donc guillemets)
CREATE TABLE "user" (
    id_user UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL CHECK (email = LOWER(email)),
    password VARCHAR(255) NOT NULL
);

-- Création de la table "theme"
CREATE TABLE theme (
    id_theme UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) UNIQUE NOT NULL
);

-- Création de la table "question"
CREATE TABLE question (
    id_question UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content TEXT NOT NULL,
    user_id UUID NOT NULL,
    theme_id UUID NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NULL,
    CONSTRAINT fk_question_user FOREIGN KEY (user_id) REFERENCES "user"(id_user) ON DELETE CASCADE,
    CONSTRAINT fk_question_theme FOREIGN KEY (theme_id) REFERENCES theme(id_theme) ON DELETE CASCADE
);

-- Création de la table "answer"
CREATE TABLE answer (
    id_answer UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content TEXT NOT NULL,
    nb_like INTEGER DEFAULT 0 NOT NULL CHECK (nb_like >= 0),
    nb_dislike INTEGER DEFAULT 0 NOT NULL CHECK (nb_dislike >= 0),
    user_id UUID NOT NULL,
    question_id UUID NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NULL,
    CONSTRAINT fk_answer_user FOREIGN KEY (user_id) REFERENCES "user"(id_user) ON DELETE CASCADE,
    CONSTRAINT fk_answer_question FOREIGN KEY (question_id) REFERENCES question(id_question) ON DELETE CASCADE
);

-- Index pour accélérer les requêtes
CREATE INDEX idx_question_user_id ON question(user_id);
CREATE INDEX idx_question_theme_id ON question(theme_id);
CREATE INDEX idx_answer_user_id ON answer(user_id);
CREATE INDEX idx_answer_question_id ON answer(question_id);

-- Insertion des thèmes
INSERT INTO theme (id_theme, name) VALUES
    (gen_random_uuid(), 'Science'),
    (gen_random_uuid(), 'Technology'),
    (gen_random_uuid(), 'Mathematics'),
    (gen_random_uuid(), 'History'),
    (gen_random_uuid(), 'Geography'),
    (gen_random_uuid(), 'Philosophy'),
    (gen_random_uuid(), 'Art'),
    (gen_random_uuid(), 'Music'),
    (gen_random_uuid(), 'Sports'),
    (gen_random_uuid(), 'Literature');

-- Insertion des utilisateurs (email en lowercase directement)
INSERT INTO "user" (id_user, firstname, lastname, email, password) VALUES
    (gen_random_uuid(), 'Alice', 'Dupont', LOWER('alice@example.com'), 'password123'),
    (gen_random_uuid(), 'Bob', 'Martin', LOWER('bob@example.com'), 'password456'),
    (gen_random_uuid(), 'Charlie', 'Durand', LOWER('charlie@example.com'), 'password789');

-- Insertion des questions (par Alice et Bob)
INSERT INTO question (id_question, content, user_id, theme_id, created_at) 
SELECT 
    gen_random_uuid(), 
    q.content, 
    u.id_user, 
    t.id_theme, 
    NOW()
FROM (
    VALUES 
        ('What is the theory of relativity?', 'alice@example.com', 'Science'),
        ('Who invented the telephone?', 'alice@example.com', 'Technology'),
        ('What is Pythagoras'' theorem?', 'alice@example.com', 'Mathematics'),
        ('When did World War II start?', 'bob@example.com', 'History'),
        ('What is the capital of Australia?', 'bob@example.com', 'Geography'),
        ('Who wrote "War and Peace"?', 'bob@example.com', 'Literature')
) AS q(content, user_email, theme_name)
JOIN "user" u ON u.email = q.user_email
JOIN theme t ON t.name = q.theme_name;

-- Insertion des réponses (par Charlie)
INSERT INTO answer (id_answer, content, nb_like, nb_dislike, user_id, question_id, created_at) 
SELECT 
    gen_random_uuid(), 
    a.content, 
    0, 0, 
    u.id_user, 
    q.id_question, 
    NOW()
FROM (
    VALUES 
        ('The theory of relativity was developed by Albert Einstein.', 'What is the theory of relativity?'),
        ('The telephone was invented by Alexander Graham Bell.', 'Who invented the telephone?'),
        ('Pythagoras'' theorem states that a² + b² = c².', 'What is Pythagoras'' theorem?'),
        ('World War II started in 1939.', 'When did World War II start?'),
        ('The capital of Australia is Canberra.', 'What is the capital of Australia?'),
        ('"War and Peace" was written by Leo Tolstoy.', 'Who wrote "War and Peace"?')
) AS a(content, question_content)
JOIN "user" u ON u.email = 'charlie@example.com'
JOIN question q ON q.content = a.question_content;
