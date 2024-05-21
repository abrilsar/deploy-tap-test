'use client'

import { Aprops, EnvState, EnvVariable } from "types/interfaces";

type EnvAction = 
|{type: 'addEnv', payload: EnvVariable}
|{type: 'deleteEnv', payload: {index: number}}
|{type: 'changeValue', payload: Aprops}

export const envReducer = (state: EnvState, action: EnvAction): EnvState =>{
    switch (action.type){
        case "addEnv":
            return {
                ...state,
                envList: [...state.envList, action.payload]
            }
        case "deleteEnv":
            const newEnvList = [...state.envList]
            newEnvList.reverse().splice(action.payload.index, 1);
            newEnvList.reverse()
            
            return{
                ...state,
                envList: newEnvList
            }
        case "changeValue":
            return {
                ...state,
                terraformVar: {
                    ...state.terraformVar,
                    [action.payload.k]: action.payload.v,
                  },
            }
        default:
            return state
    }
}