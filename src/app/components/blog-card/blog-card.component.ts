import { Component, ViewChild } from '@angular/core';
import { BlogServiceService } from 'src/app/services/blog-service.service';
import { PageEvent, MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.css']
})
export class BlogCardComponent {

  posts: any[] = [];
  paginatedPosts: any[] = [];
  currentPage: number = 0;
  postsPerPage: number = 5;
  totalPosts: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private blogService: BlogServiceService ){

  }

  ngOnInit(){
    this.blogService.getPosts().subscribe((data: any[]) => {
      this.posts = data;
      this.totalPosts = data.length;
      this.setPage();
      console.log('posts', this.posts)
    });
  }

  setPage(event?: PageEvent): void {
    this.currentPage = event ? event.pageIndex : this.currentPage;
    this.postsPerPage = event ? event.pageSize : this.postsPerPage;
    const start = this.currentPage * this.postsPerPage;
    const end = start + this.postsPerPage;
    this.paginatedPosts = this.posts.slice(start, end);
  }
}
