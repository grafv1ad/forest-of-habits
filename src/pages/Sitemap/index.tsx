import Link from "components/Link";
import PageLayout from "components/PageLayout";
import Title from "components/Title";

const Sitemap = () => (
  <PageLayout>
    <Title level="1" color="light">
      Карта сайта
    </Title>

    <Title level="3" color="light" align="left">
      Основные страницы
    </Title>
    <div className="flex flex-col align gap-3 mb-10">
      <Link href="/registration">Регистрация</Link>
      <Link href="/login">Авторизация</Link>
      <Link href="/account">Личный кабинет</Link>
      <Link href="/agreement">Соглашение</Link>
      <Link href="/forests">Леса</Link>
    </div>

    <Title level="3" color="light" align="left">
      Технические страницы
    </Title>
    <div className="flex flex-col align gap-3 mb-10">
      <Link href="/components">Компоненты</Link>
      <Link href="/404">404</Link>
    </div>
  </PageLayout>
);

export default Sitemap;
