'use client'

import { useEnvContext } from "@/hooks/useEnvContext";
import { useRef, useState } from "react";

interface FieldEnvType{
    numero: number
    keyEnv: string
    valueEnv: string
}

export default function FieldEnv({ numero, keyEnv, valueEnv}: FieldEnvType){
    const {envState, addEnv, deleteEnv, changeValue} = useEnvContext()
    const inputRef1 = useRef<HTMLInputElement>(null);
    const inputRef2 = useRef<HTMLInputElement>(null);
    const [msjButton, setMsjButton] = useState('add')

    function obtenerArrayDesdeURL(url: string): string[] {
        const regex = /^https?:\/\/[^:]+:(\d+)\/?(.*)$/;
        const matches = url.match(regex);
        if (matches && matches.length === 3) {
          const port = matches[1];
          const path = matches[2];
          return [port!, path!];
        }
        return [];
      }

    function handleClick() {
        if (msjButton == 'add') {
            addEnv({ id: numero, keyVar: inputRef1.current!.value, valueVar: inputRef2.current!.value });
            const result = obtenerArrayDesdeURL(inputRef2.current!.value)
            changeValue({k:'puerto_back', v:result[0]!})
            changeValue({k:'endpoint', v:`/${result[1]!}`})
            changeValue({k:'api_url', v:inputRef1.current!.value})
            // inputRef1.current!.value = ''
            // inputRef2.current!.value = ''
            setMsjButton('delete')
        } else {
            deleteEnv(numero)
            setMsjButton('add')
        }
    }
    
    return (
        <div className="flex justify-between items-center">
            <div className="mr-2 sm:mr-4 py-0 sm:flex sm:gap-4 sm:px-0">
                <div className="text-sm font-medium leading-6 text-gray-900">Key</div>
                <div className="mt-1 text-sm leading-6 text-gray-700 sm:mt-0">
                    <input
                    type="text"
                    defaultValue={keyEnv}
                    className="w-full border border-gray-300 rounded-lg py-1 px-2 focus:outline-none focus:ring-2 focus:ring-customColor text-xs"
                    ref={inputRef1}
                    disabled= {msjButton=="delete"?true:false}
                    />
                </div>
            </div> 
            <div className="mr-2 sm:mr-4 py-6 sm:flex sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Value</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-0">
                    <input
                    type="text"
                    defaultValue={valueEnv}
                    className="w-full border border-gray-300 rounded-lg py-1 px-2 focus:outline-none focus:ring-2 focus:ring-customColor text-xs"
                    ref={inputRef2}
                    disabled= {msjButton=="delete"?true:false}
                    />
                </dd>
            </div> 
            <button
                type="submit"
                className={`mt-6 sm:mt-0 rounded-md px-2.5 py-1.5 text-sm font-semibold shadow-sm ${msjButton === 'delete' ? 'bg-white border-2 border-red-400 text-black hover:bg-red-400' : 'bg-customColor text-white hover:bg-customColor'} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-customColor`}
                onClick={handleClick}
            >
                {msjButton}
            </button>
        </div>
    )
}
