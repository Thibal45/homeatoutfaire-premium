import { serviceAreaNames } from "../data/service-areas";

const siteUrl = "https://www.homeatoutfaire30.fr";
const businessId = `${siteUrl}/#business`;

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

type ServiceStructuredDataProps = {
  name: string;
  description: string;
  path: string;
  breadcrumbName: string;
};

export default function ServiceStructuredData({
  name,
  description,
  path,
  breadcrumbName,
}: ServiceStructuredDataProps) {
  const pageUrl = `${siteUrl}${path}`;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name,
        serviceType: name,
        description,
        url: pageUrl,
        provider: {
          "@id": businessId,
        },
        areaServed: serviceAreaNames,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Accueil",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: breadcrumbName,
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: serializeJsonLd(data),
      }}
    />
  );
}
