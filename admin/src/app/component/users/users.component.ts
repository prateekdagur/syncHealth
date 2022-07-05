import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service'
import { Router, ActivatedRoute } from "@angular/router";
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
//mport {ThemePalette} from '@angular/material/core';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @ViewChild('myTable') table: any;
  isChecked: boolean = false;
  onChange: any = () => {};
  itemsPerPage:any = 10
  pageTitle: string = 'User Listing';
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
    this.userListing()
       }
       initColumns() {    
        this.columns = [{name: 'Name', prop: 'first_name', width: 150, visible: true, sortable: true,},  
        { name: 'Gender', prop: 'gender', width: 150, visible: true, sortable: true},
        { name: 'Age' , prop: 'age', width: 150, visible: true, sortable: true},
        { name: 'Email', prop: 'email', width: 150, visible: true, sortable: true},
        { name: 'BMI', prop: 'bmi', width: 150, visible: true, sortable: true},
        { name: 'Action', prop: 'is_approved_by_admin', width: 150, sortable: false}];
      }
      userListing(){
        this.UserService.usersListing().pipe(takeUntil(this.destroy$)).subscribe((response) => {
          console.log(response.data, "response>>>>>>>>>>>>>>>>>>")
          this.tableData = response.data
          this.totalCount = this.tableData.length; 
          this.rows = this.tableData;
          this.temp = this.tableData;
           });
      } 
      onSelect(row:any) {
        console.log(row)
      }
      updateFilter(event:any, text:any) {
        const val = event.target.value.toLowerCase();
        console.log(typeof(val), "vvvvvvvvvvvv")
        if(val) {
            // filter our data
            const temp = this.temp.filter(d => {
              console.log(typeof(text), "tttttttttt")
              if(text === "age" || text === "bmi"){
                console.log("111111111")
                const value = +val
              return ( d[text].indexOf(value) !== -1);
              }
              console.log("22222222222")
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
         this.UserService.updateUserIsActive(id, eventString).subscribe((res:any) => {
         console.log(res, "response>>>>>>>>>>>>>>>>>>")
         if(res.is_error === false){
          this.userListing()
         }
   });
 }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

}
