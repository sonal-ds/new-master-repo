import React, { useContext } from "react";
import LocationList from "./LocationList";
import ViewMore from "./ViewMore";
import Facets from "./Facets";
import AutoSuggestions from "../google-map/components/AutoSuggestions";
import { SearchContext } from "../google-map/SearchProvider";
import NoRecordFound from "./NoRecordFound";
import { SiteData, TemplateMeta } from "../../types";
import ResultCount from "./ResultCount";

interface ListLayoutProps {
  meta: TemplateMeta;
  message?: string;
  locale: string;
  showNoRecordMessage?: boolean;
  _site:SiteData;
}

function ListLayout({
  _site,
  meta,
  locale,
  message = "",
  showNoRecordMessage = false,
}: ListLayoutProps) {
  const { isFilterEnable, noRecordFound, showResultCount } =
    useContext(SearchContext);
  const [activeFacet, setActiveFacet] = React.useState<number | null>(null);
  return (
    <div className="listing-block">
      <AutoSuggestions locale={locale} />
      {isFilterEnable && (
        <Facets
          activeFacet={activeFacet}
          setActiveFacet={setActiveFacet}
          searchOnChange={true}
        />
      )}
      {showNoRecordMessage && noRecordFound && (
        <NoRecordFound message={message} />
      )}
      {showResultCount && <ResultCount />}
      <LocationList meta={meta} _site={_site}/>
      <ViewMore />
    </div>
  );
}

export default ListLayout;
