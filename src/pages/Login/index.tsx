import { Form, Field } from "react-final-form";
import Button from "components/Button";
import FormWrapper from "components/FormWrapper";
import Input from "components/Input";
import Link from "components/Link";
import PageLayout from "components/PageLayout";
import Paragraph from "components/Paragraph";
import Title from "components/Title";

// todo: убрать any
const onSubmit = (values: any) => {
  console.debug(values);
};

const validate = (values: any) => {
  const errors = {};
  if (!values.email) {
    // @ts-ignore
    errors.email = "Укажите ваш email";
  } else if (!/^\S+@\S+\.\S{2,}/i.test(values.email)) {
    // @ts-ignore
    errors.email = "Укажите корректный email адрес";
  }
  if (!values.password) {
    // @ts-ignore
    errors.password = "Укажите ваш пароль";
  }
  return errors;
};

const Login = () => (
  <PageLayout verticalCentered>
    <Title level="1" color="light">
      Добро пожаловать
    </Title>
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <FormWrapper>
            <Field
              name="email"
              render={({ input, meta }) => (
                <Input
                  name={input.name}
                  value={input.value}
                  type="text"
                  placeholder="E-mail"
                  autocomplete="email"
                  touched={meta.touched}
                  error={meta.error}
                  onChange={input.onChange}
                />
              )}
            />

            <Field
              name="password"
              render={({ input, meta }) => (
                <Input
                  name={input.name}
                  value={input.value}
                  type="password"
                  placeholder="Пароль"
                  autocomplete="new-password"
                  touched={meta.touched}
                  error={meta.error}
                  onChange={input.onChange}
                />
              )}
            />

            <Button type="submit">Войти</Button>

            <Paragraph color="light" align="center">
              Впервые здесь?{" "}
              <Link href="/registration">Зарегистрироваться</Link>
            </Paragraph>
          </FormWrapper>
        </form>
      )}
    />
  </PageLayout>
);

export default Login;
