import { Component, EventEmitter, Output } from '@angular/core';
import { IFieldConfig, regexes } from '@onivoro/angular-serializable-forms';
import { SearchForm } from './search-form';

const required = { name: 'required' };
const validators = [required, { name: 'maxLength', args: [128] }];

@Component({
  selector: 'onivoro-search-form',
  styleUrls: ['./search-form.component.scss'],
  templateUrl: './search-form.component.html',
})
export class SearchFormComponent {
  @Output() valueChange = new EventEmitter<SearchForm>();
  validators = validators;
  formData: SearchForm = new SearchForm();
  formConfig: IFieldConfig = {
    fieldLayout: [['query'], ['repoFilter'], ['pathFilter']],
    fieldOptions: {
      repoFilter: { label: 'repoFilter', type: 'text' },
      query: {
        label: 'query',
        type: 'text',
        validators: [
          ...this.validators,
          { name: 'pattern', args: [regexes.dashesLettersNumbersSpaces] },
        ],
      },
      pathFilter: {
        label: 'path filter',
        type: 'text',
      },
    },
  };
}
