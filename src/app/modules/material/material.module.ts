import { NgModule } from '@angular/core';
import {
  MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatSelectModule,
  MatToolbarModule,
  MatSlideToggleModule,
  MatSnackBarModule,
} from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatMenuModule,
    MatToolbarModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSnackBarModule,
  ],
  exports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatMenuModule,
    MatToolbarModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSnackBarModule,
  ],
})
export class MaterialModule {
}
