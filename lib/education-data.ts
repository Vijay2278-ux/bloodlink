export interface Subject {
  id: string
  name: string
  icon: string
  color: string
  description: string
}

export interface Topic {
  id: string
  title: string
  description: string
  notes: string
  subjectId: string
  classLevel: number
}

export interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  topicId: string
  difficulty: "easy" | "medium" | "hard"
}

export interface Game {
  id: string
  title: string
  description: string
  type: "puzzle" | "memory" | "quiz" | "word"
  difficulty: "easy" | "medium" | "hard"
  subjectId?: string
}

export const SUBJECTS_BY_CLASS: Record<string, Subject[]> = {
  "6-8": [
    {
      id: "math",
      name: "Mathematics",
      icon: "🔢",
      color: "bg-blue-500",
      description: "Numbers, algebra, and problem solving",
    },
    {
      id: "science",
      name: "Science",
      icon: "🔬",
      color: "bg-green-500",
      description: "Physics, chemistry, and biology basics",
    },
    {
      id: "english",
      name: "English",
      icon: "📚",
      color: "bg-purple-500",
      description: "Grammar, literature, and writing",
    },
  ],
  "9-12": [
    {
      id: "math",
      name: "Mathematics",
      icon: "🔢",
      color: "bg-blue-500",
      description: "Advanced algebra, calculus, and geometry",
    },
    {
      id: "physics",
      name: "Physics",
      icon: "⚛️",
      color: "bg-red-500",
      description: "Motion, energy, and forces",
    },
    {
      id: "chemistry",
      name: "Chemistry",
      icon: "🧪",
      color: "bg-yellow-500",
      description: "Elements, compounds, and reactions",
    },
    {
      id: "biology",
      name: "Biology",
      icon: "🧬",
      color: "bg-green-500",
      description: "Life sciences and living organisms",
    },
  ],
}

export const TOPICS_BY_SUBJECT: Record<string, Record<number, Topic[]>> = {
  math: {
    6: [
      {
        id: "fractions-decimals",
        title: "Fractions and Decimals",
        description: "Understanding fractions, decimals, and their relationships",
        classLevel: 6,
        notes:
          "Fractions represent parts of a whole. A fraction has a numerator (top number) and denominator (bottom number). Decimals are another way to represent fractions. For example, 1/2 = 0.5, 1/4 = 0.25, and 3/4 = 0.75. Converting between fractions and decimals helps in solving real-world problems involving measurements, money, and proportions. links for improve learning = https://www.youtube.com/watch?v=qesj2jpktaE",
          subjectId: "math"
      },
      {
        id: "basic-geometry",
        title: "Basic Geometry",
        description: "Introduction to shapes, angles, and geometric concepts",
        classLevel: 6,
        notes:
          "Geometry deals with shapes, sizes, and properties of figures. Basic shapes include triangles, squares, rectangles, and circles. Angles are measured in degrees, with a right angle being 90°, acute angles less than 90°, and obtuse angles greater than 90°. Understanding perimeter (distance around a shape) and area (space inside a shape) is fundamental for solving geometric problems.",
          subjectId: "math"
      },
      {
        id: "integers",
        title: "Integers",
        description: "Working with positive and negative whole numbers",
        classLevel: 6,
        notes:
          "Integers include all positive numbers, negative numbers, and zero (...-3, -2, -1, 0, 1, 2, 3...). They are used to represent quantities that can go in opposite directions, like temperature above and below zero, or gains and losses in money. Adding and subtracting integers follows specific rules: same signs add normally, different signs subtract and take the sign of the larger number. links for improve learning = https://www.youtube.com/watch?v=fw1kyM0F00Y",
          subjectId: "math"

      },
      {
        id: "ratios-proportions",
        title: "Ratios and Proportions",
        description: "Understanding relationships between quantities",
        classLevel: 6,
        notes:
          "these are  two quantities and can be written as a:b or a/b. Proportions are equations stating that two ratios are equal. For example, if 2:3 = 4:6, this is a proportion. Ratios and proportions are used in cooking recipes, maps, and solving problems involving similar figures. Cross-multiplication helps solve proportion problems.",
          subjectId: "math"

      },
      {
        id: "percentages",
        title: "Percentages",
        description: "Understanding parts per hundred and percentage calculations",
        classLevel: 6,
        notes:
          "Percent mean 'per hundred' and is represented by the % symbol. 50% means 50 out of 100, or 1/2, or 0.5. Percentages are used in discounts, taxes, tips, and statistics. To find a percentage of a number, multiply the number by the percentage in decimal form. For example, 25% of 80 = 0.25 × 80 = 20. links for increase understanding = https://www.youtube.com/watch?v=WIkfkR15ElM",
          subjectId: "math"
      },
      {
        /* Added Rational Numbers topic to Class 6 Math */
        id: "rational-numbers",
        title: "Rational Numbers",
        description: "Understanding numbers that can be expressed as fractions",
        classLevel: 6,
        notes:
          "A rational number is any number that can be expressed as a fraction, where both the numerator (the top number) and the denominator (the bottom number) are integers. This broad category includes more than just fractions! It also covers all whole numbers (like 7), integers (like -3), and decimals that either end (like 0.25) or repeat (like 0.333...). Students learn to see the connections between these different forms. For example, they'll learn that 1/4 is the same as 0.25 or 25%. This skill is crucial for understanding how to represent values in different ways and for solving problems in algebra and beyond.",
        subjectId: "math",
      },
      {
        id: "algebra-fundamentals",
        title: "Algebra Fundamentals",
        description: "Introduction to variables and simple algebraic expressions",
        classLevel: 6,
        notes:
          "Algebra is fundamental branch of mathematics that uses letters, called variables, to represent unknown numbers. This topic introduces the idea of using these variables to solve problems. Students learn to translate real-world word problems into algebraic expressions. They then solve simple, one-step equations to find the value of the variable. For instance, in the equation x+3=7, they'll learn that the variable x has a value of 4. This lays the essential groundwork for the more complex algebra and problem-solving skills they'll use throughout their academic careers.",
          subjectId: "math"
      },
    ],
    7: [
      {
        id: "algebraic-expressions-7",
        title: "Simple Algebraic Expressions",
        description: "Introduction to variables and basic algebra",
        notes:
          "Variables are symbols (usually letters) that represent unknown numbers. An algebraic expression combines numbers, variables, and operations like 3x + 5.",
        subjectId: "math",
        classLevel: 7,
      },
      {
        id: "linear-equations-7",
        title: "Simple Linear Equations",
        description: "Solving equations with one variable",
        notes:
          "A linear equation in one variable has the form ax + b = c. To solve, isolate the variable by performing the same operation on both sides.",
        subjectId: "math",
        classLevel: 7,
      },
      {
        id: "triangles-7",
        title: "Properties of Triangles",
        description: "Types and properties of triangles",
        notes:
          "Triangles are classified by sides (equilateral, isosceles, scalene) and angles (acute, right, obtuse). The sum of angles in any triangle is 180°.",
        subjectId: "math",
        classLevel: 7,
      },
      {
        id: "congruence-7",
        title: "Congruence of Triangles",
        description: "When triangles are identical in shape and size",
        notes:
          "Two triangles are congruent if they have the same shape and size. Congruence rules: SSS, SAS, ASA, RHS help determine congruence.",
        subjectId: "math",
        classLevel: 7,
      },
      {
        id: "rational-numbers-7",
        title: "Rational Numbers",
        description: "Numbers that can be expressed as fractions",
        notes:
          "Rational numbers are numbers that can be written as p/q where p and q are integers and q ≠ 0. They include fractions, decimals, and whole numbers.",
        subjectId: "math",
        classLevel: 7,
      },
    ],
    8: [
      {
        id: "rational-numbers-8",
        title: "Rational Numbers Operations",
        description: "Operations with rational numbers",
        notes:
          "Rational numbers follow the same rules as integers for addition, subtraction, multiplication, and division. Remember to find common denominators for fractions.",
        subjectId: "math",
        classLevel: 8,
      },
      {
        id: "linear-equations-8",
        title: "Linear Equations in One Variable",
        description: "Advanced linear equation solving",
        notes:
          "Linear equations can have variables on both sides. Use inverse operations to collect like terms and isolate the variable. Check your solution by substitution.",
        subjectId: "math",
        classLevel: 8,
      },
      {
        id: "quadrilaterals-8",
        title: "Understanding Quadrilaterals",
        description: "Properties of four-sided figures",
        notes:
          "Quadrilaterals include squares, rectangles, parallelograms, rhombus, and trapezoids. Each has specific properties regarding sides, angles, and diagonals.",
        subjectId: "math",
        classLevel: 8,
      },
      {
        id: "data-handling-8",
        title: "Data Handling",
        description: "Organizing and interpreting data",
        notes:
          "Data can be organized using frequency tables, bar graphs, histograms, and pie charts. Mean, median, and mode are measures of central tendency.",
        subjectId: "math",
        classLevel: 8,
      },
      {
        id: "squares-cubes-8",
        title: "Squares and Square Roots",
        description: "Perfect squares and their roots",
        notes:
          "A perfect square is a number that can be expressed as n². Square root is the inverse operation. √16 = 4 because 4² = 16.",
        subjectId: "math",
        classLevel: 8,
      },
    ],
    9: [
      {
        id: "algebra-basics",
        title: "Algebraic Expressions",
        description: "Variables and equations",
        notes:
          'Algebra uses letters (variables) to represent unknown numbers. An expression like 2x + 3 means "2 times some number plus 3." We can solve equations to find the value of variables.',
        subjectId: "math",
        classLevel: 9,
      },
      {
        id: "linear-equations",
        title: "Linear Equations",
        description: "Solving for unknown values",
        notes:
          "Linear equations have variables to the first power only. They graph as straight lines. The standard form is ax + b = c, where we solve for x.",
        subjectId: "math",
        classLevel: 9,
      },
      {
        id: "quadratic-equations",
        title: "Quadratic Equations",
        description: "Equations with squared terms",
        notes:
          "Quadratic equations have the form ax² + bx + c = 0. They can be solved using factoring, completing the square, or the quadratic formula.",
        subjectId: "math",
        classLevel: 9,
      },
      {
        id: "functions",
        title: "Functions",
        description: "Input-output relationships",
        notes:
          'A function is a rule that assigns exactly one output to each input. We write f(x) = 2x + 1 to mean "f of x equals 2x plus 1."',
        subjectId: "math",
        classLevel: 9,
      },
      {
        id: "coordinate-geometry",
        title: "Coordinate Geometry",
        description: "Graphing on the coordinate plane",
        notes:
          "The coordinate plane has two axes: x (horizontal) and y (vertical). Points are written as (x, y). Lines can be described by equations like y = mx + b.",
        subjectId: "math",
        classLevel: 9,
      },
    ],
    10: [
      {
        id: "real-numbers-10",
        title: "Real Numbers",
        description: "Rational and irrational numbers",
        notes:
          "Real numbers include all rational and irrational numbers. Irrational numbers like √2, π cannot be expressed as simple fractions and have non-terminating, non-repeating decimals.",
        subjectId: "math",
        classLevel: 10,
      },
      {
        id: "polynomials-10",
        title: "Polynomials",
        description: "Expressions with multiple terms",
        notes:
          "A polynomial is an expression with variables and coefficients using addition, subtraction, and multiplication. Degree is the highest power of the variable.",
        subjectId: "math",
        classLevel: 10,
      },
      {
        id: "quadratic-equations-10",
        title: "Quadratic Equations",
        description: "Equations of degree 2",
        notes:
          "Quadratic equations have the form ax² + bx + c = 0. Solutions can be found using factoring, completing the square, or the quadratic formula: x = (-b ± √(b²-4ac))/2a.",
        subjectId: "math",
        classLevel: 10,
      },
      {
        id: "arithmetic-progressions-10",
        title: "Arithmetic Progressions",
        description: "Sequences with constant difference",
        notes:
          "An arithmetic progression (AP) is a sequence where each term after the first is obtained by adding a constant difference. Formula: an = a + (n-1)d.",
        subjectId: "math",
        classLevel: 10,
      },
      {
        id: "triangles-10",
        title: "Triangles and Similarity",
        description: "Similar triangles and their properties",
        notes:
          "Similar triangles have the same shape but different sizes. Corresponding angles are equal and corresponding sides are proportional. AA, SSS, SAS similarity criteria.",
        subjectId: "math",
        classLevel: 10,
      },
    ],
    11: [
      {
        id: "sets-11",
        title: "Sets and Functions",
        description: "Set theory and function concepts",
        notes:
          "A set is a collection of distinct objects. Functions map each element of domain to exactly one element in codomain. Types include one-one, onto, and bijective functions.",
        subjectId: "math",
        classLevel: 11,
      },
      {
        id: "trigonometry-11",
        title: "Trigonometric Functions",
        description: "Sine, cosine, and tangent functions",
        notes:
          "Trigonometric functions relate angles to ratios of sides in right triangles. sin θ = opposite/hypotenuse, cos θ = adjacent/hypotenuse, tan θ = opposite/adjacent.",
        subjectId: "math",
        classLevel: 11,
      },
      {
        id: "complex-numbers-11",
        title: "Complex Numbers",
        description: "Numbers with real and imaginary parts",
        notes:
          "Complex numbers have the form a + bi where i = √(-1). They extend real numbers to solve equations like x² + 1 = 0. Operations follow algebraic rules.",
        subjectId: "math",
        classLevel: 11,
      },
      {
        id: "permutations-11",
        title: "Permutations and Combinations",
        description: "Counting arrangements and selections",
        notes:
          "Permutations count arrangements where order matters: nPr = n!/(n-r)!. Combinations count selections where order doesn't matter: nCr = n!/(r!(n-r)!).",
        subjectId: "math",
        classLevel: 11,
      },
      {
        id: "binomial-theorem-11",
        title: "Binomial Theorem",
        description: "Expansion of (a+b)^n",
        notes:
          "The binomial theorem gives the expansion of (a+b)ⁿ as a sum of terms involving binomial coefficients. General term: Tr+1 = nCr × aⁿ⁻ʳ × bʳ.",
        subjectId: "math",
        classLevel: 11,
      },
    ],
    12: [
      {
        id: "relations-functions-12",
        title: "Relations and Functions",
        description: "Advanced function concepts",
        notes:
          "Relations are sets of ordered pairs. Functions are special relations where each input has exactly one output. Inverse functions undo the original function.",
        subjectId: "math",
        classLevel: 12,
      },
      {
        id: "matrices-12",
        title: "Matrices and Determinants",
        description: "Matrix operations and properties",
        notes:
          "Matrices are rectangular arrays of numbers. Operations include addition, multiplication, and finding determinants. Used to solve systems of linear equations.",
        subjectId: "math",
        classLevel: 12,
      },
      {
        id: "calculus-12",
        title: "Differential Calculus",
        description: "Derivatives and their applications",
        notes:
          "Derivatives measure the rate of change of functions. d/dx(xⁿ) = nxⁿ⁻¹. Applications include finding maxima, minima, and rates of change in real situations.",
        subjectId: "math",
        classLevel: 12,
      },
      {
        id: "integration-12",
        title: "Integral Calculus",
        description: "Integration and area under curves",
        notes:
          "Integration is the reverse of differentiation. ∫xⁿdx = xⁿ⁺¹/(n+1) + C. Used to find areas, volumes, and solve differential equations.",
        subjectId: "math",
        classLevel: 12,
      },
      {
        id: "probability-12",
        title: "Probability Distributions",
        description: "Random variables and distributions",
        notes:
          "Probability measures likelihood of events. Random variables assign numbers to outcomes. Binomial and normal distributions are common probability models.",
        subjectId: "math",
        classLevel: 12,
      },
    ],
  },
  science: {
    6: [
      {
        id: "matter-states",
        title: "States of Matter",
        description: "Solid, liquid, and gas",
        notes:
          "Matter exists in three main states: solid (particles close together), liquid (particles loosely connected), and gas (particles far apart and moving freely).",
        subjectId: "science",
        classLevel: 6,
      },
      {
        id: "plant-life",
        title: "Plant Life Cycles",
        description: "How plants grow and reproduce",
        notes:
          "Plants go through stages: seed → germination → growth → flowering → fruit/seed production. They need sunlight, water, and nutrients to survive.",
        subjectId: "science",
        classLevel: 6,
      },
      {
        id: "simple-machines",
        title: "Simple Machines",
        description: "Tools that make work easier",
        notes:
          "Six simple machines: lever, wheel and axle, pulley, inclined plane, wedge, and screw. They help us apply force more effectively.",
        subjectId: "science",
        classLevel: 6,
      },
      {
        id: "weather-patterns",
        title: "Weather and Climate",
        description: "Understanding atmospheric conditions",
        notes:
          "Weather is daily atmospheric conditions. Climate is long-term weather patterns. The water cycle drives most weather through evaporation, condensation, and precipitation.",
        subjectId: "science",
        classLevel: 6,
      },
      {
        id: "cellular-biology",
        title: "Cellular Biology",
        description: "Basic units of all living things",
        notes:
          "Cells are the most basic and fundamental units of all living things. Think of them as the tiny building blocks of life. They are so incredibly small that you need a microscope to see them in detail. Within the vast world of living organisms, there are two primary cell types: plant and animal cells. While they share some similarities, they have distinct differences. For instance, plant cells have a rigid cell wall that provides support and structure, and they also contain chloroplasts, which they use for photosynthesis. In contrast, animal cells lack these features. Despite their differences, all cells contain a nucleus (the cell's control center), cytoplasm (a jelly-like fluid that fills the cell), and a cell membrane that acts like a protective gatekeeper, carefully controlling what enters and leaves the cell. Understanding these basic components and their functions is the first step toward understanding all of biology.   link for clear understanding  =   https://www.youtube.com/watch?v=fpQzcM4gNSs ",
        subjectId: "science",
        classLevel: 6   
          
      },
      {
        id: "forces-motion",
        title: "Forces and Motion",
        description: "Understanding pushes, pulls, and Newton's Laws",
        notes:
          "A force is a fundamental concept in physics—it is simply a push or a pull on an object. The relationship between force, mass, and motion is explained by Newton's Laws of Motion. The first law states that an object at rest will stay at rest, and an object in motion will stay in motion, unless an outside force acts on it. The second law explains the quantitative relationship between force, mass, and acceleration, expressed by the famous equation F=ma (Force = mass × acceleration). The third law states that for every action, there is an equal and opposite reaction. These laws help us understand how objects move and interact in our everyday world, from throwing a ball to riding in a car. links for better understanding = https://www.youtube.com/watch?v=xUCYFof8QyA",
        subjectId: "science",
        classLevel: 6,
      },
      {
        id: "rock-cycle",
        title: "Rock Cycle",
        description: "How Earth's rocks are constantly changing",
        notes:
          "The rock cycle is a continuous, natural process that shows how Earth's rocks are constantly being created, changed, and destroyed. It's an excellent example of how our planet is never static. There are three main rock types that are transformed through this cycle. Igneous rocks form when molten rock, or magma, cools and hardens, either slowly underground or quickly on the surface after a volcanic eruption. Sedimentary rocks are created from compressed layers of tiny particles of other rocks, minerals, or organic matter over a long period. Metamorphic rocks form when existing rocks are subjected to intense heat and pressure deep within the Earth's crust, causing their form and composition to change. The rock cycle demonstrates that even the most solid parts of our planet are in a state of constant, slow-moving change. links for better understanding = https://www.youtube.com/watch?v=7CnjoCu1154",
        subjectId: "science",
        classLevel: 6,
      },
    ],
    7: [
      {
        id: "nutrition-7",
        title: "Nutrition in Plants and Animals",
        description: "How living things get and use food",
        notes:
          "Plants make food through photosynthesis using sunlight, water, and carbon dioxide. Animals get nutrition by eating plants or other animals. Digestion breaks down food into usable nutrients.",
        subjectId: "science",
        classLevel: 7,
      },
      {
        id: "respiration-7",
        title: "Respiration in Organisms",
        description: "How living things breathe and get energy",
        notes:
          "Respiration is the process of breaking down food to release energy. Cellular respiration occurs in all living cells. Breathing is the physical process of taking in oxygen.",
        subjectId: "science",
        classLevel: 7,
      },
      {
        id: "heat-temperature-7",
        title: "Heat and Temperature",
        description: "Understanding thermal energy",
        notes:
          "Temperature measures how hot or cold something is. Heat is thermal energy that flows from hot to cold objects. Heat can be transferred by conduction, convection, and radiation.",
        subjectId: "science",
        classLevel: 7,
      },
      {
        id: "acids-bases-7",
        title: "Acids, Bases and Salts",
        description: "Chemical properties of common substances",
        notes:
          "Acids taste sour and turn blue litmus red. Bases taste bitter and turn red litmus blue. When acids and bases react, they form salts and water (neutralization).",
        subjectId: "science",
        classLevel: 7,
      },
      {
        id: "weather-climate-7",
        title: "Weather, Climate and Adaptations",
        description: "How organisms adapt to their environment",
        notes:
          "Weather is day-to-day atmospheric conditions. Climate is average weather over many years. Animals and plants have adaptations that help them survive in their climate.",
        subjectId: "science",
        classLevel: 7,
      },
    ],
    8: [
      {
        id: "crop-production-8",
        title: "Crop Production and Management",
        description: "How food crops are grown",
        notes:
          "Crop production involves soil preparation, sowing, adding manure/fertilizers, irrigation, protection from weeds/pests, and harvesting. Modern farming uses technology to increase yield.",
        subjectId: "science",
        classLevel: 8,
      },
      {
        id: "microorganisms-8",
        title: "Microorganisms: Friend and Foe",
        description: "Tiny organisms and their effects",
        notes:
          "Microorganisms include bacteria, viruses, fungi, and protozoa. Some are helpful (making food, medicines) while others cause diseases. Proper hygiene prevents harmful microbes.",
        subjectId: "science",
        classLevel: 8,
      },
      {
        id: "materials-8",
        title: "Synthetic Fibres and Plastics",
        description: "Man-made materials and their properties",
        notes:
          "Synthetic fibres like nylon and polyester are made from chemicals. Plastics are polymers with various properties. Both are useful but can cause environmental problems if not disposed properly.",
        subjectId: "science",
        classLevel: 8,
      },
      {
        id: "metals-nonmetals-8",
        title: "Metals and Non-metals",
        description: "Properties and uses of elements",
        notes:
          "Metals are shiny, conduct heat/electricity, and are malleable. Non-metals are dull, don't conduct well, and are brittle. Each group has specific properties and uses.",
        subjectId: "science",
        classLevel: 8,
      },
      {
        id: "reproduction-8",
        title: "Reproduction in Animals",
        description: "How animals produce offspring",
        notes:
          "Animals reproduce sexually (two parents) or asexually (one parent). Sexual reproduction involves fertilization of egg by sperm. Development can be internal or external.",
        subjectId: "science",
        classLevel: 8,
      },
    ],
  },
  english: {
    6: [
      {
        id: "grammar-basics-6",
        title: "Parts of Speech",
        description: "Nouns, verbs, adjectives, and more",
        notes:
          "Parts of speech are categories of words: nouns (person, place, thing), verbs (action words), adjectives (describing words), adverbs (modify verbs), pronouns (replace nouns).",
        subjectId: "english",
        classLevel: 6,
      },
      {
        id: "reading-comprehension-6",
        title: "Reading Comprehension",
        description: "Understanding what you read",
        notes:
          "Good reading involves understanding main ideas, supporting details, and making inferences. Ask questions while reading: Who? What? When? Where? Why? How?",
        subjectId: "english",
        classLevel: 6,
      },
      {
        id: "creative-writing-6",
        title: "Creative Writing",
        description: "Stories, poems, and descriptions",
        notes:
          "Creative writing uses imagination to tell stories or express ideas. Include interesting characters, settings, and plots. Use descriptive words to paint pictures with words.",
        subjectId: "english",
        classLevel: 6,
      },
      {
        id: "poetry-6",
        title: "Poetry Appreciation",
        description: "Understanding poems and their meaning",
        notes:
          "Poetry uses rhythm, rhyme, and imagery to express emotions and ideas. Look for metaphors, similes, and other literary devices that make poems special.",
        subjectId: "english",
        classLevel: 6,
      },
      {
        id: "letter-writing-6",
        title: "Letter Writing",
        description: "Formal and informal letters",
        notes:
          "Letters have specific formats. Informal letters to friends are casual. Formal letters for business use proper structure: sender's address, date, recipient's address, salutation, body, closing.",
        subjectId: "english",
        classLevel: 6,
      },
    ],
    7: [
      {
        id: "advanced-grammar-7",
        title: "Advanced Grammar",
        description: "Tenses, voice, and sentence structure",
        notes:
          "Tenses show when actions happen (past, present, future). Active voice: subject does action. Passive voice: action is done to subject. Complex sentences have multiple clauses.",
        subjectId: "english",
        classLevel: 7,
      },
      {
        id: "literature-7",
        title: "Literature Study",
        description: "Stories, novels, and their themes",
        notes:
          "Literature includes fiction (made-up stories) and non-fiction (real events). Look for themes (main messages), character development, and how authors use language to create meaning.",
        subjectId: "english",
        classLevel: 7,
      },
      {
        id: "essay-writing-7",
        title: "Essay Writing",
        description: "Structured writing with arguments",
        notes:
          "Essays have introduction, body paragraphs, and conclusion. Start with a thesis statement, support with evidence, and conclude by restating main points. Use transitions between paragraphs.",
        subjectId: "english",
        classLevel: 7,
      },
      {
        id: "vocabulary-7",
        title: "Vocabulary Building",
        description: "Learning new words and their usage",
        notes:
          "Build vocabulary by reading widely, using context clues, and learning word roots, prefixes, and suffixes. Keep a vocabulary journal and use new words in sentences.",
        subjectId: "english",
        classLevel: 7,
      },
      {
        id: "drama-7",
        title: "Drama and Theatre",
        description: "Plays, scripts, and performance",
        notes:
          "Drama tells stories through dialogue and action. Scripts include stage directions, character names, and spoken lines. Plays can be comedies, tragedies, or other genres.",
        subjectId: "english",
        classLevel: 7,
      },
    ],
    8: [
      {
        id: "advanced-composition-8",
        title: "Advanced Composition",
        description: "Complex writing techniques",
        notes:
          "Advanced writing uses varied sentence structures, sophisticated vocabulary, and clear organization. Practice different writing styles: narrative, descriptive, expository, and persuasive.",
        subjectId: "english",
        classLevel: 8,
      },
      {
        id: "literary-devices-8",
        title: "Literary Devices",
        description: "Metaphors, symbolism, and more",
        notes:
          "Literary devices enhance writing: metaphors compare unlike things, symbolism uses objects to represent ideas, irony contrasts expectation with reality, alliteration repeats sounds.",
        subjectId: "english",
        classLevel: 8,
      },
      {
        id: "research-skills-8",
        title: "Research and Reference Skills",
        description: "Finding and using information",
        notes:
          "Research involves finding reliable sources, taking notes, and citing references. Use libraries, databases, and credible websites. Always give credit to original sources.",
        subjectId: "english",
        classLevel: 8,
      },
      {
        id: "public-speaking-8",
        title: "Public Speaking",
        description: "Presenting ideas effectively",
        notes:
          "Good public speaking requires preparation, clear organization, and confident delivery. Make eye contact, use gestures, vary your voice, and practice beforehand.",
        subjectId: "english",
        classLevel: 8,
      },
      {
        id: "media-literacy-8",
        title: "Media Literacy",
        description: "Understanding different types of media",
        notes:
          "Media literacy involves analyzing newspapers, advertisements, websites, and social media. Consider the source, purpose, audience, and bias in media messages.",
        subjectId: "english",
        classLevel: 8,
      },
    ],
  },
  physics: {
    9: [
      {
        id: "motion-laws",
        title: "Laws of Motion",
        description: "Newton's fundamental principles",
        notes:
          "Newton's three laws: 1) Objects at rest stay at rest unless acted upon by force, 2) F = ma (force equals mass times acceleration), 3) Every action has an equal and opposite reaction.",
        subjectId: "physics",
        classLevel: 9,
      },
      {
        id: "energy-work",
        title: "Work and Energy",
        description: "Energy transformations and conservation",
        notes:
          "Work is force applied over distance (W = F × d). Energy comes in forms like kinetic (motion) and potential (stored). Energy cannot be created or destroyed, only transformed.",
        subjectId: "physics",
        classLevel: 9,
      },
      {
        id: "waves-sound",
        title: "Waves and Sound",
        description: "Wave properties and sound waves",
        notes:
          "Waves transfer energy without transferring matter. Sound waves are longitudinal waves that travel through air. Wave properties include frequency, wavelength, and amplitude.",
        subjectId: "physics",
        classLevel: 9,
      },
      {
        id: "light-optics",
        title: "Light and Optics",
        description: "Properties of light and vision",
        notes:
          "Light travels in straight lines and can be reflected, refracted, or absorbed. Mirrors reflect light, lenses bend light. White light contains all colors of the spectrum.",
        subjectId: "physics",
        classLevel: 9,
      },
      {
        id: "electricity-basics",
        title: "Basic Electricity",
        description: "Electric current and circuits",
        notes:
          "Electric current is the flow of electrons. Voltage pushes current through resistance. Ohm's law: V = I × R. Circuits can be series (one path) or parallel (multiple paths).",
        subjectId: "physics",
        classLevel: 9,
      },
    ],
    10: [
      {
        id: "light-reflection-10",
        title: "Light - Reflection and Refraction",
        description: "How light behaves with mirrors and lenses",
        notes:
          "Light reflects off mirrors following laws of reflection. Refraction occurs when light bends passing through different media. Lenses focus or spread light rays.",
        subjectId: "physics",
        classLevel: 10,
      },
      {
        id: "human-eye-10",
        title: "Human Eye and Colorful World",
        description: "How we see and perceive colors",
        notes:
          "The eye focuses light on the retina. Common defects include myopia (nearsightedness) and hyperopia (farsightedness). White light contains all colors of the spectrum.",
        subjectId: "physics",
        classLevel: 10,
      },
      {
        id: "electricity-10",
        title: "Electricity",
        description: "Electric current, circuits, and power",
        notes:
          "Electric current is flow of charge. Ohm's law: V = IR. Power P = VI. Series circuits have one path, parallel circuits have multiple paths for current.",
        subjectId: "physics",
        classLevel: 10,
      },
      {
        id: "magnetic-effects-10",
        title: "Magnetic Effects of Electric Current",
        description: "Relationship between electricity and magnetism",
        notes:
          "Current-carrying conductors produce magnetic fields. Motors convert electrical energy to mechanical energy. Generators convert mechanical energy to electrical energy.",
        subjectId: "physics",
        classLevel: 10,
      },
      {
        id: "sources-energy-10",
        title: "Sources of Energy",
        description: "Renewable and non-renewable energy sources",
        notes:
          "Fossil fuels (coal, oil, gas) are non-renewable. Solar, wind, hydro are renewable. Nuclear energy comes from splitting atoms. Energy conservation is important for sustainability.",
        subjectId: "physics",
        classLevel: 10,
      },
    ],
    11: [
      {
        id: "kinematics-11",
        title: "Kinematics",
        description: "Motion in straight line and plane",
        notes:
          "Kinematics describes motion without considering forces. Key equations relate displacement, velocity, acceleration, and time. Motion can be uniform or non-uniform.",
        subjectId: "physics",
        classLevel: 11,
      },
      {
        id: "dynamics-11",
        title: "Laws of Motion",
        description: "Newton's laws and their applications",
        notes:
          "Newton's laws explain the relationship between forces and motion. First law (inertia), second law (F=ma), third law (action-reaction). Applications include friction and circular motion.",
        subjectId: "physics",
        classLevel: 11,
      },
      {
        id: "work-energy-power-11",
        title: "Work, Energy and Power",
        description: "Energy conservation and transformations",
        notes:
          "Work is force times displacement. Kinetic energy = ½mv², potential energy = mgh. Power is rate of doing work. Energy is conserved in isolated systems.",
        subjectId: "physics",
        classLevel: 11,
      },
      {
        id: "gravitation-11",
        title: "Gravitation",
        description: "Universal law of gravitation",
        notes:
          "Every mass attracts every other mass with force F = Gm₁m₂/r². This explains planetary motion, tides, and satellite orbits. Escape velocity allows objects to leave Earth's gravity.",
        subjectId: "physics",
        classLevel: 11,
      },
      {
        id: "thermodynamics-11",
        title: "Thermodynamics",
        description: "Heat, temperature, and energy transfer",
        notes:
          "First law: energy is conserved. Second law: entropy increases. Heat engines convert thermal energy to work. Refrigerators move heat from cold to hot reservoirs.",
        subjectId: "physics",
        classLevel: 11,
      },
    ],
    12: [
      {
        id: "electrostatics-12",
        title: "Electric Charges and Fields",
        description: "Static electricity and electric fields",
        notes:
          "Like charges repel, unlike charges attract. Coulomb's law: F = kq₁q₂/r². Electric field is force per unit charge. Gauss's law relates electric flux to enclosed charge.",
        subjectId: "physics",
        classLevel: 12,
      },
      {
        id: "current-electricity-12",
        title: "Current Electricity",
        description: "Electric circuits and network analysis",
        notes:
          "Current is charge flow rate. Kirchhoff's laws analyze complex circuits. Wheatstone bridge measures resistance. Potentiometer measures potential difference accurately.",
        subjectId: "physics",
        classLevel: 12,
      },
      {
        id: "electromagnetic-induction-12",
        title: "Electromagnetic Induction",
        description: "Faraday's law and Lenz's law",
        notes:
          "Changing magnetic flux induces EMF (Faraday's law). Lenz's law gives direction of induced current. Applications include transformers, generators, and inductors.",
        subjectId: "physics",
        classLevel: 12,
      },
      {
        id: "alternating-current-12",
        title: "Alternating Current",
        description: "AC circuits and power transmission",
        notes:
          "AC voltage and current vary sinusoidally. RMS values give effective AC quantities. Reactance opposes AC flow. Power transmission uses high voltage to reduce losses.",
        subjectId: "physics",
        classLevel: 12,
      },
      {
        id: "electromagnetic-waves-12",
        title: "Electromagnetic Waves",
        description: "Properties and spectrum of EM waves",
        notes:
          "EM waves are oscillating electric and magnetic fields. They travel at light speed in vacuum. Spectrum includes radio, microwave, infrared, visible, UV, X-ray, gamma rays.",
        subjectId: "physics",
        classLevel: 12,
      },
    ],
  },
  chemistry: {
    9: [
      {
        id: "matter-nature-9",
        title: "Matter in Our Surroundings",
        description: "States of matter and their properties",
        notes:
          "Matter exists as solid, liquid, gas, and plasma. Particles are in constant motion. Temperature and pressure affect state changes: melting, boiling, sublimation, condensation.",
        subjectId: "chemistry",
        classLevel: 9,
      },
      {
        id: "pure-substances-9",
        title: "Is Matter Around Us Pure?",
        description: "Elements, compounds, and mixtures",
        notes:
          "Pure substances have fixed composition (elements and compounds). Mixtures contain two or more substances. Separation methods include filtration, distillation, chromatography.",
        subjectId: "chemistry",
        classLevel: 9,
      },
      {
        id: "atoms-molecules-9",
        title: "Atoms and Molecules",
        description: "Basic building blocks of matter",
        notes:
          "Atoms are smallest particles of elements. Molecules are groups of atoms. Atomic mass unit (u) measures atomic masses. Mole is a counting unit for particles.",
        subjectId: "chemistry",
        classLevel: 9,
      },
      {
        id: "atomic-structure-9",
        title: "Structure of the Atom",
        description: "Protons, neutrons, and electrons",
        notes:
          "Atoms have nucleus (protons, neutrons) and electrons in shells. Atomic number = number of protons. Mass number = protons + neutrons. Isotopes have same protons, different neutrons.",
        subjectId: "chemistry",
        classLevel: 9,
      },
      {
        id: "life-processes-9",
        title: "The Fundamental Unit of Life",
        description: "Cell structure and functions",
        notes:
          "Cells are basic units of life. Plant cells have cell wall, chloroplasts. Animal cells have centrioles. Organelles like nucleus, mitochondria have specific functions.",
        subjectId: "chemistry",
        classLevel: 9,
      },
    ],
    10: [
      {
        id: "acids-bases-salts-10",
        title: "Acids, Bases and Salts",
        description: "Chemical properties and reactions",
        notes:
          "Acids release H⁺ ions, bases release OH⁻ ions. pH scale measures acidity/basicity. Neutralization: acid + base → salt + water. Indicators show pH changes.",
        subjectId: "chemistry",
        classLevel: 10,
      },
      {
        id: "metals-nonmetals-10",
        title: "Metals and Non-metals",
        description: "Properties and chemical behavior",
        notes:
          "Metals lose electrons to form positive ions. Non-metals gain electrons to form negative ions. Reactivity series shows metal reactivity order. Corrosion damages metals.",
        subjectId: "chemistry",
        classLevel: 10,
      },
      {
        id: "carbon-compounds-10",
        title: "Carbon and its Compounds",
        description: "Organic chemistry basics",
        notes:
          "Carbon forms four bonds, creating chains and rings. Hydrocarbons contain only C and H. Functional groups determine compound properties. Isomers have same formula, different structures.",
        subjectId: "chemistry",
        classLevel: 10,
      },
      {
        id: "periodic-classification-10",
        title: "Periodic Classification of Elements",
        description: "Modern periodic table",
        notes:
          "Elements arranged by atomic number. Periods are horizontal rows, groups are vertical columns. Properties repeat periodically. Group elements have similar properties.",
        subjectId: "chemistry",
        classLevel: 10,
      },
      {
        id: "life-processes-chemistry-10",
        title: "Life Processes - Chemical Reactions",
        description: "Chemical reactions in living organisms",
        notes:
          "Respiration breaks down glucose for energy. Photosynthesis makes glucose from CO₂ and water. Enzymes catalyze biochemical reactions. Metabolism includes all life reactions.",
        subjectId: "chemistry",
        classLevel: 10,
      },
    ],
    11: [
      {
        id: "atomic-structure-11",
        title: "Structure of Atom",
        description: "Quantum mechanical model",
        notes:
          "Electrons exist in orbitals (s, p, d, f). Quantum numbers describe electron states. Aufbau principle, Pauli exclusion, Hund's rule govern electron configuration.",
        subjectId: "chemistry",
        classLevel: 11,
      },
      {
        id: "chemical-bonding-11",
        title: "Chemical Bonding and Molecular Structure",
        description: "How atoms bond together",
        notes:
          "Ionic bonds form between metals and non-metals. Covalent bonds share electrons. VSEPR theory predicts molecular shapes. Hybridization explains bonding geometry.",
        subjectId: "chemistry",
        classLevel: 11,
      },
      {
        id: "thermodynamics-chemistry-11",
        title: "Thermodynamics",
        description: "Energy changes in chemical reactions",
        notes:
          "Enthalpy (H) measures heat content. First law: ΔU = q - w. Hess's law: enthalpy change is path-independent. Entropy measures disorder.",
        subjectId: "chemistry",
        classLevel: 11,
      },
      {
        id: "equilibrium-11",
        title: "Equilibrium",
        description: "Chemical equilibrium and Le Chatelier's principle",
        notes:
          "At equilibrium, forward and reverse reaction rates are equal. Kc and Kp are equilibrium constants. Le Chatelier's principle predicts equilibrium shifts.",
        subjectId: "chemistry",
        classLevel: 11,
      },
      {
        id: "redox-reactions-11",
        title: "Redox Reactions",
        description: "Oxidation and reduction processes",
        notes:
          "Oxidation is loss of electrons, reduction is gain of electrons. Oxidation numbers track electron transfer. Balancing redox equations uses half-reaction method.",
        subjectId: "chemistry",
        classLevel: 11,
      },
    ],
    12: [
      {
        id: "solid-state-12",
        title: "The Solid State",
        description: "Crystal structures and properties",
        notes:
          "Solids have ordered arrangements (crystalline) or random (amorphous). Unit cells are repeating patterns. Close packing maximizes space efficiency. Defects affect properties.",
        subjectId: "chemistry",
        classLevel: 12,
      },
      {
        id: "solutions-12",
        title: "Solutions",
        description: "Concentration and colligative properties",
        notes:
          "Solutions are homogeneous mixtures. Concentration expressed as molarity, molality, mole fraction. Colligative properties depend on particle number, not identity.",
        subjectId: "chemistry",
        classLevel: 12,
      },
      {
        id: "electrochemistry-12",
        title: "Electrochemistry",
        description: "Electrical energy and chemical reactions",
        notes:
          "Galvanic cells generate electricity from chemical reactions. Electrolytic cells use electricity to drive reactions. Nernst equation relates potential to concentration.",
        subjectId: "chemistry",
        classLevel: 12,
      },
      {
        id: "chemical-kinetics-12",
        title: "Chemical Kinetics",
        description: "Rates of chemical reactions",
        notes:
          "Reaction rate depends on concentration, temperature, catalysts. Rate laws show concentration dependence. Activation energy is minimum energy needed for reaction.",
        subjectId: "chemistry",
        classLevel: 12,
      },
      {
        id: "surface-chemistry-12",
        title: "Surface Chemistry",
        description: "Adsorption, catalysis, and colloids",
        notes:
          "Adsorption occurs at surfaces. Catalysts increase reaction rates without being consumed. Colloids are intermediate between solutions and suspensions.",
        subjectId: "chemistry",
        classLevel: 12,
      },
    ],
  },
  biology: {
    9: [
      {
        id: "cell-structure-9",
        title: "The Fundamental Unit of Life",
        description: "Cell structure and organelles",
        notes:
          "Cells are basic units of life. Prokaryotic cells lack nucleus, eukaryotic cells have nucleus. Organelles like mitochondria, chloroplasts, ER have specific functions.",
        subjectId: "biology",
        classLevel: 9,
      },
      {
        id: "tissues-9",
        title: "Tissues",
        description: "Groups of similar cells",
        notes:
          "Plant tissues: meristematic (growing) and permanent (mature). Animal tissues: epithelial (covering), connective (support), muscular (movement), nervous (coordination).",
        subjectId: "biology",
        classLevel: 9,
      },
      {
        id: "diversity-9",
        title: "Diversity in Living Organisms",
        description: "Classification of life forms",
        notes:
          "Five kingdom classification: Monera (bacteria), Protista (single-celled), Fungi (decomposers), Plantae (plants), Animalia (animals). Binomial nomenclature names species.",
        subjectId: "biology",
        classLevel: 9,
      },
      {
        id: "why-fall-ill-9",
        title: "Why Do We Fall Ill?",
        description: "Health, disease, and immunity",
        notes:
          "Health is physical, mental, and social well-being. Diseases can be infectious (caused by pathogens) or non-infectious (genetic, lifestyle). Prevention is better than cure.",
        subjectId: "biology",
        classLevel: 9,
      },
      {
        id: "natural-resources-9",
        title: "Natural Resources",
        description: "Air, water, soil, and their management",
        notes:
          "Natural resources are materials from nature. Air pollution affects breathing, water pollution spreads disease, soil erosion reduces fertility. Conservation is essential.",
        subjectId: "biology",
        classLevel: 9,
      },
    ],
    10: [
      {
        id: "life-processes-10",
        title: "Life Processes",
        description: "Nutrition, respiration, transport, excretion",
        notes:
          "Life processes maintain living organisms. Nutrition provides energy, respiration releases energy, transport moves materials, excretion removes waste.",
        subjectId: "biology",
        classLevel: 10,
      },
      {
        id: "control-coordination-10",
        title: "Control and Coordination",
        description: "Nervous and hormonal systems",
        notes:
          "Nervous system uses electrical signals for quick responses. Hormonal system uses chemical messengers for slower, longer-lasting effects. Both coordinate body functions.",
        subjectId: "biology",
        classLevel: 10,
      },
      {
        id: "reproduction-10",
        title: "How Do Organisms Reproduce?",
        description: "Sexual and asexual reproduction",
        notes:
          "Asexual reproduction involves one parent, offspring are identical. Sexual reproduction involves two parents, offspring show variation. Reproduction ensures species survival.",
        subjectId: "biology",
        classLevel: 10,
      },
      {
        id: "heredity-evolution-10",
        title: "Heredity and Evolution",
        description: "Inheritance of traits and species change",
        notes:
          "Heredity passes traits from parents to offspring. Mendel's laws explain inheritance patterns. Evolution is gradual change in species over time through natural selection.",
        subjectId: "biology",
        classLevel: 10,
      },
      {
        id: "environment-management-10",
        title: "Our Environment",
        description: "Ecosystems and environmental protection",
        notes:
          "Ecosystems include living (biotic) and non-living (abiotic) components. Food chains show energy flow. Human activities can damage ecosystems, requiring conservation efforts.",
        subjectId: "biology",
        classLevel: 10,
      },
    ],
    11: [
      {
        id: "diversity-living-world-11",
        title: "The Living World",
        description: "Characteristics and classification of life",
        notes:
          "Living organisms show growth, reproduction, metabolism, response to stimuli. Taxonomy classifies organisms hierarchically: Kingdom, Phylum, Class, Order, Family, Genus, Species.",
        subjectId: "biology",
        classLevel: 11,
      },
      {
        id: "structural-organization-11",
        title: "Structural Organization in Animals",
        description: "Levels of organization in multicellular animals",
        notes:
          "Organization levels: cell → tissue → organ → organ system → organism. Different tissues work together in organs. Organ systems coordinate for organism survival.",
        subjectId: "biology",
        classLevel: 11,
      },
      {
        id: "cell-structure-function-11",
        title: "Cell Structure and Function",
        description: "Detailed cell biology",
        notes:
          "Cell membrane controls entry/exit. Nucleus contains DNA. Mitochondria produce energy. Ribosomes make proteins. ER transports materials. Golgi processes and packages.",
        subjectId: "biology",
        classLevel: 11,
      },
      {
        id: "plant-physiology-11",
        title: "Plant Physiology",
        description: "How plants function",
        notes:
          "Photosynthesis converts light energy to chemical energy. Respiration releases stored energy. Transpiration moves water up plants. Hormones control plant growth and development.",
        subjectId: "biology",
        classLevel: 11,
      },
      {
        id: "human-physiology-11",
        title: "Human Physiology",
        description: "How human body systems work",
        notes:
          "Digestive system breaks down food. Respiratory system exchanges gases. Circulatory system transports materials. Excretory system removes waste. Neural system coordinates responses.",
        subjectId: "biology",
        classLevel: 11,
      },
    ],
    12: [
      {
        id: "reproduction-12",
        title: "Reproduction",
        description: "Sexual reproduction in flowering plants and humans",
        notes:
          "Plant reproduction involves pollination, fertilization, seed formation. Human reproduction involves gametogenesis, fertilization, embryonic development. Reproductive health is important.",
        subjectId: "biology",
        classLevel: 12,
      },
      {
        id: "genetics-12",
        title: "Genetics and Evolution",
        description: "Heredity, variation, and evolution",
        notes:
          "DNA carries genetic information. Genes determine traits. Mutations cause variations. Natural selection drives evolution. Population genetics studies allele frequencies.",
        subjectId: "biology",
        classLevel: 12,
      },
      {
        id: "biotechnology-12",
        title: "Biotechnology and its Applications",
        description: "Using biology for human benefit",
        notes:
          "Biotechnology uses living organisms for useful products. Applications include medicine (insulin, vaccines), agriculture (GM crops), industry (enzymes, biofuels).",
        subjectId: "biology",
        classLevel: 12,
      },
      {
        id: "ecology-12",
        title: "Ecology and Environment",
        description: "Organisms and their environment",
        notes:
          "Ecology studies organism-environment interactions. Populations, communities, ecosystems show different organization levels. Environmental issues require conservation strategies.",
        subjectId: "biology",
        classLevel: 12,
      },
      {
        id: "human-welfare-12",
        title: "Biology and Human Welfare",
        description: "Applications of biology in health and agriculture",
        notes:
          "Microbes are useful (food production, antibiotics) and harmful (diseases). Immune system protects against pathogens. Vaccines prevent diseases. Sustainable agriculture feeds populations.",
        subjectId: "biology",
        classLevel: 12,
      },
    ],
  },
}

export const SAMPLE_QUESTIONS: Question[] = [
  // MATH QUESTIONS - Class 6
  {
    id: "math-6-1",
    question:
      "If a rectangular garden is 15 meters long and 8 meters wide, and you want to put a fence around it, how much fencing material do you need?",
    options: ["46 meters", "120 meters", "23 meters", "240 meters"],
    correctAnswer: 0,
    explanation: "Perimeter = 2(length + width) = 2(15 + 8) = 2(23) = 46 meters",
    topicId: "basic-geometry",
    difficulty: "medium",
  },
  {
    id: "math-6-2",
    question: "What is 7/8 - 3/8 + 1/4?",
    options: ["3/4", "5/8", "1/2", "7/8"],
    correctAnswer: 0,
    explanation: "7/8 - 3/8 = 4/8 = 1/2. Then 1/2 + 1/4 = 2/4 + 1/4 = 3/4",
    topicId: "fractions-decimals",
    difficulty: "hard",
  },
  {
    id: "math-6-3",
    question:
      "If the temperature was -5°C in the morning and rose by 12°C during the day, what is the final temperature?",
    options: ["7°C", "17°C", "-17°C", "12°C"],
    correctAnswer: 0,
    explanation:
      "-5 + 12 = 7°C. When adding a positive number to a negative number, we subtract and take the sign of the larger absolute value.",
    topicId: "integers",
    difficulty: "medium",
  },
  {
    id: "math-6-4",
    question: "In a class of 30 students, the ratio of boys to girls is 3:2. How many boys are there?",
    options: ["12", "15", "18", "20"],
    correctAnswer: 2,
    explanation: "Total ratio parts = 3 + 2 = 5. Boys = (3/5) × 30 = 18",
    topicId: "ratios-proportions",
    difficulty: "hard",
  },
  {
    id: "math-6-5",
    question: "A shirt originally costs ₹800. If there's a 25% discount, what is the sale price?",
    options: ["₹600", "₹200", "₹750", "₹825"],
    correctAnswer: 0,
    explanation: "Discount = 25% of 800 = 0.25 × 800 = ₹200. Sale price = 800 - 200 = ₹600",
    topicId: "percentages",
    difficulty: "medium",
  },

  // MATH QUESTIONS - Class 7
  {
    id: "math-7-1",
    question: "Solve for x: 3x + 7 = 22",
    options: ["x = 5", "x = 15", "x = 29", "x = 3"],
    correctAnswer: 0,
    explanation: "3x + 7 = 22 → 3x = 22 - 7 → 3x = 15 → x = 5",
    topicId: "linear-equations-7",
    difficulty: "medium",
  },
  {
    id: "math-7-2",
    question: "In a triangle, if two angles are 65° and 45°, what is the third angle?",
    options: ["70°", "110°", "180°", "Cannot be determined"],
    correctAnswer: 0,
    explanation: "Sum of angles in a triangle = 180°. Third angle = 180° - 65° - 45° = 70°",
    topicId: "triangles-7",
    difficulty: "easy",
  },
  {
    id: "math-7-3",
    question: "Which of the following is NOT a rational number?",
    options: ["√16", "22/7", "0.333...", "√2"],
    correctAnswer: 3,
    explanation:
      "√2 is irrational because it cannot be expressed as a fraction. √16 = 4, 22/7 is a fraction, 0.333... = 1/3",
    topicId: "rational-numbers-7",
    difficulty: "hard",
  },
  {
    id: "math-7-4",
    question: "If 2x - 5 = x + 3, then x equals:",
    options: ["8", "2", "-2", "4"],
    correctAnswer: 0,
    explanation: "2x - 5 = x + 3 → 2x - x = 3 + 5 → x = 8",
    topicId: "algebraic-expressions-7",
    difficulty: "medium",
  },

  // MATH QUESTIONS - Class 8
  {
    id: "math-8-1",
    question: "What is (-3/4) × (8/9) ÷ (-2/3)?",
    options: ["1", "-1", "1/2", "-1/2"],
    correctAnswer: 0,
    explanation: "(-3/4) × (8/9) = -24/36 = -2/3. Then (-2/3) ÷ (-2/3) = 1",
    topicId: "rational-numbers-8",
    difficulty: "hard",
  },
  {
    id: "math-8-2",
    question: "A parallelogram has one angle of 110°. What are the measures of the other three angles?",
    options: ["70°, 110°, 70°", "110°, 110°, 110°", "70°, 70°, 70°", "Cannot be determined"],
    correctAnswer: 0,
    explanation:
      "In a parallelogram, opposite angles are equal and adjacent angles are supplementary. So: 110°, 70°, 110°, 70°",
    topicId: "quadrilaterals-8",
    difficulty: "medium",
  },
  {
    id: "math-8-3",
    question: "The square root of 169 is:",
    options: ["12", "13", "14", "15"],
    correctAnswer: 1,
    explanation: "√169 = 13 because 13² = 13 × 13 = 169",
    topicId: "squares-cubes-8",
    difficulty: "easy",
  },

  // SCIENCE QUESTIONS - Class 6
  {
    id: "science-6-1",
    question: "Which process is responsible for clouds forming in the sky?",
    options: ["Evaporation", "Condensation", "Precipitation", "Sublimation"],
    correctAnswer: 1,
    explanation:
      "Condensation occurs when water vapor in the air cools and changes back to liquid water droplets, forming clouds.",
    topicId: "weather-patterns",
    difficulty: "medium",
  },
  {
    id: "science-6-2",
    question: "Which simple machine would be most helpful for lifting a heavy box to a higher shelf?",
    options: ["Wedge", "Screw", "Pulley", "Lever"],
    correctAnswer: 2,
    explanation:
      "A pulley system can redirect force and provide mechanical advantage, making it easier to lift heavy objects vertically.",
    topicId: "simple-machines",
    difficulty: "medium",
  },
  {
    id: "science-6-3",
    question: "What happens to the particles in a solid when it melts?",
    options: [
      "They move faster and farther apart",
      "They stop moving completely",
      "They move slower and closer together",
      "They disappear",
    ],
    correctAnswer: 0,
    explanation:
      "When a solid melts, heat energy causes particles to vibrate faster and move farther apart, changing from solid to liquid state.",
    topicId: "matter-states",
    difficulty: "medium",
  },
  {
    id: "science-6-4",
    question: "Which part of a plant is primarily responsible for absorbing water and nutrients from the soil?",
    options: ["Leaves", "Stem", "Roots", "Flowers"],
    correctAnswer: 2,
    explanation:
      "Roots have specialized structures that absorb water and dissolved nutrients from the soil and transport them to other parts of the plant.",
    topicId: "plant-life",
    difficulty: "easy",
  },
  {
    id: "science-6-5",
    question:
      "According to Newton's third law, if you push against a wall with 50N of force, how much force does the wall push back?",
    options: ["25N", "50N", "100N", "0N"],
    correctAnswer: 1,
    explanation:
      "Newton's third law states that for every action, there is an equal and opposite reaction. The wall pushes back with exactly 50N of force.",
    topicId: "forces-motion",
    difficulty: "hard",
  },

  // SCIENCE QUESTIONS - Class 7
  {
    id: "science-7-1",
    question: "Which type of heat transfer occurs when you feel warmth from a campfire without touching it?",
    options: ["Conduction", "Convection", "Radiation", "Evaporation"],
    correctAnswer: 2,
    explanation:
      "Radiation is heat transfer through electromagnetic waves that can travel through air and space without needing direct contact.",
    topicId: "heat-temperature-7",
    difficulty: "medium",
  },
  {
    id: "science-7-2",
    question: "What happens when an acid reacts with a base?",
    options: ["They form a salt and water", "They form a gas", "They explode", "Nothing happens"],
    correctAnswer: 0,
    explanation:
      "When an acid reacts with a base, they neutralize each other to form a salt and water. This is called a neutralization reaction.",
    topicId: "acids-bases-7",
    difficulty: "medium",
  },
  {
    id: "science-7-3",
    question: "During photosynthesis, plants convert carbon dioxide and water into glucose using:",
    options: ["Oxygen", "Sunlight", "Soil nutrients", "Chlorophyll"],
    correctAnswer: 1,
    explanation:
      "Plants use sunlight as the energy source to convert CO₂ and H₂O into glucose during photosynthesis. Chlorophyll helps capture the light.",
    topicId: "nutrition-7",
    difficulty: "medium",
  },
  {
    id: "science-7-4",
    question: "Which adaptation would be most useful for an animal living in a very cold climate?",
    options: ["Large ears", "Thick fur", "Long legs", "Bright colors"],
    correctAnswer: 1,
    explanation:
      "Thick fur provides insulation, trapping warm air close to the body and preventing heat loss in cold environments.",
    topicId: "weather-climate-7",
    difficulty: "medium",
  },

  // SCIENCE QUESTIONS - Class 8
  {
    id: "science-8-1",
    question: "Which microorganism is used in the production of antibiotics like penicillin?",
    options: ["Bacteria", "Virus", "Fungi", "Protozoa"],
    correctAnswer: 2,
    explanation:
      "Penicillin is produced by the fungus Penicillium. Many antibiotics are derived from fungi and bacteria.",
    topicId: "microorganisms-8",
    difficulty: "hard",
  },
  {
    id: "science-8-2",
    question: "What is the main difference between synthetic and natural fibres?",
    options: ["Color", "Strength", "Source of origin", "Cost"],
    correctAnswer: 2,
    explanation:
      "Natural fibres come from plants or animals (cotton, wool), while synthetic fibres are made artificially from chemicals (nylon, polyester).",
    topicId: "materials-8",
    difficulty: "medium",
  },
  {
    id: "science-8-3",
    question: "Which property makes metals good conductors of electricity?",
    options: ["They are shiny", "They have free electrons", "They are malleable", "They are dense"],
    correctAnswer: 1,
    explanation:
      "Metals have free electrons that can move easily through the material, allowing electric current to flow.",
    topicId: "metals-nonmetals-8",
    difficulty: "hard",
  },

  // PHYSICS QUESTIONS - Class 9
  {
    id: "physics-9-1",
    question: "A car accelerates from rest to 60 m/s in 10 seconds. What is its acceleration?",
    options: ["6 m/s²", "60 m/s²", "600 m/s²", "0.6 m/s²"],
    correctAnswer: 0,
    explanation: "Acceleration = (final velocity - initial velocity) / time = (60 - 0) / 10 = 6 m/s²",
    topicId: "motion-laws",
    difficulty: "medium",
  },
  {
    id: "physics-9-2",
    question: "If a 5 kg object is lifted 10 meters high, how much potential energy does it gain? (g = 10 m/s²)",
    options: ["50 J", "500 J", "15 J", "100 J"],
    correctAnswer: 1,
    explanation: "Potential Energy = mgh = 5 kg × 10 m/s² × 10 m = 500 J",
    topicId: "energy-work",
    difficulty: "medium",
  },
  {
    id: "physics-9-3",
    question: "What happens to the frequency of a sound wave when its wavelength increases?",
    options: ["Frequency increases", "Frequency decreases", "Frequency stays the same", "Cannot be determined"],
    correctAnswer: 1,
    explanation:
      "Since wave speed = frequency × wavelength, if wavelength increases and speed is constant, frequency must decrease.",
    topicId: "waves-sound",
    difficulty: "hard",
  },
  {
    id: "physics-9-4",
    question: "When light passes from air into water, it bends toward the normal. This is because:",
    options: [
      "Water is denser than air",
      "Light slows down in water",
      "Water molecules absorb light",
      "Light gains energy",
    ],
    correctAnswer: 1,
    explanation:
      "Light bends toward the normal when entering a denser medium because it slows down, causing refraction.",
    topicId: "light-optics",
    difficulty: "hard",
  },

  // PHYSICS QUESTIONS - Class 10
  {
    id: "physics-10-1",
    question:
      "A concave mirror has a focal length of 20 cm. Where should an object be placed to get a magnified virtual image?",
    options: ["Beyond 40 cm", "Between 20-40 cm", "At 20 cm", "Between 0-20 cm"],
    correctAnswer: 3,
    explanation:
      "For a magnified virtual image with a concave mirror, the object must be placed between the pole and focus (0-20 cm).",
    topicId: "light-reflection-10",
    difficulty: "hard",
  },
  {
    id: "physics-10-2",
    question: "What is the power consumed by a 100Ω resistor when 2A current flows through it?",
    options: ["200 W", "400 W", "50 W", "100 W"],
    correctAnswer: 1,
    explanation: "Power = I²R = (2)² × 100 = 4 × 100 = 400 W",
    topicId: "electricity-10",
    difficulty: "medium",
  },
  {
    id: "physics-10-3",
    question: "Which of the following is a renewable source of energy?",
    options: ["Coal", "Natural gas", "Nuclear fuel", "Solar energy"],
    correctAnswer: 3,
    explanation:
      "Solar energy is renewable because the sun continuously provides energy. Coal, natural gas, and nuclear fuel are finite resources.",
    topicId: "sources-energy-10",
    difficulty: "easy",
  },

  // CHEMISTRY QUESTIONS - Class 9
  {
    id: "chemistry-9-1",
    question: "What is the molecular formula of glucose?",
    options: ["C₆H₁₂O₆", "C₁₂H₂₂O₁₁", "CH₄", "H₂O"],
    correctAnswer: 0,
    explanation: "Glucose has the molecular formula C₆H₁₂O₆, containing 6 carbon, 12 hydrogen, and 6 oxygen atoms.",
    topicId: "atoms-molecules-9",
    difficulty: "medium",
  },
  {
    id: "chemistry-9-2",
    question: "An atom has 17 protons and 18 neutrons. What is its mass number?",
    options: ["17", "18", "35", "1"],
    correctAnswer: 2,
    explanation: "Mass number = number of protons + number of neutrons = 17 + 18 = 35",
    topicId: "atomic-structure-9",
    difficulty: "medium",
  },
  {
    id: "chemistry-9-3",
    question: "Which separation technique would be best for separating salt from saltwater?",
    options: ["Filtration", "Distillation", "Decantation", "Magnetic separation"],
    correctAnswer: 1,
    explanation:
      "Distillation separates components based on different boiling points. Water evaporates first, leaving salt behind.",
    topicId: "pure-substances-9",
    difficulty: "medium",
  },

  // CHEMISTRY QUESTIONS - Class 10
  {
    id: "chemistry-10-1",
    question: "What is the pH of a solution with [H⁺] = 1 × 10⁻³ M?",
    options: ["3", "11", "-3", "7"],
    correctAnswer: 0,
    explanation: "pH = -log[H⁺] = -log(1 × 10⁻³) = -(-3) = 3",
    topicId: "acids-bases-salts-10",
    difficulty: "hard",
  },
  {
    id: "chemistry-10-2",
    question: "Which element would you expect to be most reactive with water?",
    options: ["Copper", "Iron", "Sodium", "Gold"],
    correctAnswer: 2,
    explanation:
      "Sodium is highly reactive with water, producing hydrogen gas and sodium hydroxide. It's high in the reactivity series.",
    topicId: "metals-nonmetals-10",
    difficulty: "medium",
  },
  {
    id: "chemistry-10-3",
    question: "What type of bond is formed between carbon atoms in diamond?",
    options: ["Ionic", "Metallic", "Covalent", "Hydrogen"],
    correctAnswer: 2,
    explanation: "Diamond has a network of covalent bonds where each carbon atom is bonded to four other carbon atoms.",
    topicId: "carbon-compounds-10",
    difficulty: "medium",
  },

  // BIOLOGY QUESTIONS - Class 9
  {
    id: "biology-9-1",
    question: "Which organelle is known as the 'powerhouse of the cell'?",
    options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi apparatus"],
    correctAnswer: 1,
    explanation: "Mitochondria produce ATP through cellular respiration, providing energy for cellular processes.",
    topicId: "cell-structure-9",
    difficulty: "easy",
  },
  {
    id: "biology-9-2",
    question: "Which tissue is responsible for transporting water in plants?",
    options: ["Phloem", "Xylem", "Cambium", "Epidermis"],
    correctAnswer: 1,
    explanation: "Xylem tissue transports water and minerals from roots to other parts of the plant.",
    topicId: "tissues-9",
    difficulty: "medium",
  },
  {
    id: "biology-9-3",
    question: "What is the correct sequence in the classification hierarchy?",
    options: [
      "Kingdom → Class → Phylum → Order",
      "Kingdom → Phylum → Class → Order",
      "Phylum → Kingdom → Class → Order",
      "Class → Kingdom → Phylum → Order",
    ],
    correctAnswer: 1,
    explanation: "The correct hierarchy is: Kingdom → Phylum → Class → Order → Family → Genus → Species",
    topicId: "diversity-9",
    difficulty: "medium",
  },

  // BIOLOGY QUESTIONS - Class 10
  {
    id: "biology-10-1",
    question: "Which hormone regulates blood sugar levels?",
    options: ["Adrenaline", "Insulin", "Thyroxine", "Growth hormone"],
    correctAnswer: 1,
    explanation:
      "Insulin, produced by the pancreas, regulates blood glucose levels by promoting glucose uptake by cells.",
    topicId: "control-coordination-10",
    difficulty: "medium",
  },
  {
    id: "biology-10-2",
    question:
      "In Mendel's experiments, if a tall plant (TT) is crossed with a short plant (tt), what will be the phenotype of F1 generation?",
    options: ["All tall", "All short", "Half tall, half short", "3 tall : 1 short"],
    correctAnswer: 0,
    explanation: "All F1 offspring will be Tt (heterozygous) and since tall is dominant, all will be tall.",
    topicId: "heredity-evolution-10",
    difficulty: "medium",
  },
  {
    id: "biology-10-3",
    question: "What is the role of decomposers in an ecosystem?",
    options: ["Produce food", "Consume primary producers", "Break down dead organic matter", "Control population"],
    correctAnswer: 2,
    explanation: "Decomposers break down dead plants and animals, recycling nutrients back into the ecosystem.",
    topicId: "environment-management-10",
    difficulty: "medium",
  },

  // ENGLISH QUESTIONS - Class 6
  {
    id: "english-6-1",
    question: "Which of the following is an example of a metaphor?",
    options: [
      "The wind whispered through the trees",
      "She is as brave as a lion",
      "Time is money",
      "The car screeched to a halt",
    ],
    correctAnswer: 2,
    explanation:
      "A metaphor directly compares two unlike things without using 'like' or 'as'. 'Time is money' compares time to money.",
    topicId: "poetry-6",
    difficulty: "hard",
  },
  {
    id: "english-6-2",
    question: "In the sentence 'The quick brown fox jumps over the lazy dog', what part of speech is 'quick'?",
    options: ["Noun", "Verb", "Adjective", "Adverb"],
    correctAnswer: 2,
    explanation: "'Quick' describes the fox, making it an adjective. Adjectives modify or describe nouns.",
    topicId: "grammar-basics-6",
    difficulty: "medium",
  },
  {
    id: "english-6-3",
    question: "What is the main purpose of a topic sentence in a paragraph?",
    options: ["To conclude the paragraph", "To provide examples", "To introduce the main idea", "To ask questions"],
    correctAnswer: 2,
    explanation: "A topic sentence introduces the main idea of a paragraph and usually appears at the beginning.",
    topicId: "creative-writing-6",
    difficulty: "medium",
  },

  // ENGLISH QUESTIONS - Class 7
  {
    id: "english-7-1",
    question: "Which sentence is in passive voice?",
    options: [
      "The teacher explained the lesson",
      "Students completed their homework",
      "The book was written by Shakespeare",
      "We are reading a novel",
    ],
    correctAnswer: 2,
    explanation:
      "In passive voice, the subject receives the action. 'The book was written by Shakespeare' shows the book receiving the action of being written.",
    topicId: "advanced-grammar-7",
    difficulty: "medium",
  },
  {
    id: "english-7-2",
    question: "What is the theme of a literary work?",
    options: [
      "The setting where it takes place",
      "The main character's name",
      "The central message or meaning",
      "The number of chapters",
    ],
    correctAnswer: 2,
    explanation:
      "Theme is the central message, lesson, or meaning that the author wants to convey through the literary work.",
    topicId: "literature-7",
    difficulty: "medium",
  },
  {
    id: "english-7-3",
    question: "Which word is a synonym for 'enormous'?",
    options: ["Tiny", "Gigantic", "Medium", "Regular"],
    correctAnswer: 1,
    explanation: "'Gigantic' means extremely large, which is similar in meaning to 'enormous'.",
    topicId: "vocabulary-7",
    difficulty: "easy",
  },

  // ENGLISH QUESTIONS - Class 8
  {
    id: "english-8-1",
    question: "What is alliteration?",
    options: [
      "Repetition of vowel sounds",
      "Repetition of consonant sounds at the beginning of words",
      "Comparison using 'like' or 'as'",
      "Giving human qualities to non-human things",
    ],
    correctAnswer: 1,
    explanation:
      "Alliteration is the repetition of the same consonant sound at the beginning of words in close succession, like 'Peter Piper picked'.",
    topicId: "literary-devices-8",
    difficulty: "medium",
  },
  {
    id: "english-8-2",
    question: "When giving a speech, what is the most important factor for engaging your audience?",
    options: [
      "Speaking very loudly",
      "Using complex vocabulary",
      "Making eye contact and varying your tone",
      "Reading directly from notes",
    ],
    correctAnswer: 2,
    explanation:
      "Eye contact creates connection with the audience, and varying tone keeps them engaged and interested in your message.",
    topicId: "public-speaking-8",
    difficulty: "medium",
  },
  {
    id: "english-8-3",
    question: "What should you consider when evaluating the credibility of a website?",
    options: [
      "How colorful it looks",
      "The author's credentials and the publication date",
      "How many pictures it has",
      "The website's loading speed",
    ],
    correctAnswer: 1,
    explanation:
      "Credible sources have qualified authors and current information. Always check who wrote it and when it was published.",
    topicId: "media-literacy-8",
    difficulty: "hard",
  },
]

export const SAMPLE_GAMES: Game[] = [
  {
    id: "math-puzzle",
    title: "Number Pattern Puzzle",
    description: "Find the missing number in the sequence",
    type: "puzzle",
    difficulty: "easy",
    subjectId: "math",
  },
  {
    id: "science-memory",
    title: "Element Memory Game",
    description: "Match chemical elements with their symbols",
    type: "memory",
    difficulty: "medium",
    subjectId: "chemistry",
  },
  {
    id: "word-scramble",
    title: "Science Word Scramble",
    description: "Unscramble scientific terms",
    type: "word",
    difficulty: "easy",
    subjectId: "science",
  },
  {
    id: "math-memory",
    title: "Math Symbol Memory",
    description: "Match mathematical symbols and operations",
    type: "memory",
    difficulty: "easy",
    subjectId: "math",
  },
  {
    id: "physics-puzzle",
    title: "Physics Formula Challenge",
    description: "Complete the physics formulas",
    type: "puzzle",
    difficulty: "hard",
    subjectId: "physics",
  },
  {
    id: "biology-word",
    title: "Biology Terms Scramble",
    description: "Unscramble biological terms and concepts",
    type: "word",
    difficulty: "medium",
    subjectId: "biology",
  },
  {
    id: "english-word",
    title: "Vocabulary Builder",
    description: "Unscramble English words and learn meanings",
    type: "word",
    difficulty: "easy",
    subjectId: "english",
  },
  {
    id: "general-quiz",
    title: "Quick Knowledge Quiz",
    description: "Test your knowledge across subjects",
    type: "quiz",
    difficulty: "medium",
  },
]
