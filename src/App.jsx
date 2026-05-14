import { useState, useEffect } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { collection, addDoc, getDocs, query, orderBy, limit, serverTimestamp } from "firebase/firestore";
import { auth, provider, db } from "./firebase";

const allQuestions = [
  // --- ТВОИ ПРЕДЫДУЩИЕ ВОПРОСЫ (82 шт.) ---
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
  { id: 82, q: "“X” is a social problem. Which of the following research questions is written from an objective perspective?", options: ["How did X come to be defined as a social problem?", "Who were the main actors pushing for X to be seen as a social problem?", "What policy responses could be introduced to reduce X?", "When did policymakers begin to pay increased attention to X?"], answer: "What policy responses could be introduced to reduce X?" },

  // --- НОВЫЕ 100 ВОПРОСОВ ---
  { id: 83, q: "Albert Bandura developed which psychological theory related to observational learning?", options: ["Social identity theory", "Social learning theory", "Attachment theory", "Cognitive dissonance theory"], answer: "Social learning theory" },
  { id: 84, q: "According to Bandura's social learning theory, which of the following is NOT required for behaviour modelling?", options: ["Attention to the model", "Retention of observed behaviour", "Prior genetic predisposition to the behaviour", "Motivation to imitate"], answer: "Prior genetic predisposition to the behaviour" },
  { id: 85, q: "Which concept describes the process by which children internalize behaviours from their parents?", options: ["Classical conditioning", "Socialization", "Anomie", "Deviance amplification"], answer: "Socialization" },
  { id: 86, q: "Social identity theory suggests that people divide the social world into:", options: ["Rich and poor groups", "Ingroups and outgroups", "Traditional and modern societies", "Formal and informal organizations"], answer: "Ingroups and outgroups" },
  { id: 87, q: "Which of the following psychological theories emphasizes the role of group membership in self-concept?", options: ["Behaviorism", "Social identity theory", "Rational choice theory", "Functionalism"], answer: "Social identity theory" },
  { id: 88, q: "Cognitive dissonance occurs when:", options: ["People lack education", "A person's beliefs contradict their behaviour", "Groups compete for resources", "Institutions fail to function"], answer: "A person's beliefs contradict their behaviour" },
  { id: 89, q: "According to Sherif's realistic conflict theory, intergroup conflict arises from:", options: ["Biological differences", "Historical grievances only", "Competition over scarce resources", "Differences in language"], answer: "Competition over scarce resources" },
  { id: 90, q: "The 'minimal group paradigm' demonstrated that:", options: ["Groups require shared interests", "People show ingroup bias even for arbitrary groups", "Conflict requires resource competition", "Social identity is biologically determined"], answer: "People show ingroup bias even for arbitrary groups" },
  { id: 91, q: "Which research perspective focuses on how policymakers construct social problems through media and discourse?", options: ["Positivist perspective", "Social constructionist perspective", "Functionalist perspective", "Objective perspective"], answer: "Social constructionist perspective" },
  { id: 92, q: "'What policy responses could reduce unemployment?' represents which research perspective?", options: ["Subjective perspective", "Objective perspective", "Interpretive perspective", "Critical perspective"], answer: "Objective perspective" },
  { id: 93, q: "'When did policymakers begin to prioritize climate change?' represents which perspective?", options: ["Objective perspective", "Social constructionist perspective", "Functionalist perspective", "Positivist perspective"], answer: "Social constructionist perspective" },
  { id: 94, q: "A social constructionist approach to social problems emphasizes:", options: ["Measurable statistical evidence", "How society defines and labels issues", "The biological basis of behaviour", "Economic inequality as the root cause"], answer: "How society defines and labels issues" },
  { id: 95, q: "Which of the following is an objective research question about poverty?", options: ["Is poverty a moral failure?", "What percentage of the population lives below the poverty line?", "Should we care about poverty?", "Is poverty a social construction?"], answer: "What percentage of the population lives below the poverty line?" },
  { id: 96, q: "The social constructionist approach would argue that:", options: ["Drug addiction is purely biological", "Deviance is defined by society, not objective facts", "Crime statistics accurately reflect crime rates", "Social problems are naturally occurring phenomena"], answer: "Deviance is defined by society, not objective facts" },
  { id: 97, q: "Objective research in sociology focuses on:", options: ["Personal opinions", "Observable, measurable phenomena", "Moral judgments", "Individual experiences only"], answer: "Observable, measurable phenomena" },
  { id: 98, q: "Which perspective would ask 'How do media representations shape public understanding of homelessness?'", options: ["Functionalist perspective", "Social constructionist perspective", "Rational choice perspective", "Structural functionalism"], answer: "Social constructionist perspective" },
  { id: 99, q: "Peter Townsend pioneered research on:", options: ["Absolute poverty", "Relative poverty", "Wealth distribution", "Social mobility"], answer: "Relative poverty" },
  { id: 100, q: "A Gini coefficient of 0.0 indicates:", options: ["Complete inequality", "Perfect equality", "Moderate inequality", "No data available"], answer: "Perfect equality" },
  { id: 101, q: "A Gini coefficient of 1.0 indicates:", options: ["Complete inequality", "Perfect equality", "Moderate redistribution", "Stable society"], answer: "Complete inequality" },
  { id: 102, q: "Relative poverty is defined as:", options: ["Inability to afford food and shelter", "Not having enough to participate fully in society", "Earning less than one's parents", "Lacking access to education"], answer: "Not having enough to participate fully in society" },
  { id: 103, q: "Absolute poverty refers to:", options: ["Inability to meet basic survival needs", "Earning less than the median income", "Social exclusion from communities", "Lack of economic mobility"], answer: "Inability to meet basic survival needs" },
  { id: 104, q: "Which measure of inequality considers the proportion of income earned by different population segments?", options: ["Gini coefficient", "Poverty line", "Unemployment rate", "Life expectancy"], answer: "Gini coefficient" },
  { id: 105, q: "Social stratification is best described as:", options: ["Random distribution of resources", "Systematic hierarchy of social groups", "Individual differences in ability", "Geographic separation of communities"], answer: "Systematic hierarchy of social groups" },
  { id: 106, q: "Intergenerational social mobility refers to:", options: ["Changes in social class between parents and children", "Movement within a single social class", "Geographic relocation", "Educational achievement"], answer: "Changes in social class between parents and children" },
  { id: 107, q: "Cronyism refers to:", options: ["Giving jobs to family members", "Giving jobs and benefits to friends and political supporters", "Meritocratic hiring", "Transparent appointment processes"], answer: "Giving jobs and benefits to friends and political supporters" },
  { id: 108, q: "Which of the following is part of the formal organization of a political regime?", options: ["Elite networks", "Constitutional framework", "Patronage networks", "Informal alliances"], answer: "Constitutional framework" },
  { id: 109, q: "Which of the following is part of the informal organization of a political regime?", options: ["Electoral law", "Political patronage networks", "Legislative procedures", "Constitutional provisions"], answer: "Political patronage networks" },
  { id: 110, q: "Separation of powers means:", options: ["Nations have complete independence", "Executive power is limited by legislature and judiciary", "Different countries govern their own regions", "Branches of government operate in isolation"], answer: "Executive power is limited by legislature and judiciary" },
  { id: 111, q: "Checks and balances are a feature of:", options: ["Authoritarian regimes", "Liberal democracies", "Totalitarian systems", "Theocracies"], answer: "Liberal democracies" },
  { id: 112, q: "A regime's horizontal dimension of power refers to:", options: ["Relations between government and international organizations", "Constraints on executive power through other institutions", "Relations between central and local government", "Relations between wealthy and poor citizens"], answer: "Constraints on executive power through other institutions" },
  { id: 113, q: "Which type of regime seeks to control all aspects of public and private life?", options: ["Totalitarian", "Authoritarian", "Democratic", "Oligarchic"], answer: "Totalitarian" },
  { id: 114, q: "Juan José Linz classified regimes into:", options: ["Two types: democratic and authoritarian", "Three types: democratic, authoritarian, totalitarian", "Four types: including competitive", "Five types: based on economic systems"], answer: "Three types: democratic, authoritarian, totalitarian" },
  { id: 115, q: "Which of the following is NOT characteristic of totalitarian regimes according to Linz?", options: ["Monopoly on political power", "Extensive ideological commitment", "Respect for individual freedoms", "Controlled economy"], answer: "Respect for individual freedoms" },
  { id: 116, q: "Authoritarian regimes, according to Linz, are characterized by:", options: ["Limited pluralism and limited ideological appeal", "Complete control of all aspects of society", "Democratic elections", "Absence of any organizational structure"], answer: "Limited pluralism and limited ideological appeal" },
  { id: 117, q: "Levitsky and Way argue that competitive authoritarian regimes are:", options: ["Actually flawed democracies", "Distinct political entities", "Transitional systems", "Inherently unstable"], answer: "Distinct political entities" },
  { id: 118, q: "Academic research on corruption grew most significantly in:", options: ["The 1970s", "The 1980s", "The 1990s", "The 2000s"], answer: "The 1990s" },
  { id: 119, q: "The Corruption Perceptions Index (CPI) is published by:", options: ["The World Bank", "Transparency International", "The United Nations", "The International Monetary Fund"], answer: "Transparency International" },
  { id: 120, q: "Kleptocracy is defined as:", options: ["Rule by the wealthy", "Government by those seeking personal gain at expense of ordinary people", "Rule by foreign powers", "Government by criminals"], answer: "Government by those seeking personal gain at expense of ordinary people" },
  { id: 121, q: "In China, guanxi refers to:", options: ["Personal networks of mutually beneficial relationships", "Formal business contracts", "Government bureaucracy", "Religious practices"], answer: "Personal networks of mutually beneficial relationships" },
  { id: 122, q: "Which of the following is NOT part of civil society?", options: ["Non-governmental organizations", "Community groups", "Small businesses operating for profit", "Volunteer associations"], answer: "Small businesses operating for profit" },
  { id: 123, q: "Civil society organizations typically:", options: ["Seek to maximize profit", "Operate in the public interest between state and market", "Are controlled by government", "Make political decisions"], answer: "Operate in the public interest between state and market" },
  { id: 124, q: "Marc Howard's research found that post-communist societies:", options: ["Have the highest civil society participation", "Have some of the lowest levels of civil society participation", "Show increasing civic engagement", "Have stable civil society"], answer: "Have some of the lowest levels of civil society participation" },
  { id: 125, q: "Alena Ledeneva is known for research on:", options: ["Western European politics", "Informal networks in the late USSR", "Civil society in developing nations", "Democratic institutions"], answer: "Informal networks in the late USSR" },
  { id: 126, q: "Which scholar argued that nationalism became a social problem when societies became more impersonal and technical?", options: ["Albert Bandura", "Ernest Gellner", "Peter Townsend", "Juan José Linz"], answer: "Ernest Gellner" },
  { id: 127, q: "Transparency International's main aim is to:", options: ["Monitor government spending", "Fight global corruption", "Regulate international trade", "Promote democracy"], answer: "Fight global corruption" },
  { id: 128, q: "An insider pressure group typically uses:", options: ["Public protests", "Direct lobbying of policymakers", "Media campaigns", "International campaigns"], answer: "Direct lobbying of policymakers" },
  { id: 129, q: "A grassroots movement is characterized by:", options: ["Centralized leadership", "Spontaneous support from ordinary individuals", "Government funding", "Elite organization"], answer: "Spontaneous support from ordinary individuals" },
  { id: 130, q: "Which of the following is a characteristic of civil society organizations?", options: ["Mandatory government membership", "Voluntary participation", "Profit maximization", "Political party affiliation"], answer: "Voluntary participation" },
  { id: 131, q: "Systemic corruption refers to:", options: ["Individual acts of bribery", "Corruption embedded in institutional structures", "Corruption in developing countries only", "Deliberate policy violations"], answer: "Corruption embedded in institutional structures" },
  { id: 132, q: "The Watergate scandal demonstrated:", options: ["The invulnerability of presidents", "That constitutional checks can limit executive power", "The weakness of democratic systems", "The inevitability of political corruption"], answer: "That constitutional checks can limit executive power" },
  { id: 133, q: "Civic nationalism is based on:", options: ["Shared citizenship and civic participation", "Common ethnicity", "Religious identity", "Geographic proximity"], answer: "Shared citizenship and civic participation" },
  { id: 134, q: "Ethnic nationalism emphasizes:", options: ["Common ancestry and cultural heritage", "Shared political values", "Economic cooperation", "Geographic boundaries"], answer: "Common ancestry and cultural heritage" },
  { id: 135, q: "Which of the following is important in the civic concept of the nation?", options: ["Common ethnicity", "Citizenship", "Shared language", "Religious practices"], answer: "Citizenship" },
  { id: 136, q: "Which of the following is NOT important in the civic concept of the nation?", options: ["Shared political values", "Ethnicity", "Legal citizenship", "Constitutional framework"], answer: "Ethnicity" },
  { id: 137, q: "Which of the following is important in the ethnic concept of the nation?", options: ["Common ancestry and culture", "Legal citizenship", "Political ideology", "Economic systems"], answer: "Common ancestry and culture" },
  { id: 138, q: "Which of the following is NOT important in the ethnic concept of the nation?", options: ["Shared language", "Citizenship", "Common ancestry", "Cultural traditions"], answer: "Citizenship" },
  { id: 139, q: "Ernest Gellner's modernist theory suggests nationalism arose due to:", options: ["Natural human grouping instincts", "Industrial society's need for standardized culture", "Biological differences between populations", "Religious conflicts"], answer: "Industrial society's need for standardized culture" },
  { id: 140, q: "A nation-state possesses external sovereignty when:", options: ["Citizens accept the government", "It is recognized by the international community", "It has no internal conflicts", "It controls all its borders"], answer: "It is recognized by the international community" },
  { id: 141, q: "Internal sovereignty depends on:", options: ["International recognition", "Acceptance of the regime's legitimacy by its citizens", "Membership in international organizations", "Economic power"], answer: "Acceptance of the regime's legitimacy by its citizens" },
  { id: 142, q: "Which of the following would support external sovereignty?", options: ["Internal civil conflict", "International recognition", "Weak institutions", "High corruption levels"], answer: "International recognition" },
  { id: 143, q: "Nationalism became a social problem according to Gellner when:", options: ["Nations first emerged", "Societies became impersonal and technically complex", "Empires were formed", "Religions spread"], answer: "Societies became impersonal and technically complex" },
  { id: 144, q: "National identity is constructed through:", options: ["Biology alone", "Education, media, and shared narratives", "Natural geographic boundaries", "Economic factors only"], answer: "Education, media, and shared narratives" },
  { id: 145, q: "Ethnic conflicts often arise when:", options: ["Groups have different languages", "Multiple ethnic groups compete for political power", "Nations are multiethnic", "Civic nationalism exists"], answer: "Multiple ethnic groups compete for political power" },
  { id: 146, q: "The Soviet Union's approach to nationalities involved:", options: ["Promoting Russian assimilation", "Creating separate republics based on ethnic groups", "Eliminating ethnic identities", "Merging all cultures"], answer: "Creating separate republics based on ethnic groups" },
  { id: 147, q: "Supranational organizations affect sovereignty by:", options: ["Increasing it", "Limiting national decision-making authority", "Strengthening it", "Eliminating it completely"], answer: "Limiting national decision-making authority" },
  { id: 148, q: "Bride kidnapping is a form of:", options: ["Cultural practice", "Gender-based violence", "Economic arrangement", "Social tradition"], answer: "Gender-based violence" },
  { id: 149, q: "Intimate partner violence (IPV) occurs between:", options: ["Strangers", "Partners in a sexual relationship", "Family members only", "Co-workers"], answer: "Partners in a sexual relationship" },
  { id: 150, q: "Which of the following is a form of intimate partner violence?", options: ["Physical assault", "Helping with household tasks", "Providing emotional support", "Sharing household decisions"], answer: "Physical assault" },
  { id: 151, q: "Which of the following is NOT a form of intimate partner violence?", options: ["Emotional abuse", "Sexual assault", "Mutual agreement about decisions", "Financial control"], answer: "Mutual agreement about decisions" },
  { id: 152, q: "Coercive control in relationships involves:", options: ["Patterns of behaviour that intimidate and control", "Normal disagreements between partners", "Professional advice-giving", "Consensual relationship dynamics"], answer: "Patterns of behaviour that intimidate and control" },
  { id: 153, q: "Which of the following is a form of coercive control?", options: ["Isolating the victim from family and friends", "Respecting the victim's autonomy", "Supporting the victim's education", "Sharing decision-making"], answer: "Isolating the victim from family and friends" },
  { id: 154, q: "Which of the following is NOT a form of coercive control?", options: ["Economic abuse", "Controlling behaviour", "Neglecting the victim", "Emotional manipulation"], answer: "Neglecting the victim" },
  { id: 155, q: "Patriarchal norms refer to:", options: ["Male authority and control over women being socially acceptable", "Women's equality movements", "Gender-neutral policies", "Democratic values"], answer: "Male authority and control over women being socially acceptable" },
  { id: 156, q: "Patriarchal systems are characterized by:", options: ["Gender equality", "Male dominance in family and society", "Women's political power", "Shared authority structures"], answer: "Male dominance in family and society" },
  { id: 157, q: "Which of the following challenges patriarchal norms?", options: ["Women's political participation", "Traditional gender roles", "Male-only leadership", "Religious conservatism"], answer: "Women's political participation" },
  { id: 158, q: "Gender-based violence can be perpetuated by:", options: ["Laws protecting women only", "Social norms accepting male dominance", "Women's education", "Democratic institutions"], answer: "Social norms accepting male dominance" },
  { id: 159, q: "Femicide refers to:", options: ["Pregnancy-related deaths", "Murder of women because of their gender", "Deaths in childbirth", "Accidental female deaths"], answer: "Murder of women because of their gender" },
  { id: 160, q: "Survivor support services for IPV typically include:", options: ["Counselling and safe housing", "Mandatory reconciliation", "Public shaming", "Economic punishment"], answer: "Counselling and safe housing" },
  { id: 161, q: "Which factor increases vulnerability to intimate partner violence?", options: ["Economic dependence on partner", "Financial independence", "Education level", "Extended family support"], answer: "Economic dependence on partner" },
  { id: 162, q: "Addressing gender-based violence requires:", options: ["Individual counselling only", "Legal reforms and cultural change", "Victim blame prevention only", "Economic measures alone"], answer: "Legal reforms and cultural change" },
  { id: 163, q: "Freedom of assembly means:", options: ["Right to gather peacefully in public spaces", "Right to create military units", "Freedom from public spaces", "Ability to prevent protests"], answer: "Right to gather peacefully in public spaces" },
  { id: 164, q: "Which of the following is a liberal institution?", options: ["Independent judiciary", "Martial law", "State-controlled media", "Absolute monarchy"], answer: "Independent judiciary" },
  { id: 165, q: "Which of the following is NOT a liberal institution?", options: ["Constitutional government", "Single-party state", "Free press", "Individual rights protection"], answer: "Single-party state" },
  { id: 166, q: "Freedom of the press in democracies means:", options: ["Media can criticize government", "Government controls all publications", "Media must support government", "No media regulation exists"], answer: "Media can criticize government" },
  { id: 167, q: "Liberal democracy emphasizes:", options: ["Collective goals only", "Individual rights and limited government", "Government control of economy", "Elimination of private property"], answer: "Individual rights and limited government" },
  { id: 168, q: "Which of the following supports liberal democracy?", options: ["Rule of law", "Arbitrary executive decisions", "Absence of courts", "Government monopoly on information"], answer: "Rule of law" },
  { id: 169, q: "Rights protection in democracies involves:", options: ["Constitutional guarantees", "Government discretion", "Majority rule without limits", "Elimination of minorities"], answer: "Constitutional guarantees" },
  { id: 170, q: "Free and fair elections are characterized by:", options: ["Universal suffrage and secret ballot", "Limited voter participation", "Government-approved candidates only", "Public voting records"], answer: "Universal suffrage and secret ballot" },
  { id: 171, q: "Which of the following is essential to liberal democracy?", options: ["Separation of powers", "Centralized authority", "Monopolistic parties", "Restricted freedoms"], answer: "Separation of powers" },
  { id: 172, q: "Competitive elections in democracies mean:", options: ["Multiple candidates compete for office", "Government selects all candidates", "Winner-take-all systems only", "One party always wins"], answer: "Multiple candidates compete for office" },
  { id: 173, q: "Teleological views of history suggest:", options: ["History has no direction", "History moves toward a predetermined outcome", "History repeats in cycles", "Future is completely unpredictable"], answer: "History moves toward a predetermined outcome" },
  { id: 174, q: "Which scholars had teleological views of history?", options: ["Marx and liberal progressivists", "Both conservative and progressive thinkers", "Only sociologists", "Only philosophers"], answer: "Both conservative and progressive thinkers" },
  { id: 175, q: "Indices measuring democracy generally show:", options: ["Democracy is improving globally", "Democracy is declining in many countries", "No clear trend exists", "Democracy is irrelevant"], answer: "Democracy is declining in many countries" },
  { id: 176, q: "Post-communist transitions to democracy have often experienced:", options: ["Smooth democratization", "Challenges to civil society development", "Immediate equality", "Elimination of corruption"], answer: "Challenges to civil society development" },
  { id: 177, q: "Informal organizations in society refer to:", options: ["Illegal activities", "Unwritten rules and networks", "Small businesses", "Volunteer organizations"], answer: "Unwritten rules and networks" },
  { id: 178, q: "Which of the following best describes social cohesion?", options: ["Shared bonds and mutual trust", "Government control", "Economic equality", "Geographic proximity"], answer: "Shared bonds and mutual trust" },
  { id: 179, q: "Anomie refers to:", options: ["Legal punishment", "Lack of social norms and moral guidance", "Economic poverty", "Political disagreement"], answer: "Lack of social norms and moral guidance" },
  { id: 180, q: "The informal economy consists of:", options: ["Government-regulated businesses", "Unregistered, unregulated economic activities", "Large corporations", "Professional services"], answer: "Unregistered, unregulated economic activities" },
  { id: 181, q: "Social trust is important for:", options: ["Individual wealth only", "Functioning of democratic institutions", "Government size", "Economic inequality"], answer: "Functioning of democratic institutions" },
  { id: 182, q: "Institutional legitimacy depends on:", options: ["Military strength", "Public acceptance and belief in authority", "Geographic size", "Economic resources"], answer: "Public acceptance and belief in authority" }
];

const LABELS = ["A", "B", "C", "D"];

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function App() {
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState("menu");
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selectedAns, setSelectedAns] = useState(null);
  const [answers, setAnswers] = useState({});
  const [confirmed, setConfirmed] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [filter, setFilter] = useState("all");
  const [leaderboard, setLeaderboard] = useState([]);
  const [loadingLB, setLoadingLB] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setMode("menu");
    } catch (error) {
      console.error(error);
    }
  };

  const fetchLeaderboard = async () => {
    setLoadingLB(true);
    setMode("leaderboard");
    try {
      // ПРИМЕЧАНИЕ: Эта функция заработает сразу, как только в Firebase достроится Индекс по ссылке из твоей ошибки!
      const q = query(collection(db, "scores"), orderBy("pct", "desc"), orderBy("score", "desc"), limit(10));
      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setLeaderboard(data);
    } catch (error) {
      console.error(error);
      alert("Рейтинг загружается. Если вы только что создали индекс в Firebase, подождите пару минут.");
    }
    setLoadingLB(false);
  };

  const startQuiz = () => {
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
  const pct = totalQ > 0 ? Math.round((score / totalQ) * 100) : 0;

  const handleSelect = (optString) => {
    if (confirmed) return;
    setSelectedAns(optString);
  };

  const handleConfirm = () => {
    if (selectedAns === null) return;
    setConfirmed(true);
    setAnswers(prev => ({ ...prev, [q.id]: selectedAns }));
  };

  const handleNext = async () => {
    if (current + 1 >= totalQ) {
      setShowResult(true);
      if (user) {
        try {
          await addDoc(collection(db, "scores"), {
            name: user.displayName,
            email: user.email,
            score: score,
            total: totalQ,
            pct: pct,
            date: serverTimestamp()
          });
        } catch (error) {
          console.error(error);
        }
      }
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

  return (
    <div style={styles.root}>
      <style>{css}</style>

      {/* НОВАЯ ПЛОСКАЯ ШАПКА ПРОФИЛЯ */}
      {user && (
        <div style={styles.topNavbar}>
          <div style={styles.navLeft}>
            <img src={user.photoURL} alt="avatar" style={styles.navAvatar} />
            <span style={styles.navName}>{user.displayName}</span>
          </div>
          <button onClick={handleLogout} style={styles.navLogoutBtn}>Выйти</button>
        </div>
      )}

      {mode === "menu" && (
        <div style={styles.menu}>
          <div style={styles.badge}>SOCIOLOGY EXAM PREP</div>
          <h1 style={styles.title}>Exam Simulator</h1>

          {!user ? (
            <div style={styles.authContainer}>
              <p style={styles.sub}>Авторизуйся через Google, чтобы получить доступ к тестам и таблице лидеров.</p>
              <button onClick={handleLogin} style={styles.bigLoginBtn}>
                <svg width="20" height="20" viewBox="0 0 24 24" style={{marginRight: 10}}>
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Войти через Google
              </button>
            </div>
          ) : (
            <div style={styles.cards}>
              <button style={{...styles.card, width: 220}} onClick={startQuiz} className="card-btn">
                <span style={styles.cardNum}>40</span>
                <span style={styles.cardLabel}>Начать тест</span>
                <span style={styles.cardDesc}>Случайный набор вопросов</span>
              </button>
              <button style={{...styles.card, width: 220, borderColor: "#22c55e"}} onClick={fetchLeaderboard} className="card-btn">
                <span style={{...styles.cardNum, color: "#22c55e"}}>🏆</span>
                <span style={styles.cardLabel}>Рейтинг</span>
                <span style={styles.cardDesc}>Топ результатов</span>
              </button>
            </div>
          )}
        </div>
      )}

      {mode === "leaderboard" && (
        <div style={styles.lbWrap}>
          <h2 style={styles.title}>Top Scores</h2>
          {loadingLB ? (
            <p style={{color: "#9ca3af"}}>Загрузка рейтинга...</p>
          ) : (
            <div style={styles.lbList}>
              {leaderboard.map((item, i) => (
                <div key={i} style={styles.lbItem}>
                  <div style={styles.lbRank}>{i + 1}</div>
                  <div style={styles.lbName}>{item.name}</div>
                  <div style={styles.lbScore}>{item.pct}% ({item.score}/{item.total})</div>
                </div>
              ))}
              {leaderboard.length === 0 && <p style={{color: "#9ca3af"}}>Еще нет результатов. Будь первым!</p>}
            </div>
          )}
          <button onClick={() => setMode("menu")} style={{ ...styles.btn, ...styles.btnPrimary, marginTop: 40 }}>
            ← В главное меню
          </button>
        </div>
      )}

      {mode === "quiz" && !showResult && q && (
        <div style={styles.quizWrap}>
          <div style={styles.topBar}>
            <button onClick={() => setMode("menu")} style={styles.backBtn}>← В меню</button>
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
                Подтвердить
              </button>
            ) : (
              <button onClick={handleNext} style={{ ...styles.btn, ...styles.btnPrimary }}>
                {current + 1 >= totalQ ? "Результаты →" : "Следующий вопрос →"}
              </button>
            )}
          </div>
        </div>
      )}

      {mode === "quiz" && showResult && (
        <div style={styles.resultWrap}>
          <div style={styles.scoreHeader}>СТАТИСТИКА</div>
          
          <div style={styles.statsContainer}>
            <div style={styles.statBox}>
              <div style={{...styles.statNum, color: "#c9a84c"}}>{pct}%</div>
              <div style={styles.statLabel}>Точность</div>
            </div>
            <div style={styles.statBox}>
              <div style={{...styles.statNum, color: "#22c55e"}}>{score}</div>
              <div style={styles.statLabel}>Верно</div>
            </div>
            <div style={styles.statBox}>
              <div style={{...styles.statNum, color: "#ef4444"}}>{wrongScore}</div>
              <div style={styles.statLabel}>Ошибки</div>
            </div>
          </div>

          <div style={styles.scoreMsg}>
            {pct === 100 ? "🎉 Идеально! Твой результат отправлен в базу." : pct >= 80 ? "🔥 Хорошая работа! Твой результат сохранен." : "📚 Результат сохранен, но есть куда расти!"}
          </div>

          <div style={styles.filterRow}>
            {["all", "wrong", "correct"].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{ ...styles.filterBtn, ...(filter === f ? styles.filterActive : {}) }}
              >
                {f === "all" ? `Все (${totalQ})` : f === "wrong" ? `Ошибки (${wrongScore})` : `Верные (${score})`}
              </button>
            ))}
          </div>

          <div style={styles.reviewList}>
            {reviewList.map((rq, index) => {
              const userAnsStr = answers[rq.id];
              const isCorrect = userAnsStr === rq.answer;
              const correctIdx = rq.options.indexOf(rq.answer);
              const userIdx = rq.options.indexOf(userAnsStr);

              return (
                <div key={rq.id} style={{ ...styles.reviewCard, ...(isCorrect ? styles.reviewCorrect : styles.reviewWrong) }}>
                  <div style={styles.reviewQ}>
                    <span style={styles.reviewIndex}>{index + 1}.</span> {rq.q}
                  </div>
                  {!isCorrect && userAnsStr && (
                    <div style={styles.reviewUserAns}>
                      Твой ответ: <span style={{ color: "#ef4444" }}>{LABELS[userIdx]}. {userAnsStr}</span>
                    </div>
                  )}
                  <div style={styles.reviewCorrectAns}>
                    Правильный ответ: <span style={{ color: "#22c55e" }}>{LABELS[correctIdx]}. {rq.answer}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <button onClick={() => setMode("menu")} style={{ ...styles.btn, ...styles.btnPrimary, marginTop: 40 }}>
            ← Вернуться в меню
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
  },
  topNavbar: {
    width: "100%",
    height: 64,
    background: "#121217",
    borderBottom: "1px solid #2a2820",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 24px",
    boxSizing: "border-box",
  },
  navLeft: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  navAvatar: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    border: "2px solid #c9a84c",
  },
  navName: {
    fontSize: 15,
    fontWeight: 600,
    color: "#f0ebe0",
  },
  navLogoutBtn: {
    background: "transparent",
    border: "1px solid #4b4737",
    color: "#9ca3af",
    padding: "6px 14px",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 500,
    transition: "all 0.2s",
  },
  menu: {
    maxWidth: 600,
    width: "100%",
    paddingTop: 80,
    textAlign: "center",
    padding: "80px 16px 0",
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
    marginBottom: 40,
  },
  authContainer: {
    marginTop: 40,
    padding: 30,
    background: "#18181f",
    borderRadius: 16,
    border: "1px solid #2a2820",
  },
  bigLoginBtn: {
    background: "#ffffff",
    color: "#000000",
    border: "none",
    padding: "12px 24px",
    borderRadius: 8,
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto",
    transition: "transform 0.1s",
  },
  cards: {
    display: "flex",
    gap: 16,
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 40,
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
    padding: "40px 16px 60px",
  },
  lbWrap: {
    maxWidth: 600,
    width: "100%",
    padding: "40px 16px 60px",
    textAlign: "center",
  },
  lbList: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginTop: 32,
    textAlign: "left",
  },
  lbItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#18181f",
    border: "1px solid #2a2820",
    padding: "16px 24px",
    borderRadius: 12,
  },
  lbRank: {
    fontSize: 20,
    fontWeight: 700,
    color: "#6b7280",
    width: 40,
  },
  lbName: {
    flex: 1,
    fontSize: 16,
    fontWeight: 500,
  },
  lbScore: {
    fontSize: 18,
    fontWeight: 700,
    color: "#c9a84c",
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
    overflow: "hidden",
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
    padding: "48px 16px 60px",
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
  button { font-family: 'Inter', sans-serif; }
`;