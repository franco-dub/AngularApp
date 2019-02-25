import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
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

export class FilesListComponent implements OnChanges {

  @Input() module: Module;
  @Input() changing: TeachingMaterial;
  files: Array<TeachingMaterial>;

  displayedColumns: string[] = ['delete', 'fileName', 'created', 'size', 'fileType'];

  constructor(private getService: GetService,
    private deleteService: DeleteService) {
  }


  ngOnChanges(changes: SimpleChanges) {
    this.loadFileList();
}



  loadFileList() {
    this.getService.findFileByModule(this.module.moduleId).subscribe(files => {
      this.files = files;
      console.log(this.files);
      if (this.files != null) {
        this.files.sort((val1, val2) => new Date(val2.created).valueOf() - new Date(val1.created).valueOf());
        this.files.forEach(file => {
          this.getService.findRatingByTMId(file.teachingMaterialId).subscribe(ratings => {
            if (ratings != null) {
              let sum = 0;
              ratings.forEach(rating => {
                sum = sum + Number(rating.rate);
              });
              const average = sum / ratings.length;
              file.meanRate = average;
              console.log(file.meanRate);
            }
          });
        });
      }
    });
  }

  onDelete(element) {
    this.deleteService.deleteFile(element).subscribe(() => {
      this.loadFileList();
    });
    console.log(element);
  }

  download(element) {
    console.log(element);
    window.open(this.getService.downloadFile(element.teachingMaterialId), '_blank');
  }

  humanFileSize(bytes, si) {
    const thresh = si ? 1000 : 1024;
    if (bytes < thresh) { return bytes + ' B'; }
    const units = si ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    do {
      bytes /= thresh;
      ++u;
    } while (bytes >= thresh);
    return bytes.toFixed(1) + ' ' + units[u];
  }
}
