import { Component, HostListener, Input, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { User } from 'src/app/shared/models/user';
@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss'],
})
export class UserItemComponent implements OnInit {
  @HostListener('click', ['$event.target'])
  onClick(btn) {
    this.moveToTop();
  }

  @Input() user: User;
  @Input() index: number;
  public isMobile: boolean;

  constructor(private deviceService: DeviceDetectorService) {
    this.isMobile = false;
  }

  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile();
  }

  show(email: string) {
    alert(email);
  }

  moveToTop() {
    window.scrollTo(0, 0);
  }
}
