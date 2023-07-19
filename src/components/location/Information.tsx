import * as React from "react";
import { Address, Link } from "@yext/pages/components";
import { LocationDocument, SiteData } from "../../types";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Hours } from "../common/Hours/Hours";
import HolidayHour from "./HolidayHour";
import OpenCloseStatus from "../common/OpenCloseStatus";
import { getDirectionUrl, getMarkerPin, silverMapStyle } from "../../config/GlobalFunctions";
import Phone from "../common/Phone";
import { getUserIcon } from "../../config/GlobalFunctions";

type InformationProps = {
  document: LocationDocument;
  _site: SiteData;
  nearByLocations: any;
};

const Information = ({ document, _site,  nearByLocations, }: InformationProps) => {
  const getPosition = (location: LocationDocument) => {
    const lat = location.yextDisplayCoordinate.latitude;
    const lng = location.yextDisplayCoordinate.longitude;
    return { lat, lng };
  };
  const coordinates = getPosition(document);
  return (
    <div className="location-information">
      <div className="container">
        <div className="address-main-sec">
          {/* <h2 className="text-lg font-bold mb-2.5">{document.c_storeInformationTitle}</h2> */}
          <div className="icon-row">
            <div className="icon addressIcon"></div>
            <h4 className="location-name">{document?.name}</h4>
            <Address address={document.address} />
          </div>
          <Phone phone = {document.mainPhone}/>
          {document.hours && (
            <div className="icon-row">
              <div className="icon clockIcon"></div>
              <OpenCloseStatus
                hours={document.hours}
                site={_site}
                timezone={document.timezone}
              />
            </div>
          )}
          <div className="button-bx-detail">
            <Link
              className="button link"
              target="_blank"
              rel="noopener noreferrer"
              href={getDirectionUrl(document.address, document.googlePlaceId)}
            >
              Get Direction
            </Link>
          </div>
        </div>
        <div className="hours-sec">
          {/* <h2 className="text-lg font-bold mb-2.5">{document.c_store_hours_heading}</h2> */}
          {document.hours && (
            <div className="box timing">
              <div className="inner-box">
                {document.hours.holidayHours && (
                  <div className="holiday-hours">
                    <HolidayHour
                      hours={document.hours.holidayHours}
                      site={_site}
                      specificDay={undefined}
                    />
                  </div>
                )}
                <div className="daylist">
                  <Hours
                    hours={document.hours}
                    showHeader={true}
                    startOfWeek="today"
                    message={document.additionalHoursText}
                    locale={_site.meta.locale}
                    timeZone={document.timezone}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="map-sec">
          <LoadScript googleMapsApiKey={YEXT_PUBLIC_GOOGLE_API_KEY}>
            <GoogleMap center={coordinates} zoom={12}
            options={{styles:silverMapStyle,
              mapTypeControl: false}}>
              <Marker position={coordinates} clickable={false} icon={getUserIcon()} />
              {nearByLocations.map((location: any) => {
                return (
                  <Marker
                    key={location.id}
                    position={getPosition(location)}
                    clickable={false}
                    icon={getMarkerPin(location)}
                  />
                );
              })}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </div>
  );
};
export default Information;
