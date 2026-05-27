import { Directive, TemplateRef, input } from '@angular/core';

@Directive({ selector: 'ng-template[appTableColumn]' })
export class TableColumnDirective {
  readonly key = input.required<string>();
  readonly header = input.required<string>();
  readonly srOnly = input(false);

  constructor(readonly templateRef: TemplateRef<{ $implicit: unknown }>) {}
}
