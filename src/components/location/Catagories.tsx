import * as React from "react";
import { LocationDocument, elementProps } from "../../types";
import { Link } from "@yext/pages/components";

type CatagoriesSectionProps = {
  document: LocationDocument;
};

const Catagories = ({ document }: CatagoriesSectionProps) => {
  const photos = document?.c_categoryNameAndImage?.map(
    (element: elementProps, index: number) => (
      <div className="relative border-2 border-white" key={index}>
        {element?.categoryURL ? (
          <Link
            href={element?.categoryURL}
            data-ya-track={`Categories` + "-" + element?.categoryName}
            eventName={`Categories` + "-" + element?.categoryName}
            target="_blank"
            rel="noopener noreferrer"
          >
            {element?.image?.image?.url && (
              <img
                className="md:max-h-[25.188rem] h-full w-full"
                src={element?.image?.image?.url}
                alt={
                  element?.image?.image?.alternateText
                    ? element?.image?.image?.alternateText
                    : ""
                }
              />
            )}
            {element?.categoryName && (
              <span className="absolute bottom-0 left-0 right-0 text-center text-[18px] pb-4">
                <span className="hover:underline font-medium">
                  {element?.categoryName}
                </span>
              </span>
            )}
          </Link>
        ) : (
          <div className="w-full inline-block align-top pt-[100%] overflow-hidden">
            {element?.image?.image?.url && (
              <img
                className="h-full w-full absolute top-0 left-0 object-cover"
                src={element?.image?.image?.url}
                alt={
                  element?.image?.image?.alternateText
                    ? element?.image?.image?.alternateText
                    : ""
                }
              />
            )}
            {element?.categoryName && (
              <h4 className="absolute bottom-0 left-0 right-0 text-center text-lg md:text-xl p-4 bg-orange bg-opacity-50 text-white">
                {" "}
                {element?.categoryName}
              </h4>
            )}
          </div>
        )}
      </div>
    )
  );
  return (
    <div className="Categories py-8 md:py-12">
      <div className="container">
        <h2 className="sec-title text-center">
          {/* {document.c_categories_heading} */}
        </h2>
      </div>
      <div className="mt-[30px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 px-px">
        {photos}
      </div>
    </div>
  );
};

export default Catagories;
