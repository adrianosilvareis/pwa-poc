import { Component, Input } from '@angular/core';
import { Links } from './links';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Input() title = '';
  @Input() links: Links[] = [];
}
