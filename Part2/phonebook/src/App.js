import { useState, useEffect } from "react";
import axios from 'axios'
import PersonsService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import "./index.css"

const Notification = ({ notification, type }) => {
  if (notification === null) {
    return null;
  }

  return <div className={type}>{notification}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // For Exercise 2.11
  const hook0 = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log(response)
      })
  }
  
  useEffect(hook0, [])

  const hook = () => {
    PersonsService.getAll().then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  };

  useEffect(hook, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={errorMessage} type="error" />
      <Notification notification={successMessage} type="success" />
      <Filter setNewFilter={setNewFilter} newFilter={newFilter} />
      <h3>Add a new</h3>
      <PersonForm
        setNewName={setNewName}
        newName={newName}
        setPersons={setPersons}
        persons={persons}
        setNewNumber={setNewNumber}
        newNumber={newNumber}
        setErrorMessage={setErrorMessage}
        setSuccessMessage={setSuccessMessage}
      />
      <h2>Numbers</h2>
      <Persons
        newFilter={newFilter}
        persons={persons}
        setPersons={setPersons}
        setSuccessMessage={setSuccessMessage}
      />
    </div>
  );
};

export default App;