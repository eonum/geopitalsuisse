import { Hospital } from '../../app/models/hospital.model';

export const Hospitals: Array<Hospital> = [
  new Hospital({
    name: 'Inselspital Bern',
    address: 'Freiburgstrasse 18, 3010 Bern',
    latitude: 46.9477087,
    longitude: 7.4255497,
    typ: 'K111',
    typ_aggregated: 'U',
    variables: [
      {KT: {value: 'BE', years: {2013: 'BE', 2012: 'BE', 2011: 'BE', 2014: 'BE', 2015: 'BE'}}},
      {typ: {value: 'K111', years: {2013: 'K111', 2012: 'K111', 2011: 'K111', 2014: 'K111', 2015: 'K111'}}},
      {Akt: {value: 'A,  R', years: {2013: 'A,  R', 2012: 'A,  R', 2011: 'A,  R', 2014: 'A,  R', 2015: 'A,  R'}}}
    ]
  }),
  new Hospital({
    name: 'Universitätsspital Basel',
    address: 'Hebelstrasse 32, 4056 Basel',
    latitude: 47.5610763,
    longitude: 7.5814977,
    typ: 'K111',
    typ_aggregated: 'U',
    variables: [
      {KT: {value: 'BS', years: {2013: 'BS', 2012: 'BS', 2011: 'BS', 2014: 'BS', 2015: 'BS'}}},
      {typ: {value: 'K111', years: {2013: 'K111', 2012: 'K111', 2011: 'K111', 2014: 'K111', 2015: 'K111'}}},
      {Akt: {value: 'A', years: {2013: 'A,  R', 2012: 'A,  R', 2011: 'A,  R', 2014: 'A', 2015: 'A'}}}
    ]
  }),
  new Hospital({
    name: 'Universitätsspital Zürich',
    address: 'Rämistrasse 100, 8091 Zürich',
    latitude: 47.3766158,
    longitude: 8.549177499999999,
    typ: 'K111', typ_aggregated: 'U',
    variables: [
      {KT: {value: 'ZH', years: {2013: 'ZH', 2012: 'ZH', 2011: 'ZH', 2014: 'ZH', 2015: 'ZH'}}},
      {typ: {value: 'K111', years: {2013: 'K111', 2012: 'K111', 2011: 'K111', 2014: 'K111', 2015: 'K111'}}},
      {Akt: {value: 'A,  P', years: {2013: 'A,  P', 2012: 'A', 2011: 'A', 2014: 'A,  P', 2015: 'A,  P'}}}
    ]
  }),
  new Hospital({
    name: 'Luzerner Kantonsspital',
    address: 'Spitalstrasse, 6004 Luzern',
    latitude: 47.0576381,
    longitude: 8.297494499999999,
    typ: 'K112',
    typ_aggregated: 'Z',
    variables: [
      {KT: {value: 'LU', years: {2013: 'LU', 2012: 'LU', 2011: 'LU', 2014: 'LU', 2015: 'LU'}}},
      {typ: {value: 'K112', years: {2013: 'K112', 2012: 'K112', 2011: 'K112', 2014: 'K112', 2015: 'K112'}}},
      {Akt: {value: 'A,  R', years: {2013: 'A,  R', 2012: 'A,  R', 2011: 'A,  R', 2014: 'A,  R', 2015: 'A,  R'}}}
    ]
  }),
  new Hospital({
    name: 'RehaClinic Zurzach',
    address: 'Quellenstrasse 34, 5330 Bad Zurzach',
    latitude: 47.5899827,
    longitude: 8.288332,
    typ: 'K221',
    typ_aggregated: 'R',
    variables: [
      {KT: {value: 'AG', years: {2013: 'AG', 2012: 'AG', 2011: 'AG', 2014: 'AG', 2015: 'AG'}}},
      {typ: {value: 'K221', years: {2013: 'K221', 2012: 'K221', 2011: 'K221', 2014: 'K221', 2015: 'K221'}}},
      {Akt: {value: 'R', years: {2013: 'R', 2012: 'R', 2011: 'R', 2014: 'R', 2015: 'R'}}}
    ]
  }),
  new Hospital({
    name: 'Klinik Siloah',
    address: 'Worbstrasse 324, 3073 Gümligen',
    latitude: 46.93146489999999,
    longitude:7.517250000000001,
    typ: 'K231',
    typ_aggregated: 'S',
    variables: [
      {KT: {value: 'BE',  years: {2013: 'BE',  2012: 'BE',  2011: 'BE',  2014: 'BE'}}},
      {typ: {value: 'K231',  years: {2013: 'K231',  2012: 'K231',  2011: 'K231',  2014: 'K231'}}},
      {Akt: {value: 'A,  R',  years: {2013: 'A,  R',  2012: 'A',  2011: 'A',  2014: 'A,  R'}}}
    ]
  }),
  new Hospital({
    name:'Psychiatriezentrum Münsingen',
    address:'Hunzigenallee 1, 3110 Münsingen',
    latitude: 46.88050380000001,
    longitude: 7.5531352,
    typ: 'K211',
    typ_aggregated: 'P',
    variables: [
      {KT: {value: 'BE', years: {2013: 'BE', 2012: 'BE', 2011: 'BE', 2014: 'BE', 2015: 'BE'}}},
      {typ: {value: 'K211', years: {2013: 'K211', 2012: 'K211', 2011: 'K211', 2014: 'K211', 2015: 'K211'}}},
      {Akt: {value: 'P', years: {2013: 'P', 2012: 'P', 2011: 'P', 2014: 'P', 2015: 'P'}}}
    ]
})];
