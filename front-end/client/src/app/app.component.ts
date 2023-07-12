import { ExpenseService } from './expense.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy, OnInit {
  constructor(private expenseService: ExpenseService) {}

  title = 'ExpenseApp';

  expenseForm = new FormGroup({
    name: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
  });

  users: any[] = [];
  payout: any;
  userCount = 0;

  destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnInit(): void {
    this.expenseService.getInfo();
  }

  onSubmit() {
    this.users.push(this.expenseForm.value);
    this.expenseForm.reset();
  }

  calculatePayout() {
    console.log('hi');
    this.payout = this.expenseService.calculatePayout(this.users);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
