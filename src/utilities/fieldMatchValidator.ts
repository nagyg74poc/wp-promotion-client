import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const fieldMatchValidator = (field1: string, field2: string): ValidatorFn => {
  return (formGroup: FormGroup): ValidationErrors | null => {
    const f1 = formGroup.get(field1);
    const f2 = formGroup.get(field2);
    if (!f1) {
      throw new Error(`${field1} doesn't exist`);
    } else if (!f2) {
      throw new Error(`${field2} doesn't exist`);
    } else if (f1.value === f2.value) {
      return null;
    } else {
      const err = {
        fieldMismatch: {
          expected: f1.value,
          value: f2.value
        }
      };
      f2.setErrors(err);
      return err;
    }
  };
};
