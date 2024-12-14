import { ref } from "vue";

export default function useMaps(queries) {
  const mapLoaders = import.meta.glob("./map/**/*.svg", {
    as: "raw",
  });
  const maps = Object.fromEntries(
    Object.entries(mapLoaders).map(([key, value]) => {
      const fileName = key.split("/").pop().split(".").shift();
      return [fileName, value];
    })
  );

  const mapRefs = queries.map((query) => {
    const mapRef = ref("");
    maps[query]().then((mapSvgString) => (mapRef.value = mapSvgString));
    return mapRef;
  });

  return mapRefs;
}
