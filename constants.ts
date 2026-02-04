import { Question, Subject, NewsUpdate, SubjectModule } from './types';

// Expert curated questions (seed database)
export const MOCK_QUESTIONS: Question[] = [
  // ==========================================
  // EXISTING DATABASE (PRESERVED)
  // ==========================================
  
  // --- NEW BATCH: LOGICAL REASONING & APTITUDE (From User Input) ---
  
  // Coding-Decoding
  { id: 'lr_b1_1', question: "In a certain code, TEACHER is written as VGCEJGT. How is STUDENT written in that code?", options: ["UVWFGPV", "UVWFGPW", "TUVFGPV", "UVXFGPV"], correctAnswer: 0, explanation: "Logic: Each letter moves +2 positions forward.", subject: Subject.LogicalReasoning },
  { id: 'lr_b1_2', question: "If WATER is written as XBUFS, what is the code for DRINK?", options: ["ESJOL", "ESJOK", "FSJOL", "DSINK"], correctAnswer: 0, explanation: "Logic: Each letter moves +1 position forward.", subject: Subject.LogicalReasoning },
  { id: 'lr_b1_3', question: "If BOMBAY is written as MYMYMY, how will TAMILNADU be written?", options: ["MNUMNUMN", "MNUMNUMNU", "NUMNUMNUM", "MUNMUNMUN"], correctAnswer: 1, explanation: "Logic: Every 3rd letter is repeated thrice.", subject: Subject.LogicalReasoning },
  { id: 'lr_b1_4', question: "If RED is called GREEN, GREEN is called YELLOW, and YELLOW is called VIOLET, what is the color of grass?", options: ["GREEN", "YELLOW", "VIOLET", "RED"], correctAnswer: 1, explanation: "Grass is green, and Green is called Yellow.", subject: Subject.LogicalReasoning },

  // Blood Relations
  { id: 'lr_b1_5', question: "Pointing to a photograph, a man said, 'I have no brother or sister but that man’s father is my father’s son.' Whose photograph was it?", options: ["His father's", "His son's", "His own", "His nephew's"], correctAnswer: 1, explanation: "'My father's son' with no siblings is the speaker himself. So 'That man's father is Me'. Thus, it is his son.", subject: Subject.LogicalReasoning },
  { id: 'lr_b1_6', question: "If A is the brother of B; B is the sister of C; and C is the father of D, how is A related to D?", options: ["Father", "Uncle", "Brother", "Grandfather"], correctAnswer: 1, explanation: "A is the brother of C (D's father). So A is D's Uncle.", subject: Subject.LogicalReasoning },
  { id: 'lr_b1_7', question: "Introducing a boy, a girl said, 'He is the son of the daughter of the father of my uncle.' How is the boy related to the girl?", options: ["Brother", "Uncle", "Nephew", "Son"], correctAnswer: 0, explanation: "Father of uncle = Grandfather. Daughter of Grandfather = Mother (or Aunt). Son of Mother = Brother (or Cousin). 'Brother' fits best.", subject: Subject.LogicalReasoning },

  // Direction Sense
  { id: 'lr_b1_8', question: "A man walks 5 km East, then turns right and walks 4 km. Then he turns left and walks 5 km. Which direction is he facing now?", options: ["North", "South", "East", "West"], correctAnswer: 2, explanation: "East -> Right(South) -> Left(East). He is facing East.", subject: Subject.LogicalReasoning },
  { id: 'lr_b1_9', question: "If South-East becomes North, North-East becomes West and so on, what will West become?", options: ["South-East", "South-West", "North-East", "North-West"], correctAnswer: 0, explanation: "The directions are shifting 135° anti-clockwise. West + 135° ACW = South-East.", subject: Subject.LogicalReasoning },
  { id: 'lr_b1_10', question: "Starting from a point, Raju walked 12 m North. He turned right and walked 10 m, he again turned right and walked 12 m, then he turned left and walked 5 m. How far is he now and in which direction?", options: ["10 m East", "15 m East", "25 m East", "5 m West"], correctAnswer: 1, explanation: "He moved 12N, 10E, 12S (back to same horizontal line), then 5E. Total East = 10 + 5 = 15m.", subject: Subject.LogicalReasoning },

  // Series & Analogy
  { id: 'lr_b1_11', question: "Complete the series: 7, 10, 8, 11, 9, 12, (...)", options: ["10", "13", "14", "7"], correctAnswer: 0, explanation: "Pattern: +3, -2, +3, -2... Next is 12 - 2 = 10.", subject: Subject.LogicalReasoning },
  { id: 'lr_b1_12', question: "Find the missing number: 36, 34, 30, 28, 24, (...)", options: ["20", "22", "23", "26"], correctAnswer: 1, explanation: "Pattern: -2, -4, -2, -4... Next is 24 - 2 = 22.", subject: Subject.LogicalReasoning },
  { id: 'lr_b1_13', question: "Giant : Dwarf :: Genius : ?", options: ["Intelligent", "Idiot", "Smart", "Tiny"], correctAnswer: 1, explanation: "Antonyms relationship.", subject: Subject.LogicalReasoning },
  { id: 'lr_b1_14', question: "Medicine : Sickness :: Book : ?", options: ["Knowledge", "Author", "Ignorance", "Library"], correctAnswer: 2, explanation: "Medicine cures Sickness; Books cure Ignorance.", subject: Subject.LogicalReasoning },

  // Ranking
  { id: 'lr_b1_15', question: "In a row of 40 students, A is 13th from the left end. What is his rank from the right end?", options: ["27th", "28th", "29th", "30th"], correctAnswer: 1, explanation: "Rank from Right = Total - Left + 1 = 40 - 13 + 1 = 28.", subject: Subject.LogicalReasoning },
  { id: 'lr_b1_16', question: "Rahul is 12th from right and 4th from left. How many boys should be added to make 28 in line?", options: ["12", "13", "14", "15"], correctAnswer: 1, explanation: "Current total = 12 + 4 - 1 = 15. Required = 28. Add = 28 - 15 = 13.", subject: Subject.LogicalReasoning },

  // Classification
  { id: 'lr_b1_17', question: "Find the odd one out:", options: ["Pear", "Apple", "Guava", "Ginger"], correctAnswer: 3, explanation: "Ginger is a root/stem underground, others are fruits.", subject: Subject.LogicalReasoning },
  { id: 'lr_b1_18', question: "Find the odd one out:", options: ["11", "13", "15", "17"], correctAnswer: 2, explanation: "15 is a composite number, others are prime.", subject: Subject.LogicalReasoning },

  // Syllogism
  { id: 'lr_b1_19', question: "Statements: All pens are roads. All roads are houses. Conclusion: Are all pens houses?", options: ["Yes", "No", "Maybe", "Cannot say"], correctAnswer: 0, explanation: "If A in B and B in C, then A in C.", subject: Subject.LogicalReasoning },
  { id: 'lr_b1_20', question: "Statements: Some fruits are flowers. No flower is a boat. Conclusion: Some fruits are not boats?", options: ["Yes", "No", "Maybe", "False"], correctAnswer: 0, explanation: "The fruits that are flowers can never be boats.", subject: Subject.LogicalReasoning },

  // Clock & Calendar
  { id: 'lr_b1_21', question: "What is the angle between the hour hand and the minute hand of a clock at 3:25?", options: ["45°", "47.5°", "50°", "52.5°"], correctAnswer: 1, explanation: "Formula: |30H - 5.5M|. |90 - 137.5| = 47.5°.", subject: Subject.LogicalReasoning },
  { id: 'lr_b1_22', question: "If 1st Jan 2024 was Monday, what day was 1st Feb 2024?", options: ["Wednesday", "Thursday", "Friday", "Tuesday"], correctAnswer: 1, explanation: "Jan has 31 days. 31/7 Remainder 3. Mon + 3 = Thursday.", subject: Subject.LogicalReasoning },
  { id: 'lr_b1_23', question: "How many times do the hands of a clock coincide in a day?", options: ["22", "24", "44", "48"], correctAnswer: 0, explanation: "They coincide 11 times in 12 hours, so 22 times in 24 hours.", subject: Subject.LogicalReasoning },
  { id: 'lr_b1_24', question: "It was Sunday on Jan 1, 2006. What was the day of the week Jan 1, 2010?", options: ["Wednesday", "Thursday", "Friday", "Saturday"], correctAnswer: 2, explanation: "Odd days: 2006(1), 2007(1), 2008(2), 2009(1) = 5. Sun + 5 = Friday.", subject: Subject.LogicalReasoning },

  // Number Series
  { id: 'lr_b1_25', question: "Find the missing number: 2, 5, 11, 23, 47, (...)", options: ["94", "95", "96", "97"], correctAnswer: 1, explanation: "Logic: x2 + 1. 47*2 + 1 = 95.", subject: Subject.LogicalReasoning },
  { id: 'lr_b1_26', question: "Find the missing number: 8, 24, 12, 36, 18, 54, (...)", options: ["27", "28", "29", "30"], correctAnswer: 0, explanation: "Logic: x3, /2. 54 / 2 = 27.", subject: Subject.LogicalReasoning },
  { id: 'lr_b1_27', question: "10, 100, 200, 310, ?", options: ["400", "410", "420", "430"], correctAnswer: 3, explanation: "Gap increases by 10: +90, +100, +110, +120. 310+120=430.", subject: Subject.LogicalReasoning },

  // Verbal Analogy
  { id: 'lr_b1_28', question: "Architect : Building :: Sculptor : ?", options: ["Museum", "Stone", "Chisel", "Statue"], correctAnswer: 3, explanation: "Architect designs Building; Sculptor makes Statue.", subject: Subject.LogicalReasoning },
  { id: 'lr_b1_29', question: "Calendar : Dates :: Dictionary : ?", options: ["Vocabulary", "Language", "Words", "Book"], correctAnswer: 2, explanation: "Calendar contains Dates; Dictionary contains Words.", subject: Subject.LogicalReasoning },
  { id: 'lr_b1_30', question: "Odissi : Odisha :: Kathak : ?", options: ["Kerala", "Tamil Nadu", "Andhra Pradesh", "Uttar Pradesh"], correctAnswer: 3, explanation: "Classical dance of UP.", subject: Subject.LogicalReasoning },

  // Syllogism 2
  { id: 'lr_b1_31', question: "Statements: All kings are warriors. All warriors are brave. Conclusion: Are all kings brave?", options: ["Yes", "No", "Maybe", "False"], correctAnswer: 0, explanation: "Transitive property: A->B, B->C implies A->C.", subject: Subject.LogicalReasoning },

  // Seating
  { id: 'lr_b1_32', question: "5 friends (A,B,C,D,E) facing North. E is at left end. D not with E. C is 2nd from right. A is right of B and E. Where is A?", options: ["Left of B", "Right of C", "Between B and C", "Next to D"], correctAnswer: 2, explanation: "Arrangement: E B A C D. A is between B and C.", subject: Subject.LogicalReasoning },
  { id: 'lr_b1_33', question: "In a class of 45, Neha is 15th from top. Rank from bottom?", options: ["30th", "31st", "32nd", "29th"], correctAnswer: 1, explanation: "45 - 15 + 1 = 31.", subject: Subject.LogicalReasoning },

  // Non-Verbal
  { id: 'lr_b1_34', question: "Identify the odd one:", options: ["Square", "Triangle", "Rhombus", "Circle"], correctAnswer: 3, explanation: "Circle has no straight lines or vertices.", subject: Subject.LogicalReasoning },
  { id: 'lr_b1_35', question: "Identify the odd one:", options: ["Curd", "Butter", "Oil", "Cheese"], correctAnswer: 2, explanation: "Oil is plant-based/fat, others are dairy products.", subject: Subject.LogicalReasoning },

  // Arithmetic Reasoning
  { id: 'lr_b1_36', question: "A father is 3 times as old as his son. After 15 years, he will be twice as old. Father's current age?", options: ["30", "45", "60", "50"], correctAnswer: 1, explanation: "3x + 15 = 2(x + 15) => 3x + 15 = 2x + 30 => x = 15. Father = 3x = 45.", subject: Subject.LogicalReasoning },
  { id: 'lr_b1_37', question: "In a group of cows and hens, legs are 14 more than twice the heads. How many cows?", options: ["5", "7", "10", "12"], correctAnswer: 1, explanation: "L = 2H + 14. We know L = 4C + 2H. So 4C + 2H = 2H + 14 => 4C = 14? No, Legs are 14 more than 2H. 2C = 14 => C=7.", subject: Subject.LogicalReasoning },

  // Venn Diagrams
  { id: 'lr_b1_38', question: "Which relationship fits: Women, Mothers, Doctors?", options: ["Disjoint", "Concentric", "Intersecting Circle inside Large Circle", "All intersecting"], correctAnswer: 2, explanation: "All mothers are women (Circle inside Circle). Doctors can be women/mothers (Intersecting both).", subject: Subject.LogicalReasoning },
  { id: 'lr_b1_39', question: "Relationship: Odisha, India, Asia.", options: ["Separate", "Overlapping", "Concentric Circles", "Linear"], correctAnswer: 2, explanation: "Odisha inside India inside Asia.", subject: Subject.LogicalReasoning },

  // --- 1. GENERAL STUDIES (Legacy + New Batches) ---
  { id: 'gs_1', question: "When was the state of Odisha formed?", options: ["1st April 1936", "1st April 1947", "15th August 1947", "26th January 1950"], correctAnswer: 0, explanation: "Odisha was formed as a separate province on 1st April 1936 (Utkal Divas).", subject: Subject.GeneralStudies },
  { id: 'gs_2', question: "What was the ancient name of Odisha?", options: ["Kalinga", "Magadha", "Vatsa", "Avanti"], correctAnswer: 0, explanation: "Kalinga is the ancient name of Odisha.", subject: Subject.GeneralStudies },
  { id: 'gs_new_1', question: "Which region of Odisha is known for its Sabai grass weaving craft?", options: ["Mayurbhanj", "Koraput", "Ganjam", "Puri"], correctAnswer: 0, explanation: "Mayurbhanj is famous for Sabai grass crafts.", subject: Subject.GeneralStudies },
  { id: 'gs_new_2', question: "Who wrote the famous book 'Annihilation of Caste'?", options: ["M.K. Gandhi", "B.R. Ambedkar", "J.L. Nehru", "S.C. Bose"], correctAnswer: 1, explanation: "Dr. B.R. Ambedkar wrote 'Annihilation of Caste'.", subject: Subject.GeneralStudies },
  { id: 'gs_new_3', question: "When was the Odisha Public Service Commission (OPSC) constituted?", options: ["1947", "1948", "1949", "1950"], correctAnswer: 2, explanation: "OPSC was constituted on 1st April 1949.", subject: Subject.GeneralStudies },
  { id: 'gs_new_4', question: "Which Article of the Indian Constitution states there shall be a Governor for each state?", options: ["Article 152", "Article 153", "Article 154", "Article 155"], correctAnswer: 1, explanation: "Article 153 mandates a Governor for each state.", subject: Subject.GeneralStudies },
  { id: 'gs_new_5', question: "Which river is known as the 'Lifeline of Odisha'?", options: ["Brahmani", "Mahanadi", "Baitarani", "Subarnarekha"], correctAnswer: 1, explanation: "Mahanadi is the lifeline of Odisha.", subject: Subject.GeneralStudies },
  { id: 'gs_new_6', question: "In which year did the Paika Rebellion take place?", options: ["1803", "1817", "1857", "1905"], correctAnswer: 1, explanation: "The Paika Rebellion (Paika Bidroha) occurred in 1817.", subject: Subject.GeneralStudies },
  { id: 'gs_new_7', question: "Who is the author of 'India After Gandhi'?", options: ["Ramachandra Guha", "Amartya Sen", "Shashi Tharoor", "Arundhati Roy"], correctAnswer: 0, explanation: "Ramachandra Guha wrote 'India After Gandhi'.", subject: Subject.GeneralStudies },
  { id: 'gs_new_8', question: "Which movement in Odisha is known as the 'Jallianwala Bagh of Odisha'?", options: ["Prajamandal", "Eram Massacre", "Salt Satyagraha", "Paika Rebellion"], correctAnswer: 1, explanation: "The Eram Massacre is called the Jallianwala Bagh of Odisha.", subject: Subject.GeneralStudies },
  { id: 'gs_new_9', question: "Who was the first woman Chief Minister of Odisha?", options: ["Nandini Satpathy", "Rama Devi", "Malati Choudhury", "Sarojini Naidu"], correctAnswer: 0, explanation: "Nandini Satpathy was the first female CM.", subject: Subject.GeneralStudies },
  { id: 'gs_new_10', question: "The Konark Sun Temple was included in the UNESCO World Heritage Site list in which year?", options: ["1980", "1984", "1990", "1995"], correctAnswer: 1, explanation: "It was inscribed in 1984.", subject: Subject.GeneralStudies },
  { id: 'gs_new_11', question: "Which district of Odisha is known as the 'Granary of Odisha'?", options: ["Balasore", "Bargarh", "Ganjam", "Cuttack"], correctAnswer: 1, explanation: "Bargarh is known as the Granary of Odisha due to rice production.", subject: Subject.GeneralStudies },
  { id: 'gs_new_12', question: "In which year was the first Odia film 'Sita Bibaha' released?", options: ["1930", "1936", "1940", "1945"], correctAnswer: 1, explanation: "Sita Bibaha was released in 1936.", subject: Subject.GeneralStudies },
  { id: 'gs_new_13', question: "Who is known as the 'Mother Teresa of Odisha'?", options: ["Rama Devi", "Malati Choudhury", "Kuntala Kumari Sabat", "Sarala Devi"], correctAnswer: 0, explanation: "Rama Devi is revered as the Mother Teresa of Odisha.", subject: Subject.GeneralStudies },
  { id: 'gs_new_14', question: "Which temple in Odisha is known as the 'White Pagoda'?", options: ["Sun Temple", "Jagannath Temple", "Lingaraj Temple", "Rajarani Temple"], correctAnswer: 1, explanation: "Jagannath Temple, Puri is called the White Pagoda.", subject: Subject.GeneralStudies },
  { id: 'gs_new_15', question: "Which Vitamin deficiency causes Rickets?", options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"], correctAnswer: 3, explanation: "Vitamin D deficiency causes Rickets.", subject: Subject.GeneralStudies },
  { id: 'gs_new_16', question: "Who was the last independent king of Odisha?", options: ["Prataparudra Deva", "Mukunda Deva", "Kapilendra Deva", "Purushottama Deva"], correctAnswer: 1, explanation: "Mukunda Deva was the last independent king.", subject: Subject.GeneralStudies },
  { id: 'gs_new_17', question: "Which district of Odisha has the highest literacy rate?", options: ["Cuttack", "Khordha", "Puri", "Jajpur"], correctAnswer: 1, explanation: "Khordha has the highest literacy rate.", subject: Subject.GeneralStudies },
  { id: 'gs_new_18', question: "Who was the editor of the first Odia newspaper 'Utkala Deepika'?", options: ["Fakir Mohan Senapati", "Gouri Shankar Ray", "Madhusudan Das", "Radhanath Ray"], correctAnswer: 1, explanation: "Gouri Shankar Ray edited Utkala Deepika.", subject: Subject.GeneralStudies },
  { id: 'gs_new_19', question: "Which river flows through the city of Sambalpur?", options: ["Mahanadi", "Brahmani", "Ib", "Tel"], correctAnswer: 0, explanation: "Sambalpur is on the banks of Mahanadi.", subject: Subject.GeneralStudies },
  { id: 'gs_new_20', question: "Who is known as 'Utkala Gouraba'?", options: ["Gopabandhu Das", "Madhusudan Das", "Harekrushna Mahatab", "Biju Patnaik"], correctAnswer: 1, explanation: "Madhusudan Das is Utkala Gouraba.", subject: Subject.GeneralStudies },
  { id: 'gs_new_21', question: "Which is the largest thermal power plant in Odisha?", options: ["NTPC Talcher", "OPGC Ib Valley", "TTPS", "Derang"], correctAnswer: 0, explanation: "NTPC Talcher is the largest.", subject: Subject.GeneralStudies },
  { id: 'gs_new_22', question: "Who was the first Governor of Odisha (post-independence)?", options: ["Kailas Nath Katju", "Asaf Ali", "Fazal Ali", "Bhim Sen Sachar"], correctAnswer: 0, explanation: "Kailas Nath Katju was the first Governor after independence.", subject: Subject.GeneralStudies },
  { id: 'gs_new_23', question: "Which chemical is used to purify drinking water?", options: ["Fluorine", "Chlorine", "Bromine", "Iodine"], correctAnswer: 1, explanation: "Chlorine is commonly used for water purification.", subject: Subject.GeneralStudies },
  { id: 'gs_new_24', question: "Which city is known as the 'Temple City' of India?", options: ["Puri", "Konark", "Bhubaneswar", "Cuttack"], correctAnswer: 2, explanation: "Bhubaneswar is the Temple City.", subject: Subject.GeneralStudies },
  { id: 'gs_new_25', question: "Who wrote the famous Odia novel 'Chha Mana Atha Guntha'?", options: ["Radhanath Ray", "Fakir Mohan Senapati", "Gopinath Mohanty", "Kanhu Charan"], correctAnswer: 1, explanation: "Fakir Mohan Senapati wrote it.", subject: Subject.GeneralStudies },

  // --- 2. ENGLISH (Legacy + New Batches) ---
  { id: 'eng_new_1', question: "Synonym of 'Lavish':", options: ["Scant", "Excessive", "Simple", "Tiny"], correctAnswer: 1, explanation: "Lavish means sumptuously rich or excessive.", subject: Subject.English },
  { id: 'eng_new_2', question: "The work was hampered ___ a lack of funds.", options: ["with", "by", "from", "at"], correctAnswer: 1, explanation: "Hampered by.", subject: Subject.English },
  { id: 'eng_new_3', question: "Correct spelling:", options: ["Edzema", "Ekzema", "Eczema", "Ekezema"], correctAnswer: 2, explanation: "Eczema is the correct spelling.", subject: Subject.English },
  { id: 'eng_new_4', question: "Antonym of 'Fragile':", options: ["Weak", "Brittle", "Robust", "Soft"], correctAnswer: 2, explanation: "Robust means strong/sturdy.", subject: Subject.English },
  { id: 'eng_new_5', question: "Idiom 'A bolt from the blue' means:", options: ["A thunderstorm", "A sudden unexpected event", "A happy news", "A blue light"], correctAnswer: 1, explanation: "Something unexpected.", subject: Subject.English },
  { id: 'eng_new_6', question: "Synonym of 'Bewildered':", options: ["Calm", "Baffled", "Clear", "Happy"], correctAnswer: 1, explanation: "Bewildered means confused or baffled.", subject: Subject.English },
  { id: 'eng_new_7', question: "Riyadh is the capital ___ Saudi Arabia.", options: ["of", "in", "at", "on"], correctAnswer: 0, explanation: "Capital of.", subject: Subject.English },
  { id: 'eng_new_8', question: "Antonym of 'Ambiguous':", options: ["Vague", "Clear", "Doubtful", "Obscure"], correctAnswer: 1, explanation: "Clear is the opposite of Ambiguous.", subject: Subject.English },
  { id: 'eng_new_9', question: "She is junior ___ me by two years.", options: ["than", "from", "to", "with"], correctAnswer: 2, explanation: "Junior to.", subject: Subject.English },
  { id: 'eng_new_10', question: "One word for 'A person who hates mankind':", options: ["Philanthropist", "Misanthrope", "Sadist", "Optimist"], correctAnswer: 1, explanation: "Misanthrope.", subject: Subject.English },
  { id: 'eng_new_11', question: "Idiom 'To turn over a new leaf':", options: ["To read a book", "To change behavior for better", "To plant a tree", "To fall sick"], correctAnswer: 1, explanation: "To improve one's conduct.", subject: Subject.English },
  { id: 'eng_new_12', question: "He is ___ MLA of our locality.", options: ["a", "an", "the", "no article"], correctAnswer: 1, explanation: "'M' starts with vowel sound 'em'.", subject: Subject.English },
  { id: 'eng_new_13', question: "The jury ___ divided in their opinion.", options: ["was", "were", "is", "has"], correctAnswer: 1, explanation: "Were (individuals in the jury acted differently).", subject: Subject.English },
  { id: 'eng_new_14', question: "Synonym of 'Abundant':", options: ["Scarce", "Plentiful", "Rare", "Few"], correctAnswer: 1, explanation: "Abundant means existing in large quantities.", subject: Subject.English },
  { id: 'eng_new_15', question: "Idiom 'Cry over spilt milk':", options: ["To clean milk", "To regret past loss", "To feed a cat", "To be happy"], correctAnswer: 1, explanation: "Complaining about past loss.", subject: Subject.English },
  { id: 'eng_new_16', question: "Correct spelling:", options: ["Tommorow", "Tomorrow", "Tommorrow", "Twomorrow"], correctAnswer: 1, explanation: "Tomorrow.", subject: Subject.English },
  { id: 'eng_new_17', question: "Antonym of 'Cruel':", options: ["Kind", "Hard", "Rough", "Brutal"], correctAnswer: 0, explanation: "Kind is the opposite of Cruel.", subject: Subject.English },
  { id: 'eng_new_18', question: "Plural of 'Knife':", options: ["Knifes", "Knives", "Knive", "Knife"], correctAnswer: 1, explanation: "Knives.", subject: Subject.English },
  { id: 'eng_new_19', question: "One word for 'A place where bees are kept':", options: ["Aviary", "Apiary", "Zoo", "Aquarium"], correctAnswer: 1, explanation: "Apiary.", subject: Subject.English },
  { id: 'eng_new_20', question: "He has been living here ___ 2010.", options: ["for", "from", "since", "till"], correctAnswer: 2, explanation: "Since 2010.", subject: Subject.English },

  // --- 3. MATHEMATICS (Legacy + New Batches) ---
  { id: 'math_new_1', question: "The average of nine numbers is 55. If each number is multiplied by 3, what is the new average?", options: ["155", "165", "58", "52"], correctAnswer: 1, explanation: "New Average = Old Average × 3 = 55 × 3 = 165.", subject: Subject.Mathematics },
  { id: 'math_new_2', question: "A car travels at 60 km/h and returns at 80 km/h. If total time is 7 hours, find distance.", options: ["200 km", "220 km", "240 km", "280 km"], correctAnswer: 2, explanation: "Let dist = D. D/60 + D/80 = 7. 4D+3D = 1680. 7D=1680, D=240.", subject: Subject.Mathematics },
  { id: 'math_new_3', question: "CP = ₹30, SP = ₹45. Profit %?", options: ["25%", "33.33%", "50%", "60%"], correctAnswer: 2, explanation: "Profit = 15. (15/30)*100 = 50%.", subject: Subject.Mathematics },
  { id: 'math_new_4', question: "Find HCF of 12, 15, 20.", options: ["3", "4", "5", "1"], correctAnswer: 3, explanation: "Factors: 12(2,2,3), 15(3,5), 20(2,2,5). Common is only 1.", subject: Subject.Mathematics },
  { id: 'math_new_5', question: "Square root of 17161?", options: ["121", "131", "141", "151"], correctAnswer: 1, explanation: "131 × 131 = 17161.", subject: Subject.Mathematics },
  { id: 'math_new_6', question: "1 litre is equal to how many cubic centimeters?", options: ["100", "1000", "10", "10000"], correctAnswer: 1, explanation: "1 Litre = 1000 cc.", subject: Subject.Mathematics },
  { id: 'math_new_7', question: "If a:b = 5:7 and c:d = 2a:3b, find ac:bd.", options: ["10:21", "50:147", "25:49", "5:7"], correctAnswer: 1, explanation: "c:d = 10:21. ac:bd = 5*10 : 7*21 = 50:147.", subject: Subject.Mathematics },
  { id: 'math_new_8', question: "If 15% of a number is 45, what is the number?", options: ["200", "250", "300", "350"], correctAnswer: 2, explanation: "0.15x = 45 -> x = 300.", subject: Subject.Mathematics },
  { id: 'math_new_9', question: "LCM of 12, 15, 20?", options: ["40", "50", "60", "80"], correctAnswer: 2, explanation: "LCM is 60.", subject: Subject.Mathematics },
  { id: 'math_new_10', question: "A cube has side 4cm. Volume?", options: ["16", "32", "64", "128"], correctAnswer: 2, explanation: "4^3 = 64.", subject: Subject.Mathematics },
  { id: 'math_new_11', question: "Convert 0.75 to fraction.", options: ["2/3", "3/4", "4/5", "5/6"], correctAnswer: 1, explanation: "75/100 = 3/4.", subject: Subject.Mathematics },
  { id: 'math_new_12', question: "What is 20% of 20% of 100?", options: ["2", "4", "5", "10"], correctAnswer: 1, explanation: "0.2 * 0.2 * 100 = 4.", subject: Subject.Mathematics },
  { id: 'math_new_13', question: "5 men do a job in 10 days. 10 men take?", options: ["20 days", "5 days", "15 days", "2 days"], correctAnswer: 1, explanation: "Inverse proportion: 5*10 = 50 mandays. 50/10 = 5 days.", subject: Subject.Mathematics },
  { id: 'math_new_14', question: "Solve: 12 + 4 / 2 - 1.", options: ["7", "13", "14", "15"], correctAnswer: 1, explanation: "BODMAS: 12 + 2 - 1 = 13.", subject: Subject.Mathematics },
  { id: 'math_new_15', question: "Average of 10, 20, 30, 40, 50?", options: ["25", "30", "35", "40"], correctAnswer: 1, explanation: "150/5 = 30.", subject: Subject.Mathematics },
  { id: 'math_new_16', question: "Value of 10^3?", options: ["100", "1000", "10000", "10"], correctAnswer: 1, explanation: "1000.", subject: Subject.Mathematics },
  { id: 'math_new_17', question: "Sum of angles in a triangle?", options: ["90", "180", "270", "360"], correctAnswer: 1, explanation: "180 degrees.", subject: Subject.Mathematics },
  { id: 'math_new_18', question: "Radius 14cm, Diameter?", options: ["7", "14", "28", "42"], correctAnswer: 2, explanation: "D = 2r = 28.", subject: Subject.Mathematics },
  { id: 'math_new_19', question: "HCF of 15 and 25?", options: ["3", "5", "15", "25"], correctAnswer: 1, explanation: "5.", subject: Subject.Mathematics },
  { id: 'math_new_20', question: "Value of 2^3 * 3^2?", options: ["54", "72", "36", "48"], correctAnswer: 1, explanation: "8 * 9 = 72.", subject: Subject.Mathematics },

  // --- 4. COMPUTER KNOWLEDGE (Legacy + New Batches) ---
  { id: 'comp_new_1', question: "Shortcut for 'Center Alignment' in MS Word?", options: ["Ctrl+C", "Ctrl+E", "Ctrl+R", "Ctrl+L"], correctAnswer: 1, explanation: "Ctrl+E aligns text to center.", subject: Subject.Computer },
  { id: 'comp_new_2', question: "Which function in Excel counts only non-empty cells?", options: ["COUNT", "COUNTA", "COUNTIF", "SUM"], correctAnswer: 1, explanation: "COUNTA counts non-empty cells.", subject: Subject.Computer },
  { id: 'comp_new_3', question: "HTTPS stands for?", options: ["HTTP Standard", "HTTP Secure", "HTTP Simple", "HTTP System"], correctAnswer: 1, explanation: "Hyper Text Transfer Protocol Secure.", subject: Subject.Computer },
  { id: 'comp_new_4', question: "Device to connect computer to internet via phone line?", options: ["Switch", "Hub", "Modem", "Router"], correctAnswer: 2, explanation: "Modem (Modulator-Demodulator).", subject: Subject.Computer },
  { id: 'comp_new_5', question: "Shortcut to start slideshow from beginning?", options: ["F5", "Shift+F5", "Alt+F5", "Ctrl+F5"], correctAnswer: 0, explanation: "F5.", subject: Subject.Computer },
  { id: 'comp_new_6', question: "OSI layer responsible for routing?", options: ["Physical", "Data Link", "Network", "Transport"], correctAnswer: 2, explanation: "Network Layer handles routing.", subject: Subject.Computer },
  { id: 'comp_new_7', question: "Permanent memory of a computer?", options: ["RAM", "ROM", "Cache", "HDD"], correctAnswer: 1, explanation: "ROM is permanent.", subject: Subject.Computer },
  { id: 'comp_new_8', question: "Key to refresh active window?", options: ["F2", "F4", "F5", "F12"], correctAnswer: 2, explanation: "F5.", subject: Subject.Computer },
  { id: 'comp_new_9', question: "1 Terabyte is equal to?", options: ["1000 GB", "1024 GB", "1024 MB", "1000 MB"], correctAnswer: 1, explanation: "1024 GB.", subject: Subject.Computer },
  { id: 'comp_new_10', question: "Father of Computer?", options: ["Alan Turing", "Charles Babbage", "Bill Gates", "Steve Jobs"], correctAnswer: 1, explanation: "Charles Babbage.", subject: Subject.Computer },
  { id: 'comp_new_11', question: "Shortcut for 'Undo'?", options: ["Ctrl+U", "Ctrl+Y", "Ctrl+Z", "Ctrl+X"], correctAnswer: 2, explanation: "Ctrl+Z.", subject: Subject.Computer },
  { id: 'comp_new_12', question: "Key to delete file permanently?", options: ["Delete", "Shift+Delete", "Alt+Delete", "Ctrl+Delete"], correctAnswer: 1, explanation: "Shift+Delete bypasses Recycle Bin.", subject: Subject.Computer },
  { id: 'comp_new_13', question: "Python is a?", options: ["OS", "Hardware", "Programming Language", "Protocol"], correctAnswer: 2, explanation: "Programming Language.", subject: Subject.Computer },
  { id: 'comp_new_14', question: "Shortcut for 'Select All'?", options: ["Ctrl+S", "Ctrl+A", "Alt+A", "Shift+A"], correctAnswer: 1, explanation: "Ctrl+A.", subject: Subject.Computer },
  { id: 'comp_new_15', question: "Heart of the computer?", options: ["RAM", "Hard Disk", "Microprocessor (CPU)", "Monitor"], correctAnswer: 2, explanation: "CPU (Microprocessor).", subject: Subject.Computer },
  { id: 'comp_new_16', question: "Shortcut for 'Print'?", options: ["Ctrl+P", "Alt+P", "Shift+P", "Win+P"], correctAnswer: 0, explanation: "Ctrl+P.", subject: Subject.Computer },
  { id: 'comp_new_17', question: "Storage capacity of standard CD?", options: ["4.7 GB", "700 MB", "1.44 MB", "25 GB"], correctAnswer: 1, explanation: "700 MB.", subject: Subject.Computer },
  { id: 'comp_new_18', question: "Shortcut to close current window?", options: ["Ctrl+F4", "Alt+F4", "Shift+F4", "Win+X"], correctAnswer: 1, explanation: "Alt+F4.", subject: Subject.Computer },
  { id: 'comp_new_19', question: "Most popular search engine?", options: ["Bing", "Yahoo", "Google", "DuckDuckGo"], correctAnswer: 2, explanation: "Google.", subject: Subject.Computer },
  { id: 'comp_new_20', question: "Binary base?", options: ["8", "10", "16", "2"], correctAnswer: 3, explanation: "Base 2 (0 and 1).", subject: Subject.Computer },

  // --- 5. LOGICAL REASONING (Legacy + New Batches) ---
  { id: 'lr_new_1', question: "If GEAR is 5914 and ROUTE is 47289, GATE is?", options: ["5149", "5194", "5419", "5941"], correctAnswer: 0, explanation: "Direct coding from letters.", subject: Subject.LogicalReasoning },
  { id: 'lr_new_2', question: "30m East, 40m North. Distance from start?", options: ["50m", "70m", "10m", "35m"], correctAnswer: 0, explanation: "Pythagoras: sqrt(30^2+40^2) = 50.", subject: Subject.LogicalReasoning },
  { id: 'lr_new_3', question: "Series: 237, 196, 155, 114, ?", options: ["73", "83", "93", "63"], correctAnswer: 0, explanation: "Subtract 41 each time.", subject: Subject.LogicalReasoning },
  { id: 'lr_new_4', question: "Red is Blue, Blue is Yellow. Color of sky?", options: ["Red", "Blue", "Yellow", "White"], correctAnswer: 2, explanation: "Sky is Blue, Blue is called Yellow.", subject: Subject.LogicalReasoning },
  { id: 'lr_new_5', question: "1. Treatment, 2. Recovery, 3. Illness, 4. Doctor. Order?", options: ["3,4,1,2", "1,2,3,4", "3,1,4,2", "4,3,1,2"], correctAnswer: 0, explanation: "Illness -> Doctor -> Treatment -> Recovery.", subject: Subject.LogicalReasoning },
  { id: 'lr_new_6', question: "Face West, turn 90 anti-clockwise, 135 clockwise. Direction?", options: ["NW", "NE", "SW", "SE"], correctAnswer: 0, explanation: "Net 45 Clockwise from West -> North-West.", subject: Subject.LogicalReasoning },
  { id: 'lr_new_7', question: "Series: 2, 4, 8, 16, ?", options: ["24", "32", "64", "20"], correctAnswer: 1, explanation: "Powers of 2.", subject: Subject.LogicalReasoning },
  { id: 'lr_new_8', question: "Odd one out: Dog, Cat, Lion, Chair.", options: ["Dog", "Cat", "Lion", "Chair"], correctAnswer: 3, explanation: "Chair is inanimate.", subject: Subject.LogicalReasoning },
  { id: 'lr_new_9', question: "If South-East becomes North, West becomes?", options: ["NE", "NW", "SE", "SW"], correctAnswer: 2, explanation: "135 degree shift. West -> SE.", subject: Subject.LogicalReasoning },
  { id: 'lr_new_10', question: "A=1, B=2, C+A+T = ?", options: ["20", "23", "24", "25"], correctAnswer: 2, explanation: "3+1+20 = 24.", subject: Subject.LogicalReasoning },
  { id: 'lr_new_11', question: "Odd one out: Carrot, Potato, Ginger, Tomato.", options: ["Carrot", "Potato", "Ginger", "Tomato"], correctAnswer: 3, explanation: "Tomato grows above ground (fruit), others underground.", subject: Subject.LogicalReasoning },
  { id: 'lr_new_12', question: "Series: 1, 9, 25, 49, ?", options: ["64", "81", "100", "121"], correctAnswer: 1, explanation: "Squares of odd numbers: 1, 3, 5, 7, 9 (81).", subject: Subject.LogicalReasoning },
  { id: 'lr_new_13', question: "FISH is EHRG. JUNGLE is?", options: ["ITMFKD", "KVOHMF", "ITNFKD", "KVMHMF"], correctAnswer: 0, explanation: "-1 letter shift.", subject: Subject.LogicalReasoning },
  { id: 'lr_new_14', question: "Clock:Time :: Thermometer:?", options: ["Heat", "Radiation", "Energy", "Temperature"], correctAnswer: 3, explanation: "Measures temperature.", subject: Subject.LogicalReasoning },
  { id: 'lr_new_15', question: "5th March Monday. 12th March?", options: ["Sunday", "Monday", "Tuesday", "Wednesday"], correctAnswer: 1, explanation: "Exact 7 days later -> Same day.", subject: Subject.LogicalReasoning },
  { id: 'lr_new_16', question: "A brother of B. C father of A. C to B?", options: ["Brother", "Father", "Uncle", "Son"], correctAnswer: 1, explanation: "Father.", subject: Subject.LogicalReasoning },
  { id: 'lr_new_17', question: "Odd one out: Ear, Eye, Nose, Finger.", options: ["Ear", "Eye", "Nose", "Finger"], correctAnswer: 3, explanation: "Finger is not a facial sense organ.", subject: Subject.LogicalReasoning },
  { id: 'lr_new_18', question: "Pen:Paper :: Chalk:?", options: ["Board", "Teacher", "Class", "Dust"], correctAnswer: 0, explanation: "Writes on Board.", subject: Subject.LogicalReasoning },
  { id: 'lr_new_19', question: "Series: 2, 6, 12, 20, ?", options: ["28", "30", "32", "36"], correctAnswer: 1, explanation: "+4, +6, +8, +10 (30).", subject: Subject.LogicalReasoning },
  { id: 'lr_new_20', question: "North, South, East, ?", options: ["Up", "Down", "West", "Left"], correctAnswer: 2, explanation: "West.", subject: Subject.LogicalReasoning },

  // --- 6. ODIA LANGUAGE (Legacy + New Batches) ---
  { id: 'odia_new_1', question: "'ଅତିଥି' ର ବିପରୀତ ଶବ୍ଦ କଣ?", options: ["ଆତିଥେୟ", "ଅନାତିଥି", "ଶତ୍ରୁ", "ମିତ୍ର"], correctAnswer: 0, explanation: "ଆତିଥେୟ।", subject: Subject.Odia },
  { id: 'odia_new_2', question: "'ଆକାଶ କୁସୁମ' ରୂଢ଼ିର ଅର୍ଥ କଣ?", options: ["ସତ୍ୟ ଘଟଣା", "ବୃଥା ସ୍ୱପ୍ନ", "ସୁନ୍ଦର ଫୁଲ", "ଆକାଶର ତାରା"], correctAnswer: 1, explanation: "ଅସମ୍ଭବ କଳ୍ପନା ବା ବୃଥା ସ୍ୱପ୍ନ।", subject: Subject.Odia },
  { id: 'odia_new_3', question: "'ପବନ' ର ଏକ ପ୍ରତିଶବ୍ଦ ଲେଖ।", options: ["ସମୀର", "ସାଗର", "ଧରଣୀ", "ଗଗନ"], correctAnswer: 0, explanation: "ସମୀର।", subject: Subject.Odia },
  { id: 'odia_new_4', question: "ଶୁଦ୍ଧ ଶବ୍ଦଟି ବାଛ:", options: ["ଅନୁସୂୟା", "ଅନସୂୟା", "ଅନୁଷୂୟା", "ଅନାସୂୟା"], correctAnswer: 1, explanation: "ଅନସୂୟା।", subject: Subject.Odia },
  { id: 'odia_new_5', question: "'କାଳ' କେତେ ପ୍ରକାରର?", options: ["୨", "୩", "୪", "୫"], correctAnswer: 1, explanation: "୩ (ଅତୀତ, ବର୍ତ୍ତମାନ, ଭବିଷ୍ୟତ)।", subject: Subject.Odia },
  { id: 'odia_new_6', question: "'ଉନ୍ନତି' ର ବିପରୀତ ଶବ୍ଦ?", options: ["ଅବନତି", "ପ୍ରଗତି", "ଦୁର୍ଗତି", "ସମ୍ମତି"], correctAnswer: 0, explanation: "ଅବନତି।", subject: Subject.Odia },
  { id: 'odia_new_7', question: "'କପାଳ ଲିଖନ' ର ଅର୍ଥ?", options: ["ମୁଣ୍ଡ ବ୍ୟଥା", "ଭାଗ୍ୟର ଫଳ", "ଲଟେରୀ", "ପରୀକ୍ଷା"], correctAnswer: 1, explanation: "ଭାଗ୍ୟ ଫଳ।", subject: Subject.Odia },
  { id: 'odia_new_8', question: "'ଘର' ର ବହୁବଚନ?", options: ["ଘରମାନେ", "ଘରଗୁଡିକ", "ଘରସବୁ", "ଘରପଲ"], correctAnswer: 1, explanation: "ଘରଗୁଡିକ।", subject: Subject.Odia },
  { id: 'odia_new_9', question: "'ହର୍ଷ' ର ବିପରୀତ?", options: ["ଖୁସି", "ବିଷାଦ", "ରାଗ", "ଦୁଃଖ"], correctAnswer: 1, explanation: "ବିଷାଦ।", subject: Subject.Odia },
  { id: 'odia_new_10', question: "'ଅନ୍ଧର ଲଉଡି' ର ଅର୍ଥ?", options: ["ବାଡ଼ି", "ଅସହାୟର ସାହାଯ୍ୟ", "ଅନ୍ଧ ଲୋକ", "ରାସ୍ତା"], correctAnswer: 1, explanation: "ଅସହାୟର ଏକମାତ୍ର ସାହା ଭରସା।", subject: Subject.Odia },
  { id: 'odia_new_11', question: "'ସାଧାରଣ' ର ବିପରୀତ?", options: ["ଅସାଧାରଣ", "ସରଳ", "ଜଟିଳ", "ମୂର୍ଖ"], correctAnswer: 0, explanation: "ଅସାଧାରଣ।", subject: Subject.Odia },
  { id: 'odia_new_12', question: "'ନାକ କାଟିବା' ର ଅର୍ଥ?", options: ["ଅପରେସନ କରିବା", "ସମ୍ମାନ ହାନି କରିବା", "ଝଗଡା କରିବା", "ଥଟ୍ଟା କରିବା"], correctAnswer: 1, explanation: "ସମ୍ମାନ ହାନି କରିବା।", subject: Subject.Odia },
  { id: 'odia_new_13', question: "'ଦୟା' ଥିବା ଲୋକ?", options: ["ଦୟାଳୁ", "ଦୟନୀୟ", "ଦୁଃଖୀ", "ଭିକାରୀ"], correctAnswer: 0, explanation: "ଦୟାଳୁ।", subject: Subject.Odia },
  { id: 'odia_new_14', question: "ଓଡ଼ିଆ ଭାଷାରେ କେତୋଟି ବର୍ଣ୍ଣ?", options: ["୪୮", "୪୯", "୫୦", "୫୨"], correctAnswer: 2, explanation: "୫୦ (ପାରମ୍ପରିକ ଗଣନା)।", subject: Subject.Odia },
  { id: 'odia_new_15', question: "'ଇନ୍ଦ୍ର' ଙ୍କ ବାହନ?", options: ["ନନ୍ଦୀ", "ଗରୁଡ", "ଐରାବତ", "ମୟୂର"], correctAnswer: 2, explanation: "ଐରାବତ (ହାତୀ)।", subject: Subject.Odia },
  { id: 'odia_new_16', question: "'ସତ୍ୟ' ର ବିପରୀତ?", options: ["ଅସତ୍ୟ", "ମିଥ୍ୟା", "ପାପ", "ଧର୍ମ"], correctAnswer: 1, explanation: "ମିଥ୍ୟା।", subject: Subject.Odia },
  { id: 'odia_new_17', question: "'ଅକାଳ କୁଷ୍ମାଣ୍ଡ' ର ଅର୍ଥ?", options: ["ଭଲ ଫଳ", "ଅକର୍ମଣ୍ୟ ଲୋକ", "ବଡ ମଣିଷ", "ରୋଗୀ"], correctAnswer: 1, explanation: "ଅକର୍ମଣ୍ୟ ବା ଅଯୋଗ୍ୟ ବ୍ୟକ୍ତି।", subject: Subject.Odia },
  { id: 'odia_new_18', question: "'ଉପକାରୀ' ର ବିପରୀତ?", options: ["ଅପକାରୀ", "ଦାନୀ", "ଭୋଗୀ", "ରୋଗୀ"], correctAnswer: 0, explanation: "ଅପକାରୀ।", subject: Subject.Odia },
  { id: 'odia_new_19', question: "'ଭ୍ରମର' ର ପ୍ରତିଶବ୍ଦ?", options: ["ମାଛି", "ଅଳି", "ପିମ୍ପୁଡି", "ପ୍ରଜାପତି"], correctAnswer: 1, explanation: "ଅଳି, ମଧୁକର।", subject: Subject.Odia },
  { id: 'odia_new_20', question: "'ହାତ କରିବା' ର ଅର୍ଥ?", options: ["ହାତ ମିଳାଇବା", "ବିବାହ କରିବା", "ଆୟତ୍ତ କରିବା", "ମାରିବା"], correctAnswer: 2, explanation: "ନିଜ ଆୟତ୍ତକୁ ଆଣିବା।", subject: Subject.Odia }
];

export const SYLLABUS_MODULES: SubjectModule[] = [
  {
    id: Subject.GeneralStudies,
    icon: "fa-solid fa-landmark",
    color: "bg-blue-600",
    topics: [
      { id: "gs_1", title: "History of Odisha", content: "<h3>History of Odisha</h3><p>Odisha, formerly known as Kalinga, has a rich history dating back to ancient times. The Kalinga War (261 BC) transformed Emperor Ashoka. Key dynasties include the Kharavelas, Gangas (who built Konark), and Gajapatis. Modern Odisha was formed on April 1, 1936.</p>", isDownloaded: false },
      { id: "gs_2", title: "Indian Polity", content: "<h3>Indian Polity</h3><p>Focus on the Preamble, Fundamental Rights (Part III), Directive Principles (Part IV), and the President's powers. Articles 153-167 deal with State Executive (Governor & CM).</p>", isDownloaded: false }
    ]
  },
  {
    id: Subject.Mathematics,
    icon: "fa-solid fa-calculator",
    color: "bg-green-600",
    topics: [
      { id: "math_1", title: "Arithmetic", content: "<h3>Arithmetic</h3><p>Key topics: Percentage, Profit & Loss, Simple & Compound Interest, Ratio & Proportion, and Time & Work. Practice shortcuts for calculations.</p>", isDownloaded: false },
      { id: "math_2", title: "Mensuration", content: "<h3>Mensuration</h3><p>Formulas for 2D (Square, Rectangle, Circle, Triangle) and 3D (Cube, Cuboid, Cylinder, Sphere) figures are essential. Remember: Area of Circle = πr².</p>", isDownloaded: false }
    ]
  },
  {
    id: Subject.English,
    icon: "fa-solid fa-book",
    color: "bg-indigo-600",
    topics: [
      { id: "eng_1", title: "Grammar Rules", content: "<h3>English Grammar</h3><p>Focus on Subject-Verb Agreement, Prepositions (in, on, at, by, with), Articles (a, an, the), and Active-Passive Voice conversion.</p>", isDownloaded: false },
      { id: "eng_2", title: "Vocabulary", content: "<h3>Vocabulary</h3><p>Daily practice of Synonyms, Antonyms, and One-word substitutions is crucial. Learn 5 new words daily.</p>", isDownloaded: false }
    ]
  },
  {
    id: Subject.Odia,
    icon: "fa-solid fa-pen-nib",
    color: "bg-red-600",
    topics: [
      { id: "odia_1", title: "Odia Grammar", content: "<h3>Odia Grammar</h3><p>Key topics: Sandhi, Samasa, Karaka, Bibhakti, and Shuddha-Ashuddha. Understand the rules of 'Satwa Bidhi' and 'Natwa Bidhi'.</p>", isDownloaded: false }
    ]
  },
  {
    id: Subject.Computer,
    icon: "fa-solid fa-laptop-code",
    color: "bg-purple-600",
    topics: [
      { id: "comp_1", title: "Computer Basics", content: "<h3>Computer Basics</h3><p>Understand Hardware vs Software, Input/Output devices, and Memory units (Bit, Byte, KB, MB, GB, TB). CPU is the brain.</p>", isDownloaded: false },
      { id: "comp_2", title: "MS Office", content: "<h3>MS Office</h3><p>Shortcuts are vital. Ctrl+C (Copy), Ctrl+V (Paste), Ctrl+Z (Undo). Know basics of Word, Excel (Formulas), and PowerPoint.</p>", isDownloaded: false }
    ]
  },
  {
    id: Subject.LogicalReasoning,
    icon: "fa-solid fa-brain",
    color: "bg-orange-600",
    topics: [
      { id: "lr_1", title: "Verbal Reasoning", content: "<h3>Verbal Reasoning</h3><p>Coding-Decoding, Blood Relations, and Direction Sense Test are high-scoring areas. Draw diagrams for relation questions.</p>", isDownloaded: false }
    ]
  }
];

export const LATEST_UPDATES: NewsUpdate[] = [
  { id: 1, title: "Admit Card Released for RI/ARI", date: "2 hours ago", link: "#", isNew: true },
  { id: 2, title: "Syllabus Update 2026 - PEO", date: "1 day ago", link: "#", isNew: false },
  { id: 3, title: "Exam Schedule Announced - Forest Guard", date: "2 days ago", link: "#", isNew: false }
];