import React from "react";
import OurLink from "components/Link";
import { BreadcrumbsProps } from "types";

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  if (!items) return "";

  return (
    <div className="flex justify-center pb-3 md:pb-6">
      <div className="container">
        <div className="flex gap-x-1 gap-y-1 items-center flex-wrap">
          <OurLink href="/" extraClass="no-underline hover:!underline">
            Главная
          </OurLink>

          {items.map((item, i) => {
            return (
              <div
                key={i}
                className="flex gap-x-1 gap-y-1 items-center flex-wrap"
              >
                <div className="w-4 h-4 bg-center bg-no-repeat bg-contain bg-breadcrumbsSeparator"></div>
                {item.link ? (
                  <OurLink
                    href={item.link}
                    extraClass="no-underline hover:!underline"
                  >
                    {item.name}
                  </OurLink>
                ) : (
                  <span className="text-beige-600">{item.name}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Breadcrumbs;
