// utils/ip.ts

/**
 * Get user's IP address from external service
 */
export const getUserIp = async (): Promise<string> => {
  try {
    // First try ipify.org
    const response = await fetch("https://api.ipify.org?format=json");
    if (!response.ok) throw new Error("ipify failed");

    const data = await response.json();
    if (data.ip) return data.ip;

    throw new Error("No IP in response");
  } catch (error) {
    console.warn("Failed to get IP from ipify:", error);

    try {
      // Fallback to icanhazip.com
      const response = await fetch("https://icanhazip.com");
      if (!response.ok) throw new Error("icanhazip failed");

      const ip = await response.text();
      return ip.trim();
    } catch (fallbackError) {
      console.warn("Failed to get IP from icanhazip:", fallbackError);

      // Fallback to local storage token
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("user_token");
        return token || "unknown";
      }

      return "unknown";
    }
  }
};

/**
 * Generate a unique user token
 */
export const generateUserToken = (): string => {
  if (typeof window === "undefined") {
    return "server-side-token";
  }

  // Check if token already exists
  let token = localStorage.getItem("user_token");

  if (!token) {
    // Generate new token
    token = crypto.randomUUID();
    localStorage.setItem("user_token", token);
  }

  return token;
};

/**
 * Get user agent string
 */
export const getUserAgent = (): string => {
  if (typeof window === "undefined") {
    return "server-side";
  }
  return navigator.userAgent;
};

/**
 * Get device information
 */
export const getDeviceInfo = (): {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  browser: string;
  os: string;
} => {
  if (typeof window === "undefined") {
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      browser: "unknown",
      os: "unknown",
    };
  }

  const userAgent = navigator.userAgent.toLowerCase();

  return {
    isMobile: /mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent),
    isTablet: /tablet|ipad|android(?!.*mobile)/i.test(userAgent),
    isDesktop: !/mobile|android|iphone|ipod|tablet|ipad|blackberry|iemobile|opera mini/i.test(userAgent),
    browser: getBrowserName(userAgent),
    os: getOSName(userAgent),
  };
};

/**
 * Extract browser name from user agent
 */
const getBrowserName = (userAgent: string): string => {
  if (userAgent.includes("chrome") && !userAgent.includes("edg")) return "Chrome";
  if (userAgent.includes("firefox")) return "Firefox";
  if (userAgent.includes("safari") && !userAgent.includes("chrome")) return "Safari";
  if (userAgent.includes("edge")) return "Edge";
  if (userAgent.includes("opera") || userAgent.includes("opr")) return "Opera";
  if (userAgent.includes("trident")) return "Internet Explorer";
  return "Unknown";
};

/**
 * Extract OS name from user agent
 */
const getOSName = (userAgent: string): string => {
  if (userAgent.includes("windows")) return "Windows";
  if (userAgent.includes("mac os")) return "macOS";
  if (userAgent.includes("linux")) return "Linux";
  if (userAgent.includes("android")) return "Android";
  if (userAgent.includes("ios") || userAgent.includes("iphone")) return "iOS";
  return "Unknown";
};
