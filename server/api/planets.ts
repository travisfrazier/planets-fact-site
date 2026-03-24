import { createClient } from "contentful";

function transformPlanet(entry) {
  const f = entry.fields;
  return {
    name: f.name,
    color: f.color,
    overview: {
      content: f.overviewContent,
      source: f.overviewSource,
    },
    structure: {
      content: f.structureContent,
      source: f.structureSource,
    },
    geology: {
      content: f.geologyContent,
      source: f.geologySource,
    },
    slug: f.slug,
    rotation: f.rotation,
    revolution: f.revolution,
    radius: f.radius,
    temperature: f.temperature,
    images: {
      planet: "https:" + f.planetImage.fields.file.url,
      internal: "https:" + f.internalImage.fields.file.url,
      geology: "https:" + f.geologyImage.fields.file.url,
    },
  };
}

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();

  const client = createClient({
    space: config.contentfulSpaceId,
    accessToken: config.contentfulAccessToken,
  });

  const entries = await client.getEntries({
    content_type: "planet",
    include: 2, // resolves linked assets (images)
  });

  return entries.items.map(transformPlanet);
});
