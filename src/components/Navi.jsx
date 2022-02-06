import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Badge,
} from "reactstrap";

export default class Navi extends Component {
  render() {
    return (
      <div>
        <Navbar color="secondary" expand="md" fixed="top" full container light>
          <NavbarBrand href="/">Product Marketplace</NavbarBrand>
          <Nav className="ml-auto" navbar>
            {this.props.cart.length === 0 ? (
              <NavbarText>
                <b>| Cart is empty |</b>
              </NavbarText>
            ) : (
              <UncontrolledDropdown inNavbar nav>
                <DropdownToggle caret nav>
                  <b>Your Cart</b>
                </DropdownToggle>
                <DropdownMenu end>
                  {this.props.cart.map((content) => (
                    <DropdownItem text key={content.product.id}>
                      <div clas="row">
                        <div clas="col-md-9">
                          {content.product.productName}{" "}
                        </div>
                        <Badge
                          className="col-md-3"
                          style={{ float: "left" }}
                          color="success"
                        >
                          {content.quantity}
                        </Badge>
                        <Badge
                          className="col-md-3"
                          style={{ float: "right" }}
                          color="danger"
                          onClick={() =>
                            this.props.deleteProductCart(content.product)
                          }
                        >
                          X
                        </Badge>
                        <Badge
                          className="col-md-3"
                          style={{ float: "right", marginRight: "5px" }}
                          color="secondary"
                          onClick={() =>
                            this.props.reduceProductCart(content.product)
                          }
                        >
                          -
                        </Badge>
                      </div>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </UncontrolledDropdown>
            )}
          </Nav>
        </Navbar>
      </div>
    );
  }
}
