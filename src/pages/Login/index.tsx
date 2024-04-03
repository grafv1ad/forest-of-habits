import { Form, Field } from "react-final-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Button from "components/Button";
import FormWrapper from "components/FormWrapper";
import Input from "components/Input";
import Link from "components/Link";
import PageLayout from "components/PageLayout";
import Paragraph from "components/Paragraph";
import Title from "components/Title";
import { FormValues, FormErrors } from "types";
import { axiosInstance } from "utils/api";
import { setCookie } from "utils/cookies";

const onSubmit = (values: FormValues) => {
  console.debug(values);
  axiosInstance
    .post("/auth/login", values)
    .then((response) => {
      console.debug(response.data);
      if (response.data?.token) {
        setCookie("jwt-token", response.data.token);
        toast.success("Вы успешно авторизировались");
      } else {
        toast.error("Ошибка при получении токена");
      }
    })
    .catch((error) => {
      console.error(error);
      toast.error(error?.response?.data?.message || "Что-то пошло не так");
    });
};

const validate = (values: FormValues) => {
  const errors: FormErrors = {};
  if (!values.username) {
    errors.username = "Укажите ваш логин";
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
      render={({ handleSubmit, submitting, validating }) => (
        <form onSubmit={handleSubmit}>
          <FormWrapper>
            <Field
              name="username"
              type="text"
              render={({ input, meta }) => (
                <Input
                  placeholder="Логин"
                  autocomplete="username"
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

            <Button type="submit" disabled={submitting || validating}>
              Войти
            </Button>

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
