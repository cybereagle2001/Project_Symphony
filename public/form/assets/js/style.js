document.addEventListener("DOMContentLoaded", () => {
    // Dynamic Neural Network Background
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);

    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.zIndex = "-1";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const nodes = [];
    const edges = [];
    const nodeCount = 50;

    for (let i = 0; i < nodeCount; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            dx: (Math.random() - 0.5) * 2,
            dy: (Math.random() - 0.5) * 2,
            size: Math.random() * 3 + 2,
        });
    }

    function updateNodes() {
        nodes.forEach((node) => {
            node.x += node.dx;
            node.y += node.dy;

            // Bounce off edges
            if (node.x < 0 || node.x > canvas.width) node.dx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.dy *= -1;
        });
    }

    function drawEdges() {
        edges.length = 0; // Reset edges
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    edges.push({ start: nodes[i], end: nodes[j], opacity: 1 - distance / 150 });
                }
            }
        }

        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(0, 120, 215, 0.6)";
        edges.forEach((edge) => {
            ctx.globalAlpha = edge.opacity;
            ctx.beginPath();
            ctx.moveTo(edge.start.x, edge.start.y);
            ctx.lineTo(edge.end.x, edge.end.y);
            ctx.stroke();
        });
        ctx.globalAlpha = 1;
    }

    function drawNodes() {
        nodes.forEach((node) => {
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(0, 120, 215, 0.9)";
            ctx.fill();
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        updateNodes();
        drawEdges();
        drawNodes();
        requestAnimationFrame(animate);
    }

    animate();

    // Resize canvas on window resize
    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // CRUD Functionality
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
