const dotenv = require("dotenv");
dotenv.config();

const COMPANY_DATA = {
  Apple: {
    summary: "Apple is a strong technology company with global presence.",
    strengths: ["Strong brand value", "High customer loyalty", "Stable revenue growth"],
    risks: ["Market competition", "Regulatory pressure"],
    recommendation: "INVEST",
  },
  Tesla: {
    summary: "Tesla is a fast-growing electric vehicle company.",
    strengths: ["Innovation in EV market", "Strong leadership", "Growing demand"],
    risks: ["High market volatility", "Production challenges"],
    recommendation: "MODERATE INVEST",
  },
  Google: {
    summary: "Google dominates search and cloud technologies.",
    strengths: ["Strong ad revenue", "Cloud business growth", "AI leadership"],
    risks: ["Privacy concerns", "Regulatory risks"],
    recommendation: "INVEST",
  },
  Amazon: {
    summary: "Amazon is a global leader in e-commerce and cloud computing.",
    strengths: ["Strong AWS growth", "Massive customer base", "Global logistics network"],
    risks: ["High operational costs", "Regulatory scrutiny"],
    recommendation: "INVEST",
  },
  Nvidia: {
    summary: "Nvidia is a leading AI and semiconductor company.",
    strengths: ["AI chip dominance", "Rapid growth", "Strong market demand"],
    risks: ["High valuation", "Chip market competition"],
    recommendation: "HIGH GROWTH INVEST",
  },
  TCS: {
    summary: "TCS is one of India's leading IT services companies.",
    strengths: ["Stable enterprise clients", "Strong global presence", "Consistent profits"],
    risks: ["IT market slowdown", "Currency fluctuations"],
    recommendation: "SAFE INVEST",
  },
};

const DEFAULT_PROFILE = {
  summary: "This company shows moderate business potential.",
  strengths: ["Market presence", "Growth opportunities"],
  risks: ["Competition", "Economic uncertainty"],
  recommendation: "RESEARCH MORE",
};

function normalizeCompanyName(company) {
  return String(company || "").trim().toLowerCase();
}

function getFallbackData(company) {
  return {
    name: company,
    ...DEFAULT_PROFILE,
  };
}

async function requestGeminiProfile(company) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return null;
  }

  // Placeholder implementation for Gemini/API integration.
  // A real implementation would call the provider here and format the response.
  return null;
}

async function buildCompanyProfile(company) {
  const normalized = normalizeCompanyName(company);

  const profileFromApi = await requestGeminiProfile(company);
  if (profileFromApi) {
    return profileFromApi;
  }

  const fallback = Object.keys(COMPANY_DATA).find(
    (name) => name.toLowerCase() === normalized,
  );

  const data = fallback ? COMPANY_DATA[fallback] : DEFAULT_PROFILE;

  return {
    name: company,
    summary: data.summary,
    strengths: data.strengths,
    risks: data.risks,
    recommendation: data.recommendation,
  };
}

module.exports = { buildCompanyProfile };
