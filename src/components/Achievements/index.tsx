import React from "react";
import classNames from "classnames";
import Title from "components/Title";
import { AchievementsProps, IAchievementsList } from "types";

import styles from "./style.module.css";

const Achievements: React.FC<AchievementsProps> = ({ statistics }) => {
  const achievementsList: IAchievementsList[] = [
    {
      name: "Welcome to the club buddy",
      description: "Зарегистрироваться в Forest of Habits",
      iconName: "welcome",
      completed: true,
    },

    {
      name: "Помощник лесника",
      description: "Создать 1 лес",
      iconName: "forests-01",
      completed: statistics.allForests >= 1,
    },
    {
      name: "Начинающий лесник",
      description: "Создать 3 леса",
      iconName: "forests-02",
      completed: statistics.allForests >= 3,
    },
    {
      name: "Бывалый лесник",
      description: "Создать 5 лесов",
      iconName: "forests-03",
      completed: statistics.allForests >= 5,
    },
    {
      name: "Безумный лесник",
      description: "Создать 10 лесов",
      iconName: "forests-04",
      completed: statistics.allForests >= 10,
    },

    {
      name: "Помощник садовода",
      description: "Создать 1 дерево",
      iconName: "trees-01",
      completed: statistics.allTrees >= 1,
    },
    {
      name: "Начинающий садовод",
      description: "Создать 3 дерева",
      iconName: "trees-02",
      completed: statistics.allTrees >= 3,
    },
    {
      name: "Садовод любитель",
      description: "Создать 5 деревьев",
      iconName: "trees-03",
      completed: statistics.allTrees >= 5,
    },
    {
      name: "Бывалый садовод",
      description: "Создать 10 деревьев",
      iconName: "trees-04",
      completed: statistics.allTrees >= 10,
    },
    {
      name: "Безумный садовод",
      description: "Создать 25 деревьев",
      iconName: "trees-05",
      completed: statistics.allTrees >= 25,
    },

    {
      name: "Помощник дровосека",
      description: "Закрыть 1 дерево",
      iconName: "completed-trees-01",
      completed: statistics.closeTrees >= 1,
    },
    {
      name: "Начинающий дровосек",
      description: "Закрыть 3 дерева",
      iconName: "completed-trees-02",
      completed: statistics.closeTrees >= 3,
    },
    {
      name: "Дровосек любитель",
      description: "Закрыть 5 деревьев",
      iconName: "completed-trees-03",
      completed: statistics.closeTrees >= 5,
    },
    {
      name: "Бывалый дровосек",
      description: "Закрыть 10 деревьев",
      iconName: "completed-trees-04",
      completed: statistics.closeTrees >= 10,
    },
    {
      name: "Безумный дровосек",
      description: "Закрыть 25 деревьев",
      iconName: "completed-trees-05",
      completed: statistics.closeTrees >= 25,
    },
  ];

  return (
    <>
      <Title level="2" color="light" extraClass="mt-16">
        Достижения
      </Title>

      <style></style>

      <div className="flex justify-center">
        <div className="flex justify-around flex-wrap gap-5 max-w-4xl">
          {achievementsList.map((achievement) => {
            // eslint-disable-next-line import/no-dynamic-require
            const icon = require(`images/achievements/${achievement.iconName}.svg`);

            return (
              <div
                key={achievement.iconName}
                className={classNames(
                  "flex flex-col gap-2 items-center w-36 text-center",
                  {
                    "grayscale opacity-70": !achievement.completed,
                    // "-order-1": achievement.completed,
                  },
                  styles.achievement
                )}
              >
                <img
                  src={icon}
                  alt=""
                  title={achievement.name}
                  className={classNames(
                    "achievement-icon w-36 h-36 aspect-square object-contain",
                    {
                      "transform-gpu": !achievement.completed,
                    }
                  )}
                />
                <div className="text-main font-semibold">
                  {achievement.name}
                </div>
                <div className="text-sm text-beige-600">
                  {achievement.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Achievements;
