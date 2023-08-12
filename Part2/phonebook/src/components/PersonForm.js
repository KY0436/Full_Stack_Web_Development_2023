import Service from "../services/persons";

const PersonForm = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  persons,
  setPersons,
  setErrorMessage,
  setSuccessMessage,
}) => {
  // The handler for adding the name to the phonebook
  const addName = (event) => {
    event.preventDefault();
    var valueNewName = persons.map( (person) => person.name)
    //Judge whether the phonebook contains a specific person
    if (valueNewName.includes(newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const person = persons.find((p) => p.name === newName);
        const updatedPerson = { ...person, number: newNumber }; //Update the phone number for the same person
        Service.update(person.id, updatedPerson)
          .then((response) => {
            setPersons(
              persons.map((p) => (p.name !== newName ? p : response.data)) //Only change the name of the same person and do not change other people
            );
            setSuccessMessage(
              `${updatedPerson.name}'s phone number was updated to ${updatedPerson.number}`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 15000);
          })
          .catch((error) => {
            setErrorMessage(
              `The information of ${changedPerson.name} has already been removed from server`
            ); // For Exercise 2.17, when the person is removed, another session will find this person vacant in the phonebook
            setTimeout(() => {
              setErrorMessage(null);
            }, 15000);
          })

      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }// Construct an object for the new person

      setPersons(persons.concat(personObject))
      Service.create(personObject)
        .then((response) => {
          setPersons(persons.concat(response.data));

          setSuccessMessage(`Added ${personObject.name}`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            setErrorMessage(error.response.data.error);
          } else if (error.response && error.response.data) {
            setErrorMessage(error.response.data);
          } else {
            setErrorMessage("An error occurred while creating a person.");
          }
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000)
        })
    }
    setNewName("");
    setNewNumber("");
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }
  const handlePhoneChange = (event) => {
    setNewNumber(event.target.value);
  }

  return (
    <form onSubmit={addName}>
      <div>
        name:
        <input value={newName} onChange={handleNameChange} />
      </div>
      
      <div>
        number: 
        <input value={newNumber} onChange={handlePhoneChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm;