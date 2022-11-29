import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'kendo-ui-demo';

  public frmSalesOrder: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.frmSalesOrder = this.createManufacturingOrderFormGroup();
  }

  createManufacturingOrderFormGroup(): FormGroup<any> {
    return this.fb.group([]);
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.frmSalesOrder.value);
  }
}
