type MinecraftVersion = {
  id: string;
  name: string;
  release_target: null | string;
  type: string;
  stable: boolean;
  data_version: number;
  protocol_version: number;
  data_pack_version: number;
  resource_pack_version: number;
  build_time: string;
  release_time: string;
  sha1: string;
};

const response = await fetch(
  "https://raw.githubusercontent.com/misode/mcmeta/summary/versions/data.min.json"
);
const minecraftVersionData: MinecraftVersion[] = await response.json();

const dpvDict: { [dataPackVersion: string]: string } = {};
const dpvDictAll: { [dataPackVersion: string]: string } = {};

let lastStable: string = "newest";
for (let index = minecraftVersionData[0].data_pack_version; index > 0; index--) {
  const mcVs: MinecraftVersion[] = minecraftVersionData.filter(
    (version: MinecraftVersion) => version.data_pack_version === index
  );
  if (mcVs.length === 0) {
    continue;
  }
  const stableMcVs: MinecraftVersion[] = mcVs.filter(
    (version: MinecraftVersion) => version.stable
  );
  if (stableMcVs.length === 1) {
    dpvDict[index] = stableMcVs[0].id;
    dpvDictAll[index] = stableMcVs[0].id;
    lastStable = stableMcVs[0].id;
  } else if (stableMcVs.length > 1) {
    dpvDict[index] = `${stableMcVs.at(-1)?.id} - ${
      stableMcVs[0].id
    }`;
    dpvDictAll[index] = `${stableMcVs.at(-1)?.id} - ${
      stableMcVs[0].id
    }`;
    lastStable = stableMcVs[0].id;
  } else if (mcVs.length === 1) {
    dpvDictAll[index] = mcVs[0].id + " (" + lastStable + ")";
  } else if (mcVs.length > 1) {
    dpvDictAll[index] = `${mcVs.at(-1)?.id} - ${
      mcVs[0].id
    } (${lastStable})`;
  }
}

export const getDataPackVersion = (version: string): string => {
  for (const dpv in dpvDictAll) {
    if (dpvDict[dpv] === version || dpvDictAll[dpv] === version) {
      return dpv;
    }
  }
  throw new Error(`Unknown version ${version}`);
};

export const versionMatches = (version: string, versions: string): boolean => {
  // this is only nessecary to make old versions work
  const versionsArray = versions.split(",").map(s => s.trim());
  if (version === "26") {
    return (
      versionsArray.includes("1.20.3") ||
      versionsArray.includes("1.20.4") ||
      versionsArray.includes("26")
    );
  } else if (version === "18") {
    return versionsArray.includes("1.20.2") || versionsArray.includes("18");
  }
  return (
    versionsArray.includes(version) ||
    versionsArray.some(
      s => s.slice(0, 4) === dpvDictAll[version].slice(0, 4)
    )
  );
};

export { dpvDict, dpvDictAll };
