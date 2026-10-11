♦️ import { offers } from "@/constants";
    👉 rufe automatisch index.ts auf
    import { offers } from "@/constants/index";

♦️ definieren import-type
    👉 touch types.d.ts 

        declare module { *.png
          const value: number
          export default value    
        }

♦️ use cn-function von clsx
    npm i clsx

     <View className={cn("flex-1 p-4", isEvent ? "bg-white" : bg-red-400)} />
     👉 Das entspricht:
    <View className="flex-1 p-4 bg-white" /> OR
    <View className="flex-1 p-4 bg-red" />
     
