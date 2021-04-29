import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/interfaces.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  form!: FormGroup;
  submitted = false;

  constructor(
    private auth:AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(undefined, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(undefined, [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  submit() {
    if(this.form.invalid) {
      return
    }

    this.submitted = true;

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }

    this.auth.login(user).subscribe(() => {
      this.form.reset();
      this.router.navigate(['./bookmarks']);
      this.submitted = false;
    }, () => {
      this.submitted = false;
    });
  }

}
