import diagnoses from '../../data/diagnoses';

import { DiagnoseEntry } from '../types';

const getDiagnoses = (): Array<DiagnoseEntry> => {
  return diagnoses;
};

export default { getDiagnoses };
