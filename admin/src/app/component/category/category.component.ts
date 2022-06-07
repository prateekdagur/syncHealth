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
  itemsPerPage:any = 10
  pageTitle: string = 'Category Listing';
  Version: string = '';
  pageSize: any = 10
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
  rows:any[] = [];
  loading:boolean = false
  totalCount:any
  temp:any[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private UserService:UserService, private router: Router) { }

  ngOnInit(): void {
    this.initColumns()
    // this.tableData = [
    //   { name: 'Austin', createdAt: '23'},
    //   { name: 'Dany', createdAt: '270'},
    //   { name: 'Molly', createdAt: '25'},
    //   { name: 'Mark', createdAt: '26'},
    //   { name: 'Boom', createdAt: '30'},
    //   { name: 'Doom', createdAt: '240'},
    //   { name: 'Goom', createdAt: '90'},
    //   { name: 'Koom', createdAt: '28'},
    //   { name: 'Lustin', createdAt: '20'},
    //   { name: 'Soom', createdAt: '50'},
    //   { name: 'Dolly', createdAt: '260'},
    //   { name: 'Dark', createdAt: '90'}
    // ];
    // this.totalCount = this.tableData.length; 
    // this.rows = this.tableData;
    // this.temp = this.tableData;
      this.categoryListing()
       }
       initColumns() {    
        this.columns = [{name: 'Name', prop: 'name',  width: 150, visible: true, sortable: true,}, { name: 'Date', prop: 'createdAt', width: 150, visible: true, sortable: true, type: 'date', showMore: false }];
      }
      categoryListing(){
        this.UserService.categoryListing().pipe(takeUntil(this.destroy$)).subscribe(response => {
          
          console.log(response.data, "response>>>>>>>>>>>>>>>>>>")
          this.tableData = response.data
          this.totalCount = this.tableData.length; 
          this.rows = this.tableData;
          this.temp = this.tableData;
           });
      } 

      // openModel(modal:any, data:any) {

      //   this.editTitle =(data)?`Edit ${data.type}`:''
      //   this.dataObj = data;
      // }
    

      updateFilter(event:any, text:any) {
        const val = event.target.value.toLowerCase();
        if(val) {
            // filter our data
            const temp = this.temp.filter(d => {
              return ( d[text].toLowerCase().indexOf(val) !== -1);
            });          
            // update the rows
            this.rows = temp;            
        }else{
            this.rows = this.temp;
        }
      }

    // updateFilter(event:any, text:any) {      
    //   const val = event.target.value.toLowerCase();
    //   if(val) {
    //       // filter our data
    //       const temp = this.temp.filter(d => {            
    //         return ( d.nameCategory.toLowerCase().indexOf(val) !== -1);
    //       });          
    //       // update the rows
    //       this.rows = temp;            
    //   }else{
    //       this.rows = this.temp;
    //   }
    // }

     

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

}