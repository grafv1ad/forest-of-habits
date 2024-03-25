import { Form, Field } from "react-final-form";
import Button from "components/Button";
import FormWrapper from "components/FormWrapper";
import Input from "components/Input";
import Link from "components/Link";
import PageLayout from "components/PageLayout";
import Paragraph from "components/Paragraph";
import Title from "components/Title";
import { FormValues, FormErrors } from "types";

const onSubmit = (values: FormValues) => {
  console.debug(values);
};

const validate = (values: FormValues) => {
  const errors: FormErrors = {};
  if (!values.email) {
    errors.email = "Укажите вашу электронную почту";
  } else if (!/^\S+@\S+\.\S{2,}/i.test(values.email as string)) {
    errors.email = "Укажите корректный адрес электронной почты";
  }
  if (!values.password) {
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
              type="text"
              render={({ input, meta }) => (
                <Input
                  placeholder="E-mail"
                  autocomplete="email"
                  {...input}
                  {...meta}
                />
              )}
            />

            <Field
              name="password"
              type="password"
              render={({ input, meta }) => (
                <Input
                  placeholder="Пароль"
                  autocomplete="current-password"
                  {...input}
                  {...meta}
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
