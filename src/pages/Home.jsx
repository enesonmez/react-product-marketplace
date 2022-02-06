import React, { Component } from "react";
import CategoryList from "../components/CategoryList";
import Navi from "../components/Navi";
import ProductList from "../components/ProductList";
import { Container, Row, Col } from "reactstrap";

export default class App extends Component {
  state = {
    currentCategory: "",
    products: [],
    cart: [],
  };

  componentDidMount() {
    this.getProducts();
  }

  // Arrow Function
  // Normal fonksiyonda yazabiliriz ancak sınıf ile bind etmek gerekiyor.
  changeCategory = (category) => {
    this.setState({ currentCategory: category.categoryName });
    this.getProducts(category.id);
  };

  getProducts = (categoryId) => {
    let url = "http://localhost:3004/products";

    if (categoryId) {
      url += "?categoryID=" + categoryId;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) =>
        data.sort(function (a, b) {
          return a.id - b.id;
        })
      )
      .then((data) => this.setState({ products: data }));
  };

  addToCart = (product) => {
    let newCart = this.state.cart;
    var addedItem = newCart.find((c) => c.product.id === product.id);
    if (addedItem) {
      if (addedItem.quantity !== product.unitsInStock) {
        addedItem.quantity += 1;
      }
    } else {
      if (product.unitsInStock !== 0) {
        newCart.push({ product: product, quantity: 1 });
      }
    }
    this.setState({ cart: newCart });
  };

  deleteProductCart = (product) => {
    let newCart = this.state.cart.filter((c) => c.product.id !== product.id);
    this.setState({ cart: newCart });
  };

  reduceProductCart = (product) => {
    let newCart = this.state.cart;
    var addedItem = newCart.find((c) => c.product.id === product.id);
    if (addedItem.quantity === 1) {
      this.deleteProductCart(product)
    }
    else {
      addedItem.quantity -=1;
      this.setState({ cart: newCart });
    }
  };

  render() {
    let productInfo = { title: "Product List" };
    let categoryInfo = { title: "Category List" };
    return (
      <div>
        <Container>
          <Row>
            <Navi
              cart={this.state.cart}
              deleteProductCart={this.deleteProductCart}
              reduceProductCart={this.reduceProductCart}
            />
          </Row>
          <br />
          <br />
          <br />
          <Row>
            <Col xs="3">
              <CategoryList
                currentCategory={this.state.currentCategory}
                changeCategory={this.changeCategory}
                info={categoryInfo}
              />
            </Col>
            <Col xs="9">
              <ProductList
                addToCart={this.addToCart}
                products={this.state.products}
                currentCategory={this.state.currentCategory}
                info={productInfo}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
