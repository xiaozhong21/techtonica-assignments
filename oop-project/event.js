class Event {
  constructor(name, description) {
    this.name = name;
    this.description = description;
    this.availableTickets = [];
  }

  addAvailableTickets(type, price) {
    let ticket = {
      type: type, 
      price: price
    };
    this.availableTickets.push(ticket);
  }

  allTickets() {
    let result = "";
    for (let i =0; i < this.availableTickets.length; i++) {
      result += `${i + 1}. ${this.availableTickets[i]["type"]} ($${this.availableTickets[i]["price"]}) `
    }
    return `All tickets: ${result}`;
  }

  searchTickets(min, max) {
    let result = "";
    let filteredTickets = this.availableTickets.filter(ticket => ticket["price"] >= min && ticket["price"] <= max);
    for (let i =0; i < filteredTickets.length; i++) {
      result += `${i + 1}. ${filteredTickets[i]["type"]} ($${filteredTickets[i]["price"]}) `;
    }
    if (result === "") {
      return `No tickets available`;
    }
    return `Eligible tickets: ${result}`;
  }
}


class TicketType {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

//Declare three instances of Event object
const eventObj1 = new Event('KLOS Golden Gala', 'An evening with hollywood vampires');
const eventObj2 = new Event('Skillet & Sevendust', 'Victorious war tour');
const eventObj3 = new Event('Jenny Lewis', 'On the line tour 2019');

//Create event array
const eventArray = new Array();

//Calling addAvailableTickets() on three event objects to add more ticket types
eventObj1.addAvailableTickets("human", 299);
eventObj1.addAvailableTickets("vampire", 99);

eventObj2.addAvailableTickets("General Admission", 25)
eventObj2.addAvailableTickets("Floor Seating", 80)

eventObj3.addAvailableTickets("Orchestra", 300);
eventObj3.addAvailableTickets("Mezzanine", 200);
eventObj3.addAvailableTickets("Balcony", 100);

// pushing single object to an array
// eventArray.push(eventObj1);

// pushing multiple objects to an array at once
eventArray.push(eventObj1, eventObj2, eventObj3);

//Create unordered list of three events along with descriptions
for (let event of eventArray) {
  let li = document.createElement("li");
  li.innerHTML = `${event.name} - ${event.description} `;
  document.getElementById("event").appendChild(li);
}

//Create unordered list of three events along with descriptions and ALL ticket types
for (let event of eventArray) {
    let li = document.createElement("li");
    li.innerHTML = `${event.name} - ${event.description} - ${event.allTickets()}`;
    document.getElementById("all").appendChild(li);
}

//Create unordered list of three events along with descriptions and ELIGIBLE ticket types within a price range
for (let event of eventArray) {
    let li2 = document.createElement("li");
    li2.innerHTML = `${event.name} - ${event.description} - ${event.searchTickets(0, 100)}`;
    document.getElementById("eligible").appendChild(li2);
}


// console.log(eventObj2.availableTickets)
// console.log(eventObj2.allTickets())
// console.log(eventObj3.availableTickets)
// console.log(eventObj3.allTickets())
