import { Hours } from "@yext/search-headless-react";
import { DirectoryParent } from "./DirectoryParent";
import { AddressType, Coordinate } from "@yext/pages/components";
import { EntityMeta, SiteData } from ".";

export interface LocatorDocument {
  meta: EntityMeta;
  _site: SiteData;
  name: string;
  id: string;
  slug: string;
}

export interface FourOhFourDocument {
  meta: EntityMeta;
  _site: SiteData;
  name: string;
  id: string;
  slug: string;
}

export interface RawData {
  additionalHoursText: string | undefined;
  id: string;
  type: string;
  googlePlaceId: string;
  savedFilters: string[];
  slug: string;
  address: AddressType;
  addressHidden: boolean;
  hours: Hours;
  name: string;
  closed: boolean;
  dm_directoryParents: DirectoryParent[];
  mainPhone: string;
  timezone: string;
  yextDisplayCoordinate: Coordinate;
  uid: string;
}

export interface LocationResult {
  additionalHoursText: string;
  hours: Hours;
  rawData: RawData;
  source: string;
  index: number;
  name: string;
  id: string;
  distance: number;
  entityType: string;
}
type highlightedFields = {
  name:string;
};

export interface NearByLocationResult {
  highlightedFields: highlightedFields;
  id: string;
  type: string;
  googlePlaceId: string;
  savedFilters: string[];
  slug: string;
  address: AddressType;
  addressHidden: boolean;
  hours: Hours;
  name: string;
  closed: boolean;
  dm_directoryParents: DirectoryParent[];
  mainPhone: string;
  timezone: string;
  yextDisplayCoordinate: Coordinate;
  uid: string;
}

export interface VerticalKeyToResults {
  [key: string]: NearByLocationResult[];
}
