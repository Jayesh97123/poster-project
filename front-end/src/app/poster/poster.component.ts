import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from "../app.service";
import { Subject, debounceTime } from "rxjs";

@Component({
  selector: "app-poster",
  templateUrl: "./poster.component.html",
  styleUrls: ["./poster.component.css"],
})
export class PosterComponent implements OnInit {
  @ViewChild("search")
  search!: ElementRef;
  subject: Subject<any> = new Subject();
  posterList: any;
  posterListcompare: any;
  email: any;
  id: any;

  constructor(
    private router: ActivatedRoute,
    private appService: AppService,
    private rout: Router
  ) {}

  ngOnInit(): void {
    this.router.paramMap.subscribe((paraMap) => {
      this.email = paraMap.get("email");
    });

    this.getPosterData(this.email);

    this.subject.pipe(debounceTime(300)).subscribe((res) => {
      let filterListData: any[] = [];
      this.posterListcompare.forEach((item: any) => {
        if (item?.tag?.startsWith(res) || item?.tag?.endsWith(res)) {
          filterListData.push(item);
        }
      });
      this.posterList = filterListData;
    });
  }

  getPosterData(email: any) {
    this.appService.checkSignupEmail(email).subscribe(
      (res) => {
        this.posterList = res.posterData;
        this.posterListcompare = res.posterData;
      },
      (error) => {}
    );
  }

  searchValue(value: any) {
    this.subject.next(value);
  }

  editPoster(id: any) {
    this.rout.navigate([`/poster-form/${this.email}/${id}/true`]);
  }

  createPoster() {
    this.rout.navigate([`/poster-form/${this.email}/newUser/false`]);
  }

  signOut() {
    this.rout.navigate(["/login"]);
  }
}
