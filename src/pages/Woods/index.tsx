import OurLink from "components/Link";
import PageLayout from "components/PageLayout";
import WoodsList from "components/WoodsList";

const Woods = () => {
  return (
    <PageLayout>
      <div className="mb-12 flex justify-end">
        <OurLink href="/">+ Добавить новый лес</OurLink>
      </div>
      <WoodsList />
    </PageLayout>
  );
};

export default Woods;
