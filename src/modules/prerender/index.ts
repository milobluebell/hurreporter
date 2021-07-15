type AlternativeSelections = ElementOf<typeof targeting>;
type PrerenderMonitorResult = Record<AlternativeSelections, number>;

import { checkWindow, ElementOf } from '../../utils';
const targeting = ['dns', 'connection', 'request'] as const;

export const readDNSLookup = checkWindow((PO) => {

});

const alias = {
  dns: readDNSLookup,
};

const readPrerenderMarks = (...selections: AlternativeSelections[]): Partial<PrerenderMonitorResult> => {
  const exacts = selections?.length ? selections : targeting;
  const result = {} as Partial<PrerenderMonitorResult>;
  exacts.forEach(item => {
    result[item] = alias[item]
  });
  return result;
}

export default readPrerenderMarks;