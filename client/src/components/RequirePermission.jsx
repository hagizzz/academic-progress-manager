import { useEffect } from 'react'
import { fetchProfileStaff } from '../redux/staffSlice'
import { useDispatch, useSelector } from 'react-redux'

function RequirePermission(props) {
    const dispatch = useDispatch()
    const profile = useSelector((state) => state.staffs.profile)

    useEffect(() => {
        dispatch(fetchProfileStaff())
    }, [])

    function hasPermission() {
        return profile.permissions.includes(props.permission)
    }

    return hasPermission() ? props.children : <></>
}

export default RequirePermission
