# Forum

## Introduction


## MCD

![MCD](MCD.SVG)

## MLD

- **ANSWERS** (<u>id_answers</u>, content, like, dislike, _#id_users_)
- **QUESTIONS** (<u>id_questions</u>, content, _#id_users_, _#id_themes_)
- **THEMES** (<u>id_themes</u>, name)
- **USERS** (<u>id_users</u>, firstname, lastname, email, password)

## MPD

<details>
  <summary>Afficher le code SQL</summary>
  <pre><code>
CREATE TABLE ANSWERS (
  PRIMARY KEY (id_answers),
  id_answers VARCHAR(42) NOT NULL,
  content    TEXT,
  like       INT,
  dislike    INT,
  id_users   VARCHAR(42) NOT NULL
);

CREATE TABLE QUESTIONS (
  PRIMARY KEY (id_questions),
  id_questions VARCHAR(42) NOT NULL,
  content      TEXT,
  id_users     VARCHAR(42) NOT NULL,
  id_themes    VARCHAR(42) NOT NULL
);

CREATE TABLE THEMES (
  PRIMARY KEY (id_themes),
  id_themes VARCHAR(42) NOT NULL,
  name      VARCHAR(255)
);

CREATE TABLE USERS (
  PRIMARY KEY (id_users),
  id_users  VARCHAR(42) NOT NULL,
  firstname VARCHAR(255),
  lastname  VARCHAR(255),
  email     VARCHAR(255),
  password  VARCHAR(255)
);

ALTER TABLE ANSWERS ADD FOREIGN KEY (id_users) REFERENCES USERS (id_users);
ALTER TABLE QUESTIONS ADD FOREIGN KEY (id_themes) REFERENCES THEMES (id_themes);
ALTER TABLE QUESTIONS ADD FOREIGN KEY (id_users) REFERENCES USERS (id_users);
  </code></pre>
</details>
