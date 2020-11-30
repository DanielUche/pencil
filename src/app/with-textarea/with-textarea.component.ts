import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-with-textarea',
  templateUrl: './with-textarea.component.html',
  styleUrls: ['./with-textarea.component.scss']
})
export class WithTextareaComponent implements OnInit {

  title = 'Mathjax playground in Angular 6';
  mathContent = `When $ a \\ne 0 $, there are two solutions to $ ax^2 + bx + c = 0 $ and they are $$ x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}$$`
  constructor() { }

  ngOnInit(): void {
  }

  doSomething(e) {
    console.log(e)
  }

}
