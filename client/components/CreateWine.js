import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createWine } from "../store/wines";

const CreateWine = (props) => {
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [year, setYear] = useState(0);
  const [type, setType] = useState("");
  const [typeOfGrape, setTypeOfGrape] = useState("");
  const [tastingNotes, setTastingNotes] = useState("");
  const [price, setPrice] = useState(19.99);
  const [quantity, setQuantity] = useState(20);
  const [imageUrl, setImageUrl] = useState("");

  console.log("props in create wine", props)
  const handleChange = (event) => {
    if (event.target.name === "name") {
      setName(event.target.value);
    } else if (event.target.name === "region") {
      setRegion(event.target.value);
    } else if (event.target.name === "year") {
      setYear(event.target.value);
    } else if (event.target.name === "type") {
      setType(event.target.value);
    } else if (event.target.name === "typeOfGrape") {
      setTypeOfGrape(event.target.value);
    } else if (event.target.name === "tastingNotes") {
      setTastingNotes(event.target.value);
    } else if (event.target.name === "price") {
      setPrice(event.target.value);
    } else if (event.target.name === "quantity") {
      setQuantity(event.target.value);
    } else {
      setImageUrl(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.createWine({
      name,
      region,
      year,
      type,
      typeOfGrape,
      tastingNotes,
      price,
      quantity,
      imageUrl,
    });
    setName("");
    setRegion("");
    setYear(0);
    setType("");
    setTypeOfGrape("");
    setTastingNotes("");
    setPrice(19.99);
    setQuantity(20);
    setImageUrl("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} id="edit-wine-form">
        <h2>Add a new wine:</h2>
        <label htmlFor="name">Wine Name:</label>
        <input type="text" name="name" value={name} onChange={handleChange} />

        <label htmlFor="region">Region:</label>
        <input
          type="text"
          name="region"
          value={region}
          onChange={handleChange}
        />

        <label htmlFor="year">Year:</label>
        <input type="number" name="year" value={year} onChange={handleChange} />

        <label htmlFor="type">Type:</label>
        <input type="text" name="type" value={type} onChange={handleChange} />

        <label htmlFor="typeOfGrape">Type of Grape:</label>
        <input
          type="text"
          name="typeOfGrape"
          value={typeOfGrape}
          onChange={handleChange}
        />

        <label htmlFor="tastingNotes">Tasting Notes:</label>
        <textarea
          type="text"
          name="tastingNotes"
          rows="5"
          value={tastingNotes}
          onChange={handleChange}
        />

        <label htmlFor="price">Price:</label>
        <input
          type="number"
          name="price"
          value={price}
          onChange={handleChange}
        />

        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          name="quantity"
          value={quantity}
          onChange={handleChange}
        />

        <label htmlFor="imageUrl">Image Url:</label>
        <input
          type="text"
          name="imageUrl"
          value={imageUrl}
          onChange={handleChange}
        />

        <button className="submit" type="submit">Submit</button>
      </form>
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    createWine: (wine) => dispatch(createWine(wine)),
  };
};

export default connect(null, mapDispatch)(CreateWine);
