♦️ import { offers } from "@/constants";
    👉 rufe automatisch index.ts auf
    import { offers } from "@/constants/index";

♦️ definieren import-type
    👉 touch types.d.ts
         
        declare module { *.png
          const value: number
          export default value    
        }
      
♦️ tailwind-css definieren   

    @import "@/styles/components.css";
    @import "@/styles/cart.css";
    
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    
    @layer utilities {
        .flex-center {
        @apply flex items-center justify-center;
        }
        
        .flex-between {
        @apply flex items-center justify-between;
        }
        
        .flex-start {
        @apply flex items-start justify-center;
        }
    }