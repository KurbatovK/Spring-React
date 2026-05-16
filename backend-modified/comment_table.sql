-- Таблица комментариев к задачам
CREATE TABLE IF NOT EXISTS `comment` (
    `id`        INT          NOT NULL AUTO_INCREMENT,
    `task_id`   INT          NOT NULL,
    `user_id`   INT          NOT NULL,
    `content`   TEXT         NOT NULL,
    `timestamp` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_comment_task` FOREIGN KEY (`task_id`) REFERENCES `task` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_comment_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
