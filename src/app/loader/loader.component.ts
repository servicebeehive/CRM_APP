import { Component, OnInit } from '@angular/core';
import { AssignmentService } from 'src/app/services/assignment/assignment.service';
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  constructor(public assignmentService: AssignmentService) {}
  ngOnInit() {}
}
