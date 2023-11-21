import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }
invoice: any;
pdf: any;
ngOnInit(): void {
  this.http.post("http://localhost:1000/invoice", "").subscribe(resp => {
    this.invoice = resp;
    console.log(this.invoice);
  })
}


downloadPDF() {
  this.http.post("http://localhost:1000/invoiceform", "").subscribe((resp: any) => {
    this.pdf = resp.xmljs;
    console.log(this.pdf);
    const linkSource = `data:application/pdf;base64,${this.pdf}`;
    const downloadLink = document.createElement('a');
    const fileName = "CustomerInvoice.pdf";
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
    
  })
}
}