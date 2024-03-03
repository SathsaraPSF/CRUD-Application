import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [id, setId] = useState("");
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [students, setUsers] = useState([]);

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {

    const result = await axios.get("http://localhost:5192/api/Student/GetStudent");
    setUsers(result.data);
    console.log(result.data);
  }

  async function save(event) {

    event.preventDefault();
    try {
      await axios.post("http://localhost:5192/api/Student/AddStudent", {

        name: name,
        course: course,

      });
      alert("Student Registation Successfully");
      setId("");
      setName("");
      setCourse("");


      Load();
    } catch (err) {
      alert(err);
    }
  }

  async function editStudent(students) {
    setName(students.name);
    setCourse(students.course);


    setId(students.id);
  }

  async function DeleteStudent(id) {
    await axios.delete("http://localhost:5192/api/Student/DeleteStudent/" + id);
    alert("Employee deleted Successfully");
    setId("");
    setName("");
    setCourse("");
    Load();
  }


  async function update(event) {
    event.preventDefault();
    try {
      await axios.patch("http://localhost:5192/api/Student/UpdateStudent/" + students.find((u) => u.id === id).id || id,
        {
          id: id,
          name: name,
          course: course,
        }
      );
      alert("Registation Updated");
      setId("");
      setName("");
      setCourse("");

      Load();
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div className='flex flex-col w-full min-h-full'>


      <div className='flex items-center justify-center w-full h-[20%] bg-slate-200 p-4 font-bold '>
        <span className='text-[2rem]'>Student Details</span>
      </div>


      {/* Register & Update buttons */}
      <div className='flex items-center justify-center flex-col  mt-6 sm:w-full sm:h-[50%] gap-4'>

        <div className='flex flex-col gap-4 min-[320px]:w-[300px] sm:w-[600px] md:w-[700px] h-[200px]'>

          <div className='flex flex-col gap-2'>
            <input
              type='text'
              name='name'
              value={name}
              hidden
              onChange={(event) => { setName(event.target.value) }}
              className='border-2 h-10 sm:w-full outline-none p-2 rounded-[5px] ' />
          </div>

          <div className='flex flex-col gap-2'>
            <label>Student Name</label>
            <input
              type='text'
              name='name'
              value={name}
              onChange={(event) => { setName(event.target.value) }}
              className='border-2 h-10 sm:w-full outline-none p-2 rounded-[5px] text-slate-500' />
          </div>

          <div className='flex flex-col gap-2'>
            <label>Course</label>
            <input
              type='text'
              name='course'
              value={course}
              onChange={(event) => { setCourse(event.target.value) }}
              className='border-2 h-10 sm:w-full outline-none p-2 rounded-[5px] text-slate-500' />
          </div>

          <div className='flex min-[320px]:flex-col min-[320px]:gap-3 sm:flex-row  w-full justify-evenly'>
            <button onClick={save} className=' sm:w-[30%] h-10 bg-sky-600 rounded-sm text-white font-bold'>Register</button>
            <button onClick={update} className='sm:w-[30%] h-10 bg-amber-400 rounded-sm   font-bold text-black'>Update</button>
          </div>

        </div>
      </div>


      {/* Retrive data from the table */}
      <div className="flex items-center justify-center w-full min-h-10 min-[320px]:mt-28 sm:mt-14">
        <table className="  shadow-2xl border-collapse border-2 border-slate-500 w-[90%] ">
          <thead className="text-white">
            <tr>
              <th className="min-[320px]:text-[0.8rem] sm:text-[1rem] py-3 border bg-cyan-800 border-slate-600">Student Id</th>
              <th className="min-[320px]:text-[0.8rem] sm:text-[1rem]  py-3 border bg-cyan-800 border-slate-600">Student Name</th>
              <th className="min-[320px]:text-[0.8rem] sm:text-[1rem]  py-3 border bg-cyan-800 border-slate-600">Course</th>
              <th className="min-[320px]:text-[0.8rem] sm:text-[1rem]  py-3 border bg-cyan-800 border-slate-600">Options</th>
            </tr>
          </thead>
          {students.map(function fn(student) {
            return (
              <tbody className="text-center">
                <tr>
                  <td className="min-[320px]:text-[0.8rem] sm:text-[1rem]  p-3">{student.id} </td>
                  <td className="min-[320px]:text-[0.8rem] sm:text-[1rem]  p-3">{student.name}</td>
                  <td className="min-[320px]:text-[0.8rem] sm:text-[1rem]  p-3">{student.course}</td>

                  <td className="flex min-[320px]:flex-col min-[320px]:gap-2 md:flex-row justify-evenly items-center p-3">
                    <button
                      type="button"
                      class="min-[320px]:text-[0.8rem] sm:text-[1rem]  min-[320px]:w-full  md:w-[30%] h-8 bg-green-600 rounded-sm text-white font-bold"
                      onClick={() => editStudent(student)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      class="min-[320px]:text-[0.8rem] sm:text-[1rem]  min-[320px]:w-full md:w-[30%] h-8 bg-red-700 rounded-sm text-white font-bold"
                      onClick={() => DeleteStudent(student.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            )
          })}
        </table>
      </div>

    </div>
  )
}

export default App
