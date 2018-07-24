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
      {KT: {value: 'BE' }},
      {typ: {value: 'K111' }},
      {Akt: {value: 'A,  R' }}
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
      {KT: {value: 'BS' }},
      {typ: {value: 'K111' }},
      {Akt: {value: 'A' }}
    ]
  }),
  new Hospital({
    name: 'Universitätsspital Zürich',
    address: 'Rämistrasse 100, 8091 Zürich',
    latitude: 47.3766158,
    longitude: 8.549177499999999,
    typ: 'K111',
    typ_aggregated: 'U',
    variables: [
      {KT: {value: 'ZH' }},
      {typ: {value: 'K111' }},
      {Akt: {value: 'A,  P' }}
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
      {KT: {value: 'LU' }},
      {typ: {value: 'K112' }},
      {Akt: {value: 'A,  R' }}
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
      {KT: {value: 'AG' }},
      {typ: {value: 'K221' }},
      {Akt: {value: 'R' }}
    ]
  }),
  new Hospital({
    name: 'Klinik Siloah',
    address: 'Worbstrasse 324, 3073 Gümligen',
    latitude: 46.93146489999999,
    longitude: 7.517250000000001,
    typ: 'K231',
    typ_aggregated: 'S',
    variables: [
      {KT: {value: 'BE' }},
      {typ: {value: 'K231' }},
      {Akt: {value: 'A,  R' }}
    ]
  }),
  new Hospital({
    name: 'Psychiatriezentrum Münsingen',
    address: 'Hunzigenallee 1, 3110 Münsingen',
    latitude: 46.88050380000001,
    longitude: 7.5531352,
    typ: 'K211',
    typ_aggregated: 'P',
    variables: [
      {KT: {value: 'BE' }},
      {typ: {value: 'K211' }},
      {Akt: {value: 'P' }}
    ]
})];
