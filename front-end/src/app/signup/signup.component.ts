import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppService } from "../app.service";
import { error } from "console";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;
  checkEmail: boolean = false;
  showMsg: boolean = false;

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      name: ["", [Validators.required]],
      email: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
          ),
        ],
      ],
      password: ["", [Validators.required]],
    });
  }

  signUp() {
    this.appService
      .checkSignupEmail(this.signUpForm.get("email")?.value)
      .subscribe(
        (res) => {
          console.log(res);
          this.checkEmail = true;
        },
        (error) => {
          console.log(error);
          this.checkEmail = false;
          let body = {
            name: this.signUpForm.get("name")?.value,
            email: this.signUpForm.get("email")?.value,
            password: this.signUpForm.get("password")?.value,
          };
          this.appService.createUser(body).subscribe(
            (res) => {
              console.log(res);
              this.showMsg = true;
              setTimeout(() => {
                this.router.navigate(["/login"]);
              }, 1000);
            },
            (err) => {
              this.showMsg = false;
            }
          );
        }
      );
  }

  cancel() {
    this.router.navigate(["/login"]);
  }
}
