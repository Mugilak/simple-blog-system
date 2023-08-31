import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class HttpService {
    url = "http://localhost:3000/";

    constructor(private http: HttpClient) { }

    public doLogin(userData: any) {
        return this.http.post<Object>(this.url + "login", userData, { observe: 'response' });
    }

    public doRegister(userData: {}) {
        return this.http.post<Object>(this.url + "register", userData, { observe: 'response' });
    }

    getBlogs() {
        return this.http.get<Object>(this.url + "blogs", { observe: 'response' });
    }

    getBlogsByAuthorName(authorName: any) {
        return this.http.get<Object>(this.url + "blogs/" + (authorName), { observe: 'response' });
    }

    setData(key: string, value: string) {
        localStorage.setItem(key, value);
    }

    getData(key: string): string {
        if (localStorage.getItem(key) == "") {
            return "";
        }
        return String(localStorage.getItem(key));
    }

    clearData() {
        localStorage.clear();
    }
}