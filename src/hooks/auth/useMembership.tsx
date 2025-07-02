import { useCallback, useState } from 'react'
import privateApiService from '../../services/ApiPrivate'
import { toast } from 'react-toastify'
import type { MembershipInfo } from '../../model/user/membershipType'

export default function useMembership() {
  const [membershipInfo, setMembershipInfo] = useState<MembershipInfo>()
  const getMembershipInfo = useCallback(async (membershipId: string) => {
    try {
      const response = await privateApiService.getMemberShipInfo(membershipId)
      setMembershipInfo(response.data)
    } catch (error) {
      console.log(error)
      toast.error('Get membership information fail!')
    }
  }, [])
  return { membershipInfo, getMembershipInfo }
}
