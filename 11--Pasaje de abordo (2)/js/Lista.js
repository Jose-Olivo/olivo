function loadTickets() {
    const tickets = JSON.parse(localStorage.getItem('tickets')) || [];
    const ticketList = document.getElementById('ticketList');

    if (tickets.length === 0) {
        ticketList.innerHTML = '<p>No hay tickets registrados.</p>';
        return;
    }

    const table = document.createElement('table');
    table.style.width = '100%';
    table.setAttribute('border', '1');
    const headerRow = table.insertRow();
    const headers = ['Nombre', 'Origen', 'Destino', 'Vuelo', 'Fecha', 'Asiento', 'Puerta', 'Hora de Abordaje', 'Hora de Salida'];

    headers.forEach(headerText => {
        const headerCell = document.createElement('th');
        headerCell.textContent = headerText;
        headerRow.appendChild(headerCell);
    });

    tickets.forEach(ticket => {
        const row = table.insertRow();
        Object.values(ticket).forEach(text => {
            const cell = row.insertCell();
            cell.textContent = text;
        });
    });

    ticketList.appendChild(table);
}

document.getElementById('backButton').addEventListener('click', function() {
    window.location.href = 'ticket.html';
});

document.getElementById('resetButton').addEventListener('click', function() {
    if (confirm('¿Estás seguro de que deseas reiniciar la información?')) {
        localStorage.removeItem('tickets'); 
        document.getElementById('ticketList').innerHTML = '<p>No hay tickets registrados.</p>';
    }
});

window.onload = loadTickets;