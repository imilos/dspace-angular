import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';
import { EPersonDataService } from 'src/app/core/eperson/eperson-data.service';
import { ResearcherService } from '../../../services/researcher.service';
import { ScidarEmail } from '../../../models/scidar-email';
import { NotificationsService } from 'src/app/shared/notifications/notifications.service';
import { TranslateService } from '@ngx-translate/core';

// @ts-ignore
@Component({
  selector: 'ds-email-prijava',
  templateUrl: './email-prijava.component.html',
  styleUrls: ['./email-prijava.component.scss'],
})
export class EmailPrijavaComponent {

  @Input() item_metadata: any;

  // EPerson koji je prijavljen na DSpace
  public user_email: string;
  public user_name: string;

  reportErrorInItemForm = new FormGroup({
    note: new FormControl(''),
  });

  constructor(private AuthService: AuthService, private researcherService: ResearcherService,
    private EPersonService: EPersonDataService, private NotificationService: NotificationsService, protected translateService: TranslateService
  ) { }

  ngOnInit(): void {

    // Retreive email of the authenticated user
    var token = this.AuthService.getToken();

    if (token != null)
      this.AuthService.authenticatedUser(token).subscribe((user) => {
        var id = user.split('/').pop();
        this.EPersonService.findById(id).subscribe((eperson) => {
          this.user_email = eperson.payload.email;
          this.user_name = eperson.payload.name;
        });
      });
    else {
      this.user_email = null;
      this.user_name = null;
    }

  }

  reportErrorInItem(): void {

    var scidar_email: ScidarEmail = new ScidarEmail();

    scidar_email.name = this.user_name;
    scidar_email.email = this.user_email;
    scidar_email.note = this.reportErrorInItemForm.value.note ?? '';
    scidar_email.title = this.item_metadata['dc.title'][0].value ?? '';
    scidar_email.uri = this.item_metadata['dc.identifier.uri'][0].value ?? '';

    if (this.user_email != null) {
      this.researcherService.reportErrorInItem(scidar_email)
        .subscribe( {
          next: () => {
            this.NotificationService.success(this.translateService.get('unic.report.email-sent')  + this.user_email);
            this.reportErrorInItemForm.controls.note.reset();
          },
          error: () => {
            this.NotificationService.error(this.translateService.get('unic.report.cannot-send-the-email'));
          }
        });
    }

  }

}
