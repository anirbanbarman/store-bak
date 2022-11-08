
import { infoMessage } from './toaster';

 export function errorHandle(response:any){

  if (typeof (response.message) == "object") {
    let keys = Object.keys(response.message)
    keys.forEach((key) => {
      let errorMessageQ = Object.keys(response?.message[key])
      errorMessageQ.forEach((errorM) => {
        infoMessage(response?.message[key][errorM]);

      })

    })

  }
  else {
    infoMessage(response?.message);

  }

}
