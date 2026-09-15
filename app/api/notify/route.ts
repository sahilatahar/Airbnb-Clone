import { NextRequest } from "next/server";

const NTFY_TOPIC = process.env.NTFY_TOPIC;

function parseUserAgent(ua: string) {
    let browser = "Unknown Browser";
    let os = "Unknown OS";
    let deviceType = "Desktop";

    // Detect Device Type
    if (/iPad|Tablet|(android(?!.*mobile))/i.test(ua)) {
        deviceType = "Tablet";
    } else if (/Mobile|iPhone|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle/i.test(ua)) {
        deviceType = "Mobile";
    }

    // Detect OS
    if (/Windows NT 10.0/i.test(ua)) os = "Windows 10/11";
    else if (/Windows NT 6.3/i.test(ua)) os = "Windows 8.1";
    else if (/Windows NT 6.1/i.test(ua)) os = "Windows 7";
    else if (/Windows/i.test(ua)) os = "Windows";
    else if (/iPhone/i.test(ua)) os = "iOS (iPhone)";
    else if (/iPad/i.test(ua)) os = "iPadOS";
    else if (/Macintosh|Mac OS X/i.test(ua)) os = "macOS";
    else if (/Android/i.test(ua)) os = "Android";
    else if (/Linux/i.test(ua)) os = "Linux";
    else if (/CrOS/i.test(ua)) os = "ChromeOS";

    // Detect Browser
    if (/Edg\//i.test(ua)) {
        const match = ua.match(/Edg\/([\d.]+)/);
        browser = `Edge ${match ? match[1].split(".")[0] : ""}`;
    } else if (/OPR\/|Opera/i.test(ua)) {
        browser = "Opera";
    } else if (/SamsungBrowser/i.test(ua)) {
        browser = "Samsung Internet";
    } else if (/Chrome\//i.test(ua)) {
        const match = ua.match(/Chrome\/([\d.]+)/);
        browser = `Chrome ${match ? match[1].split(".")[0] : ""}`;
    } else if (/Safari\//i.test(ua) && !/Chrome/i.test(ua)) {
        const match = ua.match(/Version\/([\d.]+)/);
        browser = `Safari ${match ? match[1].split(".")[0] : ""}`;
    } else if (/Firefox\//i.test(ua)) {
        const match = ua.match(/Firefox\/([\d.]+)/);
        browser = `Firefox ${match ? match[1].split(".")[0] : ""}`;
    }

    return { browser: browser.trim(), os, deviceType };
}

function getClientIp(req: NextRequest) {
    const forwardedFor = req.headers.get("x-forwarded-for");
    if (forwardedFor) {
        return forwardedFor.split(",")[0].trim();
    }
    return (
        req.headers.get("x-real-ip") ||
        req.headers.get("cf-connecting-ip") ||
        "Unknown IP"
    );
}

function getGeoLocation(req: NextRequest) {
    const city = req.headers.get("x-vercel-ip-city") || req.headers.get("cf-ipcity");
    const country =
        req.headers.get("x-vercel-ip-country") ||
        req.headers.get("cf-ipcountry") ||
        req.headers.get("x-country-code");

    if (city && country) return `${city}, ${country}`;
    if (country) return country;
    return null;
}

export async function POST(req: NextRequest) {
    try {
        const userAgent = req.headers.get("user-agent") || "Unknown UA";
        const referer = req.headers.get("referer") || "Direct Visit";
        const language = req.headers.get("accept-language")?.split(",")[0] || "Unknown";
        const ip = getClientIp(req);
        const geo = getGeoLocation(req);

        const { browser, os, deviceType } = parseUserAgent(userAgent);

        const locationStr = geo ? `${geo} (IP: ${ip})` : `IP: ${ip}`;
        const timeStr =
            new Date().toLocaleString("en-US", {
                timeZone: "UTC",
                dateStyle: "medium",
                timeStyle: "short",
            }) + " UTC";

        const lines = [
            `📱 Device: ${deviceType} (${os})`,
            `🌐 Browser: ${browser}`,
            `📍 Location: ${locationStr}`,
            `🔗 Source: ${referer}`,
            `🗣️ Language: ${language}`,
            `⏰ Time: ${timeStr}`,
        ];

        const deviceTag =
            deviceType === "Mobile"
                ? "iphone"
                : deviceType === "Tablet"
                  ? "ipad"
                  : "computer";

        await fetch(`https://ntfy.sh/${NTFY_TOPIC}`, {
            method: "POST",
            headers: {
                Title: `New Visitor: ${browser} on ${os}`,
                Priority: "default",
                Tags: `house,${deviceTag},globe_with_meridians`,
            },
            body: lines.join("\n"),
        });

        return new Response("ok", { status: 200 });
    } catch (error) {
        console.error("Failed to send ntfy notification with metadata:", error);
        return new Response("error", { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    return POST(req);
}
