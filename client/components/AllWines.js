import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchWines, deleteWine } from "../store/wines";
import CreateWine from "./CreateWine";

const AllWines = (props) => {
  useEffect(() => {
    props.fetchWines();
  }, []);

  const { wines } = props;
  const userId = props.userId;
  console.log("props in all wines", props);
  return (
    <div>
      <h2>Wines</h2>
      <div className="element-list">
        {wines.map((wine) => {
          return (
            <article key={wine.id} className="single-element">
              <Link to={`/wines/${wine.id}`} key={wine.id}>
                <img
                  className="product-image"
                  width="150px"
                  src={wine.imageUrl}
                />
                <h2>{wine.name}</h2>
              </Link>
              {/* put admin stuff here with a ternary - all wines / all cheeses / single wine (edit) / single cheese (edit)*/}
              {/* think about security and protecting the route */}
              {props.isAdmin ? (
                <button
                  className="remove"
                  onClick={() => props.deleteWine(wine.id)}
                >
                  Remove
                </button>
              ) : (
                <h1></h1>
              )}
            </article>
          );
        })}
      </div>
      {props.isAdmin ? <CreateWine /> : <h1></h1>}
    </div>
  );
};

const mapState = (storeState) => {
  return {
    userId: storeState.auth.id,
    wines: storeState.wines,
    wine: storeState.wine,
    isAdmin: storeState.auth.isAdmin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchWines: () => dispatch(fetchWines()),
    deleteWine: (id) => dispatch(deleteWine(id)),
  };
};

export default connect(mapState, mapDispatch)(AllWines);
