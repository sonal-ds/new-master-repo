import * as React from "react";
import { SearchContext } from "../google-map/SearchProvider";
import LocationCard, { LocationCardLoader } from "./LocationCard";
import { SiteData, TemplateMeta } from "../../types";
import { LocationResult } from "../../types/Locator";
type LocationListProps = {
  meta: TemplateMeta;
  _site:SiteData
};
const LocationList = ({ meta,_site }: LocationListProps) => {
  const {
    locations,
    isLoading,
    viewportLocations,
    isUpdateListAccordingMarkers,
    showViewportLocations,
  } = React.useContext(SearchContext);
  const [pageLoading, setPageLoading] = React.useState(true);
  const [activeClass, setActiveClass] = React.useState<string | null>(null);
  React.useEffect(() => {
    if (!isLoading) {
      setPageLoading(false);
    }
  }, [isLoading]);
  return (
    <div className="listing">
      {showViewportLocations && isUpdateListAccordingMarkers
        ? viewportLocations.map((location: LocationResult) => (
            <LocationCard
            _site={_site}
              key={location.id}
              location={location}
              meta={meta}
              setActiveClass={setActiveClass}
             activeClass={activeClass || ""}
            />
          ))
        : locations.map((location: LocationResult) => (
            <LocationCard
            _site={_site}
              key={location.id}
              location={location}
              meta={meta}
              setActiveClass={setActiveClass}
              activeClass={activeClass || ""}
            />
          ))}

      {pageLoading && (
        <>
          <LocationCardLoader />
          <LocationCardLoader />
          <LocationCardLoader />
          <LocationCardLoader />
          <LocationCardLoader />
        </>
      )}
    </div>
  );
};

export default LocationList;
