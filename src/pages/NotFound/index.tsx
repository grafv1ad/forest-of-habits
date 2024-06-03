import Link from "components/Link";
import PageLayout from "components/PageLayout";
import Paragraph from "components/Paragraph";
import Title from "components/Title";

const NotFound = () => (
  <PageLayout breadcrumbs={[{ name: "Страница не найдена" }]}>
    <Title level="1" color="light">
      Страница не найдена
    </Title>
    <div className="h-full flex flex-col justify-center items-center">
      <div className="text-center font-stick my-10 text-9xl leading-none">
        404
      </div>
      <Paragraph align="center" color="light" extraClass="flex flex-col gap-2">
        <div>Кажется вы забрели не&nbsp;в&nbsp;тот лес…</div>
        <Link href="/">Вернуться на&nbsp;главную</Link>
      </Paragraph>
    </div>
  </PageLayout>
);

export default NotFound;
