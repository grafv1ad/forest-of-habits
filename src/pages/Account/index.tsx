import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import OurLink from "components/Link";
import Loader from "components/Loader";
import PageLayout from "components/PageLayout";
import Paragraph from "components/Paragraph";
import Title from "components/Title";
import { useAuth } from "hooks/useAuth";
import { removeUser } from "store/slices/user";
import { removeCookie } from "utils/cookies";

const Account = () => {
  const dispatch = useDispatch();
  const { isLoaded, isAuth, username, emailHash } = useAuth();

  if (!isLoaded) {
    return <Loader />;
  }

  return isAuth ? (
    <PageLayout breadcrumbs={[{ name: "Личный кабинет" }]}>
      <Title level="1" color="light">
        Личный кабинет
      </Title>
      <Paragraph color="light">
        Привет, <strong>{username}</strong>! Добро пожаловать в лес привычек
      </Paragraph>
      <OurLink
        href="/login"
        onClick={() => {
          dispatch(removeUser());
          removeCookie("token");
        }}
      >
        Выйти
      </OurLink>
      <img
        src={`https://gravatar.com/avatar/${emailHash}?d=robohash&s=150`}
        alt=""
        width={100}
        height={100}
        className="border border-main my-3"
      />
      <OurLink href="https://gravatar.com/profile" target="_blank">
        Изменить аватарку
      </OurLink>
    </PageLayout>
  ) : (
    <Navigate replace to="/login" />
  );
};

export default Account;
