import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchWines } from "../store/wines";

const AllWines = (props) => {
  useEffect(() => {
    props.fetchWines();
  }, []);

  const { wines } = props;
  return (
    <div>
      <h1>All Wines</h1>
      <div className="element-list">
        {wines.map((wine) => {
          return (
            <article key={wine.id} className="single-element">
              <Link to={`/wines/${wine.id}`} key={wine.id}>
                <img
                  className="product-img"
                  width="150px"
                  src={wine.imageUrl}
                />
                <h2>{wine.name}</h2>
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  );
};

const mapState = (storeState) => {
  return {
    wines: storeState.wines,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchWines: () => dispatch(fetchWines()),
  };
};

export default connect(mapState, mapDispatch)(AllWines);
