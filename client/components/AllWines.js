import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchWines } from "../store/wines";

export class AllWines extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchWines();
  }

  render() {
    const { allOfMyWines } = this.props;
    return (
      <div className="element-list">
        {allOfMyWines.map((wine) => {
          return (
            <article key={wine.id} className="single-element">
              <Link to={`/wines/${wine.id}`} key={wine.id}>
                <img width="150px" src={wine.imageUrl} />
                <h2>{wine.name}</h2>
              </Link>
              <div>
                <button className="add-to-cart">Add to cart</button>
              </div>
            </article>
          );
        })}
      </div>
    );
  }
}

const mapState = (storeState) => {
  return {
    allOfMyWines: storeState.wines,
    wine: storeState.wine,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchWines: () => dispatch(fetchWines()),
  };
};

export default connect(mapState, mapDispatch)(AllWines);
