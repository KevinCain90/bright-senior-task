import { useState } from "react";
import axios from "axios";
import { format, addDays} from 'date-fns';


const SingleAbsence = ({absence}) => {
    const [error, setError] = useState('');
    const [hasConflict, setHasConflict] = useState('')

    axios.get(
      `https://front-end-kata.brighthr.workers.dev/api/conflict/${absence.id}`
    )
    .then(function (response) {
        setHasConflict(response.data.conflicts)
    })
    .catch(function (error) {
      setError(error)
    })

    const endDate = addDays(new Date(absence.startDate), absence.days);

    const type = absence.absenceType
        .toLowerCase()
        .split("_")
        .filter(x => x.length > 0)
        .map((x) => (x.charAt(0).toUpperCase() + x.slice(1)))
        .join(" ");

    return (
        <tr key={absence.id}>
            <td>{absence.employee.firstName} {absence.employee.lastName}</td>
            <td>{format(absence.startDate, 'DD MMM, YYYY')}</td>
            <td>{format(endDate, 'DD MMM, YYYY')}</td>
            <td>{type}</td>
            <td>{absence.absenceType ? 'Approved' : 'Pending'}</td>
            <td>{hasConflict && 'Yes'}</td>
        </tr>
    )
}
 
export default SingleAbsence;