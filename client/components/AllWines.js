import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchWines, deleteWine } from "../store/wines";
import CreateWine from "./CreateWine";

const AllWines = (props) => {
  useEffect(() => {
    props.fetchWines();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

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
              {/* put admin stuff here with a ternary - all wines / all cheeses / single wine (edit) / single cheese (edit)*/}
              {/* think about security and protecting the route */}
              <button
                className="remove"
                onClick={() => props.deleteWine(wine.id)}
              >
                Remove Wine
              </button>
            </article>
          );
        })}
      </div>
      <CreateWine />
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
    deleteWine: (id) => dispatch(deleteWine(id)),
  };
};

export default connect(mapState, mapDispatch)(AllWines);
