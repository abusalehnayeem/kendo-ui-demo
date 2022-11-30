import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AddEvent } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'kendo-ui-demo';

  public frmSalesOrder: FormGroup = this.createSalesOrderFormGroup();

  gridData: unknown[] = [];
  // @ViewChild(GridComponent) grid!: GridComponent;

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.frmSalesOrder.reset();
    this.frmSalesOrder.reset(this.createSalesOrderFormGroup().value);
    this.frmSalesOrder.enable();
  }

  ngAfterViewInit(): void {

  }


  private createSalesOrderFormGroup(): FormGroup<any> {
    return this.fb.group({
      transactionDate: new FormControl(null, [Validators.required]),
      customerOrderNo: new FormControl('', [Validators.required]),
      details: this.fb.array([], [Validators.required, Validators.minLength(1)]),
    });
  }

  get formSalesOrderControls() {
    return this.frmSalesOrder.controls;
  }

  get details(): FormArray {
    return this.formSalesOrderControls[`details`] as FormArray;
  }

  private createSalesOrderDetailFormGroup(item: any = {}) {
    return this.fb.group({
      itemCode: new FormControl('', [Validators.required]),
      qty: new FormControl(0, [Validators.required, Validators.min(0)]),
      unitPrice: new FormControl(0, [Validators.required, Validators.min(0)]),
      total: new FormControl(0, [Validators.required, Validators.min(0)]),
    });
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.frmSalesOrder.value);
  }

  public onGridAdd(args: AddEvent): void {
    const grid = args.sender;
    this.gridData.push({});
    const formGroup = this.createSalesOrderDetailFormGroup();
    this.details.push(formGroup);
    grid.editRow(this.gridData.length - 1, formGroup);
  }
}
