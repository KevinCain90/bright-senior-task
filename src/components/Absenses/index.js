import { useEffect, useState } from 'react';
import axios from "axios";
import { format, addDays} from 'date-fns';
import { sortAlpha, sortChronological, SortableTableHeader} from '../SortableTableHeader'
import SingleAbsence from './SingleAbsence';

const Absences = () => {

  const [absences, setAbsences] = useState([])
  const [error, setError] = useState('')
  const [activeColumn, setActiveColumn] = useState(1);

  useEffect(() => {
    const getAbsences = async () =>  {
        axios.get(
          "https://front-end-kata.brighthr.workers.dev/api/absences"
        )
        .then(function (response) {
          setAbsences(response.data)
        })
        .catch(function (error) {
          setError(error)
        })
    }

    getAbsences();
  }, [])

  return (
    <div className="App">
      {error && <div>error fetching data</div>}
      <table>
        <tr>
          <th>Employee name</th>
          <th>Start date</th>
          <th>End Date</th>
          <th>Absence type</th>
          <th>Status</th>
          <th>Conflict</th>
        </tr>
        {absences.map((absence) => (
          <SingleAbsence absence={absence} />
        ))}
      </table>
    </div>
  );
}

export default Absences;
