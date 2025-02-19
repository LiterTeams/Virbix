import { FC } from "react";
import { PlayControls, Timeline, PreferenseControls } from "./";
export const Controls: FC = () => {
    return(
        <div className="flex justify-end xl:justify-start items-center xl:ml-12 flex-grow gap-6 xl:p-2 pointer-events-auto">
            <PlayControls />
            <Timeline />
            <PreferenseControls />
        </div>
    )
}