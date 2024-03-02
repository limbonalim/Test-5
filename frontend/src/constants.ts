export const BASE_URL = 'http://localhost:8000';

export const logo = 'Shop';

export enum Category {
  computers = 'computers',
  tables = 'tables',
  cars = 'cars',
  other = 'other',
}

export const category = [
  {title: 'Computers', path: '/products/computers', value: Category.computers},
  {title: 'Tables', path: '/products/tables', value: Category.tables},
  {title: 'Cars', path: '/products/cars', value: Category.cars},
  {title: 'Other', path: '/products/other', value: Category.other},
]
