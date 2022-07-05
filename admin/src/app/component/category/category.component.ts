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
  isChecked:boolean = false
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
      this.categoryListing()
       }
       initColumns() {    
        this.columns = [{name: 'Name', prop: 'name',  width: 150, visible: true, sortable: true}, { name: 'Action', prop: 'is_active', width: 150, visible: true, sortable: false, type: 'date', showMore: false },];
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

      onModelChange(id:any, eventcheck:any) {
        const event = eventcheck.target.checked
        const eventSt = event.toString()
         const eventString = JSON.parse(eventSt);
         this.UserService.updateCategoryIsActive(id, eventString).subscribe((res:any) => {
         console.log(res, "response>>>>>>>>>>>>>>>>>>")
         if(res.is_error === false){
          this.categoryListing()
         }
   });
 }
 
 onDelete(id:any){
console.log(id)
 }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

}