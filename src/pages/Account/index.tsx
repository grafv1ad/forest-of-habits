import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import OurLink from "components/Link";
import PageLayout from "components/PageLayout";
import Paragraph from "components/Paragraph";
import Title from "components/Title";
import { useAuth } from "hooks/useAuth";
import { removeUser } from "store/slices/user";

const Account = () => {
  const dispatch = useDispatch();
  const { isAuth, username } = useAuth();

  return isAuth ? (
    <PageLayout>
      <Title level="1" color="light">
        Личный кабинет
      </Title>
      <Paragraph color="light">
        Привет, <strong>{username}</strong>! Добро пожаловать в лес привычек
      </Paragraph>
      <OurLink href="/login" onClick={() => dispatch(removeUser())}>
        Выйти
      </OurLink>
    </PageLayout>
  ) : (
    <Navigate replace to="/login" />
  );
};

export default Account;
