// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  APP_NAME:"Sync Health",
  API_ENDPOINT:'https://apisynchealth.trigma.in',
  MESSAGES:{
    "SUCCESSFULLY-LOGOUT":"Loggedout Successfully",
    "CHECKING-AUTHORIZATION":"Checking Authorization",
    "SAVING-INFO":"Saving Information. Please Wait..",
    "SUCCESSFULLY-SAVED":"Your information has been saved successfully.",
    "FETCHING-RECORDS":"Fetching Records",
    "SUCCESSFULLY-DELETED":"Record has been deleted successfully.",
    "SUCCESSFULLY-UPDATED":"Record has been updated successfully.",
    "CAN-NOT-DELETE":"Can not delete this record because it is attached with other records",
    "EMAIL-SENT":"Email has been sent. Please check your inbox for further instructions.",
    "STATUS-UPDATED":"Status has been updated successfully.",
    "SYSTEM-ERROR":"We got some system error. Please try again.",  
    "FETCHING-RECORD":"Fetching Record Data",
    "NOT-AUTHORIZED":"You are not authorized to access as a admin."
    
  }
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
