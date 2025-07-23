import React, { useEffect, useState } from 'react'
import type { InitialState } from '../../../model/initialType/initialType'
import privateApiService from '../../../services/ApiPrivate'
import type { PlanFilter } from '../../../model/user/planType'

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  setFilter: React.Dispatch<React.SetStateAction<PlanFilter | undefined>>
}
type ErrorType = {
  startTime?: string
  endTime?: string
}
export default function PlanFilterPopup({ setIsOpen, setFilter }: Props) {
  const [initialCigarettes, setInitialCigarettes] = useState<InitialState[]>()
  const [startTime, setStartTime] = useState<number>()
  const [endTime, setEndTime] = useState<number>()
  const [initialChoice, setInitialChoice] = useState<string>()
  const [error, setError] = useState<ErrorType>()
  useEffect(() => {
    const fetchAllInitialCigarettes = async () => {
      try {
        const response = await privateApiService.getAllInitialState()
        setInitialCigarettes(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllInitialCigarettes()
  }, [])
  const validateDate = () => {
    const error: { startTime?: string; endTime?: string } = {}
    if (startTime && endTime) {
      if (startTime > endTime) {
        error.startTime = 'Start time must less than end time'
      }
    } if (startTime && !endTime) {
      error.endTime = 'If you choose start. Must choose end time'
    } else if (!startTime && endTime) {
      error.startTime = 'If you choose end time. Must choose start time'
    }
    setError(error)
    return Object.keys(error).length === 0
  }
  const handleSave = () => {
    const newFilter: PlanFilter = {}
    if (initialChoice) {
      newFilter.initial_cigarette_id = initialChoice
    }
    if (startTime && endTime || startTime || endTime) {
      if (validateDate()) {
        newFilter.date = {
          start_time: startTime,
          end_time: endTime
        }
      }
    }
    setFilter(newFilter)
    setIsOpen(false)
  }
  return (
    <div className='z-50 bg-gray-100 p-5 rounded-2xl flex items-center gap-10'>
      <div className='flex flex-col'>
        <label htmlFor="initial">Initial cigarettes</label>
        <select className='bg-gray-300 rounded-2xl px-10 py-2' name="" id="initial" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setInitialChoice(e.target.value)}>
          <option value="">--Choose your initial state--</option>
          {initialCigarettes?.map((item) => (
            <option key={item._id} value={item._id}>Initial State with nicotine: {item.nicotine_evaluation}</option>
          ))}
        </select>
      </div>
      <div className='flex gap-10'>
        <div className='flex flex-col'>
          <label htmlFor="start">Start time</label>
          <input className='bg-gray-300 rounded-2xl px-5 py-2' id='start' type="date" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartTime(Number(new Date(e.target.value).getTime()))} />
          {error?.startTime ? <p className='text-red-400'>{error.startTime}</p> : ''}
        </div>
        <div className='flex flex-col'>
          <label htmlFor="end">End time</label>
          <input className='bg-gray-300 rounded-2xl px-5 py-2' id='end' type="date" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEndTime(Number(new Date(e.target.value).getTime()))} />
          {error?.endTime ? <p className='text-red-400'>{error.endTime}</p> : ''}
        </div>
      </div>
      <div className='flex gap-5'>
        <button className='bg-blue-400 rounded-2xl px-3 py-2 text-white hover:opacity-70 cursor-pointer' onClick={handleSave}>Save</button>
        <button className='bg-red-400 rounded-2xl px-3 py-2 text-white hover:opacity-70 cursor-pointer' onClick={() => setIsOpen(false)}>Cancel</button>
      </div>
    </div>
  )
}
