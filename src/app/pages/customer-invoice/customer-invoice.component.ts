import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTransferService } from 'src/app/shared/services/data-transfer.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import * as XLSX from "xlsx";
import { ExcelService } from 'src/app/shared/services/excel.service';
import { async } from 'rxjs';


@Component({
  selector: 'igx-customer-invoice',
  templateUrl: './customer-invoice.component.html',
  styleUrls: ['./customer-invoice.component.scss']
})

export class CustomerInvoiceComponent implements OnInit, AfterViewInit {
  // eslint-disable-next-line @typescript-eslint/ban-types
  ELEMENT_DATA: Array<Object> | undefined = [];
  constructor(private excelService: ExcelService, private router: Router, public dt: DataTransferService) {
  }


  ngOnInit(): void {
    this.fetchData();
  }


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngAfterViewInit() {
    console.log();
  }


  Data!: any;
  fetchData(): void {
    this.Data = this.dt.getData().subscribe((dataObj: any) => {
      // console.log(dataObj);
      // console.log(typeof (dataObj));
      // console.log('email id type');
      // console.log(dataObj[0].email_id);
      this.ELEMENT_DATA = dataObj;
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      // console.log('this is ele data');
      // console.log(this.ELEMENT_DATA);
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  // eslint-disable-next-line @typescript-eslint/ban-types





  displayedColumns: string[] = ['Name', 'Address', 'ContactNo', 'Date_of_supply', 'Place_of_Supply', 'Transportation_Mode', 'Vehicle_Number', 'action'];

  dataSource!: any;

  edit(elem: any) {
    // console.log(elem);
    console.log(elem);
    this.dt.tableInstanceData.next(elem);
    this.router.navigate(['/update-invoice']);
  }



  delete(elem: any) {
    console.log(elem);

  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  exportTable() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.excelService.exportAsExcelFile(this.ELEMENT_DATA!, 'export-to-excel');
  }

}

// eslint-disable-next-line @typescript-eslint/ban-types

