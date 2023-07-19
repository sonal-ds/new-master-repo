import * as React from "react";
import { Image, Link } from "@yext/pages/components";
import { HeaderNavigation, SiteData, TemplateMeta } from "../../types";
import "../../assets/css/base.css";
import "../../assets/css/header.css";

// const navigation = [
//   { name: "Home", href: "/" },
//   { name: "About", href: "#" },
// ];

interface HeaderProps {
  _site: SiteData;
  meta: TemplateMeta;
  template?: string;
  devLink?: string;
  locale?: string;
}

const Header = (props: HeaderProps) => {
  const { meta } = props;
  console.log(
    "first",
    props?._site?.c_logo.image?.height,
    props?._site?.c_logo.image?.width
  );
  return (
    <header className={`site-header ${meta.mode}`}>
      <div className="container">
        <div className="row">
          <div className="logo">
            <a href="#">
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
          <div className="header-menu">
            <ul className="text-lg font-semibold">
              {props?._site?.c_navigationBar?.map(
                (e: HeaderNavigation, i: number) => {
                  return (
                    <li key={i}>
                      {e?.link && e?.label && (
                        <Link href={e.link} className="">
                          {e.label}
                        </Link>
                      )}
                    </li>
                  );
                }
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
