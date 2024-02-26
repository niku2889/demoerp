import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  apiUrl = "http://www.hindustansoft.net:8010/api/v1/Product/";
  email: string = "";
  password: string = "";
  productData: any[] = [];
  @ViewChild('closeModel') closeModel: any;
  selectedLang = 'en';
  hideAdd: boolean = false;
  isLeftPanel: boolean = false;
  defaultDateFormat = 'MM/dd/yyyy';

  productModel = {
    name: "", code: "", taxRate: null, weight: null, brandName: "", supplierName: "", productCatogeryName: "",
    subCatogeryName: "", unit: "", hsn: "", note: "", buyPrice: null, sellPrice: null, eventPrice: null,
    internationalPrice: null, notifyQunatity: 1, image: ""
  }

  constructor(private http: HttpClient, public translate: TranslateService) {
  }

  changeLanguage(lang: string) {
    this.selectedLang = lang;
    this.translate.use(lang).subscribe(res => {
    });
  }

  ngOnInit() {
    this.getAllProduct();
  }

  getAllProduct() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("token")
    })
    return this.http.post<any>(`${this.apiUrl}` + 'GetAllProduct', {}, { headers: headers }).subscribe({
      next: data => {
        this.productData = data;
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  fileChangeEvent(fileInput: any) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const image = new Image();
      image.src = e.target.result;
      image.onload = rs => {
        const imgBase64Path = e.target.result;
        this.productModel.image = imgBase64Path;
      };
    };
    reader.readAsDataURL(fileInput.target.files[0]);
  }

  showProduct() {
    this.hideAdd = true;
  }
  addProduct() {
    let data = {
      "id": 0,
      "active": true,
      "deleted": true,
      "createdBy": 0,
      "createdByName": "Nikunj Sathwara",
      "createdAt": new Date(),
      "updatedAt": new Date(),
      "updatedBy": 0,
      "updatedByName": "Nik",
      "companyId": this.productData.length + 1,
      "productName": this.productModel.name,
      "productCode": this.productModel.code,
      "taxRate": this.productModel.taxRate,
      "weight": this.productModel.weight,
      "brandName": this.productModel.brandName,
      "brandId": this.productData.length + 1,
      "supplierId": this.productData.length + 1,
      "supplierName": this.productModel.supplierName,
      "productCatogeryId": this.productData.length + 1,
      "productCatogeryName": this.productModel.productCatogeryName,
      "subCatogeryId": this.productData.length + 1,
      "subCatogeryName": this.productModel.subCatogeryName,
      "unit": this.productModel.unit,
      "images": this.productModel.image,
      "hsn": this.productModel.hsn,
      "note": this.productModel.note,
      "buyPrice": this.productModel.buyPrice,
      "sellPrice": this.productModel.sellPrice,
      "eventPrice": this.productModel.eventPrice,
      "internationalPrice": this.productModel.internationalPrice,
      "notifyQunatity": Number(this.productModel.notifyQunatity),
    };
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("token")
    })
    return this.http.post<any>(`${this.apiUrl}` + 'Create', data, { headers: headers }).subscribe({
      next: data => {
        this.closeModel.nativeElement.click();
        this.getAllProduct();
        this.hideAdd = false;
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }
}
