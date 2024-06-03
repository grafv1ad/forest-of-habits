import Link from "components/Link";
import PageLayout from "components/PageLayout";
import Paragraph from "components/Paragraph";
import Title from "components/Title";

const Agreement = () => (
  <PageLayout breadcrumbs={[{ name: "Соглашение" }]}>
    <Title level="1" color="light">
      Соглашение
    </Title>
    <Paragraph color="light" align="justify">
      Данный проект выполнен в рамках обучения в{" "}
      <Link href="https://school.hh.ru/" target="_blank">
        школе программистов hh.ru
      </Link>{" "}
      2023–2024 и является учебным. Мы не несем ответственности за любые
      оставленные вами данные.
    </Paragraph>
  </PageLayout>
);

export default Agreement;
