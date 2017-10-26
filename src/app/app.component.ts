import { Component, ViewChild } from '@angular/core';
import { Idle, DEFAULT_INTERRUPTSOURCES, AutoResume } from '@ng-idle/core';
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
    idle.setIdle(30);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(30);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.setAutoResume(AutoResume.notIdle);

    idle.onIdleEnd.subscribe(() => {
      console.log('onIdleEnd: '+Date());
    });


    idle.onTimeout.subscribe(() => {
      console.log('onTimeout: ' + Date());

      this.idleState = 'Timed out!';
      this.timedOut = true;
      this.staticModal.hide();
    });
    idle.onIdleStart.subscribe(() => {
      console.log('onIdleStart: ' + Date());

      this.staticModal.show();
      this.idleState = 'You\'ve gone idle!';
    });
    idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = 'You will time out in ' + countdown + ' seconds!';
    });
    this.reset();

  }
  resetView() {
    this.staticModal.hide();
    this.reset();
  }

  reset() {

    console.log('reset: ' + Date());

    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }
}
