import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from "src/app/app.service";

@Component({
  selector: "app-create-update-poster",
  templateUrl: "./create-update-poster.component.html",
  styleUrls: ["./create-update-poster.component.css"],
})
export class CreateUpdatePosterComponent implements OnInit {
  posterForm!: FormGroup;
  email: any;
  id: any;
  isUpdate: boolean | undefined;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private appService: AppService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.email = paramMap.get("email");
      this.id = paramMap.get("id");
      this.isUpdate = paramMap.get("isUpdate") == "true" ? true : false;
    });
    this.posterForm = this.fb.group({
      title: ["", [Validators.required]],
      subTitle: ["", [Validators.required]],
      tag: ["", [Validators.required]],
      content: ["", [Validators.required]],
    });

    if (this.isUpdate) {
      this.appService.checkSignupEmail(this.email).subscribe((res) => {
        let singleObject: any;
        res.posterData.forEach((item: any) => {
          if (item?.id == this.id) {
            singleObject = item;
            return;
          }
        });
        this.posterForm.get("title")?.setValue(singleObject.title);
        this.posterForm.get("subTitle")?.setValue(singleObject.subTitle);
        this.posterForm.get("tag")?.setValue(singleObject.tag);
        this.posterForm.get("content")?.setValue(singleObject.content);
      });
    }
  }

  Submit() {
    if (this.isUpdate) {
      let body = {
        title: this.posterForm.get("title")?.value,
        subTitle: this.posterForm.get("subTitle")?.value,
        tag: this.posterForm.get("tag")?.value,
        content: this.posterForm.get("content")?.value,
      };
      this.appService.updatePoster(this.email, this.id, body).subscribe(
        (res) => {
          setTimeout(() => {
            this.cancel();
          }, 1000);
        },
        (error) => {}
      );
    } else {
      let body = {
        title: this.posterForm.get("title")?.value,
        subTitle: this.posterForm.get("subTitle")?.value,
        tag: this.posterForm.get("tag")?.value,
        content: this.posterForm.get("content")?.value,
      };
      this.appService.createPoster(this.email, this.id, body).subscribe(
        (res) => {
          setTimeout(() => {
            this.cancel();
          }, 1000);
        },
        (error) => {}
      );
    }
  }

  cancel() {
    this.router.navigate([`poster-list/${this.email}`]);
  }
}
