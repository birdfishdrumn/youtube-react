import React,{useEffect,useContext} from "react"
import Layout from "../components/Layout/Layout"
import VideoDetail from "../components/VideoDetail/VideoDetail"
import SideList from "../components/SideList/SideList";
import { fetchRelatedData,fetchSelectedData } from "../apis/index"
import { Store } from "../store/index"
import {useLocation} from "react-router-dom"

const Watch = () => {
  const { setGlobalState } = useContext(Store)
  const location = useLocation()
  const setVideos = async () => {
    const searchParamas = new URLSearchParams(location.search)
    const id = searchParamas.get('v')
    if (id) {
      const [selected,related]= await Promise.all([fetchSelectedData(id), fetchRelatedData(id)])
       setGlobalState({
        type: 'SET_SELECTED',
        payload: { selected: selected.data.items.shift() },
       })
         setGlobalState({
        type: 'SET_RELATED',
        payload: { related: related.data.items },
      })
    }
  }

  useEffect(() => {
   setVideos()
  }, [location.search]);
  return (
    <Layout>
      <VideoDetail />
      <SideList />
    </Layout>

  )

}

export default Watch
