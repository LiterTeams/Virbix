export const parseTime = (time: string) => {
    const match = time.match(/(\d+)([smh]?)/);
    if (!match) return 0;
    const value = parseInt(match[1], 10);
    return match[2] === "m" ? (match[3] === "h" ? (value * 60 ** 2) : value * 60) : value;
}