import React, { useState, useEffect } from 'react'
import { arrayShuffle } from 'array-shuffle';

function App() {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [index, setIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("")
  const [marks, setMarks] = useState(0);
  const [result, setResult] = useState(false);
  const [options, setOptions] = useState([])



  const [data, setdata] = useState(null);
  useEffect(() => {
    fetch("https://the-trivia-api.com/v2/questions")
      .then((res) => res.json())
      .then((res) => {
        setdata(res)
        setLoading(false)
        // console.log(res)
      })
      .catch(() => {
        setError(true)
        return
      })

  }, [])

  useEffect(() => {
    if (data) {
      const shuffled = arrayShuffle([...data[index].incorrectAnswers, data[index].correctAnswer]);
      setOptions(shuffled);
      setSelectedOption("");
    }
  }, [data, index]);

  function changeIndex() {
    // console.log(selectedOption)
    if (!selectedOption) return

    if (selectedOption === data[index].correctAnswer) {
      setMarks(prev => prev + 10)
    }

    if (index === data.length - 1) {
      setResult(true)
      return
    }

    setIndex(prev => prev + 1)
  }
  return (
    <>



      <div className='flex justify-center items-center m-25'>
        <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl p-6">


          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Quiz App</h1>
            <span className="text-sm text-gray-500">{index + 1} / 10</span>
          </div>
          {loading && <h1>Loadding...</h1>}
          {error && <h1>Error Occured</h1>}
          {result && <h1>Final Score : {marks}</h1>}
          {!loading && !error && data && !result && (
            <div className="mb-6">
              <p className="text-lg font-medium text-gray-700">
                {data[index].question.text}
              </p>
            </div>
          )}


          {!result && options.map((item, i) => {
            return <label key={`options${i}`} className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 cursor-pointer hover:bg-indigo-50 hover:border-indigo-400 transition">
              <input type="radio" value={item} name="option" checked={selectedOption === item}
                onChange={(e) => setSelectedOption(e.target.value)} className="accent-indigo-600" />
              <span className="text-gray-700">{item}</span>
            </label>
          })}

          <div className="flex justify-between items-center mt-6">
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 transition cursor-pointer" onClick={changeIndex}>
              Next
            </button>
          </div>

        </div>
      </div>

    </>
  )
}

export default App
