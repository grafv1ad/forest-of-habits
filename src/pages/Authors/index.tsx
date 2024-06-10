import classNames from "classnames";
import PageLayout from "components/PageLayout";
import Title from "components/Title";
import { ReactComponent as GithubSVG } from "images/github.svg";
import { IAuthorsList } from "types";

import styles from "./style.module.css";

const mentors: IAuthorsList[] = [
  {
    name: "Константин",
    surname: "Снурницын",
    photoName: "kostya",
    githubUsername: "SnurnicynKonstantin ",
    active: true,
  },
  {
    name: "Андрей",
    surname: "Игнашкин",
    photoName: "andrey",
    githubUsername: "anbrew",
    active: true,
  },
];

const frontend: IAuthorsList[] = [
  {
    name: "Владислав",
    surname: "Петров",
    photoName: "vlad",
    githubUsername: "grafv1ad",
    active: true,
  },
  {
    name: "Виктория",
    surname: "Воробьева",
    photoName: "vika",
    githubUsername: "ViktoriaVorobeva",
    active: false,
  },
];

const backend: IAuthorsList[] = [
  {
    name: "Петр",
    surname: "Иванов",
    photoName: "petya",
    githubUsername: "d8ml",
    active: true,
  },
  {
    name: "Никита",
    surname: "Ерко",
    photoName: "nikita",
    githubUsername: "nik2025311",
    active: true,
  },
  {
    name: "Ярослав",
    surname: "Игнатенко",
    photoName: "yarik",
    githubUsername: "Elbundo",
    active: true,
  },
];

const getAuthorsBlock = (authors: IAuthorsList[]) => {
  return (
    <div className="flex flex-wrap gap-5 justify-center mb-8">
      {authors.map((author) => {
        // eslint-disable-next-line import/no-dynamic-require
        const photo = require(`images/authors/${author.photoName}.png`);

        return (
          <div
            key={author.name}
            className={classNames(
              "flex flex-col gap-2 items-center w-44 text-center",
              {
                "opacity-60 transition-opacity hover:opacity-100":
                  !author.active,
              },
              styles.author
            )}
          >
            <a
              href={`https://github.com/${author.githubUsername}`}
              target="_blank"
              className="group"
            >
              <img
                src={photo}
                alt=""
                title={author.name}
                className="w-40 h-40 aspect-square object-contain border-4 border-main rounded-full transition-colors group-hover:border-beige-600"
                style={{
                  animationDelay: `${Math.random() * 3}s`,
                }}
              />
            </a>
            <div className="flex flex-col items-center text-center">
              <div className="text-main font-semibold">{author.name}</div>
              <div className="">{author.surname}</div>
            </div>
            <a
              href={`https://github.com/${author.githubUsername}`}
              target="_blank"
              className="text-sm text-beige-600 transition-colors -hover:text-main flex items-center justify-center gap-2"
            >
              <div className="svg-wrapper w-6 h-6">
                <GithubSVG />
              </div>
              <span>{author.githubUsername}</span>
            </a>
          </div>
        );
      })}
    </div>
  );
};

const Authors = () => {
  return (
    <PageLayout breadcrumbs={[{ name: "Авторы проекта" }]}>
      <Title level="1" color="light">
        Авторы проекта
      </Title>

      <Title level="2" color="light">
        Менторы
      </Title>
      {getAuthorsBlock(mentors)}

      <Title level="2" color="light">
        Frontend
      </Title>
      {getAuthorsBlock(frontend)}

      <Title level="2" color="light">
        Backend
      </Title>
      {getAuthorsBlock(backend)}
    </PageLayout>
  );
};

export default Authors;
