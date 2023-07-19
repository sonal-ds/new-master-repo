import * as React from "react";
import { ComplexImage, SiteData, TemplateMeta } from "../../types";
import { Image, Link } from "@yext/pages/components";
import "../../assets/css/footer.css";

interface FooterProps {
  _site: SiteData;
  meta: TemplateMeta;
  template?: string;
  devLink?: string;
  locale?: string;
  description?: string;
}

const currentTime = new Date();
const year = currentTime.getFullYear();

const Footer = (props: FooterProps) => {
  const { meta } = props;
  return (
    <>
      <footer className="site-footer" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className={`sr-only ${meta.mode}`}>
          Footer
        </h2>
        <div className="container">
          <div className="row">
            <div className="footer-block">
              <div className="f-logo">
                <a href="/">
                  <Image
                    image={props?._site?.c_logo?.image}
                    layout="aspect"
                    aspectRatio={
                      props?._site?.c_logo?.image?.width /
                      props?._site?.c_logo?.image?.height
                    }
                  />
                </a>
              </div>
              <div className="social-links">
                {props?._site?.c_footerIcons?.map(
                  (icons: ComplexImage, index: number) => {
                    return (
                      <a
                        key={index}
                        href={icons?.clickthroughUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Image
                          image={icons?.image}
                          layout="fixed"
                          height={icons?.image.height}
                          width={icons?.image.width}
                        />
                      </a>
                    );
                  }
                )}
              </div>
            </div>
            <div className="footer-block">
              <h3 className="footer-heading">{props?._site?.c_helpTitle}</h3>
              <ul role="list" className="footer-links">
                {props?._site?.c_helpLinks.map(
                  (e: { link?: URL; label: string }, index: number) => {
                    return (
                      <li key={index}>
                        {e?.link && e?.label && (
                          <Link
                            href={e?.link?.toString()}
                            data-ya-track={`Footerlinks` + "-" + e.label}
                            eventName={`Footerlinks` + "-" + e.label}
                          >
                            {e.label}
                          </Link>
                        )}
                      </li>
                    );
                  }
                )}
              </ul>
            </div>
            <div className="footer-block">
              <h3 className="footer-heading">
                {props?._site?.c_servicesTitle}
              </h3>
              <ul role="list" className="footer-links">
                {props?._site?.c_servicesList?.map(
                  (e: string, index: number) => {
                    return (
                      <li key={index}>
                        <span className="pr-3">-</span>
                        {e}
                      </li>
                    );
                  }
                )}
              </ul>
            </div>

            <div className="footer-block">
              <h3 className="footer-heading">
                {props?._site?.c_storeLocatorTitle}
              </h3>
              <ul role="list" className="footer-links">
                <li className="location-address ">
                  <Link
                    className=""
                    href={props?._site?.c_storeLocatorCTA?.link}
                    data-ya-track={
                      `FooterStoreLocator` +
                      "-" +
                      props?._site?.c_storeLocatorCTA.label
                    }
                    eventName={
                      `FooterStoreLocator` +
                      "-" +
                      props?._site?.c_storeLocatorCTA.label
                    }
                  >
                    {props?._site?.c_storeLocatorCTA?.label}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <p>&copy; {year} Your Company, Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
