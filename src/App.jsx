import { useState } from "react";

const allQuestions = [
  { id: 1, q: "The right for people to gather peacefully in public spaces to express their opinions or to protest is known as:", options: ["Freedom of speech", "Freedom of the press", "Freedom of association", "Freedom of assembly"], answer: 3 },
  { id: 2, q: "Which of the following is NOT a characteristic of Max Weber's ideal-type bureaucracy?", options: ["Formal hierarchy", "Clearly-defined rules and procedures", "Promotion is on the basis of personal connections", "Clear distinction between public and private spheres"], answer: 2 },
  { id: 3, q: "Which of the following is part of the horizontal dimension of power in a political regime?", options: ["Civil liberties", "Freedom of the press", "Freedom of assembly", "Separation of powers"], answer: 3 },
  { id: 4, q: "A civil society organisation that aims to influence government policy is known as:", options: ["A pressure group", "An influence group", "A power group", "A control group"], answer: 0 },
  { id: 5, q: "The Gini coefficient is a measure of:", options: ["Socio-economic class", "Poverty", "Income inequality", "Social exclusion"], answer: 2 },
  { id: 6, q: "What is a primary characteristic of grassroots movements?", options: ["They operate with hierarchical leadership", "They rely on spontaneous support from ordinary individuals", "They focus on insider lobbying", "They campaign on environmental matters"], answer: 1 },
  { id: 7, q: "Stanley Milgram's psychological experiments were designed to test:", options: ["Whether people would learn more quickly if punished for wrong answers", "To what extent people would cause pain to others if paid for it", "To what extent people enjoyed causing pain to others", "To what extent people would obey authority figures"], answer: 3 },
  { id: 8, q: "Which of the following would be considered part of the informal organization of a political regime?", options: ["The constitution", "Electoral law", "Political institutions", "Political behaviour"], answer: 3 },
  { id: 9, q: "How does Polity IV classify political regimes?", options: ["-10 (full autocracy) to +10 (full democracy)", "0 (no democracy) to 100 (full democracy)", "1 (authoritarian) to 5 (democratic)", "A to F grades"], answer: 0 },
  { id: 10, q: "IPV is a type of abuse that takes place between:", options: ["Partners in a sexual relationship", "Parent and children", "Teacher and schoolchildren", "Employees and employers"], answer: 0 },
  { id: 11, q: "When Francis Fukuyama referred to 'the end of history', he meant that:", options: ["The world will eventually be destroyed by nuclear war", "History has become unfashionable as an academic discipline", "Liberal democracy is the final form of government for all nations", "Fewer and fewer people are living under democratic regimes"], answer: 2 },
  { id: 12, q: "'Separation of powers' means that:", options: ["Nations possess self-determination", "The executive cannot dominate: its powers are limited by the legislature and the judiciary", "There is genuine electoral competition", "There are rival factions within a political elite"], answer: 1 },
  { id: 13, q: "Which type of regime seeks to control all aspects of public and private life?", options: ["Liberal democracy", "Authoritarian", "Totalitarian", "Electoral autocracy"], answer: 2 },
  { id: 14, q: "Which of the following is NOT an example of a liberal institution?", options: ["The rule of law", "The separation of powers", "Martial law", "Private property rights"], answer: 2 },
  { id: 15, q: "Mr A promises that, in return for Mr B paying him money, he can arrange for Mr B to meet with a powerful politician. This is an example of:", options: ["Extortion", "Influence-peddling", "Embezzlement", "Fraud"], answer: 1 },
  { id: 16, q: "What type of civil society does China have?", options: ["Only the legal conception", "Only the sociological conception", "Both the legal conception and the sociological conception", "Neither the legal conception nor the sociological conception"], answer: 0 },
  { id: 17, q: "Socialismo in Cuba was an example of:", options: ["Social exclusion", "An economy of favours", "Kleptocracy", "Civic nationalism"], answer: 1 },
  { id: 18, q: "Male authority and control over women being considered socially acceptable is known as:", options: ["Patriarchal norms", "Matriarchal norms", "Gender-based violence", "Domestic violence"], answer: 0 },
  { id: 19, q: "John Spector and Malcolm Kitsuse theorised the nature of:", options: ["Political regimes", "Sovereignty", "Corruption", "Social problems"], answer: 3 },
  { id: 20, q: "The V-Dem Institute publishes data on:", options: ["Political regimes", "Poverty", "Domestic violence", "Corruption"], answer: 0 },
  { id: 21, q: "Manipulating someone such that they begin to question their own perception of reality is called:", options: ["Neglect", "Stalking", "Elopement", "Gaslighting"], answer: 3 },
  { id: 22, q: "Abusing one's power to obtain money from someone using threats or intimidation is known as:", options: ["Bribery", "Embezzlement", "Displacement of responsibility", "Extortion"], answer: 3 },
  { id: 23, q: "What was the main reason for the growth of the middle class in Western societies after 1945?", options: ["Rebuilding Europe after World War II", "The Industrial Revolution", "The growth of the welfare state", "The rapid expansion of the automobile industry"], answer: 2 },
  { id: 24, q: "Societal actors who try to get a certain condition recognised as a social problem are known as:", options: ["Problem-makers", "Claims-makers", "Problem-claimers", "Problem-constructors"], answer: 1 },
  { id: 25, q: "According to Levitsky and Way, what is one of the main challenges to Fukuyama's 'end of history' thesis?", options: ["The persistence of stable authoritarian regimes challenges the idea of a universal trajectory", "Democratic regimes are universally converging towards authoritarianism", "All regimes are rapidly transitioning to liberal democracies", "Political systems are increasingly becoming more similar across the globe"], answer: 0 },
  { id: 26, q: "The Lorenz curve is a graphical representation of:", options: ["Inflation", "Poverty", "Income inequality", "Social mobility"], answer: 2 },
  { id: 27, q: "Which of the following statements is FALSE:", options: ["All liberal democracies are electoral democracies", "All electoral democracies are liberal democracies", "Modern representative democracy uses multi-party elections", "Freedom of speech is an essential element of liberal democracy"], answer: 1 },
  { id: 28, q: "Which of the following is NOT a form of coercive control?", options: ["Isolating the victim", "Belittling or humiliating the victim", "Neglecting the victim", "Telling the victim what clothes they can wear"], answer: 2 },
  { id: 29, q: "What is a common criticism of corruption indices regarding their methodology?", options: ["They contain too much detail", "There is a lack of transparency in how the scores are calculated", "They do not allow comparisons between different countries", "Many countries in the world are not included"], answer: 1 },
  { id: 30, q: "'X' is a social problem. Which research question is written from a social constructionist perspective?", options: ["What harm do people suffer as a result of X?", "Who or what causes X?", "When did policymakers begin to pay increasing attention to X?", "What policy responses could be introduced to reduce X?"], answer: 2 },
  { id: 31, q: "The Watergate scandal in the USA brought about the resignation of which president?", options: ["John F. Kennedy", "Richard Nixon", "Bill Clinton", "Donald Trump"], answer: 1 },
  { id: 32, q: "Which psychological theory states that people repeat the behaviours they saw or experienced as a child?", options: ["Social learning theory", "Cognitive dissonance theory", "Social identity theory", "Moral disengagement theory"], answer: 0 },
  { id: 33, q: "Whose book was titled 'The Revenge of the Poor'?", options: ["Ailsa Lendrum", "Benedict Anderson", "Ernest Gellner", "Roland Grigor Suny"], answer: 3 },
  { id: 34, q: "In the context of gift-giving, 'instrumentality' means giving a gift because:", options: ["You want to show the other person respect", "You want to make the other person happy", "You want the other person to do something for you in return", "It is a cultural norm in this situation"], answer: 2 },
  { id: 35, q: "'Imagined communities' represents a constructionist view of:", options: ["Political regimes", "Nations", "Civil society organisations", "Social problems"], answer: 1 },
  { id: 36, q: "Endemic corruption means:", options: ["Corruption involving powerful players and large sums of money", "Corruption involving people in low-level positions of power and small sums of money", "Corruption that can be morally justified", "Corruption that exists throughout the whole system"], answer: 3 },
  { id: 37, q: "A nation-state's external sovereignty depends on:", options: ["Recognition of it by other states in the international community", "The size of its army", "Acceptance of the regime's legitimacy by its own citizens", "The absence of systemic political corruption"], answer: 0 },
  { id: 38, q: "Peter Townsend pioneered the research of:", options: ["Absolute poverty", "Relative poverty", "Income inequality", "Social class"], answer: 1 },
  { id: 39, q: "In liberal democracies, the phrase 'free, fair and meaningful' is used to describe ideal:", options: ["Civil society", "Civil liberties", "Elections", "Bureaucracies"], answer: 2 },
  { id: 40, q: "Primordialism is the belief that:", options: ["Nations have an objective, real, natural existence", "Nations are imagined communities", "Nations have a right to self-determination", "Nations are a modern phenomenon that only emerged from the 18th century onwards"], answer: 0 },
  { id: 41, q: "'Operationalising' an abstract concept means:", options: ["Giving an abstract definition of it", "Comparing different definitions of it", "Giving real life examples of it", "Turning it into a measurable variable"], answer: 3 },
  { id: 42, q: "The Erikson-Goldthorpe-Portocarero (EGP) schema operationalises social class using which variable?", options: ["Level of income", "Level of educational achievement", "Ownership of property", "Occupation"], answer: 3 },
  { id: 43, q: "Which social class is the largest social class in most modern industrialized countries?", options: ["The underclass", "The working class", "The middle class", "The upper class"], answer: 2 },
  { id: 44, q: "'The rule of law' means that:", options: ["Rates of crime are low", "Political protests are suppressed", "Judges are appointed by the president", "The law applies to everyone equally"], answer: 3 },
  { id: 45, q: "'Separation of powers' means that:", options: ["Nations possess self-determination", "The executive cannot dominate: its powers are limited by the legislature and the judiciary", "There is genuine electoral competition", "There are rival factions within a political elite"], answer: 1 },
  { id: 46, q: "Which is of the following statements is FALSE:", options: ["All liberal democracies are electoral democracies", "All electoral democracies are liberal democracies", "Modern representative democracy uses multi-party elections", "Freedom of speech is an essential element of liberal democracy"], answer: 1 },
  { id: 47, q: "Transparency International is a non-governmental organisation that aims to fight:", options: ["Media censorship", "Global poverty", "Global warming", "Global corruption"], answer: 3 },
  { id: 48, q: "Which of the following statements best describes teleological views of history?", options: ["History progresses over time towards a goal", "The world gets more chaotic and disordered over time", "Economic forces determine political events", "It is impossible to identify any trends in history everything is random"], answer: 0 },
  { id: 49, q: "Which of the following is NOT part of civil society?", options: ["Charities", "Small businesses", "Clubs (e.g. sports clubs)", "Protest groups"], answer: 1 },
  { id: 50, q: "Indices measuring democracy all agree that:", options: ["Democracy is currently declining in the world.", "Democracy is currently increasing in the world.", "Democracy in the world is currently stable (neither increasing nor decreasing).", "Democracy cannot be accurately measured."], answer: 0 },
  { id: 51, q: "Primordialism is the belief that:", options: ["Nations have an objective, real, natural existence", "Nations are imagined communities", "Nations have a right to self-determination", "Nations are a modern phenomenon that only emerged from the 18th century onwards"], answer: 0 },
  { id: 52, q: "Juan José Linz's classification of regimes contained:", options: ["Two categories: democracy and autocracy", "Three categories: democracy, autocracy, totalitarian", "Four categories: closed autocracy - electoral autocracy - electoral democracy - liberal democracy", "Five categories"], answer: 1 },
  { id: 53, q: "Who described nations as 'imagined communities'?", options: ["Alena Ledeneva", "Benedict Anderson", "Ernest Geller", "Roland Grigor Suny"], answer: 1 },
  { id: 54, q: "Which of the following is NOT important in the civic concept of the nation?", options: ["Citizenship", "Ethnicity", "Political values", "Social values"], answer: 1 },
  { id: 55, q: "\"The abuse of an entrusted power for private gain\" is a definition of:", options: ["Kleptocracy", "Censorship", "Nepotism", "Corruption"], answer: 3 },
  { id: 56, q: "Which of the following opinions on nations under the Soviet regime was NOT expressed by Roland Grigor Suny?", options: ["The Soviet system institutionalised ethnic nations by including ethnicity as an administrative category (e.g. in passports)", "Soviet officials pursued a policy of 'territorialising' ethnic groups by creating union republics along ethnic lines.", "A strong sense of national identity had existed among the peoples of ethnic nations for hundreds of years before the creation of the USSR.", "Ethnic nationalism was one reason for the collapse of the USSR."], answer: 2 },
  { id: 57, q: "A nation state's external sovereignty depends on:", options: ["Recognition of it by other states in the international community", "The size of its army", "Acceptance of the regime's legitimacy by its own citizens", "Membership of supranational organisations"], answer: 0 },
  { id: 58, q: "A nation state's internal sovereignty depends on:", options: ["Recognition of it by other states in the international community", "The size of its army", "Acceptance of the regime's legitimacy by its own citizens", "Membership of supranational organisations"], answer: 2 },
  { id: 59, q: "Peter Townsend pioneered the research of:", options: ["Absolute poverty", "Relative poverty", "Townsend did not research poverty", "Income inequality"], answer: 1 },
  { id: 60, q: "Which sociologist's research found that post-communist societies have some of the lowest levels of civil society participation in the world?", options: ["Roland Grigor Suny", "Alena Ledeneva", "Max Weber", "Marc Howard"], answer: 3 },
  { id: 61, q: "Grassroots movements campaigning for social or political change are created by:", options: ["Ordinary citizens", "Politicians", "Civil society experts", "Bureaucrats"], answer: 0 },
  { id: 62, q: "Academic research on corruption grew most significantly in the:", options: ["1970s", "1980s", "1990s", "2000s"], answer: 2 },
  { id: 63, q: "Which of the following is NOT a legitimate criticism of corruption indices?", options: ["The methodology used to calculate the indices is often not transparent.", "They are too simplistic - reducing complex phenomena to a single number.", "They are based on people's subjective perceptions.", "They do not allow us to compare levels of corruption between countries."], answer: 3 },
  { id: 64, q: "When Francis Fukuyama referred to 'the end of history', he meant that:", options: ["The world will eventually be destroyed by nuclear war", "History has become unfashionable as an academic discipline", "Liberal democracy is the final form of government for all nations", "Fewer and fewer people are living under democratic regimes"], answer: 2 },
  { id: 65, q: "Public money spent on a duck house was a famous feature of:", options: ["The parliamentary expenses scandal in the UK", "The Tangentopoli scandal in Italy", "The Watergate scandal in the USA", "Sociolismo in Cuba"], answer: 0 },
  { id: 66, q: "The Gini coefficient is a measure of:", options: ["Socio-economic class", "Poverty", "Income inequality", "Social exclusion"], answer: 2 },
  { id: 67, q: "Manipulating someone such that they begin to question their own perception of reality is called:", options: ["Neglect", "Stalking", "Elopement", "Gaslighting"], answer: 3 },
  { id: 68, q: "The right for people to gather peacefully in public spaces to express their opinions or to protest is known as:", options: ["Freedom of speech", "Freedom of the press", "Freedom of association", "Freedom of assembly"], answer: 3 },
  { id: 69, q: "In 2023, in which of the following regions was democracy increasing?", options: ["Central Asia", "Latin America", "Eastern Europe", "Sub-Saharan Africa"], answer: 3 },
  { id: 70, q: "Societal actors who try to get a certain condition recognised as a social problem are known as:", options: ["Problem-makers", "Claims-makers", "Problem-claimers", "Problem-constructors"], answer: 1 },
  { id: 71, q: "'Imagined communities' represents a constructionist view of:", options: ["Political regimes", "Nations", "Civil society organisations", "Social problems"], answer: 1 },
  { id: 72, q: "Sociolismo in Cuba was an example of:", options: ["Social exclusion", "An economy of favours", "Kleptocracy", "Civic nationalism"], answer: 1 },
  { id: 73, q: "The Tangentopoli scandal was a political corruption scandal in:", options: ["Italy", "Spain", "Brazil", "Costa Rica"], answer: 0 },
  { id: 74, q: "What is a primary characteristic of grassroots movements?", options: ["They operate with hierarchical leadership", "They rely on spontaneous support from ordinary individuals", "They focus on insider lobbying", "They campaign on environmental matters"], answer: 1 },
  { id: 75, q: "Which psychological theory states that people repeat the behaviours they saw or experienced as a child?", options: ["Social learning theory", "Cognitive dissonance theory", "Social identity theory", "Moral disengagement theory"], answer: 0 },
  { id: 76, q: "In liberal democracies, the phrase 'free, fair and meaningful' is used to describe ideal:", options: ["Civil society", "Civil liberties", "Elections", "Bureaucracies"], answer: 2 },
  { id: 77, q: "Which of the following is NOT an example of a liberal institution:", options: ["The rule of law", "The separation of powers", "Martial law", "Private property rights"], answer: 2 },
  { id: 78, q: "Giving jobs and other benefits to family members is known as:", options: ["Nepotism", "Cronyism", "Socialism", "Nationalism"], answer: 0 },
  { id: 79, q: "In 2023, in which of the following regions was democracy increasing? (duplicate variant)", options: ["Central Asia", "Latin America", "Eastern Europe", "Sub-Saharan Africa"], answer: 3 },
  { id: 80, q: "Mr A promises that, in return for Mr B paying him a sum of money, he can arrange for Mr B to meet with a powerful politician. This is an example of:", options: ["Extortion", "Influence-peddling", "Embezzlement", "Fraud"], answer: 1 }
];

const LABELS = ["A", "B", "C", "D"];

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function App() {
  const [mode, setMode] = useState("menu");
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState({});
  const [confirmed, setConfirmed] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [filter, setFilter] = useState("all");

  const startQuiz = () => {
    const shuffled = shuffle(allQuestions).slice(0, 40);
    setQuizQuestions(shuffled);
    setAnswers({});
    setCurrent(0);
    setSelected(null);
    setConfirmed(false);
    setShowResult(false);
    setFilter("all");
    setMode("quiz");
  };

  const q = quizQuestions[current];
  const totalQ = quizQuestions.length;
  const score = quizQuestions.filter(q => answers[q.id] === q.answer).length;
  const wrongScore = totalQ - score;

  const handleSelect = (idx) => {
    if (confirmed) return;
    setSelected(idx);
  };

  const handleConfirm = () => {
    if (selected === null) return;
    setConfirmed(true);
    setAnswers(prev => ({ ...prev, [q.id]: selected }));
  };

  const handleNext = () => {
    if (current + 1 >= totalQ) {
      setShowResult(true);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setConfirmed(false);
    }
  };

  const getOptionStyle = (idx) => {
    if (!confirmed) {
      return selected === idx ? "selected" : "default";
    }
    if (idx === q.answer) return "correct";
    if (idx === selected && selected !== q.answer) return "wrong";
    return "dim";
  };

  const reviewList = quizQuestions.filter(rq => {
    if (filter === "wrong") return answers[rq.id] !== rq.answer;
    if (filter === "correct") return answers[rq.id] === rq.answer;
    return true;
  });

  const pct = totalQ > 0 ? Math.round((score / totalQ) * 100) : 0;

  return (
    <div style={styles.root}>
      <style>{css}</style>

      {mode === "menu" && (
        <div style={styles.menu}>
          <div style={styles.badge}>SOCIOLOGY EXAM PREP</div>
          <h1 style={styles.title}>Емтихан симуляторы</h1>
          <p style={styles.sub}>Жалпы 80 сұрақ. Әр тест сайын 40 сұрақ кездейсоқ беріледі.</p>
          <div style={styles.cards}>
            <button style={{...styles.card, width: 220}} onClick={startQuiz} className="card-btn">
              <span style={styles.cardNum}>40</span>
              <span style={styles.cardLabel}>Тестті бастау</span>
              <span style={styles.cardDesc}>Кездейсоқ таңдалған 40 сұрақ</span>
            </button>
          </div>
        </div>
      )}

      {mode === "quiz" && !showResult && q && (
        <div style={styles.quizWrap}>
          <div style={styles.topBar}>
            <button onClick={() => setMode("menu")} style={styles.backBtn}>← Мәзірге қайту</button>
            <span style={styles.progress}>{current + 1} / {totalQ}</span>
          </div>

          <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: `${(current / totalQ) * 100}%` }} />
          </div>

          <div style={styles.qNum}>СҰРАҚ {current + 1}</div>
          <div style={styles.qText}>{q.q}</div>

          <div style={styles.options}>
            {q.options.map((opt, idx) => {
              const st = getOptionStyle(idx);
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  style={{
                    ...styles.option,
                    ...(st === "selected" ? styles.optSelected : {}),
                    ...(st === "correct" ? styles.optCorrect : {}),
                    ...(st === "wrong" ? styles.optWrong : {}),
                    ...(st === "dim" ? styles.optDim : {}),
                  }}
                  className="option-btn"
                >
                  <span style={styles.optLabel}>{LABELS[idx]}</span>
                  <span style={styles.optText}>{opt}</span>
                  {st === "correct" && <span style={styles.icon}>✓</span>}
                  {st === "wrong" && <span style={styles.icon}>✗</span>}
                </button>
              );
            })}
          </div>

          <div style={styles.actions}>
            {!confirmed ? (
              <button
                onClick={handleConfirm}
                disabled={selected === null}
                style={{ ...styles.btn, ...(selected === null ? styles.btnDisabled : styles.btnPrimary) }}
              >
                Жауапты растау
              </button>
            ) : (
              <button onClick={handleNext} style={{ ...styles.btn, ...styles.btnPrimary }}>
                {current + 1 >= totalQ ? "Нәтижені көру →" : "Келесі сұрақ →"}
              </button>
            )}
          </div>
        </div>
      )}

      {mode === "quiz" && showResult && (
        <div style={styles.resultWrap}>
          <div style={styles.scoreHeader}>ТЕСТ НӘТИЖЕЛЕРІ</div>
          
          <div style={styles.statsContainer}>
            <div style={styles.statBox}>
              <div style={{...styles.statNum, color: "#c9a84c"}}>{pct}%</div>
              <div style={styles.statLabel}>Жалпы пайыз</div>
            </div>
            <div style={styles.statBox}>
              <div style={{...styles.statNum, color: "#22c55e"}}>{score}</div>
              <div style={styles.statLabel}>Дұрыс жауап</div>
            </div>
            <div style={styles.statBox}>
              <div style={{...styles.statNum, color: "#ef4444"}}>{wrongScore}</div>
              <div style={styles.statLabel}>Қате жауап</div>
            </div>
          </div>

          <div style={styles.filterRow}>
            {["all", "wrong", "correct"].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{ ...styles.filterBtn, ...(filter === f ? styles.filterActive : {}) }}
              >
                {f === "all" ? `Барлығы (${totalQ})` : f === "wrong" ? `Қателер (${wrongScore})` : `Дұрыстар (${score})`}
              </button>
            ))}
          </div>

          <div style={styles.reviewList}>
            {reviewList.map((rq, index) => {
              const userAns = answers[rq.id];
              const isCorrect = userAns === rq.answer;
              return (
                <div key={rq.id} style={{ ...styles.reviewCard, ...(isCorrect ? styles.reviewCorrect : styles.reviewWrong) }}>
                  <div style={styles.reviewQ}>
                    <span style={styles.reviewIndex}>{index + 1}.</span> {rq.q}
                  </div>
                  {!isCorrect && userAns !== undefined && (
                    <div style={styles.reviewUserAns}>
                      Сіздің жауабыңыз: <span style={{ color: "#ef4444" }}>{LABELS[userAns]}. {rq.options[userAns]}</span>
                    </div>
                  )}
                  <div style={styles.reviewCorrectAns}>
                    Дұрыс жауап: <span style={{ color: "#22c55e" }}>{LABELS[rq.answer]}. {rq.options[rq.answer]}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <button onClick={() => setMode("menu")} style={{ ...styles.btn, ...styles.btnPrimary, marginTop: 40 }}>
            ← Басты мәзірге
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  root: {
    minHeight: "100vh",
    background: "#0f0f13",
    color: "#e8e3d9",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0 16px 60px",
  },
  menu: {
    maxWidth: 600,
    width: "100%",
    paddingTop: 80,
    textAlign: "center",
  },
  badge: {
    display: "inline-block",
    background: "#2a2820",
    color: "#c9a84c",
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: 2,
    padding: "6px 16px",
    borderRadius: 30,
    marginBottom: 24,
  },
  title: {
    fontSize: 48,
    fontWeight: 700,
    letterSpacing: -1,
    margin: "0 0 16px",
    color: "#f0ebe0",
    lineHeight: 1.2,
  },
  sub: {
    color: "#9ca3af",
    fontSize: 16,
    marginBottom: 50,
  },
  cards: {
    display: "flex",
    gap: 16,
    justifyContent: "center",
  },
  card: {
    background: "#18181f",
    border: "1px solid #2a2820",
    borderRadius: 16,
    padding: "32px 20px",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    transition: "all 0.2s",
  },
  cardNum: {
    fontSize: 56,
    fontWeight: 700,
    color: "#c9a84c",
    lineHeight: 1,
    marginBottom: 4,
  },
  cardLabel: {
    fontSize: 17,
    color: "#e8e3d9",
    fontWeight: 600,
  },
  cardDesc: {
    fontSize: 13,
    color: "#6b7280",
  },
  quizWrap: {
    maxWidth: 680,
    width: "100%",
    paddingTop: 40,
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  backBtn: {
    background: "none",
    border: "none",
    color: "#6b7280",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 500,
    padding: "8px 0",
  },
  progress: {
    fontSize: 14,
    fontWeight: 600,
    color: "#c9a84c",
  },
  progressBar: {
    height: 4,
    background: "#2a2820",
    borderRadius: 2,
    marginBottom: 40,
    overflow: "hidden"
  },
  progressFill: {
    height: "100%",
    background: "#c9a84c",
    transition: "width 0.4s ease",
  },
  qNum: {
    fontSize: 12,
    fontWeight: 700,
    color: "#6b7280",
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  qText: {
    fontSize: 22,
    lineHeight: 1.5,
    color: "#f0ebe0",
    marginBottom: 32,
    fontWeight: 500,
  },
  options: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginBottom: 32,
  },
  option: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    padding: "16px 20px",
    background: "#18181f",
    border: "2px solid #2a2820",
    borderRadius: 12,
    cursor: "pointer",
    textAlign: "left",
    color: "#d1d5db",
    fontSize: 16,
    lineHeight: 1.4,
    transition: "all 0.15s",
  },
  optSelected: {
    border: "2px solid #c9a84c",
    background: "#1f1d14",
    color: "#f0ebe0",
  },
  optCorrect: {
    border: "2px solid #22c55e",
    background: "#0f2018",
    color: "#86efac",
  },
  optWrong: {
    border: "2px solid #ef4444",
    background: "#200f0f",
    color: "#fca5a5",
  },
  optDim: {
    opacity: 0.4,
  },
  optLabel: {
    width: 32,
    height: 32,
    borderRadius: 8,
    background: "#2a2820",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
    fontWeight: 700,
    flexShrink: 0,
    color: "#c9a84c",
  },
  optText: {
    flex: 1,
  },
  icon: {
    fontSize: 18,
    fontWeight: 700,
    flexShrink: 0,
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
  },
  btn: {
    padding: "14px 32px",
    borderRadius: 10,
    fontSize: 16,
    cursor: "pointer",
    border: "none",
    fontWeight: 600,
    transition: "all 0.15s",
  },
  btnPrimary: {
    background: "#c9a84c",
    color: "#0f0f13",
  },
  btnDisabled: {
    background: "#2a2820",
    color: "#6b7280",
    cursor: "not-allowed",
  },
  resultWrap: {
    maxWidth: 680,
    width: "100%",
    paddingTop: 48,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  scoreHeader: {
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: 2,
    color: "#6b7280",
    marginBottom: 32,
  },
  statsContainer: {
    display: "flex",
    gap: 24,
    width: "100%",
    marginBottom: 40,
  },
  statBox: {
    flex: 1,
    background: "#18181f",
    border: "1px solid #2a2820",
    borderRadius: 16,
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  statNum: {
    fontSize: 48,
    fontWeight: 700,
    lineHeight: 1,
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: "#9ca3af",
    fontWeight: 500,
  },
  filterRow: {
    display: "flex",
    gap: 12,
    marginBottom: 24,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  filterBtn: {
    padding: "8px 20px",
    background: "#18181f",
    border: "1px solid #2a2820",
    borderRadius: 30,
    color: "#9ca3af",
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.15s",
  },
  filterActive: {
    border: "1px solid #c9a84c",
    color: "#c9a84c",
    background: "#1f1d14",
  },
  reviewList: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  reviewCard: {
    padding: "20px 24px",
    borderRadius: 12,
    fontSize: 15,
    lineHeight: 1.5,
  },
  reviewCorrect: {
    background: "rgba(34, 197, 94, 0.05)",
    border: "1px solid rgba(34, 197, 94, 0.2)",
  },
  reviewWrong: {
    background: "rgba(239, 68, 68, 0.05)",
    border: "1px solid rgba(239, 68, 68, 0.2)",
  },
  reviewQ: {
    color: "#f3f4f6",
    marginBottom: 12,
    fontWeight: 500,
    fontSize: 16,
  },
  reviewIndex: {
    color: "#9ca3af",
  },
  reviewUserAns: {
    fontSize: 14,
    color: "#9ca3af",
    marginBottom: 6,
  },
  reviewCorrectAns: {
    fontSize: 14,
    color: "#9ca3af",
    fontWeight: 500,
  },
};

const css = `
  .card-btn:hover { border-color: #c9a84c !important; transform: translateY(-4px); }
  .option-btn:hover:not([disabled]) { border-color: #4b4737 !important; background: #1c1c23 !important; }
`;