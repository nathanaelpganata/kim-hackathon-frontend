import { SandboxOptions } from '@/constant/SandboxData';
export default async function sitemap() {
  const baseUrl = 'https://www.glossy-gift.shop/';

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/gallery`, lastModified: new Date() },
    { url: `${baseUrl}/contactus`, lastModified: new Date() },
    { url: `${baseUrl}/order`, lastModified: new Date() },
    { url: `${baseUrl}/sandbox`, lastModified: new Date() },
    ...SandboxOptions.map((option) => ({
      url: `${baseUrl}/sandbox/${option.link}`,
      lastModified: new Date(),
    })),
  ];
}
