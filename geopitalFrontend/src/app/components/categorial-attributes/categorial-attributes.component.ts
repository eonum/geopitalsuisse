import { Component, Input, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

import { D3Service } from '../../services/d3.service';
import { Attribute } from '../../models/attribute.model';

@Component({
  selector: 'app-categorial-attributes',
  templateUrl: './categorial-attributes.component.html',
  styleUrls: ['./categorial-attributes.component.css']
})
export class CategorialAttributesComponent implements OnInit {

  @Input() attribute: Attribute;

  locale: string;

  constructor(
    private d3: D3Service,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.d3.categoricalAttribute$.subscribe((attribute: Attribute) => {
      this.attribute = attribute;
    });

    this.locale = this.translate.currentLang;
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.locale = event.lang;
    });
  }

  select(attribute: Attribute, value: string) {
    this.d3.updateSelectedCategoryOption(attribute, value);
  }
}
