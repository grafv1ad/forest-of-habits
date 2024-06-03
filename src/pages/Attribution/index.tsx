import OurLink from "components/Link";
import PageLayout from "components/PageLayout";
import Paragraph from "components/Paragraph";
import Title from "components/Title";

const Attribution = () => {
  const attributionList = [
    {
      name: "Vintage trees and forest silhouettes set",
      author: "dgim-studio on Freepik",
      link: "https://www.freepik.com/free-vector/vintage-trees-forest-silhouettes-set_7997410.htm",
      authorLink: "https://www.freepik.com/author/dgim-studio",
    },
    {
      name: "Christmas trees sketches collection",
      author: "Freepik",
      link: "https://www.freepik.com/free-vector/christmas-trees-sketches-collection_749737.htm",
      authorLink: "https://www.freepik.com/author/freepik",
    },
  ];

  return (
    <PageLayout breadcrumbs={[{ name: "Attribution" }]}>
      <Title level="1" color="light">
        Attribution
      </Title>
      <Paragraph color="light" align="center">
        {attributionList.map((attribution) => (
          <div className="mb-2">
            <OurLink
              href={attribution.link}
              target="_blank"
              rel="nofollow norefferer noopener"
            >
              {attribution.name}
            </OurLink>{" "}
            designed by{" "}
            <OurLink
              href={attribution.authorLink}
              target="_blank"
              rel="nofollow norefferer noopener"
            >
              {attribution.author}
            </OurLink>
          </div>
        ))}
      </Paragraph>
    </PageLayout>
  );
};

export default Attribution;
