import { Form, Field } from "react-final-form";
import Button from "components/Button";
import Checkbox from "components/Checkbox";
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
  if (!values.name) {
    errors.name = "Укажите ваше имя";
  }
  if (!values.email) {
    errors.email = "Укажите вашу электронную почту";
  } else if (!/^\S+@\S+\.\S{2,}/i.test(values.email as string)) {
    errors.email = "Укажите корректный адрес электронной почты";
  }
  if (!values.password) {
    errors.password = "Придумайте пароль";
  }
  if (!values.passwordConfirm) {
    errors.passwordConfirm = "Повторите пароль";
  } else if (values.passwordConfirm !== values.password) {
    errors.passwordConfirm = "Пароли не совпадают";
  }
  if (!values.agreementConfirmation) {
    errors.agreementConfirmation = "Необходимо согласиться с условиями";
  }
  return errors;
};

const Registration = () => (
  <PageLayout verticalCentered>
    <Title level="1" color="light">
      Регистрация
    </Title>
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <FormWrapper>
            <Field
              name="name"
              type="text"
              render={({ input, meta }) => (
                <Input
                  placeholder="Имя"
                  autocomplete="name"
                  {...input}
                  {...meta}
                />
              )}
            />

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
                  autocomplete="new-password"
                  {...input}
                  {...meta}
                />
              )}
            />

            <Field
              name="passwordConfirm"
              type="password"
              render={({ input, meta }) => (
                <Input
                  placeholder="Повторите пароль"
                  autocomplete="new-password"
                  {...input}
                  {...meta}
                />
              )}
            />

            <Field
              name="agreementConfirmation"
              type="checkbox"
              render={({ input, meta }) => {
                return (
                  <Checkbox {...input} {...meta}>
                    Согласен с&nbsp;условиями{" "}
                    <Link href="/agreement">обработки&nbsp;данных</Link>
                  </Checkbox>
                );
              }}
            />

            <Button type="submit">Зарегистрироваться</Button>

            <Paragraph color="light" align="center">
              Уже зарегистрированы? <Link href="/login">Войти</Link>
            </Paragraph>
          </FormWrapper>
        </form>
      )}
    />
  </PageLayout>
);

export default Registration;
