import { Helmet } from "react-helmet-async";

interface RouteHeadProps {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}

const SITE = "https://luxplay.uk";

const RouteHead = ({ title, description, path, noindex }: RouteHeadProps) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={`${SITE}${path}`} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={`${SITE}${path}`} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    {noindex && <meta name="robots" content="noindex, nofollow" />}
  </Helmet>
);

export default RouteHead;
