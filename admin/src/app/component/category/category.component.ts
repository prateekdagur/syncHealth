import { Component, OnInit, ViewChild} from '@angular/core';
import { UserService } from '../../services/user.service'
import { Router, ActivatedRoute } from "@angular/router";
import { takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { noConflict } from 'jquery';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @ViewChild('myTable') table: any;
  itemsPerPage:any = 3
  pageTitle: string = 'Category Listing';
  Version: string = '';
  pageSize: any = 3
  allVersions: any[] = [];
  requiredAllVersions: boolean = true;
  errorMessage: any;
  bugs: any[] = [];
  improvements: any[] = [];
  newFeatures: any[] = [];
  data: any[] = [];
  export: boolean = false;
  showLinks: boolean = true;
  searchdiscription: any;
  dataObj:any = {}
  columns:any = [];
  itemsPerBatch = 200;
  offset = 0;
  tableData:any = [];
  filterObj: Object = {};
  visibleMenuOptions = ['filter'];
   sidebarMenuOpened = false;
  currentMenuOption = '';
  filteredItems: any;
  loadingIndicator = false;
  noRecords = false;
  dataList = [];
  tabChangeTrigger = false;
  searchArray: any;
  noteToDelete: any;
  disabledMenuOptions = [];
  globalFilterObj : any = {}
  editTitle:any = ''
  isLoadMore:any;
  videoObj:any = {}
  selectedNotes:any = [];
  rows:any = []
  loading:boolean = false
  totalCount:any
  temp = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private UserService:UserService, private router: Router) { }

  ngOnInit(): void {
    this.initColumns()
    this.tableData = [
      { nameCategory: 'Austin', createdAt: '23'},
      { nameCategory: 'Dany', createdAt: '270'},
      { nameCategory: 'Molly', createdAt: '25'},
      { nameCategory: 'Mark', createdAt: '26'},
      { nameCategory: 'Boom', createdAt: '30'},
      { nameCategory: 'Doom', createdAt: '240'},
      { nameCategory: 'Goom', createdAt: '90'},
      { nameCategory: 'Koom', createdAt: '28'},
      { nameCategory: 'Lustin', createdAt: '20'},
      { nameCategory: 'Soom', createdAt: '50'},
      { nameCategory: 'Dolly', createdAt: '260'},
      { nameCategory: 'Dark', createdAt: '90'}
    ];
    this.totalCount = this.tableData.length; 
    this.temp = this.tableData
      this.categoryListing()
       }
       initColumns() {    
        this.columns = [{name: 'Name', prop: 'nameCategory',  width: 150, visible: true, sortable: true,}, { name: 'Date', prop: 'createdAt', width: 150, visible: true, sortable: true, type: 'date', showMore: false }];
      }
      categoryListing(){
        this.UserService.categoryListing().pipe(takeUntil(this.destroy$)).subscribe(response => {
          
          console.log(response.data[0].category, "response>>>>>>>>>>>>>>>>>>")
          //this.rows = response.data
           });
      } 
    updateFilter(event:any, text:any) {
        const val = event.target.value.toLowerCase();
    console.log(val, text)
        //filter our dataf
        const temp = this.temp.filter(data => `data['nameCategory']`.toLowerCase() == val);
        console.log(temp, "ttttttttt")
        // update the rows
        this.tableData = temp;
        // Whenever the filter changes, always go back to the first page
        this.table.offset = 0;
      }
      // filterData(event, type) {
      //   if (type === 'date') {
      //       if (event.value === '') {
      //           if (this.filterObj[event.input.id + '_temp']) {
      //               delete this.filterObj[event.input.id];
      //           }
      //       } else {
      //         this.filterObj[event.input.id] = this._commonService.dateFormate(event.value, '', 'MM/DD/YYYY')
      //       }      
      //       this.tableData = this.filteredItems.filter(item => {
      //           const notMatchingField = Object.keys(this.filterObj).find(key =>
      //               this._utilityService.dataTableSearch(item, this.filterObj, key));
      //           return !notMatchingField;
      //       });
      //   } else {
      //       if (event.target.value === '') {
      //           delete this.filterObj[event.currentTarget.id];
      //       } else {
      //           this.filterObj[event.currentTarget.id] = event.target.value;
      //       }
      //       this.tableData = this.filteredItems.filter(item => {
      //           const notMatchingField = Object.keys(this.filterObj).find(key =>
      //               this._utilityService.dataTableSearch(item, this.filterObj, key));
      //           return !notMatchingField;
      //       });
      //   }
      //   if (this.table) {
      //       this.table['offset'] = 0
      //   }
      //   this.setEmptyMessage();
      // }
  

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

}
