import { Address, Link } from "@yext/pages/components";
import * as React from "react";
import { SiteData, TemplateMeta } from "../../types";
import { NearByLocationResult } from "../../types/Locator";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import {
  entityTypes,
  getDirectionUrl,
  getLink,
  // getRecursiveData,
  savedFilterIds,
} from "../../config/GlobalFunctions";
import { Coordinate } from "../google-map/SearchProvider";
import { fetch } from "@yext/pages/util";
import Phone from "../common/Phone";
import OpenCloseStatus from "../common/OpenCloseStatus";

type NearbyAPIConfig = {
  endpoint: "https://liveapi-sandbox.yext.com/v2/accounts/me/entities/geosearch";
  // | "https://liveapi.yext.com/v2/accounts/me/entities/geosearch";
  params: {
    api_key: string;
    entityTypes?: string;
    limit?: string;
    radius?: string;
    savedFilterIds?: string;
    v: string;
  };
};

const getConfig = (api_key: string): NearbyAPIConfig => {
  return {
    endpoint: YEXT_PUBLIC_GEO_SEARCH_END_POINT,
    params: {
      api_key,
      radius: "2500",
      entityTypes: entityTypes,
      savedFilterIds: savedFilterIds,
      limit: "4",
      v: "20220927",
    },
  };
};

type NearbyProps = {
  coordinate: Coordinate;
  id: string;
  meta: TemplateMeta;
  apiKey: string;
  _site: SiteData;
  setNearByLocations: (value: []) => void;
};

const NearByLocation = ({
  meta,
  coordinate,
  id,
  apiKey,
  _site,
  setNearByLocations,

}: NearbyProps) => {
  const [locations, setLocations] = React.useState<NearByLocationResult[]>([]);
  React.useEffect(() => {
    if (!coordinate || !apiKey) {
      return;
    }

    const config = getConfig(apiKey);
    const searchParams = new URLSearchParams({
      ...config.params,
      location: `${coordinate.latitude},${coordinate.longitude}`,
      filter: JSON.stringify({ "meta.id": { "!$eq": `${id}` } }),
    });

    fetch(`${config.endpoint}?${searchParams.toString()}`)
      .then((resp) => resp.json())
      .then((data) => {

        setLocations(data.response.entities || []);
        setNearByLocations(data.response.entities || []);
      })
      .catch((error) => console.error(error));
  }, [coordinate, id, apiKey]);
  return (
    <div className="nearby-locations pb-4 md:pb-8">
      <div className="container">
        <h2 className="sec-title text-center">Nearby Locations</h2>
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1280: {
              slidesPerView: 3,
            },
          }}
        >
          {locations.map((location) => {
          const url = getLink<NearByLocationResult>(location, meta, false, 0, true,true);
            return (
              <SwiperSlide className="h-auto" key={location.id}>
                <div className="location-card border-b-0 bg-gray-100 pt-5 hover:bg-gray-200 h-full flex flex-col">
                  <div className="icon-row">
                    <div className="icon addressIcon"></div>
                    <Link className="location-name" href={`${url}`}>
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
                      data-ya-track="getdirections"
                      eventName={`getdirections`}
                      target="_blank"
                      className="direction button before-icon"
                      href={getDirectionUrl(
                        location.address,
                        location.googlePlaceId
                      )}
                      rel="noopener noreferrer"
                    >
                      Get Direction
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="text-center py-5">
          <Link href="/" className="button link">
            View More Locations
          </Link>
        </div>
      </div>
    </div>
  );
};
export default NearByLocation;
