import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpService } from "../service/http.service";

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    user = {};
    show = true;
    error = false;
    errorData = "";
    userData = new FormGroup({
        username: new FormControl(''),
        password: new FormControl('')
    });

    constructor(public router: Router, private http: HttpService) { }

    ngOnInit() {
        // this.http.clearData();
    }

    login() {
        this.error = false;
        this.show = false;
        this.user = this.userData.value;
        this.http.clearData();
        setTimeout(() => {
            this.http.doLogin(this.user).subscribe(
                (response) => {
                    if (response.status == 200) {
                        let token = response.body;
                        const name = this.userData.value.username + "";
                        this.http.setData("username", name);
                        this.http.setData("token", JSON.stringify(token));
                        this.router.navigate(['home']);
                    }
                    else if (response.status == 201) {
                        this.error = true;
                        this.show = true;
                        this.errorData = "*Invalid " + response.body;
                    }
                },
                (error) => {
                    this.error = true;
                    this.show = true;
                    this.errorData = 'could not login, Try again..'
                    console.log(error);
                }
            )
        }, 500);
    }

}