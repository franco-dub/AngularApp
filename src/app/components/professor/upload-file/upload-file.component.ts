import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../servicies/post.service';
import { HttpClient } from '@angular/common/http';
import { AuthGuardService } from '../../../servicies/auth-guard.service';
import { AuthService } from '../../../servicies/auth.service';
import { GetService } from '../../../servicies/get.service';
import { Module } from '../../models/Module';
import { Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  profId: number = null;
  selectedFile: File = null;
  modules: Array<Module> = [];
  selectedModule: Module = null;
  changingValue: Subject<boolean> = new Subject();

  constructor(private postService: PostService,
              private getService: GetService,
              private http: HttpClient,
              private authService: AuthService,
              private firestore: AngularFirestore) {
                this.profId = this.authService.getLoggedUser('user').professorId;
               }

  ngOnInit() {
    this.getService.findModuleByProf(this.profId).subscribe(modules => {
      this.modules = modules;
    });
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  modulesFile(selectedModule) {
    console.log(this.selectedModule);
    console.log(selectedModule);
  }
  onUpload() {
    this.postService.uploadFile(this.selectedFile, this.selectedModule.moduleId).subscribe(res =>{
      console.log(res);
      this.changingValue.next(true);
      this.firestore.collection('modules').doc(String(this.selectedModule.moduleId))
        .collection('notifications').add(
          {
            module: this.selectedModule.title,
            text: 'Nuovo file caricato: ' + this.selectedFile.name
          }
        );
    });
  }
}
