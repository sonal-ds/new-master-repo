import * as React from "react";
import {
  Template,
  GetPath,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
  TransformProps,
} from "@yext/pages";
import favicon from "../assets/images/favicondemy.png";
import ogimage from "../assets/images/ogimage.jpeg";
import {
  CityDocument,
  EntityMeta,
  LocationDocument,
  TemplateMeta,
} from "../types";
import PageLayout from "../components/layout/PageLayout";
import "../index.css";
import { Address, Link } from "@yext/pages/components";
import Phone from "../components/common/Phone";
import OpenCloseStatus from "../components/common/OpenCloseStatus";
import Breadcrumbs, { BreadcrumbItem } from "../components/common/Breadcrumbs";
import { DirectoryParent } from "../types/DirectoryParent";
import {
  getBreadcrumb,
  getDirectionUrl,
  getLink,
  getMetaTags,
  getOgTags,
  getTwitterTags,
} from "../config/GlobalFunctions";

export const config: TemplateConfig = {
  stream: {
    $id: "city",
    filter: {
      entityTypes: ["ce_city"],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "slug",

      
 

      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta.entityType",
      "dm_directoryParents.dm_directoryParents.name",
      "dm_directoryParents.dm_directoryParents.slug",
      "dm_directoryParents.dm_directoryParents.meta.entityType",

      /* DM children */
      "dm_directoryChildren.name",
      "dm_directoryChildren.meta.entityType",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.hours",
      "dm_directoryChildren.address",
      "dm_directoryChildren.mainPhone",
      "dm_directoryChildren.id",
      "dm_directoryChildren.yextDisplayCoordinate",
    ],
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document, __meta }) => {
  if (__meta.mode === "development") {
    return document.slug;
  } else {
    return getLink(document, __meta, true, 0, true);
  }
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
  path,
}): HeadConfig => {
  const metaTags = getMetaTags(
    document?.c_metaTitle ?document?.c_metaTitle:"" ,
    document?.c_metaDescription ? document?.c_metaDescription : "",
    document?.c_robotsTag ? document?.c_robotsTag : "",
    `${YEXT_PUBLIC_BASEURL}/${path}`,
    favicon
  );
  const ogTags = getOgTags(
    document?.c_metaTitle ?document?.c_metaTitle:"" ,
    document?.c_metaDescription ? document?.c_metaDescription : "",
    `${YEXT_PUBLIC_BASEURL}/${path}`,
    ogimage
  );

  const twitterTags = getTwitterTags(
    document?.c_metaTitle ?document?.c_metaTitle:"" ,
    document?.c_metaDescription ? document?.c_metaDescription : "",
    ogimage
  );
  return {
    title: `${document?.c_metaTitle ?document?.c_metaTitle:"" }`,
    charset: "UTF-8",
    viewport:
      "width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1, user-scalable=0",
    tags: [...metaTags, ...ogTags, ...twitterTags],
  };
};

type TransformData = TemplateRenderProps & {
  breadcrumbs: BreadcrumbItem[];
};

export const transformProps: TransformProps<TransformData> = async (data) => {
  const document = data.document as CityDocument;
  const directoryParents = document.dm_directoryParents || [];
  const breadcrumbs = getBreadcrumb<DirectoryParent, CityDocument>(
    directoryParents,
    document,
    data.__meta
  );
  return { ...data, breadcrumbs };
};

interface CityTemplateProps extends TransformData {
  __meta: TemplateMeta;
  document: CityDocument;
}

const City: Template<CityTemplateProps> = ({
  document,
  __meta,
  breadcrumbs,
}: CityTemplateProps) => {
  const { meta, _site, slug, dm_directoryChildren } = document;
  return (
    <div id="main">
      <PageLayout
        _site={_site}
        meta={__meta}
        template="city"
        locale={meta.locale}
        devLink={slug}
      >
        <Breadcrumbs baseUrl="" breadcrumbs={breadcrumbs} />
        <h1 className="page-title text-center">
          Available Store in - {document.name}
        </h1>
        <div className="city-locations py-12">
          <div className="container">
            <div className="row">
              {dm_directoryChildren &&
                dm_directoryChildren.map((location: LocationDocument) => {
                  const url = getLink<LocationDocument>(
                    location,
                    __meta,
                    false,
                    0,
                    true,
                    true
                  );
                  return (
                    <div
                      className="city-location w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-2.5 mb-5"
                      key={location.id}
                    >
                      <div className="location-card border-b-0 bg-gray-100 pt-5 hover:bg-gray-200 h-full flex flex-col">
                        <div className="icon-row">
                          <div className="icon addressIcon"></div>
                          <Link className="location-name mr-0" href={`${url}`}>
                            {location.name}
                          </Link>
                          <Address address={location.address} />
                        </div>
                        <Phone phone={location.mainPhone} />
                        {location.hours && (
                          <div className="icon-row">
                            <div className="icon clockIcon"></div>
                            <OpenCloseStatus
                              hours={location.hours}
                              site={_site}
                              timezone={location.timezone}
                            />
                          </div>
                        )}

                        <div className="button-bx-detail mt-auto">
                          <Link className="button link" href={`${url}`}>
                            View Details
                          </Link>
                          <Link
                            className="button link"
                            target="_blank"
                            rel="noopener noreferrer"
                            href={getDirectionUrl(
                              location.address,
                              location.googlePlaceId
                            )}
                          >
                            Get Direction
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </PageLayout>
    </div>
  );
};
export default City;
