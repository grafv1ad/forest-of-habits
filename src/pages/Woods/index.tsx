import Link from "components/Link";
import PageLayout from "components/PageLayout";
import WoodsList from "components/WoodsList";

const Woods = () => {
  return (
    <PageLayout>
      <div className="mb-12 flex justify-end">
        <Link href="/">+ Добавить новый лес</Link>
      </div>
      <WoodsList />
    </PageLayout>
  );
};

export default Woods;
