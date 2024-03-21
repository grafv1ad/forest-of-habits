import Button from "components/Button";
import Checkbox from "components/Checkbox";
import Link from "components/Link";
import PageLayout from "components/PageLayout";
import Paragraph from "components/Paragraph";
import Title from "components/Title";

const StyledComponents = () => {
  return (
    <PageLayout verticalCentered>
      <div className="flex flex-col items-center">
        <Title level="2" color="light">
          Регистрация
        </Title>
        <Checkbox name="test" extraClass="mb-7">
          <Paragraph color="gray">
            Согласен на обработку <Link href="/">чего-нибудь</Link>
          </Paragraph>
        </Checkbox>
        <Button type="submit" extraClass="mb-12">
          Зарегистрироваться
        </Button>
        <div className="flex justify-center items-center">
          <Paragraph color="light">Уже зарегистрированы?</Paragraph>
          <Link href="/" extraClass="ml-6">
            Войти
          </Link>
        </div>
      </div>
    </PageLayout>
  );
};

export default StyledComponents;
