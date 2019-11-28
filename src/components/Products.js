import React, { Component } from "react";
import Product from "./Product";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

class Products extends Component {
  constructor() {
    super();
    this.state = {
      sortData : ''
    }
  }

  // Sort by High to Low price 
  handleHighToLow = () => {
    let highToLow = this.props.productsList
    .sort((a, b) => a.price > b.price)
    .map(product => {
      return (
        <Product
          key={product.id}
          price={product.price}
          name={product.name}
          image={product.img_url}
          id={product.id}
          addToCart={this.props.addToCart}
          productQuantity={this.props.productQuantity}
          updateQuantity={this.props.updateQuantity}
          openModal={this.props.openModal}
        />
      );
    });
    this.setState ({ sortData : highToLow })
  }
  // Sort by Low to High price 
  handleLowToHigh = () => {
    let lowToHigh = this.props.productsList
    .sort((a, b) => a.price < b.price)
    .map(product => {
      return (
        <Product
          key={product.id}
          price={product.price}
          name={product.name}
          image={product.img_url}
          id={product.id}
          addToCart={this.props.addToCart}
          productQuantity={this.props.productQuantity}
          updateQuantity={this.props.updateQuantity}
          openModal={this.props.openModal}
        />
      );
    });
    this.setState ({ sortData : lowToHigh })
  }
  // Sort by Discount price 
  handleDiscount = () => {
    let Discount = this.props.productsList
    .sort((a, b) => a.discount > b.discount)
    .map(product => {
      return (
        <Product
          key={product.id}
          price={product.price}
          name={product.name}
          image={product.img_url}
          id={product.id}
          addToCart={this.props.addToCart}
          productQuantity={this.props.productQuantity}
          updateQuantity={this.props.updateQuantity}
          openModal={this.props.openModal}
        />
      );
    });
    this.setState ({ sortData : Discount })
  }
  
  render() {
    let productsData;
    let term = this.props.searchTerm;
    let x;
    function searchingFor(term) {
      return function(x) {
        return x.name.toLowerCase().includes(term.toLowerCase()) || !term;
      };
    }
    productsData = this.props.productsList
      .filter(searchingFor(term))
      .map(product => {
        return (
          <Product
            key={product.id}
            price={product.price}
            name={product.name}
            image={product.img_url}
            discount={product.discount}
            id={product.id}
            addToCart={this.props.addToCart}
            productQuantity={this.props.productQuantity}
            updateQuantity={this.props.updateQuantity}
            openModal={this.props.openModal}
          />
        );
      });

    // Empty and Loading States
    let view;
    if (productsData.length <= 0 && !term) {
      view = (
        <div className="products loading">
          <h2>Products Loading...</h2>
        </div>
      );
    } else if (productsData.length <= 0 && term) {
      view = (
        <div className="products">
          <div className="no-results">
            <h2>Sorry, no products matched your search!</h2>
            <p>Enter a different keyword and try.</p>
          </div>
        </div>
      );
    } else {
      view = (
        <CSSTransitionGroup
          transitionName="fadeIn"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
          component="div"
          className="products"
        >
          {productsData}
        </CSSTransitionGroup>
      );
    }
    return (
      <div>
        <div className="sort-section">
        <label>
            <span className="sort-by"><strong>Sort By</strong></span>
            <button onClick={this.handleHighToLow}>Price -- High Low</button>
            <button onClick={this.handleLowToHigh}>Price -- Low High</button>
            <button onClick={this.handleDiscount}>Discount</button>
        </label>
      </div>
      <div className="products-wrapper">{view}</div>
    </div>
    )
  }
}

export default Products;
