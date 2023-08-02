const studentForm = document.querySelector("#student-form");
const studentTable = document.querySelector("#student-table");

// Function to add a new student
// studentForm.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const name = studentForm.name.value;
//   const age = studentForm.age.value;

//   try {
//     await db.collection("students").add({
//       name: name,
//       age: age,
//       ticketNumber: 0, // Default ticket number
//     });
//     studentForm.reset();
//   } catch (error) {
//     console.error("Error adding student: ", error);
//   }
// });

// Track whether the passcode has been entered
let passcodeEntered = false;

// Function to create a table row for a student
function createTableRow(doc) {
  const row = document.createElement("tr");
  row.innerHTML = `
        <td>${doc.data().full_name}</td>
        <td>${doc.data().email}</td>
        <td>${doc.data().contact_number}</td>
        <td>${doc.data().nic_Number}</td>
        <td>${doc.data().ticketType}</td>
        <td>${doc.data().number_of_tickets}</td>
        <td>${doc.data().ticketNumber}</td>
        <td><button class="update-btn btn btn-primary" data-id="${
          doc.id
        }">Ticket No</button></td>
        <td><button class="delete-btn btn btn-danger" data-id="${
          doc.id
        }">Delete</button></td>
    `;

  // Attach update and delete event listeners
  const updateBtn = row.querySelector(".update-btn");
  const deleteBtn = row.querySelector(".delete-btn");

  updateBtn.addEventListener("click", async () => {
    if (!passcodeEntered) {
      const passcode = prompt("Enter passcode:");
      if (passcode === null) {
        return; // Passcode entry was canceled
      }
      if (passcode !== null) {
        if (passcode === "Medusa23@CinecSA") {
          // Replace with your actual passcode
          passcodeEntered = true;
        } else {
          alert("Incorrect passcode. Operation canceled.");
          return;
        }
      }
    }

    const newTicketNumber = prompt("Enter new ticket number:");
    if (newTicketNumber !== null) {
      try {
        await db.collection("medusa").doc(doc.id).update({
          ticketNumber: newTicketNumber,
        });
      } catch (error) {
        console.error("Error updating ticket number: ", error);
      }
    }
  });

  deleteBtn.addEventListener("click", async () => {
    if (!passcodeEntered) {
      const passcode = prompt("Enter passcode:");
      if (passcode === null) {
        return; // Passcode entry was canceled
      }
      if (passcode !== null) {
        if (passcode === "Medusa23@CinecSA") {
          // Replace with your actual passcode
          passcodeEntered = true;
        } else {
          alert("Incorrect passcode. Operation canceled.");
          return;
        }
      }
    }

    try {
      //await db.collection("medusa").doc(doc.id).delete();
    } catch (error) {
      console.error("Error deleting Record: ", error);
    }
  });

  return row;
}

// Real-time listener for student data
db.collection("medusa").onSnapshot((snapshot) => {
  studentTable.innerHTML = `
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Contact Number</th>
                <th>NIC</th>
                <th>Ticket Type</th>
                <th>Ticket Count</th>
                <th>Ticket Number</th>

            </tr>
        </thead>
    `;
  snapshot.docs.forEach((doc) => {
    const row = createTableRow(doc);
    studentTable.appendChild(row);
  });
});
