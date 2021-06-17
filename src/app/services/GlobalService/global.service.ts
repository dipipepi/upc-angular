import { Injectable } from '@angular/core';
import {Title} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private titleService: Title) { }


}
