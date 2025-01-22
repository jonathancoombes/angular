import { Directive, ElementRef, signal, inject, input, effect } from '@angular/core';

@Directive({
  selector: '[appHighlightCompletedTodo]'
})
export class HighlightCompletedTodoDirective {
  isCompleted = input(false);
  constructor() { }

  el = inject(ElementRef);

  stylesEffect = effect (() => {
    if (this.isCompleted()){
      this.el.nativeElement.style.textDecoration = 'line-through';
      this.el.nativeElement.style.textDecoration = '#d3f9d8';
      this.el.nativeElement.style.textDecoration = '#6c757d';
    } else {
      this.el.nativeElement.style.textDecoration = 'none';
      this.el.nativeElement.style.textDecoration = '#fff';
      this.el.nativeElement.style.textDecoration = '#000';
    }
  })

}
