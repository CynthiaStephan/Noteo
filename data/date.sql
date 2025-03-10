-- Insert users into db
INSERT INTO `user` VALUES (1,'Jean','Dupont','jean@mail.com','$2b$10$7cIPSYYlzHLVu1daMbOxx.ij22wozdy0j1NKtbrJdrM51M2NBja0e','intern','2025-03-07 09:01:24'),(2,'Sophie','Martin','sophie@mail.com','$2b$10$0J9qTMHi5lBXLlG26gWcn.0iHvCuaQzgWc.B77SBhqknxukE18DA2','admin','2025-03-07 09:01:31'),(3,'Thomas','Lefevre','thomas@mail.com','$2b$10$liIDWbWxSrz/8CuTMWRIiOhW7o6WK9SnFaYjtCAuthz3Qc/ccZ3hW','intern','2025-03-07 09:01:39'),(4,'Camille','Bertrand','camille@mail.com','$2b$10$L0.yEuOUR/b7DD9PNtC5aePVjainSR8g5KI2rtmfM8VjEdeIoVD4e','trainer','2025-03-07 09:01:47'),(5,'Lucas','Morel','lucas@mail.com','$2b$10$iN2npJavmlBFRI2M7I9Gieox2moXb1JV2iZ2BQFfCuT448IvPDRje','intern','2025-03-07 09:01:55'),(6,'Emma','Dubois','emma@mail.com','$2b$10$PTL7cdK.B7Ux4a8oHc6WrOUGO0WL8FKprOa0MlaqMWZt/Tvw3C6s2','trainer','2025-03-07 09:02:02'),(7,'Paul','Durand','paul@mail.com','$2b$10$81xhWtP03ULwBiMC4TzKy.9NixDXDiwFDIQdHpDN5nRyBZH2inlA2','admin','2025-03-07 09:02:10'),(8,'Laura','Benoit','laura@mail.com','$2b$10$yHHqbLfSWngtJuVXCTAT7.9rra177EoN7qRh1O/iGD043zQUEdVK2','intern','2025-03-07 09:02:16');

-- Insert questions into DB
INSERT INTO `question` VALUES (1,'Êtes-vous ponctuel en cours ?','2025-03-07 10:14:46','2025-03-07 10:14:46'),(2,'Maîtrisez-vous les bases de JavaScript ?','2025-03-07 10:14:56','2025-03-07 10:14:56'),(3,'Savez-vous résoudre un exercice seul ?','2025-03-07 10:15:02','2025-03-07 10:15:02'),(4,'Respectez-vous les délais ?','2025-03-07 10:15:08','2025-03-07 10:15:08'),(5,'Savez-vous utiliser Git ?','2025-03-07 10:15:18','2025-03-07 10:15:18'),(6,'Comprenez-vous `let`, `const` et `var` ?','2025-03-07 10:15:24','2025-03-07 10:15:24'),(7,'Travaillez-vous bien en équipe ?','2025-03-07 10:15:40','2025-03-07 10:15:40'),(8,'Savez-vous manipuler le DOM ?','2025-03-07 10:15:52','2025-03-07 10:15:52'),(9,'Pouvez-vous écrire une fonction simple ?','2025-03-07 10:15:58','2025-03-07 10:15:58'),(10,'Savez-vous corriger vos erreurs ?','2025-03-07 10:16:06','2025-03-07 10:16:06');

INSERT INTO `questionnaire` VALUES (1,'Super questionnaire',NULL,'2025-03-07 13:53:21',2),(2,'Questionnaire',NULL,'2025-03-07 13:54:09',4);

INSERT INTO `questionnaire_question` VALUES ('2025-03-07 13:53:21',1,2),('2025-03-07 13:53:21',1,4),('2025-03-07 13:53:21',1,7),('2025-03-07 13:54:09',2,1),('2025-03-07 13:54:09',2,3),('2025-03-07 13:54:09',2,8),('2025-03-07 13:54:09',2,9);

INSERT INTO `questionnaire_user` VALUES ('2025-03-07 13:53:21',1,1),('2025-03-07 13:54:09',2,2),('2025-03-07 13:53:21',3,1),('2025-03-07 13:54:09',4,2),('2025-03-07 13:53:21',5,1),('2025-03-07 13:54:09',6,2);

INSERT INTO `answer` VALUES (1,12,'2025-03-10 08:58:54',1,NULL),(2,1,'2025-03-10 08:59:14',1,NULL),(3,9,'2025-03-10 08:59:29',1,NULL),(4,9,'2025-03-10 13:34:11',5,NULL),(5,9,'2025-03-10 13:34:19',5,NULL),(6,9,'2025-03-10 13:34:24',5,NULL);

INSERT INTO `answer_question` VALUES ('2025-03-10 08:58:54','2025-03-10 08:58:54',2,1),('2025-03-10 13:34:11','2025-03-10 13:34:11',2,4),('2025-03-10 08:59:14','2025-03-10 08:59:14',4,2),('2025-03-10 13:34:19','2025-03-10 13:34:19',4,5),('2025-03-10 08:59:29','2025-03-10 08:59:29',7,3),('2025-03-10 13:34:24','2025-03-10 13:34:24',7,6);