import { useEffect, useState } from 'react';
import axios from "axios";
import { format, addDays} from 'date-fns';
import './App.css';

const Absences = () => {

  const [absences, setAbsences] = useState([])
  // const [conflicts, setConflicts] = useState([])
  const [error, setError] = useState('')

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

  // console.log({conflicts})

  // const getConflictedAbsense = (id) =>  {
  //   // eslint-disable-next-line react-hooks/rules-of-hooks
  //   return useQuery("posts", async () => {
  //     const { data } = await axios.get(
  //       `https://front-end-kata.brighthr.workers.dev/api/conflict/${id}`
  //     );
  //     return data;
  //   });
  // }

  // const { data: conflictedAbsense } = getConflictedAbsense(absenses.id);

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
          {/* <th></th> */}
        </tr>
        {absences.map((absence) => {
          const endDate = addDays(new Date(absence.startDate), absence.days);

          const type = absence.absenceType
            .toLowerCase()
            .split("_")
            .filter(x => x.length > 0)
            .map((x) => (x.charAt(0).toUpperCase() + x.slice(1)))
            .join(" ");


          // axios.get(
          //   `https://front-end-kata.brighthr.workers.dev/api/conflict/${absence.id}`
          // )
          // .then(function (response) {
          //   setConflicts(response.data.conflicts)
          // })
          // .catch(function (error) {
          //   setError(error)
          // })

          return (
            <tr>
              <td>{absence.employee.firstName} {absence.employee.lastName}</td>
              <td>{format(absence.startDate, 'DD MMM, YYYY')}</td>
              <td>{format(endDate, 'DD MMM, YYYY')}</td>
              <td>{type}</td>
              <td>{absence.absenceType ? 'Approved' : 'Pending'}</td>
              {/* {conflicts.map((conflict) => {
                return (
                  <td>{conflict}</td>
                )
              })} */}
              
            </tr>
          )
        })}
      </table>
    </div>
  );
}

export default Absences;
