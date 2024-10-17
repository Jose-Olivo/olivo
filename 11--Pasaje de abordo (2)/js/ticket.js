document.getElementById('submitButton').addEventListener('click', function() {
    const passengerName = document.getElementById('passengerName').value;
    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('date').value;
    const seat = document.getElementById('seat').value;
    const gate = document.getElementById('gate').value;
    const boardingTime = document.getElementById('boardingTime').value;

    document.getElementById('stubPassengerName').innerText = passengerName;
    document.getElementById('stubOrigin').innerText = origin;
    document.getElementById('stubDestination').innerText = destination;
    document.getElementById('stubDate').innerText = date;
    document.getElementById('stubSeat').innerText = seat;
    document.getElementById('stubGate').innerText = gate;
    document.getElementById('stubBoardingTime').innerText = boardingTime;
});

document.getElementById('clearButton').addEventListener('click', function() {
    document.getElementById('passengerName').value = '';
    document.getElementById('origin').value = '';
    document.getElementById('destination').value = '';
    document.getElementById('date').value = '';
    document.getElementById('stubPassengerName').innerText = '';
    document.getElementById('stubOrigin').innerText = '';
    document.getElementById('stubDestination').innerText = '';
    document.getElementById('stubDate').innerText = '';
});




document.getElementById('submitButton').addEventListener('click', function() {
    const passengerName = document.getElementById('passengerName').value.trim();
    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('date').value;

    if (!passengerName || !origin || !destination || !date) {
        alert('Por favor, completa todos los campos requeridos.');
        return;
    }

    if (origin === destination) {
        alert('El país de origen y destino no puede ser el mismo.');
        return;
    }

    const flightNumber = generateFlightNumber();
    const seat = generateSeat();
    const gate = generateGate();
    const boardingTime = generateTime();
    const departureTime = generateTime();

    const ticket = {
        passengerName: capitalizeWords(passengerName),
        origin,
        destination,
        flightNumber,
        date,
        seat,
        gate,
        boardingTime,
        departureTime
    };

    const tickets = JSON.parse(localStorage.getItem('tickets')) || [];
    tickets.push(ticket);
    localStorage.setItem('tickets', JSON.stringify(tickets));

    alert('Mensaje enviado correctamente');

    limpiarCampos();
});

document.getElementById('clearButton').addEventListener('click', function() {
    const passengerName = document.getElementById('passengerName').value;
    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('date').value;

    if (!passengerName || !origin || !destination || !date) {
        alert('Por favor, completa todos los campos antes de limpiar.');
        return;
    }

    limpiarCampos();
});

function limpiarCampos() {
    document.getElementById('passengerName').value = '';
    document.getElementById('origin').value = '';
    document.getElementById('destination').value = '';
    document.getElementById('date').value = '';

    document.getElementById('flightNumber').value = generateFlightNumber();
    document.getElementById('seat').value = generateSeat();
    document.getElementById('gate').value = generateGate();
    document.getElementById('boardingTime').value = generateTime();
    document.getElementById('departureTime').value = generateTime();

    updateTicketStub();
}

function generateFlightNumber() {
    const randomNum = Math.floor(Math.random() * 1000);
    return `VUELO-${randomNum.toString().padStart(3, '0')}`;
}

function generateSeat() {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
    const randomRow = rows[Math.floor(Math.random() * rows.length)];
    const randomNumber = Math.floor(Math.random() * 30) + 1;
    return `${randomRow}${randomNumber}`;

}

function generateGate() {
    const gateNum = Math.floor(Math.random() * 20) + 1;
    return `Z${gateNum}`;
}

function generateTime() {
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

function updateTicketStub() {
    document.getElementById('stubPassengerName').textContent = document.getElementById('passengerName').value ? capitalizeWords(document.getElementById('passengerName').value) : '';
    document.getElementById('stubOrigin').textContent = document.getElementById('origin').value || '';
    document.getElementById('stubDestination').textContent = document.getElementById('destination').value || '';
    document.getElementById('stubSeat').textContent = document.getElementById('seat').value || '';
    document.getElementById('stubDate').textContent = document.getElementById('date').value ? formatDate(document.getElementById('date').value) : '';
    document.getElementById('stubGate').textContent = document.getElementById('gate').value || '';
    document.getElementById('stubBoardingTime').textContent = document.getElementById('boardingTime').value || '';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
}

function capitalizeWords(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase()).replace(/[0-9]/g, '');
}

document.getElementById('passengerName').addEventListener('input', function() {
    this.value = this.value.replace(/[0-9]/g, '');
    updateTicketStub();
});

document.getElementById('origin').addEventListener('change', updateTicketStub);
document.getElementById('destination').addEventListener('change', updateTicketStub);
document.getElementById('date').addEventListener('input', updateTicketStub);
document.getElementById('seat').addEventListener('input', updateTicketStub);
document.getElementById('gate').addEventListener('input', updateTicketStub);
document.getElementById('boardingTime').addEventListener('input', updateTicketStub);

window.onload = function() {
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    document.getElementById('date').setAttribute('min', todayString);
    limpiarCampos();
    updateTicketStub();
};