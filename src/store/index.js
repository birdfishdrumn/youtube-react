import React,{createContext,useReducer} from "react"
// initialStateの[],{}なのかで違うとリロードじにエラーになるので、注意する
const initialState = {
  popular: [],
  term: {},
  related: [],
  term: "",
  searched: []
}

// action.payloadが...とスプレッド構文がないのは、TOP.jsxなどから渡ってくる、action,payloadの値が単一だから。
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_POPULAR':
      return {
         ...state,
        popular: action.payload.popular
      }
        case "SET_RELATED":
      return {
        ...state,
        related: action.payload.related
      }
    case "SET_SELECTED":
      return {
        ...state,
        selected: action.payload.selected
      }

       case "SET_SEARCHED":
      return {
        ...state,
        searched: action.payload.searched
      }
   case "SET_TERM":
      return {
        ...state,
        term: action.payload.term
      }
    default:
      return state
  }
}


export const Store = createContext({
  globalState: initialState,
  setGlobalState: () => null
})

export const StoreProvider = ({ children }) => {
  const [globalState,setGlobalState] = useReducer(reducer,initialState)
  return (
    <Store.Provider value={{ globalState, setGlobalState}}>{children}</Store.Provider>
  )

}

export default StoreProvider
