import React from 'react';
import data from './data';
import HomeButton from './components/HomeButton';
import styled from 'styled-components';
import './eatOut.css';
import Dustbin from './dustbin.png';

const CalculatorLink = styled.a`
  margin: auto;
  padding: 2rem;
  background-color: hsl(354, 100%, 89%);
  color: #223a70;
  font-family: 'Poppins', sans-serif;
  border-radius: 20px;
  text-decoration: none;
  box-shadow: 5px 5px 5px #223a70;
  margin-left: 25%;
`;

const Border = styled.div`
  margin: 3rem;
`;

const H1 = styled.h1`
  font-family: 'Poppins', sans-serif;
`;

const H3 = styled.h3`
  font-family: 'Roboto', sans-serif;
`;

const P = styled.p`
  font-family: 'Roboto', sans-serif;
  display: inline-grid;
`;

const CategoryLabel = styled.label`
  font-family: 'Roboto', sans-serif;
  font-style: italic;
  font-size: 1.6rem;
`;

const ListButton = styled.button`
  margin: auto;
  padding: 0.5rem;
  background-color: hsl(354, 100%, 89%);
  color: #223a70;
  font-family: 'Poppins', sans-serif;
  border-radius: 5px;
  text-decoration: none;
  box-shadow: 5px 5px 5px #223a70;
  float: right;
`;

const List = styled.ul`
  line-height: 1%;
`;

const ListItem = styled.li`
  margin-top: 6rem;
`;

const DeleteButton = styled.button``;

// const BulletPoint = styled.li`
//   background-image: src='https://www.freeiconspng.com/uploads/yellow-star-icon-21.png';
//   background-position: 0 0;
//   background-size: 1.6rem 1.6rem;
//   background-repeat: no-repeat;
// `;

function EatOut({ setPage, navigate, eatOutCarbs, setEatOutCarbs }) {
  const categories = data.map((x) => x.category.category); // remove all fluff apart from categories

  function onlyUnique(value, index, self) {
    // function to check if category is the first occurring
    return self.indexOf(value) === index; // bins it off if not
  }

  const uniqueCategories = categories.filter(onlyUnique);

  const [category, setCategory] = React.useState('Soups');
  const [totalCarbs, setTotalCarbs] = React.useState(0);
  const [addedItems, setAddedItems] = React.useState([]);

  return (
    <Border>
      <HomeButton />
      <H1>Eat Out</H1>
      <CategoryLabel htmlFor='categories'>Search by category:</CategoryLabel>
      <select id='categories' onChange={(event) => setCategory(event.target.value)}>
        {uniqueCategories.map((category, index) => {
          return (
            <option key={index} value={category}>
              {category}
            </option>
          );
        })}
      </select>
      <List>
        {data.map((x) => {
          return x.category.category === category ? (
            <ListItem>
              <H3> {x.item} </H3>
              <P> Carbohydrates: {x.carbs + 'g' || 'N/A'} </P>
              <ListButton
                name={x.item}
                onClick={(event) => {
                  setEatOutCarbs(
                    (eatOutCarbs) => Math.round((eatOutCarbs + parseFloat(x.carbs)) * 10) / 10,
                  );
                  let toAdd = {
                    item: x.item,
                    carbs: x.carbs,
                  };
                  setAddedItems((addedItems) => [...addedItems, toAdd]);
                }}
              >
                {' '}
                Add{' '}
              </ListButton>
            </ListItem>
          ) : null;
        })}
      </List>
      <section className='addedItems'>
        <h2>Added Items: </h2>
        <div className='addedList'>
          <ul>
            {addedItems.map((item, index) => {
              return (
                <li>
                  <h3>{item.item}</h3>
                  <P>{item.carbs}g</P>
                  <ListButton
                    onClick={(event) => {
                      // create new array without current element
                      const filteredArray = addedItems.filter(
                        (x) => x.item !== event.target.parentNode.childNodes[0].textContent,
                      );
                      // set array state to above array
                      setAddedItems(filteredArray);
                      // subtract carbs value from total in basket
                      setEatOutCarbs(
                        (eatOutCarbs) =>
                          Math.round((eatOutCarbs - parseFloat(item.carbs)) * 10) / 10,
                      );
                    }}
                  >
                    <img src='dustbin.png' />
                  </ListButton>
                </li>
              );
            })}
          </ul>
        </div>
        {/* {addedItems ? <ul>{[...addedItems]}</ul> : null} */}
        {/* <p>Total Carbs:</p> */}
        <p id='total'>{eatOutCarbs}g</p>
        <CalculatorLink href='/calculator' onClick={navigate}>
          Add to Calculator
        </CalculatorLink>
      </section>
    </Border>
  );
}

// function AddToCalculator() {
//   const [calculate, setCalculate] = React.useState('');
//   // const element = <p>Total Carbs</p>;
//   // ReactDOM.render(element, document.getElementById('total'));
// }

export default EatOut;
