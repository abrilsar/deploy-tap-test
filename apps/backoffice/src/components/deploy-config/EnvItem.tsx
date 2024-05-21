import FieldEnv from "./FieldEnv";
import { EnvVariable } from "types/interfaces";

interface props{
    index: number
    env: EnvVariable
}

export default function EnvItem({index, env}:props){
    return (
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 items-center">
                <dt className="text-sm font-medium leading-6 text-gray-900"></dt>
                    <div className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {/* <FieldEnv key={env.id} msjButton="delete" numero={index} keyEnv={env.keyVar} valueEnv={env.valueVar}/> */}
                    </div>
                </div>
    );
}