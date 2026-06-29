const { buildCompanyProfile } = require("./services/geminiService");

function validateCompany(company) {
  const value = String(company || "").trim();

  if (!value) {
    throw new Error("Company name is required for analysis.");
  }

  return value;
}

function formatAnalysis(profile) {
  return `
==============================
COMPANY: ${profile.name}
==============================

?? COMPANY SUMMARY
${profile.summary}

--------------------------------
? STRENGTHS
- ${profile.strengths.join("\n- ")}

--------------------------------
?? RISKS
- ${profile.risks.join("\n- ")}

--------------------------------
?? INVESTMENT DECISION
${profile.recommendation}

==============================
`;
}

async function runInvestmentAgent(company) {
  const companyName = validateCompany(company);
  const profile = await buildCompanyProfile(companyName);
  return formatAnalysis(profile);
}

module.exports = { runInvestmentAgent };
