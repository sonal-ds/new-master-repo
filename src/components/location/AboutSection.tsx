import * as React from "react";
import { LocationDocument } from "../../types";
import RtfConverter from "@yext/rtf-converter";
import { Link } from "@yext/pages/components";

type AboutSectionProps = {
  document: LocationDocument;
};

const AboutSection = ({ document }: AboutSectionProps) => {
  let Desc;
  if (
    document?.c_about_section_description &&
    document?.c_about_section_description
  ) {
    Desc = RtfConverter.toHTML(document?.c_about_section_description);
  }
  return (
    <>
      {document?.c_about_section_name && (
        <div className="about-sec">
          <div className="container">
            <h2 className="sec-title block lg:hidden text-center">
              {document?.c_about_section_name}
            </h2>
            <div className="row">
              {document?.c_about_section_image && (
                <div className="w-full lg:w-1/2 px-4 only:w-full">
                  <img
                    className="max-w-full w-full h-full object-cover"
                    alt={
                      document?.c_about_section_image?.alternateText
                        ? document?.c_about_section_image?.alternateText
                        : "About section"
                    }
                    src={document?.c_about_section_image?.image.url}
                  ></img>
                </div>
              )}
              <div className="about-sec-content w-full lg:w-1/2 px-4 mt-6 lg:mt-0 only:w-full only:mt-0">
                <h2 className="sec-title hidden lg:block">
                  {document?.c_about_section_name}
                </h2>
                <div
                  className=""
                  dangerouslySetInnerHTML={{ __html: Desc ? Desc : "" }}
                ></div>
                {document?.c_about_section_CTA?.link &&
                  document?.c_about_section_CTA?.label && (
                    <div className="mt-6">
                      <Link
                        href={document?.c_about_section_CTA?.link}
                        className="button link"
                      >
                        {document?.c_about_section_CTA.label}
                      </Link>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AboutSection;
