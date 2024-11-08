let currentCard = null;
    let cardCount = 0;

    function toggleForm() {
        const form = document.getElementById("planForm");
        form.style.display = form.style.display === "none" ? "block" : "none";
        if (form.style.display === "block") {
            resetForm(); // Reset form fields when shown
        }
    }

    document.getElementById("toggleButton").addEventListener("click", toggleForm);

    document.addEventListener("click", function(event) {
        const form = document.getElementById("planForm");
        const button = document.getElementById("toggleButton");
        if (form.style.display === "block" && !form.contains(event.target) && event.target !== button) {
            form.style.display = "none"; // Hide form if clicked outside
        }
    });

    function addPlan() {
        const domainName = document.getElementById("domainName").value;
        const planName = document.getElementById("planName").value;
        const planPrice = document.getElementById("planPrice").value;

        const functionalities = [
            document.getElementById("planFunctionality1").value,
            document.getElementById("planFunctionality2").value,
            document.getElementById("planFunctionality3").value,
            document.getElementById("planFunctionality4").value
        ];

        if (domainName && planName && planPrice && functionalities.every(f => f)) {
            if (cardCount >= 3) {
                alert("You can only add up to 3 plans.");
                return;
            }

            if (currentCard) {
                currentCard.querySelector('.card-title').innerText = planName;
                currentCard.querySelector('.card-domain').innerText = `Domain: ${domainName}`;
                currentCard.querySelector('.card-price').innerText = `Price: $${planPrice}`;

                const functionalityList = currentCard.querySelector('.functionality-list');
                functionalityList.innerHTML = functionalities.map(func => `<li>${func}</li>`).join('');

                currentCard = null;
            } else {
                const cardContainer = document.getElementById("cardContainer");
                const card = document.createElement("div");
                card.className = "col-md-4 mb-3";
                card.innerHTML = `
                    <div class="card border-primary">
                        <div class="card-body">
                            <h5 class="card-title">${planName}</h5>
                            <h6 class="card-domain">Domain: ${domainName}</h6>
                            <p class="card-price">Price: $${planPrice}</p>
                            <h6>Functionalities:</h6>
                            <ul class="functionality-list">
                                ${functionalities.map(func => `<li>${func}</li>`).join('')}
                            </ul>
                            <button class="btn btn-warning" onclick="editPlan(this)">Edit</button>
                            <button class="btn btn-danger" onclick="removePlan(this)">Delete</button>
                        </div>
                    </div>`;
                cardContainer.appendChild(card);
                cardCount++;
            }
            resetForm();
            document.getElementById("planForm").style.display = "none";
        } else {
            alert("Please fill in all fields.");
        }
    }

    function editPlan(button) {
        const card = button.closest('.col-md-4');
        const title = card.querySelector('.card-title').innerText;
        const domainText = card.querySelector('.card-domain').innerText;
        const priceText = card.querySelector('.card-price').innerText;

        const domainName = domainText.split(': ')[1];
        const price = priceText.split(': $')[1];

        const functionalities = Array.from(card.querySelectorAll('.functionality-list li')).map(li => li.innerText);

        document.getElementById("domainName").value = domainName;
        document.getElementById("planName").value = title;
        document.getElementById("planPrice").value = price;

        functionalities.forEach((func, index) => {
            document.getElementById(`planFunctionality${index + 1}`).value = func || '';
        });

        currentCard = card;
    }

    function removePlan(button) {
        const card = button.closest('.col-md-4');
        if (currentCard === card) {
            currentCard = null;
        }
        card.remove();
        cardCount--;
    }

    function resetForm() {
        document.getElementById("planForm").reset();
        currentCard = null;
    }