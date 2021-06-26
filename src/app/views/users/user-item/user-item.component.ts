import { Component, Input, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss'],
})
export class UserItemComponent implements OnInit {
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
}
