import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  getFile(name: string, url: string, type: string) {
    return this.http.get(url, { responseType: 'blob' }).pipe(
      // Transformar un objeto binario de tamaño considerable en un archivo para descarga
      tap(content => {
        const blob = new Blob([content], { type });
        saveAs(blob, name);
      }),
      // Transformar la respuesta (aunque no sea originalmente un arreglo)
      map(() => true)
    )
  }

}
