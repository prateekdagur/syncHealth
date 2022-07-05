import { Component, OnInit, ViewChild} from '@angular/core';
import { UserService } from '../../services/user.service'
import { Router, ActivatedRoute } from "@angular/router";
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-question-answer',
  templateUrl: './question-answer.component.html',
  styleUrls: ['./question-answer.component.css']
})
export class QuestionAnswerComponent implements OnInit {
  @ViewChild('myTable') table: any;
  itemsPerPage:any = 10
  pageTitle: string = 'Question Listing';
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
    this.questionAnswerListing()
       }
       initColumns() {    
        this.columns = [{name: 'Question', prop: 'question', width: 150, visible: true},  
        { name: 'Never', prop: 'never', width: 150, visible: true, sortable: true},
        { name: 'Sometimes' , prop: 'sometimes', width: 150, visible: true, sortable: true},
        { name: 'Regularly', prop: 'regularly', width: 150, visible: true, sortable: true},
        { name: 'Often', prop: 'often', width: 150, visible: true, sortable: true},
        { name: 'Always', prop: 'always', width: 150, visible: true, sortable: true},
      ];
      }
       questionAnswerListing(){
        this.UserService.questionAnswerListing().pipe(takeUntil(this.destroy$)).subscribe((response) => {
          console.log(response.data, "response>>>>>>>>>>>>>>>>>>")
          this.tableData = response.data
          this.totalCount = this.tableData.length; 
          this.rows = this.tableData;
          this.temp = this.tableData;
           });
      } 

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
  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }
}
