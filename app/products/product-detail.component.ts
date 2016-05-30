import {Component, OnInit} from "angular2/core";
import {RouteParams, Router} from "angular2/router";
import {ProductService} from "./product.service";
import {IProduct} from "./product";
import {StarComponent} from "../shared/star.component";

@Component({
    templateUrl: 'app/products/product-detail.component.html',
    directives: [StarComponent]
})

export class ProductDetailComponent implements OnInit{

    pageTitle: string = 'Product Detail';
    id: number;
    product: IProduct;
    errorMessage: string;

    constructor(private _routeParams: RouteParams,
                private _router: Router,
                private _productService: ProductService) {

        this.id = +this._routeParams.get('id');
    }

    onBack(): void {
        this._router.navigate(['Products']);
    }

    ngOnInit(): void {
        this._productService.getProduct(this.id)
            .subscribe(
                product => {
                    this.product = product
                },
                error => this.errorMessage = <any>error
            )
    }
}
