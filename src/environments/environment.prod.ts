// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: "https://ecovista.kanhaiya.co.in/index.php/",
  mediaURL: 'https://ecovista.kanhaiya.co.in/uploads/',
  authToken: 'ecovista',
  type: "service_account",
  project_id: "striking-water-363204",
  private_key_id: "d7766fa4cbd75e24160bbdd56903e8b37f2833ae",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDMhxVUTIR6a7gI\nqDT8gH/OrOQywJ+WnOtp/VA9f2kc3dlJLISZLdzLjPCoQsxFPHY88yxs/ASIaUaT\neeKPcuEw9qCoP7XSC45UqOUX/6JeYN8HNKiuqtG1u2J6sOttYXxtxUjBmsBrRp62\n8GYtFqAtq+333Og0AXprQ7LyUDr6EMP5iUXlLEXZ0r7ITGTUg8fT0mEOGJWKb9Va\nToa4O2fM44mvK/AAelZFV+VCyMfZLiKjvGVO63u0rP7bxdCYxA665jMIojp8q7vv\nSWjIbPmAxLXlOKkSJiWBJ6t9nLk6HAYa7Sxk0xqjI2MkAQoXCZpGRFPHtg/3lJuw\n5O9jKeTHAgMBAAECggEAWp0ohoImGYTa8r7vRsV5mmv/6DpuGhDovbsUj0KBI+Bo\nMaKvFpx6m5YUUz/Q94XLjsJf9uMK8RLPSWxxQ4OuoH5L/G7Jk8c55mkzopfH7I93\nkF40s7oLkjv0bA4xJ/NOaOXEj74LrRuLGtrUMfq5ubJYCn4NRGk5Pwet4uxHzNzQ\neIW0CzKPC9tuIY+BgBHwPI28F6+6tWCosbPlfMtvcRa0cbMuhr7sp+WP0qr3NLuC\nVTUk4ZxOa1S/Jrfe7+tSsnAIlqqSpSWmE0IpCwSJCOTZlcTcuXLz1IR6EW9hhc9J\nvFkxKyb7DD0wZ4o74SFiKMMxmCzX7N5sokfwLcC5XQKBgQD0qjFE06qWv28pfRiB\njSPDWQ/AbvT8BGqohfj5JCK5m9hJSuRefFexyPaonDOadYxAyPU+lHBghc6ZtpTc\nBtYmtllvu/nlzlKAN/ljML9QkQt/BvYZDq+BDfI309kmgtbLqIUraFQh2LS5u3QB\nrVibVEzI56SK7hQeHmr8qzLEiwKBgQDWANnJauvSo9EKE6EVUD2rQhBqrUGeDe2H\nILn7w8K7dMuZMN4jvklzVFPfhXSa0kyBFqBkUgAPCoiD6WrnALpIcLm4MEL6n9ek\nX0m924S7XThjUAco0s1QO3dg7aCUYo9ymrDaOqPMPfGCsRylWlxvlTTvYQlgYSIj\nOGPgKXgcNQKBgQDkfhF3Ospk8LGLKKX7T2mn5YQdbkJjHmjRrBTB8Gpxt0b94/B1\nAWEQyyL4grB6vu7WDhdjc1OkATLaQTayabwT+VZ7UC1o3hAUaLICXaM+RcdbwY+S\nBTIIr5KXasSw/55EIsUDrfJsjaryjksfydknb0oqkpMLoJ6vJi86e1P1UwKBgQCN\nVQ6AOT75Y/sgXopZ2x5/Rig1a6sUSTp/rZtmrIik6KO1zlJG5Nr5cc3apva1cQHZ\nlyniV012oYw7IiLZ4N8mDFx7SlRR1NLD2bKH0rw8SXp+DFJOIbo6rKtQtl8A4H7A\nP21hEq0urBIeL/4tLhoyDyZgmYNpxXyYKhu75WdPqQKBgB72eMTTDlWlPjIAkXf3\nNIcb82asWUOW1a8jKVyMYO+7smePq5Hy286L1fKUhpzdxqok+z9QRU9YKF2aJzs0\n+Nul9+3lYL+5A7DUxrcakFIC2IW+XLw4D1RYlVv/m0mYYlM5zrjCzVi+21tUh8uH\niMUp+U9ormV0F3pgFmOKkkOb\n-----END PRIVATE KEY-----\n",
  client_email: "angular2googlesheet@striking-water-363204.iam.gserviceaccount.com",
  client_id: "115389139090544929629",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/angular2googlesheet%40striking-water-363204.iam.gserviceaccount.com",
  sheertURL: "https://script.google.com/macros/s/AKfycbxwdFfVSwXbnFdHD3JYnfLm5508ySEH8HddLKviJBoHNlzlYqAsBW8eqYhfdmLvTqb9wA/exec",
  apiUrls: {
   
    apis: {
      adminLogIn:'user/login',
      updateuser:'user/editList',
     
      //Weightscale
      StoreitemList:'Storeitems/getAll',
      saveStoreitems:'Storeitems/save',
      updateStoreitems:'Storeitems/editList',
      getStoreitems:'Storeitems/getById',   
      deleteStoreitems:'Storeitems/deleteList',
      getStockQuantityByItem:'Storeitems/getStockQuantityByItem',
      getStockReport:'Storeitems/getStockReport',


      ItemreceiveList:'Itemreceive/getAll',
      saveItemreceives:'Itemreceive/save',
      updateItemreceives:'Itemreceive/editList',
      getItemreceives:'Itemreceive/getById',   
      deleteItemreceives:'Itemreceive/deleteList',

      ItemissueList:'Itemissue/getAll',
      saveItemissues:'Itemissue/save',
      updateItemissues:'Itemissue/editList',
      getItemissues:'Itemissue/getById',   
      deleteItemissues:'Itemissue/deleteList',


	  
    }
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
