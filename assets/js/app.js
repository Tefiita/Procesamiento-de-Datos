$(document).ready(function () {
  const registrosCrudos = [
    " Marta Sánchez | TICKET-99201 ",
    " oscar perez | TICKET-10552 ",
    " ANTONIO GOMEZ | TICKET-44332 ",
    " lucia fernandez | TICKET-88771 ",
    " RICARDO SOTO | TICKET-22114 ",
    " Maria ignacia | TICKET-77665 ",
    " esteban quito | TICKET-33442 ",
  ];

  //Formateo de los datos entregados.
  listaCorregida = [nombre, ticket] = $.map(registrosCrudos, function (registro) {
    let registroLimpio = $.trim(registro);
    let partes = registroLimpio.split("|");
    let nombre = $.trim(partes[0]);
    let ticket = $.trim(partes[1].split("-")[1]);
    let nombreFormateado = nombre.toUpperCase();
    return { nombre: nombreFormateado, ticket: ticket };
  });
  console.log(listaCorregida);

  //Random de colores para cada invitado.
  function colorRandom() {
    let color = Math.floor(Math.random() * 16777216).toString(16);
    while (color.length < 6) {
      color = "0" + color;
    }
    return "#" + color;
  }

  console.log(colorRandom());

  //Fecha
  let fechaActual = new Date();
  let fechaLarga = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  let fechaFormateada = fechaActual.toLocaleDateString("es-ES", fechaLarga);
  console.log(fechaFormateada);

  //Lista final de invitados
  let listaInvitados = $.map(listaCorregida, function (invitado) {
    return {
      nombre: invitado.nombre,
      idTicket: invitado.ticket,
      pulseraColor: colorRandom(),
      fechaRegistro: fechaFormateada,
    };
  });

  console.log(listaInvitados);

  // Acumular filas de la tabla
  if ($("#tabla").length) {
    let filas = "";
    $.each(listaInvitados, function (i, invitado) {
      filas += `
        <tr>
          <th scope="row">${invitado.nombre}</th>
          <th scope="row">${invitado.idTicket}</th>
          <th scope="row" class = " text-white" style="background-color: ${invitado.pulseraColor}">${invitado.pulseraColor}</th>
          <th scope="row">${invitado.fechaRegistro}</th>
        </tr>
      `;
    });

    // Construir la tabla completa y asignar el HTML una sola vez
    $("#tabla").html(`
      <table class="table table-hover table-striped table-bordered shadow-sm">
        <thead class="table-dark">
          <tr>
            <th scope="col" class="text-center ">Nombre</th>
            <th scope="col" class="text-center ">Id Ticket</th>
            <th scope="col" class="text-center ">Color Pulsera </th>
            <th scope="col" class="text-center">Fecha Registro </th>
          </tr>
        </thead>
        <tbody>
          ${filas}
        </tbody>
      </table>
    `);
  }
});
