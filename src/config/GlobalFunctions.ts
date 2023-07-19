import defaultMarker from "../assets/images/initialmarker.png";
import hoverMarker from "../assets/images/hovermarker.png";
import userMarker from "../assets/images/usermarkerdemo.png";
import cluster from "../assets/images/cluster-demo.png";
import { LocationResult } from "../types/Locator";
import { TemplateMeta } from "../types";
import { BreadcrumbItem } from "../components/common/Breadcrumbs";
import { AddressType } from "@yext/pages/components";
import { Coordinate } from "../components/google-map/SearchProvider";
import { Tag } from "@yext/pages/*";
type LinkParams = {
  link: string;
  mode?: string;
  template?: string;
  locale?: string;
  devLink?: string;
};
export function slugify(slugString: string) {
  slugString.toLowerCase().toString();
  slugString = slugString.replace(/[&/\\#^+()$~%.'":*?<>{}!@]/, "");
  slugString = slugString.replaceAll("  ", "-");
  slugString = slugString.replaceAll(" ", "-");
  slugString = slugString.replaceAll("---", "-");
  slugString = slugString.replaceAll("--", "-");
  slugString = slugString.replaceAll("'", "");
  return slugString.toLowerCase();
}
export const entityTypes = "location";
export const savedFilterIds = "1220875870";
// export const getLink = ({
//   link,
//   mode,
//   template,
//   locale,
//   devLink,
// }: LinkParams) => {
//   let url = link;

//   if (mode === "development" && template) {
//     url = `/${template}`;
//     devLink && (url += `/${devLink}`);
//     locale && (url += `?locale=${locale}`);
//   }
//   return url;
// };

// export const getRecursiveData = <DataType>(
//   element: DataType,
//   meta: TemplateMeta,
//   skip = 0
// ) => {
//   let slug = "";
//   if (meta.mode === "development") {
//     slug = element.slug;
//   } else {
//     if (element.dm_directoryParents) {
//       element.dm_directoryParents.forEach((e: DataType, index: number) => {
//         if (index >= skip) {
//           slug += `/${e.slug}`;
//         }
//       });
//     }
//     slug += `/${element.slug}` + ".html";
//   }
//   return slug;
// }; 
export const getLink = <Document>(document: Document, meta: TemplateMeta, isRecursive = true, skip = 0, useHtml = false, useBaseUrl = false) => {
  const isDevelopment = meta.mode === "development" || false;
  let url = useBaseUrl ? YEXT_PUBLIC_BASEURL : "";
   url += `${isDevelopment ? "" : "/"}${document.slug}`;
  if (!isDevelopment && isRecursive) {
    url = getRecursiveData(document, meta, skip, useHtml, useBaseUrl);
  }
  return `${url}`;
};

export const getRecursiveData = <DataType>(element: DataType, meta: TemplateMeta, skip = 0, useHtml = false, useBaseUrl = false) => {
let slug = useBaseUrl ? YEXT_PUBLIC_BASEURL : "";
const isDevelopment = meta.mode === "development" || false;
if (isDevelopment) {
  slug = element.slug;
} else {
  if (element.dm_directoryParents) {
    element.dm_directoryParents.forEach((e: DataType, index: number) => {
      if (index >= skip) {
        slug += `/${e.slug}`;
      }
    });
  }
  slug += `/${element.slug}`;
}
return slug;
};

export const getBreadcrumb = <DataType, Document>(
  data: DataType[],
  document: Document,
  meta: TemplateMeta,
  isRecursive = true,
  skip = 0,
  useHtml = false,
  basePrefix = "",
  baseName = ""
) => {
  const breadcrumbs: BreadcrumbItem[] = [];
  const isDevelopment = meta.mode === "development" || false;
  if (isRecursive) {
    data.forEach((element: DataType, index: number) => {
      if (index >= skip && index !== 0) {
        const slug = getRecursiveData<DataType>(element, meta, skip, useHtml, true);
        breadcrumbs.push({
          slug: slug,
          name: element.name,
        });
      } else if (index === 0 && basePrefix) {
        breadcrumbs.push({
          slug: basePrefix,
          name: baseName ? baseName : element.name,
        });
      } else if (index === 0) {
        const slug = getRecursiveData<DataType>(element, meta, skip, useHtml, true);
        breadcrumbs.push({
          slug: slug,
          name: baseName ? baseName : element.name,
        });
      }
    });

    breadcrumbs.push({
      slug: getRecursiveData(document, meta, skip, useHtml, true),
      name: document.name,
    });
  } else {
    let slug = YEXT_PUBLIC_BASEURL;
    data.forEach((element: DataType, index: number) => {
      if (element.slug && index >= skip) {
        slug += `/${element.slug}`;
        breadcrumbs.push({
          slug: slug,
          name: element.name,
        });
      } else if (index === 0) {
        breadcrumbs.push({
          slug: basePrefix,
          name: baseName ? baseName : element.name,
        });
      }
    });

    breadcrumbs.push({
      slug: slug + `/${document.slug}`,
      name: document.name,
    });
  }

  return breadcrumbs;
};

export const silverMapStyle = [
  {
    featureType: "administrative",
    elementType: "all",
    stylers: [
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "all",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#bdbdbd",
      },
    ],
  },
  {
    featureType: "poi",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#eeeeee",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#e5e5e5",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#dadada",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
  {
    featureType: "transit",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [
      {
        color: "#e5e5e5",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [
      {
        color: "#eeeeee",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#b3868e",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#000000",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#000",
      },
    ],
  },
];

// export const getBreadcrumb = <DataType, Document>(
//   data: DataType[],
//   document: Document,
//   meta: TemplateMeta,
//   isRecursive = true,
//   skip = 0,
//   basePrefix = "",
//   baseName = ""
// ) => {
//   const breadcrumbs: BreadcrumbItem[] = [];
//   if (isRecursive) {
//     if (data.length > 0) {
//       data.forEach((element: DataType, index: number) => {
//         if (index >= skip && index !== 0) {
//           const slug = getRecursiveData<DataType>(element, meta, skip);
//           breadcrumbs.push({
//             slug: slug,
//             name: element.name,
//           });
//         } else if (index === 0 && basePrefix) {
//           breadcrumbs.push({
//             slug: basePrefix,
//             name: baseName ? baseName : element.name,
//           });
//         } else if (index === 0) {
//           const slug = getRecursiveData<DataType>(element, meta, skip);
//           breadcrumbs.push({
//             slug: slug,
//             name: baseName ? baseName : element.name,
//           });
//         }
//       });
//     }

//     breadcrumbs.push({
//       slug: getRecursiveData(document, meta),
//       name: document.name,
//     });
//   } else {
//     let slug = "";
//     data.forEach((element: DataType, index: number) => {
//       if (element.slug && index >= skip) {
//         slug += `/${element.slug}`;
//         breadcrumbs.push({
//           slug: slug,
//           name: element.name,
//         });
//       } else if (index === 0) {
//         breadcrumbs.push({
//           slug: basePrefix,
//           name: baseName ? baseName : element.name,
//         });
//       }
//     });
//     breadcrumbs.push({
//       slug: slug + `/${document.slug}`,
//       name: document.name,
//     });
//   }

//   return breadcrumbs;
// };

export const getPosition = (result: LocationResult) => {
  const lat = result.rawData.yextDisplayCoordinate.latitude;
  const lng = result.rawData.yextDisplayCoordinate.longitude;
  return { lat, lng };
};

export const getDirectionUrl = (
  address: AddressType,
  googlePlaceId = "",
  userLocation: null | Coordinate = null
) => {
  let address_string = "";
  if (address.line1) {
    address_string += address.line1 + ",";
  }
  if (address.line2) {
    address_string += address.line2 + ",";
  }
  if (address.city) {
    address_string += address.city + ",";
  }
  if (address.region) {
    address_string += address.region + ",";
  }
  if (address.postalCode) {
    address_string += address.postalCode + ",";
  }
  address_string += address.countryCode;
  address_string = address_string.replace("undefined,", "");

  let directionUrl =
    `https://www.google.com/maps/dir/?api=1&destination=` +
    encodeURIComponent(address_string);

  if (googlePlaceId) {
    directionUrl += `&destination_place_id=${googlePlaceId}`;
  }

  if (userLocation && userLocation.latitude && userLocation.longitude) {
    directionUrl += `&origin=${userLocation.latitude},${userLocation.longitude}`;
  }
  return directionUrl;
};

export const getClusterIcon = () => {
  return cluster;
};

export const getUserIcon = () => {
  return userMarker;
};

export const getMarkerPin = (
  result: LocationResult,
  isActive = false,
  isHover = false
) => {
  let marker = defaultMarker;
  if (isHover) {
    marker = hoverMarker;
  } else if (isActive) {
    marker = hoverMarker;
  }
  const m_icon = {
    url: marker,
    id: result.id,
  };
  return m_icon;
};

export const getMetaTags = (
  title: string,
  description: string,
  robots: string,
  url?: string,
  favicon?: string
): Tag[] => {
  const data: Tag[] = [
    {
      type: "meta",
      attributes: {
        name: "title",
        content: title,
      },
    },
    {
      type: "meta",
      attributes: {
        name: "description",
        content: description,
      },
    },
    {
      type: "meta",
      attributes: {
        name: "robots",
        content: robots,
      },
    },
  ];

  if (favicon) {
    data.push({
      type: "link",
      attributes: {
        rel:"icon",
        property: "image/png",
        href: favicon,
      },
    });
  }

  if (url) {
    data.push({
      type: "link",
      attributes: {
        rel: "canonical",
        href: url,
      },
    });
  }

  return data;
};

export const getOgTags = (
  title: string,
  description: string,
  url?: string,
  image?: string
): Tag[] => {
  const data: Tag[] = [
    {
      type: "meta",
      attributes: {
        property: "og:title",
        content: title,
      },
    },
    {
      type: "meta",
      attributes: {
        property: "og:description",
        content: description,
      },
    },
  ];

  if (image) {
    data.push({
      type: "meta",
      attributes: {
        property: "og:image",
        content: image,
      },
    });
  }

  if (url) {
    data.push({
      type: "meta",
      attributes: {
        property: "og:url",
        content: url,
      },
    });
  }

  return data;
};

export const getTwitterTags = (
  title: string,
  description: string,
  image?: string
): Tag[] => {
  const data: Tag[] = [
    {
      type: "meta",
      attributes: {
        property: "twitter:card",
        content: "summary_large_image",
      },
    },
    {
      type: "meta",
      attributes: {
        property: "twitter:title",
        content: title,
      },
    },
    {
      type: "meta",
      attributes: {
        property: "twitter:description",
        content: description,
      },
    },
  ];

  if (image) {
    data.push({
      type: "meta",
      attributes: {
        property: "twitter:image",
        content: image,
      },
    });
  }

  return data;
};
export const getBreadcrumbSchema = (breadcrumbs: BreadcrumbItem[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((breadcrumb, key) => {
      return {
        "@type": "ListItem",
        position: key,
        item: {
          "@id": `${breadcrumb.slug}`,
          name: `${breadcrumb.name}`,
        },
      };
    }),
  };
};

export const getSchema = <SchemaType>(schema: SchemaType): string => {
  return `<script>${JSON.stringify(schema)}</script>`;
};