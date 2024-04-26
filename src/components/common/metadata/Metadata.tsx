import { Helmet } from "react-helmet-async";

interface MetadataProps {
  title: string;
  siteUrl: string;
  desc: string;
  image: string;
}

function Metadata({ title, siteUrl, desc, image }: MetadataProps) {
  return (
    <Helmet>
      <meta property="og:site_name" content="어댜!" />
      <meta property="og:title" content={`[어댜!] ${title}`} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={image} />
      <meta name="twitter:title" content={`[어댜!] ${title}`} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}

export default Metadata;
