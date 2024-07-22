import React from "react";
import WbtbItem from "components/wbtb/wbtb-item/wbtbItem";
import { Table } from "react-bootstrap";

export default class WbtbItems extends React.PureComponent {
  render() {
    const wbtbList = this.props.wbtbList;
    return (
      <>
        <Table bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Foto</th>
              <th>Video</th>
              <th>Source Link</th>
              <th>Description</th>
              <th colSpan="2" className="text-center">
                Controls
              </th>
            </tr>
          </thead>
          <tbody>
            {wbtbList.map((item) => {
              return (
                <WbtbItem key={item.id} item={item} />
              );
            })}
          </tbody>
        </Table>
      </>
    );
  }
}
