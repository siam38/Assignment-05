function getElementById(elementID) {
    return document.getElementById(elementID);
}

function setElementById(elementID, value) {
    getElementById(elementID).textContent = value;
}

function createItems(seatInner, ticketPrice) {
    let newList = document.createElement("li");

    let p1 = document.createElement("p");
    p1.textContent = seatInner;

    let p2 = document.createElement("p");
    p2.textContent = "Economy";

    let p3 = document.createElement("p");
    p3.textContent = ticketPrice;

    newList.appendChild(p1);
    newList.appendChild(p2);
    newList.appendChild(p3);

    getElementById('select-ticket').appendChild(newList);
}

let counter = 0;
let ticketTotal = 0;
let checkArr = [];
const couponDiscounts = {
    "NEW15": 0.15,
    "Couple 20": 0.20
};

document.querySelectorAll('.sit-button').forEach(seat => {
    seat.addEventListener('click', function (e) {
        if (counter < 4) {
            if (checkArr.includes(seat)) {
                alert("You can't select one seat more than once.");
                return;
            } else {
                counter++;
                ticketTotal += parseInt(getElementById('seat-price').textContent);
                let seatAvailable = parseInt(getElementById('available-seat').textContent);
                setElementById('available-seat', seatAvailable - 1);
                setElementById('total-price', ticketTotal);
                setElementById('grand-total', ticketTotal);
                e.target.classList.add('bg-[#1DD100]');
                setElementById('selected-seat', counter);
                createItems(seat.textContent, getElementById('seat-price').textContent);
            }
        } else {
            alert("You can't select more than 4 tickets.");
        }
        checkArr.push(seat);
    });
});

getElementById('couponInput').addEventListener('keyup', function (e) {
    if (e.target.value !== '') {
        getElementById('apply-btn').removeAttribute('disabled');
    }
});

getElementById('submitInfo').addEventListener('keyup', function (e) {
    if (e.target.value !== '') {
        getElementById('modalbutton').removeAttribute('disabled');
    }
});

function couponApply() {
    let userInput = getElementById('couponInput').value;
    let discount = couponDiscounts[userInput];
    if (discount) {
        let discountAmount = ticketTotal * discount;
        setElementById('grand-total', ticketTotal - discountAmount);
        setElementById('discount-price', discountAmount);
        getElementById('input-filed').classList.add("hidden");
        getElementById('discount').classList.remove("hidden");
    } else {
        alert("Your coupon is invalid.");
    }
}

function reload() {
    location.reload();
}