import { Component, OnInit, Input } from '@angular/core';
import { GetService } from '../../../servicies/get.service';
import { AuthService } from '../../../servicies/auth.service';
import { Module } from '../../models/Module';
import { TeachingMaterial } from '../../models/TeachingMaterial';
import { DeleteService } from '../../../servicies/delete.service';
import { Subject } from 'rxjs';
import {RoutingService} from '../../../servicies/routing.service';

@Component({
  selector: 'app-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.css']
})

export class FilesListComponent implements OnInit {

  @Input() module: Module;
  @Input() changing: Subject<boolean>;
  files: Array<TeachingMaterial>;

  constructor(private getService: GetService,
              private router: RoutingService,
              private authService: AuthService,
              private deleteService: DeleteService) {
              }

  ngOnInit() {
    this.changing.subscribe(v => {
      console.log('value is changing', v);
      this.loadFileList();
    });
    this.loadFileList();
  }
  displayedColumns: string[] = ['delete', 'fileName', 'fileType', 'created', 'size'];

  loadFileList(){
    this.getService.findFileByModule(this.module.moduleId).subscribe(files =>{
      this.files = files;
      console.log(this.files)
    });
  }
  onDelete(element){
    this.deleteService.deleteFile(element).subscribe( () => {
        this.loadFileList();
    });
    console.log(element);
  }
}
