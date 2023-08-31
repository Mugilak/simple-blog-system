import { Component, OnInit } from "@angular/core";
import { HttpService } from "../service/http.service";
import { Router } from "@angular/router";
import { FormControl, FormGroup } from "@angular/forms";
import { formatDate } from "@angular/common";

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    showCreate = false;
    showProgress = false;
    currentUser!: string;
    blogsData: any;

    constructor(private http: HttpService, private router: Router) { }

    ngOnInit() {
        this.http.getBlogs().subscribe(
            (response) => {
                this.blogsData = JSON.parse(JSON.stringify(response.body));
                this.currentUser = this.http.getData("username");
                console.log(this.currentUser);
            }
        );
    }

    blog = new FormGroup({
        title: new FormControl(''),
        description: new FormControl(''),
        time: new FormControl(),
        author: new FormControl('')
    });

    getBlog(blogId: any) {
        this.showProgress = false;
        console.log(blogId);
    }

    getAuthorBlog(authorName: any) {
        this.showProgress = false;
        let data;
        this.http.getBlogsByAuthorName(String(authorName)).subscribe(
            (response) => {
                data = JSON.parse(JSON.stringify(response.body));
                console.log(data);
            }
        );
    }

    createBlog() {
        this.showProgress = false;
        this.showCreate = true;
        console.log(this.showCreate);
    }

    submit() {
        this.showCreate = false;
        this.showProgress = true;
        setTimeout(() => {
            this.blog.value.author = this.currentUser;
            this.blog.value.time = formatDate(new Date(), 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
            this.showProgress = false;
            let blogData = this.blog.value;
            console.log(blogData);
        }, 500);
    }
}