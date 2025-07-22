import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import UpdatePlan from '../../../components/popup/UpdatePlan'
import ApiPrivate from '../../../services/ApiPrivate'
import type { Plan, SpecificInStage } from '../../../model/user/planType'
import LoadingScreenBg from '../../../components/loading/LoadingScreenBg'
import { toast } from 'react-toastify'
import CustomModal from '../../../components/modal/CustomModal'
import { formDate } from '../../../utils/formDate'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import CheckIcon from '@mui/icons-material/Check'
import privateApiService from '../../../services/ApiPrivate'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { UserRoute } from '../../../const/pathList'
import ChartProcessPlan from './ChartProcessPlan'
const PlanDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [plan, setPlan] = useState<Plan | null>(null)
  const [loading, setLoading] = useState(true)
  const [isUpdateOpen, setIsUpdateOpen] = useState(false)
  const [isStageOpen, setIsStageOpen] = useState(false)
  const [stagePlan, setStagePlan] = useState<SpecificInStage>()
  const navigate = useNavigate()
  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await ApiPrivate.getPlanDetail(id!)
        setPlan(res.data)
      } catch (err) {
        toast.error(err as string)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchPlan()
  }, [id])
  const handleChooseStage = (stage: SpecificInStage) => {
    setStagePlan(stage)
    setIsStageOpen(true)
  }

  const checkStageComplete = async (planId: string) => {
    try {
      setLoading(true)
      if (stagePlan) {
        await privateApiService.checkStagePlan(planId, stagePlan)
        toast.success('Check successfully!')
      }
    } catch (error) {
      toast.error(error as string)
    } finally {
      setLoading(false)
    }
  }
  if (loading) return <LoadingScreenBg/>
  if (!plan) return <div className="p-6">No data has been found</div>

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 via-white to-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-300">
        <div className="bg-black-fig px-8 py-6 flex gap-5 items-center">
          <button className='cursor-pointer' onClick={() => navigate(UserRoute.PLAN_PATH)}>
            <ArrowBackIcon style={{ color:'white' }}/>
            {''}
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white tracking-wide">📋 Plan detail</h1>
            <p className="text-sm text-blue-100 mt-1">Summary and detail process</p>
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 text-gray-800">
            <div>
              <p className="text-sm text-gray-500 font-medium">👤Create id</p>
              <p className="text-lg font-semibold text-blue-700 mt-1">{plan.create_by}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">❤️ Health status</p>
              <p className="text-base font-semibold mt-1">{plan.health_status}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">📅 Start date</p>
              <p className="text-base font-medium mt-1">{formDate(plan.start_date)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">🏁 Expected complete date</p>
              <p className="text-base font-medium mt-1">{formDate(plan.expected_result_date)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">🗑️ Status</p>
              <p className={`font-semibold mt-1 ${plan.isDeleted ? 'text-red-600' : 'text-green-600'}`}>
                {plan.isDeleted ? 'Deleted' : 'Active'}
              </p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-sm text-gray-500 font-medium">📝 Title</p>
              <div className="bg-gray-50 border border-gray-300 p-4 rounded-md mt-1 text-gray-700 leading-relaxed whitespace-pre-line shadow-sm">
                {plan.content}
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center flex-col">
            {/* 👇 Nút Cập nhật kế hoạch */}
            <button
              onClick={() => setIsUpdateOpen(true)}
              className=" bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow"
            >
              ✏️ Update
            </button>
          </div>
        </div>
        <div className="w-full flex gap-5 ml-10 items-center mb-10">
          {plan.process_stage.map((item, index) => (
            <div className={item.isCompleted ? 'bg-[#3baea0] px-5 py-2 text-[#a8e6cf] rounded-2xl hover:opacity-70 cursor-pointer' : 'bg-[#eeeeee] px-5 py-2 rounded-2xl hover:opacity-70 cursor-pointer'} onClick={() => handleChooseStage(item)}>
              <p>Stage {index+1}</p>
            </div>
          ))}
        </div>
      </div>
      {isStageOpen &&
      <CustomModal>
        <div className="relative z-10 bg-white rounded-xl shadow-lg p-6 w-300 overflow-y-auto">
          <button
            onClick={() => setIsStageOpen(false)}
            className="absolute top-1 right-2 text-gray-500 hover:text-red-600 text-[1.2rem] cursor-pointer"
          >
              &times;
          </button>
          <p className='text-2xl mb-5 font-bold text-center bg-[#d3d6db] rounded-2xl p-3'>Stage</p>
          <div className='flex items-center justify-between'>
            <p className='bg-[#f1b963] px-5 py-2 rounded-2xl text-amber-100 font-bold'>Start time: {formDate(stagePlan?.start_time as number)}</p>
            <ArrowRightAltIcon/>
            <p className='bg-[#e46161]  px-5 py-2 rounded-2xl text-white font-bold'>End time: {formDate(stagePlan?.end_time as number)}</p>
          </div>
          <div className='mt-5 flex justify-between mb-15'>
            <div>
              <p className='text-[1.1rem] font-bold'>Expected result</p>
              <p className=''>Need to reduce {stagePlan?.expected_result} cigarettes in a week </p>
            </div>
            {!stagePlan?.isCompleted ?
              <div className='flex justify-end'>
                <button className='bg-[#7dd87d] p-3 rounded-full text-[#e0ffcd] cursor-pointer' onClick={() => checkStageComplete(plan._id)}>
                  <CheckIcon/>
                  {''}
                </button>
              </div>
              :
              <div className='flex items-center'>
                <p className='text-[#7dd87d] font-bold'>Completed</p>
              </div>
            }
          </div>
          {stagePlan && 
          <ChartProcessPlan planId={plan._id} stageData={stagePlan}/>
          }
        </div>
      </CustomModal>
      }

      {/* 👇 Popup UpdatePlan */}
      {isUpdateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Nền mờ + tối */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

          {/* Nội dung popup */}
          <div className="relative z-10 bg-white rounded-xl shadow-lg p-6 w-full max-w-xl">
            <button
              onClick={() => setIsUpdateOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
            >
              &times;
            </button>
            <UpdatePlan
              plan={plan}
              onSuccessUpdate={() => {
                setIsUpdateOpen(false)
                setLoading(true)
                ApiPrivate.getPlanDetail(id!).then(res => setPlan(res.data)).finally(() => setLoading(false))
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default PlanDetail
