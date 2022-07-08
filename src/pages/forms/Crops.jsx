import React from 'react'
import { Field, FieldArray } from 'formik'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'


const Crops = ({ touched, errors, values }) => {
    return (
        <div className="senara-form-group">
            <FieldArray name="crops">
                {({ insert, remove, push }) => (
                    <div className='table-container'>
                        <table id='siao-table'>
                            <thead>
                                <tr>
                                    <th>Cultivo</th>
                                    <th>Toma</th>
                                    <th>Area</th>
                                    <th>Fecha</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {values.crops.length > 0 &&
                                    values.crops.map((_, index) => (
                                        <tr key={index}>
                                            <td>
                                                <Field
                                                    name={`crops.${index}.cultivo`}
                                                    placeholder="Cultivo"
                                                    type="text"
                                                />
                                            </td>
                                            <td>
                                                <Field
                                                    name={`crops.${index}.toma`}
                                                    placeholder="Toma"
                                                    type="text"
                                                />
                                            </td>
                                            <td>
                                                <Field
                                                    name={`crops.${index}.area`}
                                                    placeholder="Area Cultivo"
                                                    type="text"
                                                />
                                            </td>
                                            <td>
                                                <Field
                                                    name={`crops.${index}.fecha`}
                                                    type="date"
                                                />
                                            </td>
                                            <td>
                                                <div>
                                                    <a onClick={() => remove(index)}>
                                                        <FontAwesomeIcon icon={faTrashCan} />
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td>
                                        <input
                                            value="+"
                                            type="button"
                                            className='table-btn senara-btn-primary'
                                            onClick={() => push({ cultivo: '', toma: '', area: '', fecha: '' })}
                                        />
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                )}
            </FieldArray>
        </div>
    )
}

export default Crops