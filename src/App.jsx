import { useState } from "react";

// The answer is now the exact string, which allows us to shuffle the options array safely!
const allQuestions = [
  { id: 1, q: "The right for people to gather peacefully in public spaces to express their opinions or to protest is known as:", options: ["Freedom of speech", "Freedom of the press", "Freedom of association", "Freedom of assembly"], answer: "Freedom of assembly" },
  { id: 2, q: "Which of the following is NOT a characteristic of Max Weber's ideal-type bureaucracy?", options: ["Formal hierarchy", "Clearly-defined rules and procedures", "Promotion is on the basis of personal connections", "Clear distinction between public and private spheres"], answer: "Promotion is on the basis of personal connections" },
  { id: 3, q: "Which of the following is part of the horizontal dimension of power in a political regime?", options: ["Civil liberties", "Freedom of the press", "Freedom of assembly", "Separation of powers"], answer: "Separation of powers" },
  { id: 4, q: "A civil society organisation that aims to influence government policy is known as:", options: ["A pressure group", "An influence group", "A power group", "A control group"], answer: "A pressure group" },
  { id: 5, q: "The Gini coefficient is a measure of:", options: ["Socio-economic class", "Poverty", "Income inequality", "Social exclusion"], answer: "Income inequality" },
  { id: 6, q: "What is a primary characteristic of grassroots movements?", options: ["They operate with hierarchical leadership", "They rely on spontaneous support from ordinary individuals", "They focus on insider lobbying", "They campaign on environmental matters"], answer: "They rely on spontaneous support from ordinary individuals" },
  { id: 7, q: "Stanley Milgram's psychological experiments were designed to test:", options: ["Whether people would learn more quickly if punished for wrong answers", "To what extent people would cause pain to others if paid for it", "To what extent people enjoyed causing pain to others", "To what extent people would obey authority figures"], answer: "To what extent people would obey authority figures" },
  { id: 8, q: "Which of the following would be considered part of the informal organization of a political regime?", options: ["The constitution", "Electoral law", "Political institutions", "Political behaviour"], answer: "Political behaviour" },
  { id: 9, q: "How does Polity IV classify political regimes?", options: ["-10 (full autocracy) to +10 (full democracy)", "0 (no democracy) to 100 (full democracy)", "1 (authoritarian) to 5 (democratic)", "A to F grades"], answer: "-10 (full autocracy) to +10 (full democracy)" },
  { id: 10, q: "IPV is a type of abuse that takes place between:", options: ["Partners in a sexual relationship", "Parent and children", "Teacher and schoolchildren", "Employees and employers"], answer: "Partners in a sexual relationship" },
  { id: 11, q: "When Francis Fukuyama referred to 'the end of history', he meant that:", options: ["The world will eventually be destroyed by nuclear war", "History has become unfashionable as an academic discipline", "Liberal democracy is the final form of government for all nations", "Fewer and fewer people are living under democratic regimes"], answer: "Liberal democracy is the final form of government for all nations" },
  { id: 12, q: "'Separation of powers' means that:", options: ["Nations possess self-determination", "The executive cannot dominate: its powers are limited by the legislature and the judiciary", "There is genuine electoral competition", "There are rival factions within a political elite"], answer: "The executive cannot dominate: its powers are limited by the legislature and the judiciary" },
  { id: 13, q: "Which type of regime seeks to control all aspects of public and private life?", options: ["Liberal democracy", "Authoritarian", "Totalitarian", "Electoral autocracy"], answer: "Totalitarian" },
  { id: 14, q: "Which of the following is NOT an example of a liberal institution?", options: ["The rule of law", "The separation of powers", "Martial law", "Private property rights"], answer: "Martial law" },
  { id: 15, q: "Mr A promises that, in return for Mr B paying him money, he can arrange for Mr B to meet with a powerful politician. This is an example of:", options: ["Extortion", "Influence-peddling", "Embezzlement", "Fraud"], answer: "Influence-peddling" },
  { id: 16, q: "What type of civil society does China have?", options: ["Only the legal conception", "Only the sociological conception", "Both the legal conception and the sociological conception", "Neither the legal conception nor the sociological conception"], answer: "Only the legal conception" },
  { id: 17, q: "Socialismo in Cuba was an example of:", options: ["Social exclusion", "An economy of favours", "Kleptocracy", "Civic nationalism"], answer: "An economy of favours" },
  { id: 18, q: "Male authority and control over women being considered socially acceptable is known as:", options: ["Patriarchal norms", "Matriarchal norms", "Gender-based violence", "Domestic violence"], answer: "Patriarchal norms" },
  { id: 19, q: "John Spector and Malcolm Kitsuse theorised the nature of:", options: ["Political regimes", "Sovereignty", "Corruption", "Social problems"], answer: "Social problems" },
  { id: 20, q: "The V-Dem Institute publishes data on:", options: ["Political regimes", "Poverty", "Domestic violence", "Corruption"], answer: "Political regimes" },
  { id: 21, q: "Manipulating someone such that they begin to question their own perception of reality is called:", options: ["Neglect", "Stalking", "Elopement", "Gaslighting"], answer: "Gaslighting" },
  { id: 22, q: "Abusing one's power to obtain money from someone using threats or intimidation is known as:", options: ["Bribery", "Embezzlement", "Displacement of responsibility", "Extortion"], answer: "Extortion" },
  { id: 23, q: "What was the main reason for the growth of the middle class in Western societies after 1945?", options: ["Rebuilding Europe after World War II", "The Industrial Revolution", "The growth of the welfare state", "The rapid expansion of the automobile industry"], answer: "The growth of the welfare state" },
  { id: 24, q: "Societal actors who try to get a certain condition recognised as a social problem are known as:", options: ["Problem-makers", "Claims-makers", "Problem-claimers", "Problem-constructors"], answer: "Claims-makers" },
  { id: 25, q: "According to Levitsky and Way, what is one of the main challenges to Fukuyama's 'end of history' thesis?", options: ["The persistence of stable authoritarian regimes challenges the idea of a universal trajectory", "Democratic regimes are universally converging towards authoritarianism", "All regimes are rapidly transitioning to liberal democracies", "Political systems are increasingly becoming more similar across the globe"], answer: "The persistence of stable authoritarian regimes challenges the idea of a universal trajectory" },
  { id: 26, q: "The Lorenz curve is a graphical representation of:", options: ["Inflation", "Poverty", "Income inequality", "Social mobility"], answer: "Income inequality" },
  { id: 27, q: "Which of the following statements is FALSE:", options: ["All liberal democracies are electoral democracies", "All electoral democracies are liberal democracies", "Modern representative democracy uses multi-party elections", "Freedom of speech is an essential element of liberal democracy"], answer: "All electoral democracies are liberal democracies" },
  { id: 28, q: "Which of the following is NOT a form of coercive control?", options: ["Isolating the victim", "Belittling or humiliating the victim", "Neglecting the victim", "Telling the victim what clothes they can wear"], answer: "Neglecting the victim" },
  { id: 29, q: "What is a common criticism of corruption indices regarding their methodology?", options: ["They contain too much detail", "There is a lack of transparency in how the scores are calculated", "They do not allow comparisons between different countries", "Many countries in the world are not included"], answer: "There is a lack of transparency in how the scores are calculated" },
  { id: 30, q: "'X' is a social problem. Which research question is written from a social constructionist perspective?", options: ["What harm do people suffer as a result of X?", "Who or what causes X?", "When did policymakers begin to pay increasing attention to X?", "What policy responses could be introduced to reduce X?"], answer: "When did policymakers begin to pay increasing attention to X?" },
  { id: 31, q: "The Watergate scandal in the USA brought about the resignation of which president?", options: ["John F. Kennedy", "Richard Nixon", "Bill Clinton", "Donald Trump"], answer: "Richard Nixon" },
  { id: 32, q: "Which psychological theory states that people repeat the behaviours they saw or experienced as a child?", options: ["Social learning theory", "Cognitive dissonance theory", "Social identity theory", "Moral disengagement theory"], answer: "Social learning theory" },
  { id: 33, q: "Whose book was titled 'The Revenge of the Past'?", options: ["Ailsa Lendrum", "Benedict Anderson", "Ernest Gellner", "Roland Grigor Suny"], answer: "Roland Grigor Suny" },
  { id: 34, q: "In the context of gift-giving, 'instrumentality' means giving a gift because:", options: ["You want to show the other person respect", "You want to make the other person happy", "You want the other person to do something for you in return", "It is a cultural norm in this situation"], answer: "You want the other person to do something for you in return" },
  { id: 35, q: "'Imagined communities' represents a constructionist view of:", options: ["Political regimes", "Nations", "Civil society organisations", "Social problems"], answer: "Nations" },
  { id: 36, q: "Endemic corruption means:", options: ["Corruption involving powerful players and large sums of money", "Corruption involving people in low-level positions of power and small sums of money", "Corruption that can be morally justified", "Corruption that exists throughout the whole system"], answer: "Corruption that exists throughout the whole system" },
  { id: 37, q: "A nation-state's external sovereignty depends on:", options: ["Recognition of it by other states in the international community", "The size of its army", "Acceptance of the regime's legitimacy by its own citizens", "The absence of systemic political corruption"], answer: "Recognition of it by other states in the international community" },
  { id: 38, q: "Peter Townsend pioneered the research of:", options: ["Absolute poverty", "Relative poverty", "Income inequality", "Social class"], answer: "Relative poverty" },
  { id: 39, q: "In liberal democracies, the phrase 'free, fair and meaningful' is used to describe ideal:", options: ["Civil society", "Civil liberties", "Elections", "Bureaucracies"], answer: "Elections" },
  { id: 40, q: "Primordialism is the belief that:", options: ["Nations have an objective, real, natural existence", "Nations are imagined communities", "Nations have a right to self-determination", "Nations are a modern phenomenon that only emerged from the 18th century onwards"], answer: "Nations have an objective, real, natural existence" },
  { id: 41, q: "'Operationalising' an abstract concept means:", options: ["Giving an abstract definition of it", "Comparing different definitions of it", "Giving real life examples of it", "Turning it into a measurable variable"], answer: "Turning it into a measurable variable" },
  { id: 42, q: "The Erikson-Goldthorpe-Portocarero (EGP) schema operationalises social class using which variable?", options: ["Level of income", "Level of educational achievement", "Ownership of property", "Occupation"], answer: "Occupation" },
  { id: 43, q: "Which social class is the largest social class in most modern industrialized countries?", options: ["The underclass", "The working class", "The middle class", "The upper class"], answer: "The middle class" },
  { id: 44, q: "'The rule of law' means that:", options: ["Rates of crime are low", "Political protests are suppressed", "Judges are appointed by the president", "The law applies to everyone equally"], answer: "The law applies to everyone equally" },
  { id: 45, q: "Transparency International is a non-governmental organisation that aims to fight:", options: ["Media censorship", "Global poverty", "Global warming", "Global corruption"], answer: "Global corruption" },
  { id: 46, q: "Which of the following statements best describes teleological views of history?", options: ["History progresses over time towards a goal", "The world gets more chaotic and disordered over time", "Economic forces determine political events", "It is impossible to identify any trends in history"], answer: "History progresses over time towards a goal" },
  { id: 47, q: "Which of the following is NOT part of civil society?", options: ["Charities", "Small businesses", "Clubs", "Protest groups"], answer: "Small businesses" },
  { id: 48, q: "Indices measuring democracy all agree that:", options: ["Democracy is currently declining in the world.", "Democracy is currently increasing in the world.", "Democracy in the world is currently stable.", "Democracy cannot be accurately measured."], answer: "Democracy is currently declining in the world." },
  { id: 49, q: "Juan José Linz's classification of regimes contained:", options: ["Two categories: democracy and autocracy", "Three categories: democracy, autocracy, totalitarian", "Four categories: closed autocracy - electoral autocracy - electoral democracy - liberal democracy", "Five categories of pure autocracies"], answer: "Three categories: democracy, autocracy, totalitarian" },
  { id: 50, q: "Which of the following is NOT important in the civic concept of the nation?", options: ["Citizenship", "Ethnicity", "Political values", "Social values"], answer: "Ethnicity" },
  { id: 51, q: "Which of the following opinions on nations under the Soviet regime was NOT expressed by Roland Grigor Suny?", options: ["The Soviet system institutionalised ethnic nations", "Soviet officials pursued a policy of territorialising ethnic groups", "A strong sense of national identity had existed for hundreds of years before the USSR", "Ethnic nationalism was one reason for the collapse of the USSR"], answer: "A strong sense of national identity had existed for hundreds of years before the USSR" },
  { id: 52, q: "A nation state's internal sovereignty depends on:", options: ["Recognition of it by other states", "The size of its army", "Acceptance of the regime's legitimacy by its own citizens", "Membership of supranational organisations"], answer: "Acceptance of the regime's legitimacy by its own citizens" },
  { id: 53, q: "Which sociologist's research found that post-communist societies have some of the lowest levels of civil society participation?", options: ["Roland Grigor Suny", "Alena Ledeneva", "Max Weber", "Marc Howard"], answer: "Marc Howard" },
  { id: 54, q: "Academic research on corruption grew most significantly in the:", options: ["1970s", "1980s", "1990s", "2000s"], answer: "1990s" },
  { id: 55, q: "Which of the following is NOT a legitimate criticism of corruption indices?", options: ["The methodology is often not transparent.", "They reduce complex phenomena to a single number.", "They are based on subjective perceptions.", "They do not allow us to compare levels of corruption between countries."], answer: "They do not allow us to compare levels of corruption between countries." },
  { id: 56, q: "Public money spent on a duck house was a famous feature of:", options: ["The parliamentary expenses scandal in the UK", "The Tangentopoli scandal in Italy", "The Watergate scandal in the USA", "Sociolismo in Cuba"], answer: "The parliamentary expenses scandal in the UK" },
  { id: 57, q: "In 2023, in which of the following regions was democracy increasing?", options: ["Central Asia", "Latin America", "Eastern Europe", "Sub-Saharan Africa"], answer: "Sub-Saharan Africa" },
  { id: 58, q: "The Tangentopoli scandal was a political corruption scandal in:", options: ["Italy", "Spain", "Brazil", "Costa Rica"], answer: "Italy" },
  { id: 59, q: "Giving jobs and other benefits to family members is known as:", options: ["Nepotism", "Cronyism", "Socialism", "Nationalism"], answer: "Nepotism" },
  { id: 60, q: "The abuse of an entrusted power for private gain is a definition of:", options: ["Kleptocracy", "Censorship", "Nepotism", "Corruption"], answer: "Corruption" },
  { id: 61, q: "According to Juan Jose Linz, which of the following is NOT usually true of authoritarian regimes?", options: ["Political power is concentrated in a small governing elite", "There is a lack of political pluralism", "They are based on a political ideology", "There are restrictions on freedom of speech"], answer: "They are based on a political ideology" },
  { id: 62, q: "Freedom of association is most closely related to the concept of:", options: ["Free and fair elections", "Civil society", "Watchdog journalism", "Lobbying"], answer: "Civil society" },
  { id: 63, q: "In the Watergate scandal in the USA, President Nixon used criminal means to:", options: ["Make money through kickbacks and embezzlement", "Censor journalists who criticised him", "Learn about the plans of his electoral opponents", "Falsify election results"], answer: "Learn about the plans of his electoral opponents" },
  { id: 64, q: "The Polish trade union Solidarity is a frequently-cited example of:", options: ["The role of ethnic nationalism in bringing an end to communist regimes", "The role of oppositional civil society in bringing an end to communist regimes", "The role of infighting within ruling elites in bringing an end to communist regimes", "The role of shortages of consumer goods in bringing an end to communist regimes"], answer: "The role of oppositional civil society in bringing an end to communist regimes" },
  { id: 65, q: "Which of the following is NOT part of the vertical dimension of power in a political regime?", options: ["Civil liberties", "Separation of powers", "Freedom of assembly", "Freedom of association"], answer: "Separation of powers" },
  { id: 66, q: "What classification does Regimes of the World use to categorise regimes in its annual report?", options: ["Full Democracy, Flawed Democracy, Hybrid Regime, Authoritarian Regime", "-10 (full autocracy) to +10 (full democracy)", "Democracy, Authoritarian, Totalitarian", "Closed Autocracy, Electoral Autocracy, Electoral Democracy, Liberal Democracy"], answer: "Closed Autocracy, Electoral Autocracy, Electoral Democracy, Liberal Democracy" },
  { id: 67, q: "Bride kidnapping can be considered a form of:", options: ["Gender-based violence", "Corruption", "Economy of favours", "Social mobility"], answer: "Gender-based violence" },
  { id: 68, q: "A Gini coefficient of 0.8 indicates:", options: ["A high level of poverty", "A high level of social mobility", "A high level of income inequality", "A low level of income inequality"], answer: "A high level of income inequality" },
  { id: 69, q: "Which of the following is NOT a form of intimate partner violence?", options: ["Emotional", "Economic", "Stalking", "Helping"], answer: "Helping" },
  { id: 70, q: "In China, an individual’s social network of mutually beneficial personal and business relationships is known as:", options: ["Socialismo", "Songli", "Guanxi", "Hongbao"], answer: "Guanxi" },
  { id: 71, q: "The CPI is a corruption index published by Transparency International. ‘CPI’ stands for:", options: ["Corruption Prevalence Index", "Corruption Perceptions Index", "Corruption Persistence Index", "Corruption Participation Index"], answer: "Corruption Perceptions Index" },
  { id: 72, q: "Which scholar argued that nationalism became a social problem when societies and work became more impersonal, becoming more technical and complex?", options: ["Ernest Gellner", "Max Weber", "Benedict Andersen", "Albert Bandura"], answer: "Ernest Gellner" },
  { id: 73, q: "What do Levitsky and Way argue about the concept of competitive authoritarian regimes?", options: ["They should be seen as distinct political entities rather than flawed democracies", "They are declining in number", "They will eventually evolve into liberal democracies", "They are fundamentally unstable and short-lived"], answer: "They should be seen as distinct political entities rather than flawed democracies" },
  { id: 74, q: "Government by those who seek to make personal gain at the expense of ordinary people is known as:", options: ["Kleptocracy", "Cronyism", "Nepotism", "Embezzlement"], answer: "Kleptocracy" },
  { id: 75, q: "Which of the following scholars had a teleological view of history?", options: ["Karl Marx", "Francis Fukuyama", "Both A and B", "Neither A nor B"], answer: "Both A and B" },
  { id: 76, q: "Which of the following sociologists wrote about late USSR?", options: ["Alena Ledeneva", "John Spector and Malcolm Kitsuse", "Max Weber", "John Goldthorpe"], answer: "Alena Ledeneva" },
  { id: 77, q: "Which of the following would be considered part of the informal organization of a political regime? (Variant 2)", options: ["Constitutional frameworks", "Judicial bodies", "Cronyism", "Elected officials"], answer: "Cronyism" },
  { id: 78, q: "The concepts of ‘ingroups’ and ‘outgroups’ form part of which psychological theory?", options: ["Social identity theory", "Social learning theory", "Cognitive dissonance theory", "Moral disengagement theory"], answer: "Social identity theory" },
  { id: 79, q: "Giving jobs and other benefits to friends, political supporters etc. is known as:", options: ["Nepotism", "Cronyism", "Socialism", "Nationalism"], answer: "Cronyism" },
  { id: 80, q: "Which of the following is NOT important in the ethnic concept of the nation?", options: ["Citizenship", "Ethnicity", "Native language", "Culture"], answer: "Citizenship" },
  { id: 81, q: "Which of the following tactics is likely to be used by an insider pressure group?", options: ["Petitions and boycotts", "Grassroots campaigns", "Direct lobbying of policymakers", "Street protests"], answer: "Direct lobbying of policymakers" },
  { id: 82, q: "“X” is a social problem. Which of the following research questions is written from an objective perspective?", options: ["How did X come to be defined as a social problem?", "Who were the main actors pushing for X to be seen as a social problem?", "What policy responses could be introduced to reduce X?", "When did policymakers begin to pay increased attention to X?"], answer: "What policy responses could be introduced to reduce X?" }
];

const LABELS = ["A", "B", "C", "D"];

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function App() {
  const [mode, setMode] = useState("menu");
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selectedAns, setSelectedAns] = useState(null); // Stores the string of the selected answer
  const [answers, setAnswers] = useState({}); // Stores question ID -> selected string
  const [confirmed, setConfirmed] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [filter, setFilter] = useState("all");

  const startQuiz = () => {
    // Select 40 random questions, and shuffle the options for EACH question
    const shuffled = shuffle(allQuestions).slice(0, 40).map(q => ({
      ...q,
      options: shuffle([...q.options])
    }));
    
    setQuizQuestions(shuffled);
    setAnswers({});
    setCurrent(0);
    setSelectedAns(null);
    setConfirmed(false);
    setShowResult(false);
    setFilter("all");
    setMode("quiz");
  };

  const q = quizQuestions[current];
  const totalQ = quizQuestions.length;
  const score = quizQuestions.filter(q => answers[q.id] === q.answer).length;
  const wrongScore = totalQ - score;

  const handleSelect = (optString) => {
    if (confirmed) return;
    setSelectedAns(optString);
  };

  const handleConfirm = () => {
    if (selectedAns === null) return;
    setConfirmed(true);
    setAnswers(prev => ({ ...prev, [q.id]: selectedAns }));
  };

  const handleNext = () => {
    if (current + 1 >= totalQ) {
      setShowResult(true);
    } else {
      setCurrent(c => c + 1);
      setSelectedAns(null);
      setConfirmed(false);
    }
  };

  const getOptionStyle = (optString) => {
    if (!confirmed) {
      return selectedAns === optString ? "selected" : "default";
    }
    if (optString === q.answer) return "correct";
    if (optString === selectedAns && selectedAns !== q.answer) return "wrong";
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
          <h1 style={styles.title}>Exam Simulator</h1>
          <p style={styles.sub}>Master your material! 40 randomized questions with shuffled answers.</p>
          <div style={styles.cards}>
            <button style={{...styles.card, width: 240}} onClick={startQuiz} className="card-btn">
              <span style={styles.cardNum}>40</span>
              <span style={styles.cardLabel}>Start Quiz</span>
              <span style={styles.cardDesc}>Randomized mode</span>
            </button>
          </div>
        </div>
      )}

      {mode === "quiz" && !showResult && q && (
        <div style={styles.quizWrap}>
          <div style={styles.topBar}>
            <button onClick={() => setMode("menu")} style={styles.backBtn}>← Back to Menu</button>
            <span style={styles.progress}>{current + 1} / {totalQ}</span>
          </div>

          <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: `${(current / totalQ) * 100}%` }} />
          </div>

          <div style={styles.qNum}>QUESTION {current + 1}</div>
          <div style={styles.qText}>{q.q}</div>

          <div style={styles.options}>
            {q.options.map((opt, idx) => {
              const st = getOptionStyle(opt);
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(opt)}
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
                disabled={selectedAns === null}
                style={{ ...styles.btn, ...(selectedAns === null ? styles.btnDisabled : styles.btnPrimary) }}
              >
                Confirm Answer
              </button>
            ) : (
              <button onClick={handleNext} style={{ ...styles.btn, ...styles.btnPrimary }}>
                {current + 1 >= totalQ ? "See Results →" : "Next Question →"}
              </button>
            )}
          </div>
        </div>
      )}

      {mode === "quiz" && showResult && (
        <div style={styles.resultWrap}>
          <div style={styles.scoreHeader}>PERFORMANCE STATISTICS</div>
          
          <div style={styles.statsContainer}>
            <div style={styles.statBox}>
              <div style={{...styles.statNum, color: "#c9a84c"}}>{pct}%</div>
              <div style={styles.statLabel}>Accuracy</div>
            </div>
            <div style={styles.statBox}>
              <div style={{...styles.statNum, color: "#22c55e"}}>{score}</div>
              <div style={styles.statLabel}>Correct</div>
            </div>
            <div style={styles.statBox}>
              <div style={{...styles.statNum, color: "#ef4444"}}>{wrongScore}</div>
              <div style={styles.statLabel}>Incorrect</div>
            </div>
          </div>

          <div style={styles.scoreMsg}>
            {pct === 100 ? "🎉 Bravo! Perfect score!" : pct >= 80 ? "🔥 Great job! You're almost there." : pct >= 60 ? "👍 Good effort, keep practicing!" : "📚 Play again until you reach 100% mastery!"}
          </div>

          <div style={styles.filterRow}>
            {["all", "wrong", "correct"].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{ ...styles.filterBtn, ...(filter === f ? styles.filterActive : {}) }}
              >
                {f === "all" ? `All (${totalQ})` : f === "wrong" ? `Incorrect (${wrongScore})` : `Correct (${score})`}
              </button>
            ))}
          </div>

          <div style={styles.reviewList}>
            {reviewList.map((rq, index) => {
              const userAnsStr = answers[rq.id];
              const isCorrect = userAnsStr === rq.answer;
              
              // Find what label (A, B, C, D) the correct and user answers corresponded to during the quiz
              const correctIdx = rq.options.indexOf(rq.answer);
              const userIdx = rq.options.indexOf(userAnsStr);

              return (
                <div key={rq.id} style={{ ...styles.reviewCard, ...(isCorrect ? styles.reviewCorrect : styles.reviewWrong) }}>
                  <div style={styles.reviewQ}>
                    <span style={styles.reviewIndex}>{index + 1}.</span> {rq.q}
                  </div>
                  {!isCorrect && userAnsStr && (
                    <div style={styles.reviewUserAns}>
                      Your Answer: <span style={{ color: "#ef4444" }}>{LABELS[userIdx]}. {userAnsStr}</span>
                    </div>
                  )}
                  <div style={styles.reviewCorrectAns}>
                    Correct Answer: <span style={{ color: "#22c55e" }}>{LABELS[correctIdx]}. {rq.answer}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <button onClick={() => setMode("menu")} style={{ ...styles.btn, ...styles.btnPrimary, marginTop: 40 }}>
            ← Back to Main Menu
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
  scoreMsg: {
    fontSize: 18,
    fontWeight: 500,
    color: "#e5e7eb",
    marginBottom: 48,
    textAlign: "center",
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