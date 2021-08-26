const SET_LOC = 'location/SET_LOC';
const SET_KMVAL = 'location/SET_KMVAL';
const RESET_LOC = 'location/RESET_LOC';

export const setLoc = loc => ({type: SET_LOC, loc});
export const setKmVal = kmVal => ({type: SET_KMVAL, kmVal});
export const resetLoc = () => ({type: RESET_LOC});

const initialState = {
  location: [],
  kmVal: ''
};

export default function location(state = initialState, action){
  switch(action.type){
    case SET_LOC:
      return {
        ...state,
        location: action.loc
      };
    case SET_KMVAL:
      return {
        ...state,
        kmVal: action.kmVal
      };
    case RESET_LOC:
      return{
        ...state,
        location: []
      };
    default:
      return state;
  }
}