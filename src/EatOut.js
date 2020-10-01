import React from 'react';
import data from './data';

function EatOut() {
  const categories = data.map((x) => x.category.category); // remove all fluff apart from categories

  function onlyUnique(value, index, self) {
    // function to check if category is the first occurring
    return self.indexOf(value) === index; // bins it off if not
  }

  const uniqueCategories = categories.filter(onlyUnique);
  console.log(uniqueCategories);

  return (
    <>
      <h1>Eat Out</h1>
      <select>
        {uniqueCategories.map((category, index) => {
          return (
            <option key={index} value={category}>
              {category}
            </option>
          );
        })}
      </select>
    </>
  );
}

export default EatOut;
