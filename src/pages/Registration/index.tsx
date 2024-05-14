import { Form, Field } from "react-final-form";
import { useDispatch } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Button from "components/Button";
import Checkbox from "components/Checkbox";
import FormWrapper from "components/FormWrapper";
import Input from "components/Input";
import Link from "components/Link";
import PageLayout from "components/PageLayout";
import Paragraph from "components/Paragraph";
import Title from "components/Title";
import { useAuth } from "hooks/useAuth";
import { setUser } from "store/slices/user";
import { FormValues, FormErrors } from "types";
import { axiosInstance } from "utils/api";
import { setCookie } from "utils/cookies";

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  const onSubmit = (values: FormValues) => {
    console.debug(values);
    axiosInstance
      .post("/auth/registration", values)
      .then((response) => {
        console.debug(response.data);
        if (response.data?.token) {
          setCookie("token", response.data.token);
          dispatch(
            setUser({
              username: response.data?.userName || values.username,
            })
          );
          navigate("/forests");
          toast.success("Вы успешно зарегистрировались");
        } else {
          toast.error("Ошибка при получении токена");
        }
      })
      .catch((error) => {
        console.error(error?.response);
        toast.error(error?.response?.data?.message || "Что-то пошло не так");
      });
  };

  const validate = (values: FormValues) => {
    const errors: FormErrors = {};
    if (!values.username) {
      errors.username = "Укажите ваш логин";
    }
    if (!values.email) {
      errors.email = "Укажите вашу электронную почту";
    } else if (!/^\S+@\S+\.\S{2,}/i.test(values.email as string)) {
      errors.email = "Укажите корректный адрес электронной почты";
    }
    if (!values.password) {
      errors.password = "Придумайте пароль";
    }
    if (!values.passwordConfirmation) {
      errors.passwordConfirmation = "Повторите пароль";
    } else if (values.passwordConfirmation !== values.password) {
      errors.passwordConfirmation = "Пароли не совпадают";
    }
    if (!values.agreementConfirmation) {
      errors.agreementConfirmation = "Необходимо согласиться с условиями";
    }
    return errors;
  };

  return isAuth ? (
    <Navigate replace to="/forests" />
  ) : (
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
                name="passwordConfirmation"
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
                      <Link href="/agreement" target="_blank">
                        соглашения
                      </Link>
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
};

export default Registration;
