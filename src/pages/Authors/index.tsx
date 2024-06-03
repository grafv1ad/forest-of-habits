import PageLayout from "components/PageLayout";
import Title from "components/Title";

const Authors = () => {
  return (
    <PageLayout breadcrumbs={[{ name: "Авторы проекта" }]}>
      <Title level="1" color="light">
        Авторы проекта
      </Title>
    </PageLayout>
  );
};

export default Authors;
