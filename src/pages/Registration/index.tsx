import { Form, Field } from "react-final-form";
import Button from "components/Button";
import Checkbox from "components/Checkbox";
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
  if (!values.name) {
    // @ts-ignore
    errors.name = "Укажите ваше имя";
  }
  if (!values.email) {
    // @ts-ignore
    errors.email = "Укажите ваш email";
  } else if (!/^\S+@\S+\.\S{2,}/i.test(values.email)) {
    // @ts-ignore
    errors.email = "Укажите корректный email адрес";
  }
  if (!values.password) {
    // @ts-ignore
    errors.password = "Придумайте пароль";
  }
  if (!values.passwordConfirm) {
    // @ts-ignore
    errors.passwordConfirm = "Повторите пароль";
  } else if (values.passwordConfirm !== values.password) {
    // @ts-ignore
    errors.passwordConfirm = "Пароли не совпадают";
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
              render={({ input, meta }) => (
                <Input
                  name={input.name}
                  value={input.value}
                  type="text"
                  placeholder="Имя"
                  autocomplete="name"
                  touched={meta.touched}
                  error={meta.error}
                  onChange={input.onChange}
                />
              )}
            />

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

            <Field
              name="passwordConfirm"
              render={({ input, meta }) => (
                <Input
                  name={input.name}
                  value={input.value}
                  type="password"
                  placeholder="Повторите пароль"
                  autocomplete="new-password"
                  touched={meta.touched}
                  error={meta.error}
                  onChange={input.onChange}
                />
              )}
            />

            <Field
              name="agreementConfirmation"
              render={({ input }) => (
                <Checkbox name={input.name} checked>
                  Согласен с&nbsp;условиями{" "}
                  <Link href="/">обработки&nbsp;данных</Link>
                </Checkbox>
              )}
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
