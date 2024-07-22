import React from "react";
import ProductItem from "components/product/product-item/ProductItem";
import { Table } from "react-bootstrap";

export default class ProductItems extends React.PureComponent {
  render() {
    const productList = this.props.productList;
    return (
      <>
        <Table bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Foto</th>
              <th>Video</th>
              <th>AR Link</th>
              <th>Description</th>
              <th colSpan="2" className="text-center">
                Controls
              </th>
            </tr>
          </thead>
          <tbody>
            {productList.map((item) => {
              return (
                <ProductItem key={item.id} item={item} />
              );
            })}
          </tbody>
        </Table>
      </>
    );
  }
}
