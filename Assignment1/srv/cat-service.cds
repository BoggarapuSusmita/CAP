using my.products as my from '../db/data-model';

service ProductService {
    entity Products as projection on my.Products;
}