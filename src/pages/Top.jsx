import React,{useEffect,useContext} from "react"
import Layout from "../components/Layout/Layout"
import { fetchPopularData } from "../apis/index"
import { Store } from "../store/index"
import VideoGrid from "../components/VideoGrid/VideoGrid"
import VideoGridItem from "../components/VideoGridItem/VideoGridItem"
const Top = () => {
const { globalState, setGlobalState} = useContext(Store)

useEffect(() => {
  fetchPopularData().then((res) => {
    // actionsに相当する箇所
    setGlobalState({
      type: 'SET_POPULAR',
      // res.data.itemsは実際のyoutubeのデータが格納されている場所
      payload: { popular: res.data.items }
    })
})
},[]);
console.log(globalState.popular)
  return (
    <Layout>
      <VideoGrid>
        {globalState.popular && globalState.popular.map((popular) => {
          return (
            <VideoGridItem
              id={popular.id}
              key={popular.id}
              src={popular.snippet.thumbnails.standard.url}
              title={popular.snippet.title}
            />
  )
})}
      </VideoGrid>
      <div>

  Top
</div>
    </Layout>

  )

}

export default Top
