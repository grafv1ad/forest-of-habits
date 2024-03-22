import Link from "components/Link";
import PageLayout from "components/PageLayout";
import Title from "components/Title";

const Index = () => (
  <PageLayout>
    <Title level="1" color="light">
      Главная страница
    </Title>
    <div className="flex flex-col align gap-3">
      <Link href="/components">Компоненты</Link>
      <Link href="/registration">Регистрация</Link>
      <Link href="/login">Авторизация</Link>
    </div>
  </PageLayout>
);

export default Index;
