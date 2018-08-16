import { Component, OnInit } from '@angular/core';
import {Teaching} from "../../models/Teaching";
import {PostService} from "../../../servicies/post.service";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-teaching',
  templateUrl: './add-teaching.component.html',
  styleUrls: ['./add-teaching.component.css']
})
export class AddTeachingComponent implements OnInit {


  teaching: Teaching;

  name: string = '';
  credits: number = 0;
  description: string = '';
  semester: number = 0;

  missingArguments: boolean = false;
  wrongCharacter: boolean = false;

  constructor(private postService: PostService) { }

  ngOnInit() {
  }

  onSubmit(){

    this.missingArguments = (((this.name || this.description) == '') || (this.credits < 3 || this.credits > 18) ||
                                                                            this.semester == 0);
    this.wrongCharacter = (this.credits < 3 || this.credits > 18);

    if (!this.missingArguments && ! this.wrongCharacter){

      let teaching: Teaching = {
        name: this.name,
        credits: this.credits,
        description: this.description,
        semester: this.semester
      };

      this.postService.saveTeaching(teaching).subscribe(returned => {
        console.log(returned)
      });

    }

  }

}
