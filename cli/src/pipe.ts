import { readFileSync, writeFileSync } from 'fs';

(async () => {
  const res = readFileSync('./mockData.json', { encoding: 'utf8' });
  const data = JSON.parse(res.toString()) as any[];
  const r = data
    .map((s) => s.checkLists)
    .flat()
    .filter((s) => s.isHeatTrace)
    .slice(0, 30)
    .map((s) => ({
      ...s,
      pipetests: data.filter((p) => p.checkLists.find((x: any) => x.tagNo === s.tagNo)),
    }));

  const buffer = Buffer.from(JSON.stringify(r, null, 4));

  writeFileSync('./pipetests.json', buffer);
})();
