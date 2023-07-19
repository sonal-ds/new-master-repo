import * as React from "react";
import { SearchContext } from "./SearchProvider";
import GoogleMap from "./components/GoogleMaps";
import { MapboxMap } from "./components/MapboxMap";
import Infowindow from "../locator/Infowindow";
import { SiteData, TemplateMeta } from "../../types";


export type Libraries = (
  | "drawing"
  | "geometry"
  | "localContext"
  | "marker"
  | "places"
  | "visualization"
)[];

type MapWrapperProps = {
  _site: SiteData;
  meta:TemplateMeta;
};

const MapWrapper = ({ _site, meta }: MapWrapperProps) => {
  const { mapType, mapboxAccessToken } = React.useContext(SearchContext);
  return mapType === "google" ? (
    <GoogleMap InfowindowComponent={Infowindow} _site={_site} meta={meta} />
  ) : (
    <MapboxMap
      mapboxAccessToken={mapboxAccessToken}
      InfowindowComponent={Infowindow}
      _site={_site}
      meta={meta}
    />
  );
};

export default MapWrapper;
