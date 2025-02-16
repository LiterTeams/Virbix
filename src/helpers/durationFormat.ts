export const durationFormat = (duration: number): string => {
    const totalMinutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours >= 10 ? hours : "0"+hours}` + ":" + `${minutes >= 10 ? minutes : "0"+minutes}` + ":" + `${seconds >= 10 ? seconds : "0"+seconds}`
}