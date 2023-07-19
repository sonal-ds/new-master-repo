import * as React from "react";
import "../index.css";
import {
  Template,
  GetPath,
  GetHeadConfig,
  HeadConfig,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import PageLayout from "../components/layout/PageLayout";
import favicon from "../assets/images/favicondemy.png";
import { TemplateMeta } from "../types";
import { FourOhFourDocument } from "../types/Locator";

export const config: TemplateConfig = {
  name: "404",
};

export const getPath: GetPath<TemplateProps> = () => {
  return `404.html`;
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: "404 Page",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "link",
        attributes: {
          rel: "icon",
          type: "image/x-icon",
          href: favicon,
        },
      },
    ],
  };
};

interface FourOhFourProps extends TemplateRenderProps {
  __meta: TemplateMeta;
  document: FourOhFourDocument;
}

const FourOhFour: Template<FourOhFourProps> = ({
  __meta,
  document,
}: FourOhFourProps) => {
  return (
    <>
      <PageLayout _site={document._site} meta={__meta}>
        <div className="bg-orange bg-opacity-5 text-center py-36">
          <div className="container">
            <h1 className="sec-title">This page does not exist.</h1>
            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
            
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default FourOhFour;
