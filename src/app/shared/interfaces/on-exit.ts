import { Observable } from "rxjs";

export interface OnExit {
  // Quien implemente esta interfaz esta obligado a definir la lógica del método jsOnExit, la cual deberá retornar un Observable de tipo booleano, o una promesa de tipo booleano, o un valor primitivo de tipo booleano
  jsOnExit: () => Observable<boolean> | Promise<boolean> | boolean
}
