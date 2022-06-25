import { Component, EventEmitter, Output } from '@angular/core';
import { IFieldConfig } from '@onivoro/angular-serializable-forms';
import { RepositoryForm } from './repository-form';
const required = { name: 'required' };
const validators = [
  required,
  { name: 'minLength', args: [16] },
  { name: 'maxLength', args: [255] },
];

@Component({
  selector: 'onivoro-repository-form',
  styleUrls: ['./repository-form.component.scss'],
  templateUrl: './repository-form.component.html',
})
export class RepositoryFormComponent {
  @Output() valueChange = new EventEmitter<RepositoryForm>();
  validators = validators;
  formData: RepositoryForm = new RepositoryForm();
  formConfig: IFieldConfig = {
    fieldLayout: [['url']],
    fieldOptions: {
      url: {
        label: 'URL',
        type: 'text',
        validators: [...this.validators],
      },
    },
  };
}
