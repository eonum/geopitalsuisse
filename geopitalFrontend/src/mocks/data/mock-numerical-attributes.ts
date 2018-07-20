import { Attribute } from '../../app/models/attribute.model';

export const NumericalAttributes: Array<Attribute> = [{
  code: 'AnzStand',
  variable_type: 'number',
  values: [],
  values_de: [],
  values_fr: [],
  values_it: [],
  variable_sets: ['kzp','geopital_test'],
  name_de: 'Anzahl Standorte',
  name_fr: 'Nombre de sites',
  name_it: 'Numero di sedi'
  }, {
  code: 'CMIb',
  variable_type: 'number',
  values: [],
  values_de: [],
  values_fr: [],
  values_it: [],
  variable_sets: ['kzp','geopital_test'],
  name_de: 'Casemix Index (CMI) brutto',
  name_fr: 'Indice de casemix (CMI) brut',
  name_it: 'Casemix Index lordo (CMI)'
  },{
  code: 'EtMedL',
  variable_type: 'number',
  values: [],
  values_de: [],
  values_fr: [],
  values_it: [],
  variable_sets: ['kzp','geopital_test'],
  name_de: 'Ertrag aus medizinischen Leistungen und Pflege',
  name_fr: 'Produits des hospitalisations et soins',
  name_it: 'Ricavi per degenze e cure'
}];
