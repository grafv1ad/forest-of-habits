import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Achievements from "components/Achievements";
import Button from "components/Button";
import Loader from "components/Loader";
import PageLayout from "components/PageLayout";
import Title from "components/Title";
import { useAuth } from "hooks/useAuth";
import { ReactComponent as PencilSVG } from "images/pencil.svg";
import { removeUser } from "store/slices/user";
import { IAccountStatistics } from "types";
import { axiosInstance } from "utils/api";
import { removeCookie } from "utils/cookies";

const Account = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoaded, isAuth, username, emailHash } = useAuth();
  const [accountStatistics, setAccountStatistics] =
    useState<IAccountStatistics | null>(null);

  const getAccountStatistics = async () => {
    try {
      const { data } = await axiosInstance.get("/stat");
      setAccountStatistics(data);
    } catch (error: any) {
      console.error(error?.response);
      if (error?.response?.status === 401) {
        navigate("/login");
      } else {
        toast("Что-то пошло не так");
      }
    }
  };

  useEffect(() => {
    if (!accountStatistics) {
      getAccountStatistics();
    }
  }, [accountStatistics]);

  if (!isLoaded || !accountStatistics) {
    return <Loader />;
  }

  console.debug(accountStatistics);

  return isAuth ? (
    <PageLayout breadcrumbs={[{ name: "Личный кабинет" }]}>
      <Title level="1" color="light">
        Личный кабинет
      </Title>

      <div className="flex justify-center">
        <div className="flex justify-start items-center gap-3 border-2 border-main rounded-xl p-4 w-full md:w-auto md:min-w-80">
          <div className="relative">
            <img
              src={`https://gravatar.com/avatar/${emailHash}?d=robohash&s=150`}
              alt=""
              width={100}
              height={100}
              className="rounded-xl bg-beige-600"
            />
            <a
              href="https://gravatar.com/profile"
              target="_blank"
              className="svg-wrapper absolute right-2 top-2 w-5 h-5 p-1 bg-background rounded-full text-beige-600"
            >
              <PencilSVG />
            </a>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="font-semibold text-lg">{username}</div>
            <div className="flex flex-col">
              <div>Леса: {accountStatistics.allForests}</div>
              <div>Деревья: {accountStatistics.allTrees}</div>
            </div>
          </div>
        </div>
      </div>

      <Achievements statistics={accountStatistics} />

      <div className="flex justify-center mt-16">
        <Button
          style="danger"
          onClick={() => {
            dispatch(removeUser());
            removeCookie("token");
          }}
        >
          Выйти из аккаунта
        </Button>
      </div>
    </PageLayout>
  ) : (
    <Navigate replace to="/login" />
  );
};

export default Account;
