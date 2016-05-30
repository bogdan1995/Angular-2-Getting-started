
import {Injectable} from "angular2/core";
import {IProduct} from "./product";
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()

export class ProductService {
    private _productUrl = 'api/products/products.json';

    constructor(private _http: Http) {

    }
    getProducts(): Observable<IProduct[]> {
        return this._http.get(this._productUrl)
            .map((response: Response) => <IProduct[]>response.json())
            .do(data => console.log(`All: ${JSON.stringify(data)}`))
            .catch(ProductService.handleError);
    }

    getProduct(id: number): Observable<IProduct> {
        return this._http.get(this._productUrl)
            .map((response: Response) => {
                return <IProduct>(
                    response.json().find((product: IProduct) => {
                        return product.productId === id;
                    })
                )
            })
            .do(data => {
                // console.clear();
                console.log(`Data: ${JSON.stringify(data)}`)
            })
            .catch(ProductService.handleError);
    }

    private static handleError(error: Response) {
        console.log(error);
        return Observable.throw(error.json().error || 'Server error')
    }
}