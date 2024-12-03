document.addEventListener("DOMContentLoaded", () => {
    // Handle Add Button Click
    const addBtn = document.querySelector("#add-btn");
    const itemList = document.querySelector("#item-list");

    addBtn.addEventListener("click", () => {
        const nameInput = document.querySelector("#name").value;
        const quantityInput = document.querySelector("#quantity").value;

        if (nameInput && quantityInput) {
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td>${nameInput}</td>
                <td>${quantityInput}</td>
                <td>
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                </td>
            `;
            itemList.appendChild(newRow);

            // Clear inputs
            document.querySelector("#name").value = '';
            document.querySelector("#quantity").value = '';

            // Attach events to new buttons
            attachRowEvents(newRow);
        } else {
            alert("Please fill out all fields!");
        }
    });

    // Attach events for edit and delete buttons
    function attachRowEvents(row) {
        row.querySelector(".edit").addEventListener("click", () => {
            const cells = row.querySelectorAll("td");
            const name = cells[0].innerText;
            const quantity = cells[1].innerText;

            document.querySelector("#name").value = name;
            document.querySelector("#quantity").value = quantity;

            row.remove();
        });

        row.querySelector(".delete").addEventListener("click", () => {
            row.remove();
        });
    }
});
