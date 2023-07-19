import * as React from "react";
import { Address, Link } from "@yext/pages/components";
import { LocationResult, RawData } from "../../types/Locator";
import { SiteData, TemplateMeta } from "../../types";
import Phone from "../common/Phone";
import OpenCloseStatus from "../common/OpenCloseStatus";
import { getDirectionUrl, getLink } from "../../config/GlobalFunctions";

export type InfowindowProps = {
  location: LocationResult;
  _site: SiteData;
  meta: TemplateMeta;
};

const Infowindow = ({ location, _site, meta }: InfowindowProps) => {
  const url = getLink<RawData>(location.rawData, meta, false, 0, true,true);
  return (
    <div className="infowindow-content">
      <div className="icon-row">
        <div className="icon addressIcon"></div>
        <Link className="location-name" href={`${url}`}>
          {location.rawData.name}
        </Link>
        <Address address={location.rawData.address} />
      </div>
      <Phone phone={location.rawData.mainPhone} />
      {location.rawData.hours && (
        <div className="icon-row">
          <div className="icon clockIcon"></div>
          <OpenCloseStatus
            hours={location.rawData.hours}
            site={_site}
            timezone={location.rawData.timezone}
          />
        </div>
      )}

      <div className="button-bx-detail">
        <Link className="button link" href={`${url}`}>
          View Details
        </Link>
        <Link
          className="button link"
          target="_blank"
          rel="noopener noreferrer"
          href={getDirectionUrl(
            location.rawData.address,
            location.rawData.googlePlaceId
          )}
        >
          Get Direction
        </Link>
      </div>
    </div>
  );
};

export default Infowindow;
