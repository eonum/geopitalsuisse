import { Attribute } from '../../app/models/attribute.model';

export const StringAttributes: Array<Attribute> = [{
  code: 'KT',
  variable_type: 'string',
  values: ['AG','AI','AR','BE','BL','BS','GE','GL','GR','JU','LU','NE','NW','OW','SG','SH','SO','SZ','TG','TI','UR','VD','VS','ZG','ZH'],
  values_de: ['Argau','Appenzell Innerrhoden','Appenzell Ausserrhoden','Basel-Stadt','Basel-Landschaft','Basel-Stadt','Genf','Glarus','Graubünden','Jura','Luzern','Neuenburg','Nidwalden','Obwalden','St. Gallen','Schaffhausen','Solothurn','Schwiz','Thurgau','Tessin','Uri','Waadt','Wallis','Zug','Zürich'],
  values_fr: [],
  values_it: [],
  variable_sets: ['kzp','geopital_test'],
  name_de: 'Kanton',
  name_fr: 'Canton',
  name_it: 'Cantone'
}, {
  code: 'Typ',
  variable_type: 'string',
  values: [],
  values_de: [],
  values_fr: [],
  values_it: [],
  variable_sets: ['kzp','geopital_test'],
  name_de: 'Spitaltyp, gemäss BFS Spitaltypologie',
  name_fr: 'Type de l’établissement selon la typologie de l’OFS',
  name_it: 'Tipo di ospedale secondo la tipologia ospedaliera UST'
},{
  code: 'Akt',
  variable_type: 'string',
  values: ['A','P','R','B'],
  values_de: ['Akutsomatik','Psychiatrie','Rehabilitation','Geburtshäuser'],
  values_fr: ['soins aiguë','psychiatrie','Réhabilitation','maison de naissance'],
  values_it: [],
  variable_sets: ['kzp','geopital_test'],
  name_de: 'Aktivitätstyp',
  name_fr: 'Type d‘activité',
  name_it: 'Tipo di attività'
},{
  code: 'SL',
  variable_type: 'string',
  values: [],
  values_de: [],
  values_fr: [],
  values_it: [],
  variable_sets: ['kzp','geopital_test'],
  name_de: 'Spezifische Leistungen',
  name_fr: 'Prestations spécifiques',
  name_it: 'Prestazioni specifiche'
},{
  code: 'WB',
  variable_type: 'string',
  values: [],
  values_de: [],
  values_fr: [],
  values_it: [],
  variable_sets: ['kzp','geopital_test'],
  name_de: 'Aus­ und Weiterbildung',
  name_fr: 'Formation de base et formation postgrade',
  name_it: 'Formazione e perfezionamento'
}];
