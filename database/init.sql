-- Vérifier si la base de données existe déjà
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'forum') THEN
        PERFORM dblink_exec('dbname=' || current_database(), 'CREATE DATABASE forum');
    END IF;
END $$;

-- Connexion à la base de données
-- \c forum;

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

-- Création de la table "author" (mot-clé réservé, donc guillemets)
CREATE TABLE author (
    id_author UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
    author_id UUID NOT NULL,
    theme_id UUID NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NULL,
    CONSTRAINT fk_question_author FOREIGN KEY (author_id) REFERENCES author(id_author) ON DELETE CASCADE,
    CONSTRAINT fk_question_theme FOREIGN KEY (theme_id) REFERENCES theme(id_theme) ON DELETE CASCADE
);

-- Création de la table "answer"
CREATE TABLE answer (
    id_answer UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content TEXT NOT NULL,
    nb_like INTEGER DEFAULT 0 NOT NULL CHECK (nb_like >= 0),
    nb_dislike INTEGER DEFAULT 0 NOT NULL CHECK (nb_dislike >= 0),
    author_id UUID NOT NULL,
    question_id UUID NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NULL,
    CONSTRAINT fk_answer_author FOREIGN KEY (author_id) REFERENCES author(id_author) ON DELETE CASCADE,
    CONSTRAINT fk_answer_question FOREIGN KEY (question_id) REFERENCES question(id_question) ON DELETE CASCADE
);

-- Index pour accélérer les requêtes
CREATE INDEX idx_question_author_id ON question(author_id);
CREATE INDEX idx_question_theme_id ON question(theme_id);
CREATE INDEX idx_answer_author_id ON answer(author_id);
CREATE INDEX idx_answer_question_id ON answer(question_id);

-- Insertion des thèmes
INSERT INTO theme (id_theme, name) VALUES
    (gen_random_uuid(), 'Science'),
    (gen_random_uuid(), 'Technology'),
    (gen_random_uuid(), 'Mathematics'),
    (gen_random_uuid(), 'History'),
    (gen_random_uuid(), 'Geography'),
    (gen_random_uuid(), 'Literature');

-- Insertion des auteurs avec des données prédéfinies
INSERT INTO author (id_author, firstname, lastname, email, password) VALUES
    (gen_random_uuid(), 'Alice', 'Dupont', LOWER('alice@example.com'), '$2b$12$skfdfKy5S6ikXkQK4SlL4u6uTdEWy0frAj/fQOUUoO1vHil/mkdDm'), -- alice
    (gen_random_uuid(), 'Bob', 'Martin', LOWER('bob@example.com'), '$2b$12$L2t2ixabOCGYYO4Wz3AtMuJT9dUx3ONhUqSCY3026OQ.Azdhf7wxS'), -- bob
    (gen_random_uuid(), 'Charlie', 'Durand', LOWER('charlie@example.com'), '$2b$12$gEtEcyOyS7k09KlKR9vkbe9OzBSL9wIhVVpat3a6A6akzkjVVBn6i'), -- charlie
    (gen_random_uuid(), 'David', 'Lefevre', LOWER('david@example.com'), '$2b$12$1234567890abcdefghijkl'), -- david
    (gen_random_uuid(), 'Eve', 'Moreau', LOWER('eve@example.com'), '$2b$12$1234567890abcdefghijkl'), -- eve
    (gen_random_uuid(), 'Frank', 'Girard', LOWER('frank@example.com'), '$2b$12$1234567890abcdefghijkl'), -- frank
    (gen_random_uuid(), 'Grace', 'Hubert', LOWER('grace@example.com'), '$2b$12$1234567890abcdefghijkl'), -- grace
    (gen_random_uuid(), 'Heidi', 'Lemaire', LOWER('heidi@example.com'), '$2b$12$1234567890abcdefghijkl'), -- heidi
    (gen_random_uuid(), 'Ivan', 'Noel', LOWER('ivan@example.com'), '$2b$12$1234567890abcdefghijkl'), -- ivan
    (gen_random_uuid(), 'Judy', 'Perrin', LOWER('judy@example.com'), '$2b$12$1234567890abcdefghijkl'); -- judy

-- Insertion des questions avec des données aléatoires
INSERT INTO question (id_question, content, author_id, theme_id, created_at)
SELECT
    gen_random_uuid(),
    'Question ' || md5(random()::text), -- Contenu aléatoire
    a.id_author,
    (SELECT id_theme FROM theme ORDER BY RANDOM() LIMIT 1), -- Thème aléatoire
    NOW()
FROM
    author a,
    generate_series(1, 3) AS q(i); -- 3 questions par auteur

-- Insertion des réponses avec des données aléatoires
INSERT INTO answer (id_answer, content, nb_like, nb_dislike, author_id, question_id, created_at)
SELECT
    gen_random_uuid(),
    'Answer ' || md5(random()::text), -- Contenu aléatoire
    floor(random() * 10) AS nb_like, -- Nombre aléatoire de likes
    floor(random() * 5) AS nb_dislike, -- Nombre aléatoire de dislikes
    subquery.author_id, -- Utilisation correcte de l'alias
    subquery.id_question,
    NOW()
FROM (
    SELECT
        q.id_question,
        a.id_author AS author_id, -- Alias pour id_author
        (CASE
            WHEN random() < 0.2 THEN 0
            WHEN random() < 0.5 THEN 1
            WHEN random() < 0.7 THEN 2
            WHEN random() < 0.9 THEN 3
            ELSE 4
        END) + 1 AS num_answers -- Nombre aléatoire de réponses entre 1 et 5
    FROM
        question q
    JOIN
        author a ON a.id_author = q.author_id
) AS subquery
JOIN
    generate_series(1, subquery.num_answers) AS r(i) ON true;
