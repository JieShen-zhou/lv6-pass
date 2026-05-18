export interface ReadingQuestion {
  id: number
  question: string
  options: string[]
  answer: number
}

export interface ReadingData {
  id: number
  type: "reading"
  title: string
  passage: string
  questions: ReadingQuestion[]
}

export interface ListeningBlank {
  position: number
  answer: string
}

export interface ListeningData {
  id: number
  type: "listening"
  title: string
  script: string
  blanks: ListeningBlank[]
}

export interface TranslationData {
  id: number
  type: "translation"
  chinese: string
  reference: string
  keywords: string[]
}

export type PracticeItem = ReadingData | ListeningData | TranslationData

export const readingData: ReadingData[] = [
  {
    id: 1,
    type: "reading",
    title: "情绪智力 (Emotional Intelligence)",
    passage: "The concept of emotional intelligence (EI) has gained considerable attention since psychologist Daniel Goleman published his book in 1995. EI refers to the ability to recognize, understand, and manage our own emotions, as well as to recognize, understand, and influence the emotions of others. Unlike traditional measures of intelligence, such as IQ, emotional intelligence focuses on the interpersonal and intrapersonal skills that are crucial for success in both personal and professional settings. Research has shown that individuals with high EI tend to perform better in leadership roles, maintain stronger relationships, and exhibit greater resilience in the face of adversity. Some studies even suggest that EI may be a better predictor of career success than cognitive intelligence alone, particularly in fields that require teamwork and communication.",
    questions: [
      { id: 1, question: "According to the passage, what is emotional intelligence?", options: ["A. The ability to solve complex math problems", "B. The ability to recognize and manage emotions", "C. A type of academic degree", "D. A programming language"], answer: 1 },
      { id: 2, question: "When did EI gain considerable attention?", options: ["A. After 2000", "B. After Goleman's book in 1995", "C. In the 19th century", "D. During World War II"], answer: 1 },
      { id: 3, question: "According to research, what advantage do people with high EI have?", options: ["A. They are better at solving math problems", "B. They perform better in leadership roles", "C. They have higher IQ scores", "D. They earn more money automatically"], answer: 1 },
    ],
  },
  {
    id: 2,
    type: "reading",
    title: "远程办公的兴起 (The Rise of Remote Work)",
    passage: "The COVID-19 pandemic accelerated a trend that had been slowly building for decades: the shift toward remote work. Before 2020, only a small percentage of employees worked from home on a regular basis. By mid-2020, however, millions of workers had transitioned to working remotely almost overnight. This sudden shift revealed both the benefits and the challenges of remote work. On the positive side, many employees reported higher productivity, better work-life balance, and reduced commuting stress. Companies, too, discovered that they could reduce overhead costs by downsizing office space. However, remote work also brought challenges, including feelings of isolation, difficulties in team communication, and the blurring of boundaries between personal and professional life. As the world moves forward, a hybrid model that combines the best aspects of office and remote work appears to be the most likely long-term solution.",
    questions: [
      { id: 1, question: "What accelerated the trend toward remote work according to the passage?", options: ["A. The COVID-19 pandemic", "B. New computer technology", "C. Employee protests", "D. Government regulations"], answer: 0 },
      { id: 2, question: "Which of the following is mentioned as a benefit of remote work?", options: ["A. Higher salaries", "B. More vacation days", "C. Reduced commuting stress", "D. Better office equipment"], answer: 2 },
      { id: 3, question: "What problem did remote work create according to the text?", options: ["A. Increased office rental costs", "B. Feelings of isolation", "C. Too many face-to-face meetings", "D. Longer working hours mandated by law"], answer: 1 },
      { id: 4, question: "What does the passage suggest as the most likely long-term solution?", options: ["A. Returning fully to office work", "B. Permanent remote work for everyone", "C. A hybrid model combining office and remote work", "D. Hiring only local employees"], answer: 2 },
    ],
  },
  {
    id: 3,
    type: "reading",
    title: "古典音乐与认知 (Mozart Effect)",
    passage: "For decades, scientists have explored the relationship between music and cognitive performance. The so-called 'Mozart Effect' — the idea that listening to classical music can temporarily boost IQ — gained widespread attention in the 1990s after a study found that college students performed better on spatial reasoning tasks after listening to Mozart's sonatas. However, subsequent research has painted a more nuanced picture. While the original claims about IQ enhancement have been largely debunked, studies have confirmed that music can improve mood and arousal, which in turn can enhance performance on certain mental tasks. Moreover, learning to play a musical instrument has been shown to produce lasting cognitive benefits, including improved memory, attention, and executive function. These effects appear to be strongest in children whose brains are still developing, suggesting that music education may be more than just an enjoyable pastime — it could be a powerful tool for cognitive development.",
    questions: [
      { id: 1, question: "What is the 'Mozart Effect' according to the passage?", options: ["A. The idea that Mozart was the greatest composer", "B. The idea that classical music can temporarily boost IQ", "C. The belief that only smart people enjoy classical music", "D. A technique for playing the piano faster"], answer: 1 },
      { id: 2, question: "What have subsequent studies shown about the original Mozart Effect claims?", options: ["A. They have been fully confirmed", "B. They have been largely debunked", "C. They apply only to adults", "D. They work better than exercise"], answer: 1 },
      { id: 3, question: "What has learning a musical instrument been shown to improve?", options: ["A. Only mathematical ability", "B. Physical strength and speed", "C. Memory, attention, and executive function", "D. The ability to speak multiple languages"], answer: 2 },
      { id: 4, question: "In whom are the cognitive benefits of music education strongest?", options: ["A. Elderly people", "B. Professional musicians", "C. Children with developing brains", "D. College professors"], answer: 2 },
    ],
  },
  {
    id: 4,
    type: "reading",
    title: "独处与创造力 (Solitude and Creativity)",
    passage: "In an era of constant connectivity, solitude has become something of a luxury. Yet a growing body of research suggests that spending time alone is not merely pleasant — it is essential for creativity and psychological well-being. Studies conducted at the University of California found that individuals who regularly set aside time for solitary activities such as reading, walking alone, or simply sitting in quiet reflection report higher levels of creativity and life satisfaction. This is partly because solitude allows the brain to enter a state known as the 'default mode network,' during which mind-wandering and creative connections between disparate ideas are most likely to occur. However, researchers caution that the quality of solitude matters: passively scrolling through social media while alone does not confer the same benefits as engaging in active, self-directed thought. The key distinction is between chosen solitude — which people freely elect — and imposed isolation, which can lead to loneliness and depression.",
    questions: [
      { id: 1, question: "What does research suggest about solitude?", options: ["A. It is harmful to mental health", "B. It is essential for creativity and well-being", "C. It makes people antisocial", "D. It should be avoided at all costs"], answer: 1 },
      { id: 2, question: "What is the 'default mode network' associated with?", options: ["A. Deep sleep", "B. Intense focus on tasks", "C. Mind-wandering and creative connections", "D. Physical exercise"], answer: 2 },
      { id: 3, question: "According to the passage, what does NOT count as beneficial solitude?", options: ["A. Reading alone", "B. Walking alone in nature", "C. Passively scrolling through social media", "D. Sitting in quiet reflection"], answer: 2 },
      { id: 4, question: "What is the key distinction the passage makes about solitude?", options: ["A. Indoor vs. outdoor solitude", "B. Chosen solitude vs. imposed isolation", "C. Short vs. long periods of solitude", "D. Morning vs. evening solitude"], answer: 1 },
    ],
  },
  {
    id: 5,
    type: "reading",
    title: "遗忘的作物与粮食安全 (Forgotten Crops)",
    passage: "Of the more than 6,000 plant species that have been cultivated for food throughout human history, just nine — including rice, wheat, and maize — now account for roughly two-thirds of global crop production. This dramatic narrowing of agricultural diversity has made the world's food supply increasingly vulnerable to pests, diseases, and the extreme weather events associated with climate change. In response, scientists and farmers are turning their attention to so-called 'forgotten crops' — hardy, nutritious plants that were once staples in various regions but have fallen out of favor with the rise of industrial agriculture. Crops such as millet, sorghum, and amaranth require less water and fertilizer than conventional grains, and many are naturally resistant to drought and heat. Advocates argue that reintroducing these crops could simultaneously improve global food security, increase biodiversity, and provide more varied and nutritious diets for populations worldwide.",
    questions: [
      { id: 1, question: "How many plant species account for roughly two-thirds of global crop production?", options: ["A. Over 6,000", "B. About 100", "C. Just nine", "D. Exactly fifty"], answer: 2 },
      { id: 2, question: "Why has the narrowing of agricultural diversity made food supply vulnerable?", options: ["A. Because fewer people want to be farmers", "B. Because crops are more susceptible to pests and diseases", "C. Because food tastes worse with fewer varieties", "D. Because supermarkets prefer uniform products"], answer: 1 },
      { id: 3, question: "What advantages do 'forgotten crops' like millet and sorghum have?", options: ["A. They require less water and are drought-resistant", "B. They taste better than modern grains", "C. They can only grow in tropical climates", "D. They are cheaper to transport"], answer: 0 },
      { id: 4, question: "What benefits would reintroducing forgotten crops bring?", options: ["A. Only economic benefits for large corporations", "B. Improved food security, biodiversity, and nutrition", "C. Reduced need for any agricultural technology", "D. Complete elimination of climate change"], answer: 1 },
    ],
  },
]

export const listeningData: ListeningData[] = [
  {
    id: 1,
    type: "listening",
    title: "人工智能的发展 (AI Development)",
    script: "In recent years, artificial intelligence has made ___ progress in fields such as healthcare and education. However, many experts warn that the ___ development of AI could lead to ___ consequences if not properly regulated. Governments around the world are now working to establish ___ guidelines for AI research and deployment.",
    blanks: [
      { position: 1, answer: "remarkable" },
      { position: 2, answer: "unchecked" },
      { position: 3, answer: "unforeseen" },
      { position: 4, answer: "comprehensive" },
    ],
  },
  {
    id: 2,
    type: "listening",
    title: "气候变化与经济 (Climate and Economy)",
    script: "The global economy faces an ___ challenge as climate change continues to disrupt supply chains and threaten food security. According to a recent report, the world needs to invest at least $4 trillion annually in ___ energy by 2030 to meet carbon reduction targets. This ___ requires cooperation between governments, businesses, and ordinary citizens. Failure to act would result in ___ economic losses estimated at up to $23 trillion by 2050.",
    blanks: [
      { position: 1, answer: "unprecedented" },
      { position: 2, answer: "renewable" },
      { position: 3, answer: "transition" },
      { position: 4, answer: "catastrophic" },
    ],
  },
  {
    id: 3,
    type: "listening",
    title: "超加工食品的健康争议 (Ultra-Processed Foods)",
    script: "Health experts have raised concerns about the ___ consumption of ultra-processed foods, which now accounts for over 50% of the average diet in many developed countries. Studies have linked these foods to a higher risk of ___ diseases, including diabetes and heart conditions. Researchers emphasize that the issue is not merely about ___ intake but about how industrial processing fundamentally alters the way our bodies metabolize food. They recommend that consumers try to replace processed items with ___ alternatives whenever possible.",
    blanks: [
      { position: 1, answer: "excessive" },
      { position: 2, answer: "chronic" },
      { position: 3, answer: "calorie" },
      { position: 4, answer: "nutritious" },
    ],
  },
]

export const translationData: TranslationData[] = [
  {
    id: 1,
    type: "translation",
    chinese: "随着互联网的快速发展，人们获取信息的方式发生了巨大变化。",
    reference: "With the rapid development of the Internet, the way people obtain information has undergone tremendous changes.",
    keywords: ["rapid development", "obtain information", "undergone tremendous changes"],
  },
  {
    id: 2,
    type: "translation",
    chinese: "文化交流不仅能够增进各国人民之间的理解，还能促进世界和平与发展。",
    reference: "Cultural exchange can not only enhance understanding among people of different countries, but also promote world peace and development.",
    keywords: ["cultural exchange", "enhance understanding", "promote world peace"],
  },
  {
    id: 3,
    type: "translation",
    chinese: "人工智能技术的广泛应用正在深刻改变我们的生活方式和工作模式。",
    reference: "The widespread application of artificial intelligence technology is profoundly changing our lifestyle and work patterns.",
    keywords: ["widespread application", "artificial intelligence", "profoundly changing"],
  },
  {
    id: 4,
    type: "translation",
    chinese: "为了实现可持续发展，各国政府必须采取有效措施减少碳排放。",
    reference: "In order to achieve sustainable development, governments must take effective measures to reduce carbon emissions.",
    keywords: ["sustainable development", "effective measures", "carbon emissions"],
  },
  {
    id: 5,
    type: "translation",
    chinese: "尽管面临许多挑战，数字经济在全球范围内仍保持着强劲增长势头。",
    reference: "Despite facing many challenges, the digital economy has maintained strong growth momentum worldwide.",
    keywords: ["digital economy", "growth momentum", "despite challenges"],
  },
]
