import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  private wordList: string[] = [];

  private _url = '../assets/test.txt';

  constructor(private http: HttpClient) {

  }

  getWordList(): string[] {
    return this.wordList;
  }

  getFileContents(): Observable<string> {
    return this.http.get<string>(this._url, {responseType: 'text' as 'json'});
  }
}
