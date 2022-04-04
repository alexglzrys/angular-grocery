import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { saveAs } from 'file-saver';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Upload } from '../interfaces/upload';

const API_URL = environment.api_store;

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  // Descargar archivo de forma programatica (sin la presencia de un enlace HTML)
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


  uploadFile(file: Blob): Observable<Upload> {
    const URL = `${API_URL}/files/upload`;
    
    // Adjuntar el archivo en el cuerpo de la petición
    const dto = new FormData();
    dto.append('file', file);

    return this.http.post<Upload>(URL, dto, {
      // Mandar las cabeceras necesarias si es que el backend las solicita o espera
      /*headers: {
        'Content-type': 'multipart/form-data'
      }*/
    });
  }

}
