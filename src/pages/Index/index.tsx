import OurLink from "components/Link";
import PageLayout from "components/PageLayout";
import Title from "components/Title";

const Index = () => (
  <PageLayout>
    <Title level="1" color="light">
      Главная страница
    </Title>

    <Title level="3" color="light" align="left">
      Основные страницы
    </Title>
    <div className="flex flex-col align gap-3 mb-10">
      <OurLink href="/registration">Регистрация</OurLink>
      <OurLink href="/login">Авторизация</OurLink>
      <OurLink href="/agreement">Соглашение</OurLink>
      <OurLink href="/woods">Леса</OurLink>
    </div>

    <Title level="3" color="light" align="left">
      Технические страницы
    </Title>
    <div className="flex flex-col align gap-3 mb-10">
      <OurLink href="/components">Компоненты</OurLink>
      <OurLink href="/404">404</OurLink>
    </div>
  </PageLayout>
);

export default Index;
