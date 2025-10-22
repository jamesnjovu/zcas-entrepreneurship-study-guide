export const pastExamQuestions = [
  {
    id: "dec-2022",
    year: 2022,
    month: "December",
    semester: "Semester 2",

    examInfo: {
      title: "END OF SEMESTER EXAMINATION",
      courseCode: "BAC432/BAF432/BEF432/BAE432/BMM441/BBA422/BHR412",
      courseName: "INNOVATION AND ENTREPRENEURSHIP",
      date: "MONDAY, 5TH DECEMBER 2022",
      duration: "THREE HOURS",
      instructions: [
        "Section A: This question is compulsory and must be attempted.",
        "Section B: Answer any Three (3) questions.",
        "Total Marks: 100.",
      ],
    },

    sections: [
      // =======================================================
      // SECTION A  (Compulsory – 40 Marks)
      // =======================================================
      {
        id: "A",
        title: "Section A (Compulsory – 40 Marks)",
        questions: [
          {
            id: 1,
            totalMarks: 40,
            context: `At a recent meeting with the Zambia Development Agency (ZDA) and the National Coordinating Committee for the Buy Zambian Products Campaign, to discuss how to enhance the quality of Zambian products manufactured by Micro, Small and Medium Sized Enterprises (MSMEs), the Minister of Commerce, Trade and Industry, Honourable Chipoka Mulenga, MP, as the Guest of Honour contended that one way in which Zambian entrepreneurs can survive in a very competitive business environment is by becoming more and more innovative in their dealings with various business stakeholders. The Minister argued that in order for entrepreneurs to survive in a hostile and competitive environment, they should always seek to meet or exceed the expectations of their stakeholders like customers, suppliers, employees, financial institutions, Government and its Agencies and family and friends, among others. The Minister emphasized that Zambian entrepreneurs ought to fully understand what entrepreneurship is in a perspective, in order for them (entrepreneurs) to strategically position themselves in the marketplace. The Minister implored ZDA and the National Coordinating Committee for the Buy Zambian Products Campaign to design robust programmes and activities that can stimulate quality improvement and operational efficiencies among Zambian MSMEs.`,

            parts: [
              // ---------- PART (a) ----------
              {
                part: "a",
                marks: 20,
                question:
                  "Discuss with examples, the Ten (10) Economic Forces that can shape innovative strategies among MSMEs.",
                answerSource:
                  "Unit 2 – Factors Affecting Innovation → Economic Forces",
                modelAnswer: [
                  "1️⃣ Number of Customers – MSMEs innovate to expand and satisfy a growing customer base (e.g., local bakeries introducing online ordering).",
                  "2️⃣ Sales Growth – Sustained sales push firms to improve production processes for efficiency.",
                  "3️⃣ Market Share – Competition for greater market share drives product and service differentiation.",
                  "4️⃣ Return on Investment (ROI) – Entrepreneurs adopt technologies that improve resource use and profitability.",
                  "5️⃣ Productivity – Automation or better workflow increases output per employee.",
                  "6️⃣ Profits – Innovative cost-saving ideas increase margins and sustainability.",
                  "7️⃣ Share Value – Continuous innovation enhances business reputation and investor confidence.",
                  "8️⃣ Net Worth – Innovation raises firm assets through new ventures and intellectual property.",
                  "9️⃣ Size of Premises – Expansion or modernization signals growth and operational innovation.",
                  "🔟 Customer Satisfaction – Customer feedback encourages process and product improvements.",
                ],
              },

              // ---------- PART (b) ----------
              {
                part: "b",
                marks: 20,
                question:
                  "Explain with examples the key Summary of Assumptions that must be clearly examined when preparing a Business Plan.",
                answerSource:
                  "Unit 8 – Writing a Business Plan → Assumptions in a Business Plan",
                modelAnswer: [
                  "1️⃣ Market Demand – Forecast of expected customers (e.g., 5 000 units per year).",
                  "2️⃣ Pricing – Selling price per unit and its effect on demand.",
                  "3️⃣ Cost Structure – Projected production and operating costs.",
                  "4️⃣ Sales and Revenue – Expected turnover over specific periods.",
                  "5️⃣ Operational Capacity – Output possible with existing machinery or manpower.",
                  "6️⃣ Regulatory Environment – Licensing, taxes, and statutory compliance.",
                  "7️⃣ Economic Conditions – Inflation, exchange rate, and GDP growth trends.",
                  "8️⃣ Competition – Number and strength of existing competitors.",
                  "9️⃣ Human Resources – Availability and competence of required staff.",
                  "🔟 Funding – Sources of finance (equity, loans, grants).",
                  "11️⃣ Technology – Equipment reliability and upgrade plans.",
                  "12️⃣ Seasonality – Expected high and low demand cycles (e.g., festive seasons).",
                ],
              },
            ],
          },
        ],
      },
      // ========================= SECTION B =========================
      {
        id: "B",
        title: "Section B (Answer any 3 Questions – 20 Marks Each)",
        questions: [
          {
            id: 2,
            totalMarks: 20,
            parts: [
              {
                part: "a",
                marks: 10,
                question:
                  "Outline operational methods that would ensure a peanut butter project meets quality and competitiveness.",
                answerSource:
                  "Unit 4 – Technology & HR Management Impact → Operational Methods Tips",
                modelAnswer: [
                  "1. Use methods that meet or exceed quality standards (e.g., ZABS, HACCP).",
                  "2. Adopt processes that improve competitive position and efficiency.",
                  "3. Apply methods that optimize machinery, materials, and manpower.",
                  "4. Use procedures that are easy for all workers to understand and follow.",
                  "5. Minimize costs while maintaining product quality and consistency.",
                ],
              },
              {
                part: "b",
                marks: 10,
                question:
                  "Differentiate between the make-up of a business opportunity and the qualities of a good opportunity.",
                answerSource:
                  "Unit 5 – Entrepreneurship & Business Opportunities → Make-up and Qualities",
                modelAnswer: [
                  "Make-up: The four elements — market need, means to meet the need, method to apply the means, and method to benefit.",
                  "Qualities: Attractive to customers, timely, durable, and value-adding.",
                  "Key Difference: Make-up defines structure, while qualities define desirability and strength of the opportunity.",
                ],
              },
            ],
          },

          {
            id: 3,
            totalMarks: 20,
            question:
              "Discuss pricing issues and determinants affecting entrepreneurial ventures.",
            answerSource:
              "Unit 7 – Marketing in Entrepreneurship → 8Ps (Price)",
            modelAnswer: [
              "Pricing Issues:",
              "1. Setting pricing objectives (profit, penetration, survival).",
              "2. Recovering production and marketing costs.",
              "3. Understanding customer perception of value.",
              "4. Dealing with competitors’ pricing strategies.",
              "5. Adapting to market demand and seasonality.",
              "6. Complying with government pricing laws.",
              "7. Managing distribution margins and commissions.",
              "8. Adjusting for product life cycle stages.",
              "",
              "Pricing Determinants:",
              "1. Production and material costs.",
              "2. Customer willingness to pay.",
              "3. Competitor pricing levels.",
              "4. Product differentiation and brand strength.",
              "5. Marketing and logistics expenses.",
              "6. Business objectives and strategies.",
              "7. Economic and market conditions.",
              "8. Supply chain stability and input availability.",
              "9. Government policies and taxes.",
              "10. Technology influencing efficiency and cost.",
            ],
          },

          {
            id: 4,
            totalMarks: 20,
            question:
              "Explain how Corporate Entrepreneurship can be encouraged in an institution like ZCAS University.",
            answerSource:
              "Unit 6 – Entrepreneurial Contexts & Teams → Corporate Entrepreneurship Environment",
            modelAnswer: [
              "1. Promote an innovation-supporting culture across departments.",
              "2. Empower employees with autonomy and decision-making freedom.",
              "3. Provide adequate resources and funding for innovative projects.",
              "4. Establish reward systems for creativity and performance.",
              "5. Maintain flexible organizational structures and teamwork.",
              "6. Offer training and mentorship programs on innovation.",
              "7. Implement risk management policies encouraging experimentation.",
              "8. Align innovation initiatives with institutional strategy.",
              "9. Strengthen external networking and partnerships.",
              "10. Monitor and evaluate innovation progress and impact.",
              "11. Maintain open communication through innovation platforms.",
              "12. Ensure leadership commitment and active participation.",
            ],
          },

          {
            id: 5,
            totalMarks: 20,
            parts: [
              {
                part: "a",
                marks: 10,
                question:
                  "Outline socio-economic benefits that can result from a new business venture.",
                answerSource:
                  "Unit 8 – Writing a Business Plan → Socio-Economic Benefits",
                modelAnswer: [
                  "1. Employment creation and skills development.",
                  "2. Technology transfer and capacity building.",
                  "3. Import substitution and local production.",
                  "4. Increased government revenue through taxes.",
                  "5. Development of local supply chains.",
                  "6. Infrastructure improvement in communities.",
                  "7. Contribution to food security and self-sufficiency.",
                  "8. Encouragement of entrepreneurship culture.",
                  "9. Poverty reduction and improved living standards.",
                  "10. Regional economic growth stimulation.",
                ],
              },
              {
                part: "b",
                marks: 10,
                question:
                  "Describe five (5) sales promotion strategies an entrepreneur can use to boost product sales.",
                answerSource:
                  "Unit 7 – Marketing in Entrepreneurship → 8Ps (Promotion)",
                modelAnswer: [
                  "1. Price-based promotions – discounts, coupons, and special offers.",
                  "2. Product sampling – free trials or demonstrations to attract customers.",
                  "3. Loyalty programs – points, rewards, and membership benefits.",
                  "4. Contests and competitions – prizes to increase engagement.",
                  "5. Premium and bonus packs – offering extra products or gifts.",
                  "Additional examples: trade promotions, exhibitions, and digital marketing campaigns.",
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  // =======================================================
  // OCTOBER 2023 MID-SEMESTER TEST
  // =======================================================
  {
    id: "oct-2023",
    year: 2023,
    month: "October",
    semester: "Mid-Semester Test",
    examInfo: {
      title: "MID SEMESTER TEST",
      institution: "ZCAS University",
      courseCode: "BBA 4232",
      courseName: "INNOVATION AND ENTREPRENEURSHIP",
      date: "WEDNESDAY, 25TH OCTOBER 2023",
      duration: "THREE HOURS",
      instructions: [
        "Section A: This question is compulsory and must be attempted.",
        "Section B: Answer Three (3) questions.",
        "Total Marks: 100.",
        "Do not turn this page until instructed.",
      ],
    },
    sections: [
      // ======================= SECTION A =======================
      {
        id: "A",
        title: "Section A (Compulsory – 40 Marks)",
        questions: [
          {
            id: 1,
            totalMarks: 40,
            context: `At a recent meeting with the general public in Mazabuka Constituency to discuss the Constituency Development Fund (CDF), the Minister of Local Government, Honourable Garry Nkombo, MP, as the Guest of Honour contended that one way in which Zambian entrepreneurs can survive in a very competitive business environment is by becoming more and more innovative in their dealings with various business stakeholders. The minister argued that in order for entrepreneurs to survive in a hostile and competitive environment, they should always seek to meet or exceed the expectations of their stakeholders like customers, suppliers, employees, financial institutions, Government and its Agencies and family and friends, among others. The minister emphasized that Zambian entrepreneurs ought to fully understand what entrepreneurship is in a perspective, in order for them (entrepreneurs) to strategically position themselves in the market place. The minister implored the members of his constituency to learn to consult widely and engage as many stakeholders as possible, including university students, in order to fully understand what is meant by entrepreneurship and small business development.`,
            parts: [
              {
                part: "a",
                marks: 20,
                question:
                  "Discuss with examples, the five (5) fundamental steps that describe the Entrepreneurial Process.",
                answerSource:
                  "Unit 1 – Creativity, Invention and Innovation → Entrepreneurship Introduction",
                modelAnswer: [
                  "1. Opportunity Recognition – Identify viable business ideas.",
                  "2. Feasibility Analysis – Evaluate practicality and profitability.",
                  "3. Business Plan Development – Outline strategy, market, and operations.",
                  "4. Resource Mobilization – Gather funds, people, and materials.",
                  "5. Implementation & Growth – Launch, monitor, and expand the venture.",
                ],
              },
              {
                part: "b",
                marks: 20,
                question:
                  "Explain with examples any Five (5) sources of innovation in an organization.",
                answerSource:
                  "Unit 1 – Creativity, Invention and Innovation → Sources of Innovation",
                modelAnswer: [
                  "1. The Unexpected – New solutions from unforeseen events.",
                  "2. The Incongruous – Fixing mismatches in processes or needs.",
                  "3. Process Need – Improvements to production or delivery.",
                  "4. Industry & Market Structures – Changes that open new gaps.",
                  "5. Demographics – Population shifts creating demand.",
                  "6. Changes in Perception – Attitudes altering market opportunities.",
                  "7. New Knowledge – Research producing new technology.",
                ],
              },
            ],
          },
        ],
      },

      // ======================= SECTION B =======================
      {
        id: "B",
        title: "Section B (Answer any Three questions – 20 Marks each)",
        questions: [
          {
            id: 2,
            totalMarks: 20,
            parts: [
              {
                part: "a",
                marks: 10,
                question:
                  "Discuss with examples, at least five (5) key advantages of clustering.",
                answerSource:
                  "Unit 2 – Factors Affecting Innovation → Clusters and Innovation",
                modelAnswer: [
                  "1. Transfer of expertise among firms.",
                  "2. Concentration of advanced factor conditions.",
                  "3. Strong supplier–customer relations.",
                  "4. Shared facilities and cost savings.",
                  "5. Easier knowledge and idea exchange.",
                ],
              },
              {
                part: "b",
                marks: 10,
                question:
                  "Explain any five (5) areas in which changes in social custom may present business ideas.",
                answerSource:
                  "Unit 5 – Business Opportunities → Sources of Business Ideas (Part 3)",
                modelAnswer: [
                  "1. Health services – wellness centers, gyms.",
                  "2. Education – private tutoring and e-learning.",
                  "3. Diet – organic and vegetarian products.",
                  "4. Fashion – modern clothing styles.",
                  "5. Housing – new designs matching lifestyles.",
                ],
              },
            ],
          },

          {
            id: 3,
            totalMarks: 20,
            parts: [
              {
                part: "a",
                marks: 10,
                question:
                  "Explain the role that the new Zambian Government can play in applying Michael Porter’s Diamond Model within the nation.",
                answerSource:
                  "Unit 2 – Factors Affecting Innovation → Porter's Diamond Model",
                modelAnswer: [
                  "1. Invest in education, health, and infrastructure.",
                  "2. Strengthen factor conditions and technology.",
                  "3. Support competitive industries and linkages.",
                  "4. Encourage local demand and quality standards.",
                  "5. Promote entrepreneurial culture nationwide.",
                ],
              },
              {
                part: "b",
                marks: 10,
                question:
                  "Discuss some measures entrepreneurs must take to maintain Human Resources competencies for innovation.",
                answerSource:
                  "Unit 4 – Technology & HR Management Impact → HR Competences",
                modelAnswer: [
                  "1. Regular employee training and skills updates.",
                  "2. Provide proper tools and equipment.",
                  "3. Engage staff in decision-making.",
                  "4. Motivate through incentives and teamwork.",
                  "5. Maintain fair treatment and communication.",
                ],
              },
            ],
          },

          {
            id: 4,
            totalMarks: 20,
            question:
              "With a clear and elaborate example in the Agriculture Sector, discuss the impact of network structures in innovation.",
            answerSource:
              "Unit 3 – Impact of Network Structures on Innovation → Practical Examples",
            modelAnswer: [
              "Networks connect farmers, cooperatives, government, and companies.",
              "Example: ZNFU links farmers with seed suppliers, research institutes, and buyers.",
              "Benefits include faster knowledge sharing, collective lobbying, and reduced risks.",
              "Result: Greater innovation adoption and productivity growth.",
            ],
          },

          {
            id: 5,
            totalMarks: 20,
            question:
              "Describe any five (5) key features that a country can put in place to address Legal and Regulatory Environment as an input/asset of the innovation environment.",
            answerSource:
              "Unit 2 – Factors Affecting Innovation → Innovation Environment Assets",
            modelAnswer: [
              "1. Transparent legal frameworks for startups.",
              "2. Protection of intellectual property rights.",
              "3. Simplified registration and compliance for MSMEs.",
              "4. Incentives for research and investment.",
              "5. Supportive financial regulations enabling innovation funding.",
            ],
          },
        ],
      },
    ],
  },
  // =======================================================
  // JUNE 2025 FINAL EXAM
  // =======================================================
  {
    id: "jun-2025",
    year: 2025,
    month: "June",
    semester: "End of Semester",
    examInfo: {
      title: "FINAL EXAMINATION",
      institution: "ZCAS University",
      courseCode: "BBA 4232",
      courseName: "INNOVATION AND ENTREPRENEURSHIP",
      date: "MONDAY, 2ND JUNE 2025",
      duration: "THREE HOURS",
      instructions: [
        "Section A: This question is compulsory and must be attempted.",
        "Section B: Answer Three (3) questions.",
        "Total Marks: 100.",
        "Do not turn this page until instructed by the invigilator.",
      ],
    },

    sections: [
      // ======================= SECTION A =======================
      {
        id: "A",
        title: "Section A (Compulsory – 40 Marks)",
        questions: [
          {
            id: 1,
            totalMarks: 40,
            context: `At a recent Annual General Meeting (AGM) of the Zambia Chamber of Commerce and Industry (ZACCI), one of the keynote speakers emphasized that Zambian entrepreneurs can survive in a very competitive business environment by becoming more and more innovative. The speaker argued that entrepreneurs must meet or exceed stakeholder expectations — including customers, suppliers, employees, financiers, government agencies, and communities. After the AGM, a group of entrepreneurs in Solwezi organized a week-long Entrepreneurship Skills Training workshop under the theme “Innovation is key in a competitive environment.” You, as a ZCAS University student, have been invited to help them understand what factors trigger innovation in entrepreneurs.`,
            parts: [
              {
                part: "a",
                marks: 25,
                question:
                  "Discuss with examples, characteristics of organizational culture that can support innovations.",
                answerSource:
                  "Unit 4 – Technology & Human Resources Management Impact on Innovation → Organizational Culture Supporting Innovation",
                modelAnswer: [
                  "1️⃣ Shared Vision – Everyone understands and supports the company’s innovation goals.",
                  "2️⃣ Creativity Valued – New ideas are encouraged without fear of criticism.",
                  "3️⃣ Teamwork – Collaboration across departments fosters idea generation.",
                  "4️⃣ Open Communication – Free flow of ideas between management and staff.",
                  "5️⃣ Learning Orientation – Continuous training and skill improvement.",
                  "6️⃣ Risk Acceptance – Failure seen as learning, not punishment.",
                  "7️⃣ Empowerment – Employees have autonomy to act on creative ideas.",
                  "8️⃣ Supportive Leadership – Managers champion innovation initiatives.",
                  "9️⃣ Recognition – Innovative performance is rewarded.",
                  "🔟 Balance of Competition & Cooperation – Healthy competition spurs excellence.",
                ],
              },
              {
                part: "b",
                marks: 15,
                question:
                  "Using Porter's Diamond Model, explain the role of Government in applying the Diamond within the nation.",
                answerSource:
                  "Unit 2 – Factors Affecting Innovation → Porter’s Diamond Model",
                modelAnswer: [
                  "1️⃣ Factor Conditions – Invest in education, health, and infrastructure.",
                  "2️⃣ Demand Conditions – Encourage high product standards among citizens.",
                  "3️⃣ Related & Supporting Industries – Promote collaboration between sectors.",
                  "4️⃣ Firm Strategy, Structure & Rivalry – Create fair competition and policy support.",
                  "5️⃣ General Role – Provide incentives, remove trade barriers, and fund R&D programs.",
                ],
              },
            ],
          },
        ],
      },

      // ======================= SECTION B =======================
      {
        id: "B",
        title: "Section B (Answer any Three questions – 20 Marks each)",
        questions: [
          {
            id: 2,
            totalMarks: 20,
            parts: [
              {
                part: "a",
                marks: 10,
                question:
                  "Explain with examples why entrepreneurs in Zambia should have this constant habit of paying attention to official government pronouncements made by different government officials.",
                answerSource:
                  "Unit 5 – Entrepreneurship & Business Opportunities → Sources of Business Ideas (Government Incentives)",
                modelAnswer: [
                  "1️⃣ Pronouncements reveal new projects and funding (e.g., CDF, Link Zambia 8000).",
                  "2️⃣ Provide business opportunities through policy changes or incentives.",
                  "3️⃣ Help entrepreneurs adapt to new regulations early.",
                  "4️⃣ Reveal emerging sectors needing local suppliers.",
                  "5️⃣ Build trust and alignment with government programs.",
                ],
              },
              {
                part: "b",
                marks: 10,
                question:
                  "Discuss some of the factors entrepreneurs must consider when selecting the type of methods to use in their day-to-day operations to remain innovative and efficient.",
                answerSource:
                  "Unit 4 – Technology & HR Management Impact on Innovation → Operational Methods Tips",
                modelAnswer: [
                  "1️⃣ Quality Standards – Must meet or exceed required benchmarks.",
                  "2️⃣ Cost Efficiency – Minimize expenses without lowering quality.",
                  "3️⃣ Worker Skill Level – Methods must match employee capabilities.",
                  "4️⃣ Market Demand – Adapt to current trends and customer needs.",
                  "5️⃣ Technology Fit – Use modern, reliable tools for efficiency.",
                ],
              },
            ],
          },

          {
            id: 3,
            totalMarks: 20,
            question:
              "Most entrepreneurs in Zambia argue that formalization/registration of businesses with the Patents and Companies Registration Agency (PACRA) and other relevant Government Agencies is a waste of time and money. Discuss whether or not you agree with these entrepreneurs.",
            answerSource:
              "Unit 5 – Entrepreneurship & Business Opportunities → Importance of Formalization",
            modelAnswer: [
              "Formalization brings credibility and legal protection.",
              "Access to finance, government tenders, and investor trust.",
              "Improves compliance with laws and reduces business risk.",
              "Enhances brand reputation and market reach.",
              "Therefore, registration is essential despite short-term costs.",
            ],
          },

          {
            id: 4,
            totalMarks: 20,
            parts: [
              {
                part: "a",
                marks: 10,
                question:
                  "Discuss with examples any five (5) Economic Forces that can shape innovative strategies.",
                answerSource:
                  "Unit 2 – Factors Affecting Innovation → Economic Forces",
                modelAnswer: [
                  "1️⃣ Number of Customers – Determines market potential.",
                  "2️⃣ Sales Growth – Encourages production efficiency.",
                  "3️⃣ Market Share – Drives differentiation and improvement.",
                  "4️⃣ Productivity – Leads to technological innovation.",
                  "5️⃣ Profits – Incentivize further creative ventures.",
                ],
              },
              {
                part: "b",
                marks: 10,
                question:
                  "Recommend what a small-scale entrepreneur can be doing with workers to regularly undertake very simple and practical Market Research.",
                answerSource:
                  "Unit 5 – Entrepreneurship & Business Opportunities → Market Research Practices",
                modelAnswer: [
                  "1️⃣ Customer feedback sessions after sales.",
                  "2️⃣ Short surveys and suggestion boxes.",
                  "3️⃣ Observation of competitor practices.",
                  "4️⃣ Regular team brainstorming on trends.",
                  "5️⃣ Participation in trade fairs and exhibitions.",
                ],
              },
            ],
          },

          {
            id: 5,
            totalMarks: 20,
            question:
              "Discuss with examples any bad habits that must be avoided as someone prepares to become an entrepreneur.",
            answerSource:
              "Unit 1 – Creativity, Invention and Innovation → Habits to Avoid",
            modelAnswer: [
              "1️⃣ Unnecessary borrowing and debt dependence.",
              "2️⃣ Living beyond one’s income.",
              "3️⃣ Failure to save or budget properly.",
              "4️⃣ Responding to peer pressure or wrong company.",
              "5️⃣ Believing that large capital is required before starting.",
              "6️⃣ Poor planning and lack of discipline.",
              "7️⃣ Avoiding entrepreneurial risks.",
              "8️⃣ Refusal to learn or adapt new ideas.",
            ],
          },
        ],
      },
    ],
  },
];
