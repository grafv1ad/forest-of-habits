import Button from "components/Button";
import Checkbox from "components/Checkbox";
import Link from "components/Link";
import PageLayout from "components/PageLayout";
import Paragraph from "components/Paragraph";
import Title from "components/Title";

const StyledComponents = () => {
  return (
    <PageLayout>
      <div className="flex flex-col items-center">
        <Title level={2} color="light" extraClass="mb-12">
          Регистрация
        </Title>
        <Checkbox extraClass="mb-7">
          <Paragraph color="gray">
            Согласен на обработку <Link url="/">чего-нибудь</Link>
          </Paragraph>
        </Checkbox>
        <Button type="submit" extraClass="mb-12">
          Зарегистрироваться
        </Button>
        <div className="flex justify-center items-center">
          <Paragraph color="light">Уже зарегистрированы?</Paragraph>
          <Link url="/" extraClass="ml-6">
            Войти
          </Link>
        </div>
      </div>
    </PageLayout>
  );
};

export default StyledComponents;
