import { Component, ViewChild } from '@angular/core';
import { Idle, DocumentInterruptSource } from '@ng-idle/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('staticModal') public staticModal: ModalDirective;
  idleState = 'Not started.';
  timedOut = false;
  title = 'app';

  constructor(private idle: Idle) {
    // sets an idle timeout of 5 seconds, for testing purposes.
    idle.setIdle(40);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(20);

    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts([new DocumentInterruptSource(
      'mousedown'),
    ]);

    idle.onIdleEnd.subscribe(() => {
      console.log('idleEnd: ' + Date());
      // write logic to logout or removal of cookie
      // this.staticModal.show();
    });
    idle.onTimeout.subscribe(() => {
      console.log('on Timeout: ' + Date());
      this.idleState = 'Timed out!';
      this.timedOut = true;
      this.staticModal.hide();
    });
    idle.onIdleStart.subscribe(() => {
      console.log('idle Start: ' + Date());

      this.staticModal.show();
      this.idleState = 'You\'ve gone idle!';
    });
    idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = 'You will time out in ' + countdown + ' seconds!';
    });
    this.reset();

  }
  reset() {
    console.log('reset: ' + Date());
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }
}
