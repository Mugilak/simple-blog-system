import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from "../service/http.service";

@Component({
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    show = true;
    status!: Object | null;
    user = {};
    userData = new FormGroup({
        username: new FormControl('', [Validators.minLength(4), Validators.maxLength(6)]),
        email: new FormControl('', [Validators.email]),
        password: new FormControl('')
    });

    constructor(public router: Router, private http: HttpService) { }

    register() {
        this.show = false;
        this.user = this.userData.value;
        setTimeout(() => {
            this.http.doRegister(this.user).subscribe(
                (response) => {
                    if (response.status == 201) {
                        setTimeout(() => {
                            this.show = true;
                            this.status = response.body;
                            this.router.navigate(['']);
                        }, 700);
                    } else if (response.status == 204) {
                        this.status = "username already exists";
                        this.show = true;
                        this.userData.reset();
                        this.userData.markAsUntouched();
                    }
                },
                (err) => {
                    console.log(err);
                }
            );
        }, 200);
    }

}