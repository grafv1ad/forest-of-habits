import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "components/Loader";
// import PageLayout from "components/PageLayout";
// import Title from "components/Title";
import { useAuth } from "hooks/useAuth";

const Index = () => {
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  useEffect(() => {
    if (isAuth) {
      navigate("/forests");
    } else {
      navigate("/login");
    }
  }, []);

  return <Loader />;

  // return (
  //   <PageLayout>
  //     <Title level="1" color="light">
  //       Главная страница
  //     </Title>

  //     <Loader />
  //     {/* Тут будет лендинг, а пока редиректы */}
  //   </PageLayout>
  // );
};

export default Index;
