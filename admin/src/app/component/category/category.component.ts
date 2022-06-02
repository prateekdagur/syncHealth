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
    itemsPerPage:any = 2
  pageTitle: string = 'Release Notes - List View';
  Version: string = '';
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
  enableFilters = [
    'dateOptions',
    'releaseNotesVersions',
    'releaseNotesTypes'
  ];
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
  videoObj:any = {}
  selectedNotes:any = [];
  rows:any = []
  loading:boolean = false
  
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private UserService:UserService, private router: Router) { }

  ngOnInit(): void {
    this.initColumns()
    this.tableData = [
      { nameCategory: 'Austin', createdAt: '23'},
      { nameCategory: 'Dany', createdAt: '24'},
      { nameCategory: 'Molly', createdAt: '25'},
      { nameCategory: 'Mark', createdAt: '26'}
    ];

      this.categoryListing()
       }
       initColumns() {    
        this.columns = [{name: 'Name', prop: 'nameCategory', width: 100, visible: true, sortable: false }, 
        { name: 'Date', prop: 'createdAt',  width: 150, visible: true, sortable: true, type: 'date', showMore: false},];
      }
      categoryListing(){
        this.UserService.categoryListing().pipe(takeUntil(this.destroy$)).subscribe(response => {
          
          console.log(response.data[0].category, "response>>>>>>>>>>>>>>>>>>")
          //this.rows = response.data
           });
      } 
      // pageChangeEvent(event: number) {
      //   this.p = event;
      //   this.categoryListing();
      // }
      onSort(event:any) {
        // event was triggered, start sort sequence
        console.log('Sort Event', event);
        this.loading = true;
        // emulate a server request with a timeout
        setTimeout(() => {
          const rows = [...this.rows];
          // this is only for demo purposes, normally
          // your server would return the result for
          // you and you would just set the rows prop
          const sort = event.sorts[0];
          rows.sort((a, b) => {
            return a[sort.prop].localeCompare(b[sort.prop]) * (sort.dir === 'desc' ? -1 : 1);
          });
    
          this.tableData = rows;
          this.loading = false;
        }, 1000);
      }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

}
