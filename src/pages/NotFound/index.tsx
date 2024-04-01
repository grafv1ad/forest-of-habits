import Link from "components/Link";
import PageLayout from "components/PageLayout";
import Paragraph from "components/Paragraph";
import Title from "components/Title";

const NotFound = () => (
  <PageLayout>
    <Title level="1" color="light">
      Страница не найдена
    </Title>
    <div className="text-center font-stick my-10 text-9xl leading-none">
      404
    </div>
    <Paragraph align="center" color="light">
      Кажется вы забрели не&nbsp;в&nbsp;тот лес.{" "}
      <Link href="/">Вернуться на&nbsp;главную</Link>
    </Paragraph>
  </PageLayout>
);

export default NotFound;
