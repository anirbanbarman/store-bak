import * as Notiflix from "notiflix";


 export function successMessage(message: any){
  Notiflix.Notify.success(message);
}

export function failMessage(message: any){
  Notiflix.Notify.failure(message);
}
export function infoMessage(message: any){
  Notiflix.Notify.info(message);
}
export function warningMessage(message: any){
  Notiflix.Notify.warning(message);
}
