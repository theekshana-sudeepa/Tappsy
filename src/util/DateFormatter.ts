export function formatChatTime(timestamp: string): string {

    const date = new Date(timestamp);
    const now = new Date();


    const isToday =

        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear();


    const yesterday = new Date(); // 2025-09-29
    yesterday.setDate(now.getDate() - 1); //29-1=28 => 2025-09-28

    const isYesterday =
        date.getDate() === yesterday.getDate() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getFullYear() === yesterday.getFullYear();

    const timeStr = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });


    if (isToday) return timeStr;
    if (isYesterday) return `Yesterday ${timeStr}`;
    return `${date.toLocaleDateString()} ${timeStr}`;



}