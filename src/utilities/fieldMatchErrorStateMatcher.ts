import { ErrorStateMatcher } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';

export class FieldMatchErrorStateMatcher implements ErrorStateMatcher {
  private f1: string;
  private f2: string;

  constructor(field1: string, field2: string) {
    this.f1 = field1;
    this.f2 = field2;
  }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return ( control && control.parent.get(this.f1).value !== control.parent.get(this.f2).value && control.dirty );
  }
}
