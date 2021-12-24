import { Component , ElementRef, ViewChild } from '@angular/core';
import { HTTPService } from '../../http.service';
import { AppSettings } from '../../config/config.module';
import { NgForm, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
    // moduleId: module.id,
    selector: 'content-component-articles',
    templateUrl: 'articles.component.html',
    styleUrls: [ 'articles.component.css' ],
    providers: [HTTPService, AppSettings]
})

export class ArticlesComponent{
    constructor( private _httpService: HTTPService, private elRef: ElementRef ){
        this.getCategories();
        this.getArticles();
        this.Frontend_url = AppSettings.FRONTEND_URL;
        // console.log(pp);
    }
    @ViewChild('form') form: FormGroupDirective;
    @ViewChild('filterButton') filterButton: ElementRef<HTMLElement>;
    Frontend_url = '';
    CategoriesData: any = [];
    ArticlesData: any = [];
    pager:any = [];
    sort = 'publish_date';

    postData: any;

    sortChange(e){
        this.sort = e.target.value;
        let el: HTMLElement = this.filterButton.nativeElement;
        el.click();
    }

    Filter(e){
        e.preventDefault();

        var data = {
            media_type: null,
            q: null,
            article_type: null,
            category_id:null,
            date: null
        };

        var useoption = false;

        for(var i = 0; i < e.target.elements.length; i++){
            if(e.target.elements[i].name == 'submit')
            continue;
            if( e.target.elements[i].type == 'checkbox' ){

                if( e.target.elements[i].checked ){
                    data[e.target.elements[i].name] = 1;
                    useoption = true;
                }
            }else{
                if(e.target.elements[i].value != ""){
                    data[e.target.elements[i].name] = e.target.elements[i].value;
                    useoption = true;
                }
            }
        }


        let get_data:any = false;
        if(useoption){
            var options = ['paginate'];

            if(data.media_type != null ){
                options.push(data.media_type);
            }

            if(data.article_type != null ){
                options.push('type,'+data.article_type);
            }

            var option = options.join('|');

            get_data = 'articles?';

            let get_data_arra:any = ['include_unpublished=true'];

            get_data_arra.push('options='+option);
            get_data_arra.push('minimal=true');
            if(data.q != null ){
                get_data_arra.push('q='+data.q);
            }

            if(data.date != null ){
                get_data_arra.push('date='+data.date);
            }

            if(data.category_id != null ){
                get_data_arra.push('category_id='+data.category_id);
            }

            get_data += get_data_arra.join('&');
            console.log(get_data);


        }

        this.getArticles(1, get_data);
    }

    getCategories(){
        this._httpService.getData('categories?withHidden=true').subscribe(
            data => this.CategoriesData = data,
            error => alert(error),
            () => this.generateCategories()
        );

    }

    generateCategories(){
        var cats = JSON.parse(this.CategoriesData._body);
        var new_data = [{id:'', title: 'აირჩიეთ კატეგორია' }];

        for(var i=0; i < cats.length; i++ ){
            new_data.push({ id:cats[i].id, title:cats[i].title });
            if(cats[i].children.length > 0){
                for(var j=0; j < cats[i].children.length; j++ ){
                    new_data.push({ id: cats[i].children[j].id, title: '-- '+cats[i].children[j].title });
                    if(cats[i].children[j].children.length > 0){
                        for(var ij=0; ij < cats[i].children[j].children.length; ij++ ){
                            new_data.push({ id: cats[i].children[j].children[ij].id, title: '---- '+cats[i].children[j].children[ij].title });
                        }
                    }

                }
            }
        }



        this.CategoriesData = new_data;
    }

    getArticles(page = 1, get_data:any = false){
        if(!get_data){
            get_data = 'articles?include_unpublished=true&is_admin=true&minimal=true&options=paginate|';
        }
        this._httpService.getData(get_data+'&sort='+this.sort+'&page='+page).subscribe(
            data => this.ArticlesData = data,
            error => alert(error),
            () => this.generateArticles()
        );

    }

    generateArticles(){

        var articles = JSON.parse(this.ArticlesData._body);
        console.log(articles);
        this.ArticlesData = articles;

        this.pager = this.generatePagination(this.ArticlesData.total,this.ArticlesData.current_page,this.ArticlesData.per_page);
    }



    setPage(page){
        this.getArticles(page);
    }

    generatePagination(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
        // calculate total pages
        let totalPages = Math.ceil(totalItems / pageSize);

        let startPage: number, endPage: number;

        if (totalPages <= 5) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= 3) {
                startPage = 1;
                endPage = 5;
            } else if (currentPage + 1 >= totalPages) {
                startPage = totalPages - 4;
                endPage = totalPages;
            } else {
                startPage = currentPage - 2;
                endPage = currentPage+2;
            }
        }

        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        let pages = this.range(startPage, endPage + 1);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }


    range(start, stop, step = 1) {
        if (stop == null) {
          stop = start || 0;
          start = 0;
        }
        if (!step) {
          step = stop < start ? -1 : 1;
        }

        var length = Math.max(Math.ceil((stop - start) / step), 0);
        var range = Array(length);

        for (var idx = 0; idx < length; idx++, start += step) {
          range[idx] = start;
        }

        return range;
    };


    delete(id:any){

        let data = { _method: 'DELETE' };

        this._httpService.postData( 'articles/'+id , data).subscribe(
            // error => alert(error),
            () => this.getCategories()
        );
    }


    activeActions(th){
        th.target.parentElement.parentElement.classList.toggle('show');
    }
}
