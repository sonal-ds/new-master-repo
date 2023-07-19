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
import {  StateDocument, TemplateMeta } from "../types";
import PageLayout from "../components/layout/PageLayout";
import "../index.css";
import { DirectoryChild } from "../types/DirectoryChild";
import Breadcrumbs, { BreadcrumbItem } from "../components/common/Breadcrumbs";
import { getBreadcrumb, getLink, getMetaTags, getOgTags, getRecursiveData, getTwitterTags } from "../config/GlobalFunctions";
import { DirectoryParent } from "../types/DirectoryParent";

export const config: TemplateConfig = {
  stream: {
    $id: "root",
    filter: {
      entityTypes: ["ce_root"],
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

      /* DM children */
      "dm_directoryChildren.dm_directoryParents.name",
      "dm_directoryChildren.dm_directoryParents.slug",
      "dm_directoryChildren.name",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.meta.entityType",
    ],
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

// export const getPath: GetPath<TemplateProps> = ({ document }) => {
//   if (
//     document.dm_directoryParents &&
//     document.dm_directoryParents != "undefined"
//   ) {
//     const parent: string[] = [];
//     document.dm_directoryParents?.map(
//       (i: { meta: EntityMeta; slug: string; name: string }) => {
//         parent.push(i.slug);
//       }
//     );
//     return `${parent.join("/")}/${document.slug.toString()}.html`;
//   } else {
//     return `${document.slug.toString()}.html`;
//   }
// };

export const getPath: GetPath<TemplateProps> = ({ document, __meta }) => {
  if (__meta.mode === "development") {
    return document.slug;
  } else {
    return getLink(document, __meta, true, 0, true);
  }
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
  path
}): HeadConfig => {
  const metaTags = getMetaTags(
    document.name,
    document._site?.c_metaDescription,
    document._site?.c_robotsTag,
    `${YEXT_PUBLIC_BASEURL}/${path}`,
    favicon
  );
  const ogTags = getOgTags(
    document.name,
    document._site?.c_metaDescription,
    `${YEXT_PUBLIC_BASEURL}/${path}`,
    ogimage
    
  );

  const twitterTags = getTwitterTags(
    document.name,
    document._site?.c_metaDescription,
    ogimage
  );
  const metaTitle = `Glamour Emporium | ${document.name}`;
  return {
    title: metaTitle,
    charset: "UTF-8",
    viewport:
      "width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1, user-scalable=0",
    tags:  [...metaTags, ...ogTags, ...twitterTags]
  };
};

type TransformData = TemplateRenderProps & {
  breadcrumbs: BreadcrumbItem[];
};

export const transformProps: TransformProps<TransformData> = async (data) => {
  const document = data.document as StateDocument;
  const breadcrumbs = getBreadcrumb<DirectoryParent, StateDocument>(
    [],
    document,
    data.__meta
  );
  return { ...data, breadcrumbs };
};

interface StateTemplateProps extends TransformData {
  __meta: TemplateMeta;
  document: StateDocument;
}

const Continent: Template<StateTemplateProps> = ({
  document,
  __meta,
  breadcrumbs,
}: StateTemplateProps) => {
  const { meta, _site, slug, dm_directoryChildren} = document;

  return (
    <div id="main">
      <PageLayout
        _site={_site}
        meta={__meta}
        template="Root"
        locale={meta.locale}
        devLink={slug}
      >
        <Breadcrumbs
          baseUrl=""
          breadcrumbs={breadcrumbs}

        />
        <h1 className="page-title text-center">{document.name}</h1>
        <div className="directory-children py-12">
          <div className="container">
            <div className="row">
              {dm_directoryChildren &&
                dm_directoryChildren.map((region: DirectoryChild) => {
                  const url = getRecursiveData(region, __meta);
                  return (
                    <div className="px-4 w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mb-2.5" key={region.slug}>
                      <a className="button w-full bg-opacity-0 text-black hover:bg-orange hover:bg-opacity-100 hover:text-white" href={`${url}`}>
                        {region.name}
                      </a>
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
export default Continent;
