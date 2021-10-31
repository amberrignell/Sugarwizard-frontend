import React from 'react';
import data from '../utils/data';
import HomeButton from './HomeButton';
import styled from 'styled-components';
import '../style/eatOut.css';

const CalculatorLink = styled.a`
  margin-left: 50%;
  padding: 1rem;
  background-color: hsl(354, 100%, 89%);
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 20px;
  text-decoration: none;
  box-shadow: 5px 5px 5px #223a70;
  @media (max-width: 1420px) {
    display: inline-block;
    margin: 1rem;
  }
`;

const Border = styled.div`
  padding: 1rem;
  margin: 1rem;
`;

const H1 = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-size: 3rem;
`;

const H2 = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-weight: 900;
  font-size: 1.5rem;
`;

const H3 = styled.h3`
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
`;

const P = styled.p`
  font-family: 'Roboto', sans-serif;
  display: inline-grid;
  font-size: 1.2rem;
  font-weight: 500;
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
  margin-top: 2rem;
  border-bottom: 1px solid black;
  font-family: 'Poppins', sans-serif;
  font-size: 1.2rem;
`;

function EatOut({ setPage, navigate, eatOutCarbs, setEatOutCarbs }) {
  const categories = data.map((x) => x.category.category); // remove all fluff apart from categories

  function onlyUnique(value, index, self) {
    // function to check if category is the first occurring
    return self.indexOf(value) === index; // bins it off if not
  }

  const uniqueCategories = categories.filter(onlyUnique);

  const [category, setCategory] = React.useState('Soups');
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
        <Border>
          <div>
            <H2>Added Items: </H2>
            <div className='addedList'>
              <List>
                {addedItems.map((item, index) => {
                  return (
                    <ListItem>
                      <H3>{item.item}</H3>
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
                      ></ListButton>
                    </ListItem>
                  );
                })}
              </List>
            </div>
            <P>Total Carbs: </P>
            <P id='total'>{eatOutCarbs}g</P>
            <CalculatorLink href='/calculator' onClick={navigate}>
              Add to Calculator
            </CalculatorLink>
          </div>
        </Border>
      </section>
    </Border>
  );
}

export default EatOut;
