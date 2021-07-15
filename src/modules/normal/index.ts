type AlternativeSelections = ElementOf<typeof targeting>;
type NormalMarksMonitorResult = Record<AlternativeSelections, number>;

import { checkWindow, ElementOf } from '../../utils';
const targeting = ['fp', 'fmp', 'fcp', 'domContentLoad', 'onLoad', 'tti', 'tbt'] as const;

// TODO: 一开始分为readFP和readFCP两个函数，还是
// 按照esm的方式去做的，但是后来想，还是做成umd比较科学。
// 所以后面两个函数应该进行合并，从代码层减少体积。
export const readFP = checkWindow((PO) => {
  let fp = 0;
  const fpOberserver = new PO(list => {
    for (const entry of list.getEntriesByName('first-paint')) {
      // Log the value of FCP to the console.
      fp = entry.startTime;
      fpOberserver.disconnect();
    }
  });
  return fp;
});

// TODO: FCPvsFP取信的问题，其实意思真差不太多。
export const readFCP = checkWindow((PO) => {
  let fcp = 0;
  const fpOberserver = new PO(entries => {
    for (const entry of entries.getEntriesByName('first-contentful-paint')) {
      // Log the value of FCP to the console.
      fcp = entry.startTime;
      fpOberserver.disconnect();
    }
  });
  return fcp;
});

const alias = {
  fp: readFP,
};

const readNormalMarks = (...selections: AlternativeSelections[]): Partial<NormalMarksMonitorResult> => {
  const exacts = selections?.length ? selections : targeting;
  const result = {} as Partial<NormalMarksMonitorResult>;
  exacts.forEach(item => {
    result[item] = alias[item]
  });
  return result;
}

export default readNormalMarks;