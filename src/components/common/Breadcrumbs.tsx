import * as React from "react";
import { ReactNode } from "react";

export interface BreadcrumbItemProps {
  name: string;
  url: string;
}

export interface BreadcrumbItem {
  name: string;
  slug: string;
}
export interface BreadcrumbsProps {
  breadcrumbs?: BreadcrumbItem[];
  separator?: ReactNode;
  baseUrl: string;
}

const BreadcrumbItem = (props: BreadcrumbItemProps) => {
  const { name, url } = props;
  if (url) {
    return (
      <a href={url}>
        <span className="font-bold hover:underline hover:cursor-pointer">
          {name}
        </span>
      </a>
    );
  }
  return <span className="Breadcrumbs-label">{name}</span>;
};
const Breadcrumbs = (props: BreadcrumbsProps) => {
  const { breadcrumbs, separator = ">", baseUrl } = props;
  return (
    <div className="breadcrumb-wrapper">
      <div className="container">
        {breadcrumbs?.length && (
          <div className="breadcrumbs">
            <ol className="flex">
              <li className="breadcrumb-item flex">
                <BreadcrumbItem
                  name={"Store Locator"}
                  url={baseUrl}
                  {...props}
                />
                {breadcrumbs.length > 0 && (
                  <span className="breadcrumb-separator">{separator}</span>
                )}
              </li>
              {breadcrumbs.map(({ name, slug }, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return (
                  <li className="breadcrumb-item flex" key={index}>
                    <BreadcrumbItem
                      name={name}
                      url={isLast ? "" : baseUrl + slug}
                      {...props}
                    />

                    {!isLast && (
                      <span className="breadcrumb-separator">{separator}</span>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};
export default Breadcrumbs;
