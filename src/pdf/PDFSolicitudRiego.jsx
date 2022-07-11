import React from 'react'
import { jsPDF } from 'jspdf'

export const PDFSolicitudRiego = () => {
  const doc = new jsPDF()

  doc.setFont('times', 'normal')
  doc.setFontSize(14)
  doc.text('Formulario Solicitud de Servicio de Riego', 65, 20)
  doc.setFontSize(12)
  doc.text('Fecha: _________________________', 20, 40)
  doc.text('Señores', 20, 50)
  doc.text('SENARA', 20, 55)
  doc.text('Cañas', 20, 60)
  doc.text(
    'Yo,_______________________________, Cédula:______________________________ ,',
    20,
    70
  )
  doc.text(
    'Telefonos___________________, Direccion exacta______________________________,',
    20,
    75
  )
  doc.text(
    'dueño de la parcela Nº___________del Proyecto__________del Subdistrito_____________,',
    20,
    80
  )
  doc.text(
    'inscrito en el padrón de Usuarios del Distrito de Riego Arenal Tempisque, solicito brindarme',
    20,
    85
  )
  doc.text('el servicio de riego durante el presente semestre.', 20, 90)
  doc.text(
    'Datos de la parcela: Área____________ha, Cultivo______________, Variedad____________,',
    20,
    100
  )
  doc.text('Rendimiento anterior _____________________.', 20, 105)

  doc.text(
    'Me comprometo a preparar la infraestructura para recibir el riego el día____de_____________',
    20,
    115
  )

  doc.text(
    'del 20____, según lo estipulado en el Reglamento de servicio de Riego del Distrito de ',
    20,
    120
  )
  doc.text(
    'Riego y a utilizar el  servicio conforme a lo establecido en dicho reglamento.',
    20,
    125
  )

  doc.text('Atentamente,', 20, 135)
  doc.text('Firma: _______________________________________', 20, 145)
  doc.text('Fax: _________________________________________', 20, 155)
  doc.text(
    'Dirección para notificaciones:________________________________________________',

    20,
    165
  )
  doc.text(
    'Observaciones:______________________________________________________',
    20,
    175
  )

  doc.save('PDFprueba.pdf')
}
