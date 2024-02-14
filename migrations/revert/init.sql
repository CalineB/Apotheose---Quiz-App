-- SQLBook: Code
-- Revert quizs:init from pg

BEGIN;

-- XXX Add DDLs here.
DROP TABLE IF EXISTS "role","tag","level","user","quiz","question","answer","score" CASCADE;

DROP DOMAIN "email";

COMMIT;
