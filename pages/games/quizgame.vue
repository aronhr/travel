<script setup lang="ts">
import { ref } from 'vue';

// Players
const players = ref([{ name: '' }]);
const currentPlayer = ref('');
const currentQuestion = ref('');
const currentAnswer = ref('');
const currentChoices = ref([]);
const isGameStarted = ref(false);
const isAnswerCorrect = ref(null); // null: no answer yet, true: correct, false: wrong

// Questions (You can add more categories and questions)
const questions = ref([
  {
    question: "What's the capital of France?",
    answer: "Paris",
    choices: ["Paris", "Berlin", "London", "Rome"]
  },
  {
    question: "Which year did the Titanic sink?",
    answer: "1912",
    choices: ["1910", "1911", "1912", "1913"]
  },
  {
    question: "Who painted the Mona Lisa?",
    answer: "Leonardo da Vinci",
    choices: ["Pablo Picasso", "Leonardo da Vinci", "Vincent van Gogh", "Claude Monet"]
  },
  {
    question: "Which planet is known as the Red Planet?",
    answer: "Mars",
    choices: ["Mars", "Jupiter", "Venus", "Saturn"]
  },
  {
    question: "What is the largest ocean on Earth?",
    answer: "Pacific Ocean",
    choices: ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean"]
  },
  {
    question: "Which country is home to the kangaroo?",
    answer: "Australia",
    choices: ["Australia", "South Africa", "India", "Brazil"]
  },
  {
    question: "What is the chemical symbol for water?",
    answer: "H2O",
    choices: ["H2O", "O2", "CO2", "He"]
  },
  {
    question: "In which year did World War II end?",
    answer: "1945",
    choices: ["1939", "1941", "1945", "1950"]
  },
  {
    question: "What is the tallest mountain in the world?",
    answer: "Mount Everest",
    choices: ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"]
  },
  {
    question: "Which country invented pizza?",
    answer: "Italy",
    choices: ["Italy", "Greece", "France", "Spain"]
  },
  {
    question: "What is the capital of Japan?",
    answer: "Tokyo",
    choices: ["Tokyo", "Kyoto", "Osaka", "Hiroshima"]
  },
  {
    question: "Which company is known for the iPhone?",
    answer: "Apple",
    choices: ["Apple", "Samsung", "Google", "Microsoft"]
  },
  {
    question: "Who wrote the play 'Romeo and Juliet'?",
    answer: "William Shakespeare",
    choices: ["Charles Dickens", "Jane Austen", "William Shakespeare", "Leo Tolstoy"]
  },
  {
    question: "What is the hardest natural substance on Earth?",
    answer: "Diamond",
    choices: ["Diamond", "Gold", "Iron", "Sapphire"]
  },
  {
    question: "Which animal is the largest mammal in the world?",
    answer: "Blue Whale",
    choices: ["Elephant", "Blue Whale", "Giraffe", "Shark"]
  },
  {
    question: "In which city is the Eiffel Tower located?",
    answer: "Paris",
    choices: ["Rome", "London", "Paris", "Berlin"]
  },
  {
    question: "What is the smallest planet in our solar system?",
    answer: "Mercury",
    choices: ["Venus", "Mars", "Mercury", "Neptune"]
  },
  {
    question: "Which country won the FIFA World Cup in 2018?",
    answer: "France",
    choices: ["Brazil", "Germany", "France", "Argentina"]
  },
  {
    question: "What is the square root of 64?",
    answer: "8",
    choices: ["6", "7", "8", "9"]
  },
  {
    question: "What is the primary ingredient in guacamole?",
    answer: "Avocado",
    choices: ["Tomato", "Avocado", "Onion", "Lettuce"]
  },
  {
    question: "In which year did man first land on the moon?",
    answer: "1969",
    choices: ["1967", "1968", "1969", "1970"]
  },
  {
    question: "Who is known as the father of physics?",
    answer: "Isaac Newton",
    choices: ["Isaac Newton", "Albert Einstein", "Nikola Tesla", "Galileo Galilei"]
  },
  {
    question: "Which country is the largest by land area?",
    answer: "Russia",
    choices: ["Canada", "China", "Russia", "United States"]
  },
  {
    question: "What is the fastest land animal?",
    answer: "Cheetah",
    choices: ["Lion", "Horse", "Cheetah", "Tiger"]
  },
  {
    question: "How many continents are there on Earth?",
    answer: "7",
    choices: ["5", "6", "7", "8"]
  },
  {
    question: "Which planet is closest to the Sun?",
    answer: "Mercury",
    choices: ["Mercury", "Venus", "Earth", "Mars"]
  },
  {
    question: "What color are the stars on the American flag?",
    answer: "White",
    choices: ["Red", "White", "Blue", "Yellow"]
  },
  {
    question: "What is the boiling point of water in Celsius?",
    answer: "100",
    choices: ["50", "75", "90", "100"]
  },
  {
    question: "What is the largest island in the world?",
    answer: "Greenland",
    choices: ["Madagascar", "Australia", "Greenland", "Borneo"]
  },
  {
    question: "In which sport would you perform a slam dunk?",
    answer: "Basketball",
    choices: ["Tennis", "Baseball", "Basketball", "Soccer"]
  },
  {
    question: "Which famous scientist introduced the theory of relativity?",
    answer: "Albert Einstein",
    choices: ["Isaac Newton", "Albert Einstein", "Stephen Hawking", "Marie Curie"]
  },
  {
    question: "What is the main ingredient of hummus?",
    answer: "Chickpeas",
    choices: ["Lentils", "Chickpeas", "Quinoa", "Beans"]
  },
  {
    question: "Which planet has the most moons?",
    answer: "Saturn",
    choices: ["Earth", "Mars", "Saturn", "Jupiter"]
  },
  {
    question: "What is the largest desert in the world?",
    answer: "Sahara Desert",
    choices: ["Sahara Desert", "Gobi Desert", "Kalahari Desert", "Mojave Desert"]
  },
  {
    question: "What is the national currency of Japan?",
    answer: "Yen",
    choices: ["Yuan", "Yen", "Won", "Rupee"]
  },
  {
    question: "What is the freezing point of water in Celsius?",
    answer: "0",
    choices: ["0", "-10", "-20", "32"]
  },
  {
    question: "What is the name of the longest river in the world?",
    answer: "Nile River",
    choices: ["Amazon River", "Yangtze River", "Mississippi River", "Nile River"]
  },
  {
    question: "Who was the first man to step on the moon?",
    answer: "Neil Armstrong",
    choices: ["Buzz Aldrin", "Yuri Gagarin", "Neil Armstrong", "Michael Collins"]
  },
  {
    question: "How many legs does a spider have?",
    answer: "8",
    choices: ["6", "8", "10", "12"]
  },
  {
    question: "Which chemical element has the symbol 'O'?",
    answer: "Oxygen",
    choices: ["Oxygen", "Hydrogen", "Carbon", "Gold"]
  },
  {
    question: "Which artist is famous for the painting 'The Starry Night'?",
    answer: "Vincent van Gogh",
    choices: ["Claude Monet", "Pablo Picasso", "Vincent van Gogh", "Leonardo da Vinci"]
  },
  {
    question: "What is the largest bone in the human body?",
    answer: "Femur",
    choices: ["Skull", "Femur", "Rib", "Tibia"]
  },
  {
    question: "Who was the first President of the United States?",
    answer: "George Washington",
    choices: ["Thomas Jefferson", "George Washington", "Abraham Lincoln", "John Adams"]
  },
  {
    question: "What is the hardest rock on Earth?",
    answer: "Diamond",
    choices: ["Granite", "Marble", "Diamond", "Quartz"]
  },
  {
    question: "What is the smallest country in the world?",
    answer: "Vatican City",
    choices: ["Monaco", "Malta", "Vatican City", "Luxembourg"]
  },
  {
    question: "Who was the author of 'The Great Gatsby'?",
    answer: "F. Scott Fitzgerald",
    choices: ["Ernest Hemingway", "Mark Twain", "F. Scott Fitzgerald", "John Steinbeck"]
  },
  {
    question: "Which country is famous for producing maple syrup?",
    answer: "Canada",
    choices: ["United States", "Canada", "Finland", "Norway"]
  },
  {
    question: "What does the 'E' in 'E=mc²' stand for?",
    answer: "Energy",
    choices: ["Electricity", "Energy", "Energy", "Efficiency"]
  },
  {
    question: "Which film won the Academy Award for Best Picture in 1994?",
    answer: "Forrest Gump",
    choices: ["Pulp Fiction", "Forrest Gump", "The Shawshank Redemption", "The Lion King"]
  },
  {
    question: "What is the largest species of shark?",
    answer: "Whale Shark",
    choices: ["Great White Shark", "Hammerhead Shark", "Whale Shark", "Tiger Shark"]
  },
  {
    question: "What year did the Berlin Wall fall?",
    answer: "1989",
    choices: ["1987", "1988", "1989", "1990"]
  },
  {
    question: "Who was the first woman to win a Nobel Prize?",
    answer: "Marie Curie",
    choices: ["Marie Curie", "Rosalind Franklin", "Jane Goodall", "Ada Lovelace"]
  },
  {
    question: "Which planet has the most gravity?",
    answer: "Jupiter",
    choices: ["Earth", "Mars", "Saturn", "Jupiter"]
  },
  {
    question: "In which city would you find the Colosseum?",
    answer: "Rome",
    choices: ["Athens", "Venice", "Florence", "Rome"]
  },
  {
    question: "Which element has the atomic number 1?",
    answer: "Hydrogen",
    choices: ["Helium", "Oxygen", "Carbon", "Hydrogen"]
  },
  {
    question: "What is the longest river in the United States?",
    answer: "Missouri River",
    choices: ["Mississippi River", "Colorado River", "Ohio River", "Missouri River"]
  },
  {
    question: "Who invented the telephone?",
    answer: "Alexander Graham Bell",
    choices: ["Alexander Graham Bell", "Thomas Edison", "Nikola Tesla", "Benjamin Franklin"]
  },
  {
    question: "Which country hosted the 2016 Summer Olympics?",
    answer: "Brazil",
    choices: ["China", "Brazil", "Japan", "Russia"]
  },
  {
    question: "What does DNA stand for?",
    answer: "Deoxyribonucleic Acid",
    choices: ["Deoxyribonucleic Acid", "Ribonucleic Acid", "Deoxynucleic Adenine", "Deoxyribose Acid"]
  },
  {
    question: "In what year did the first iPhone release?",
    answer: "2007",
    choices: ["2006", "2007", "2008", "2009"]
  },
  {
    question: "Which artist sang 'Shape of You'?",
    answer: "Ed Sheeran",
    choices: ["Ed Sheeran", "Justin Bieber", "Shawn Mendes", "Sam Smith"]
  },
  {
    question: "What is the largest planet in our solar system?",
    answer: "Jupiter",
    choices: ["Earth", "Mars", "Jupiter", "Neptune"]
  },
  {
    question: "Who wrote the Harry Potter series?",
    answer: "J.K. Rowling",
    choices: ["J.K. Rowling", "J.R.R. Tolkien", "George R.R. Martin", "Stephen King"]
  },
  {
    question: "In which year did the United States land a man on the moon?",
    answer: "1969",
    choices: ["1967", "1968", "1969", "1970"]
  },
  {
    question: "Which country has the most time zones?",
    answer: "France",
    choices: ["Russia", "United States", "China", "France"]
  },
  {
    question: "Which sport is known as 'the beautiful game'?",
    answer: "Soccer",
    choices: ["Tennis", "Soccer", "Basketball", "Cricket"]
  },
  {
    question: "Which famous building is located in Agra, India?",
    answer: "Taj Mahal",
    choices: ["Taj Mahal", "Great Wall of China", "Eiffel Tower", "Sydney Opera House"]
  },
  {
    question: "What is the smallest country by land area?",
    answer: "Vatican City",
    choices: ["Monaco", "Vatican City", "Malta", "San Marino"]
  },
  {
    question: "Who developed the theory of general relativity?",
    answer: "Albert Einstein",
    choices: ["Isaac Newton", "Albert Einstein", "Stephen Hawking", "Nikola Tesla"]
  },
  {
    question: "In what year did World War I begin?",
    answer: "1914",
    choices: ["1912", "1913", "1914", "1915"]
  },
  {
    question: "Which Disney movie features the song 'Let It Go'?",
    answer: "Frozen",
    choices: ["Moana", "Frozen", "Tangled", "Beauty and the Beast"]
  },
  {
    question: "What is the highest-grossing film of all time?",
    answer: "Avatar",
    choices: ["Titanic", "Avengers: Endgame", "Avatar", "Star Wars: The Force Awakens"]
  },
  {
    question: "What is the world's largest coffee-growing country?",
    answer: "Brazil",
    choices: ["Colombia", "Vietnam", "Ethiopia", "Brazil"]
  },
  {
    question: "Who discovered penicillin?",
    answer: "Alexander Fleming",
    choices: ["Alexander Fleming", "Marie Curie", "Louis Pasteur", "Gregor Mendel"]
  },
  {
    question: "What is the name of the ship that took the Pilgrims to America in 1620?",
    answer: "Mayflower",
    choices: ["Santa Maria", "Mayflower", "Pinta", "Beagle"]
  },
  {
    question: "Which artist painted the Sistine Chapel ceiling?",
    answer: "Michelangelo",
    choices: ["Leonardo da Vinci", "Raphael", "Michelangelo", "Donatello"]
  },
  {
    question: "Which country is known as the Land of the Rising Sun?",
    answer: "Japan",
    choices: ["China", "Japan", "South Korea", "Thailand"]
  },
  {
    question: "Who is the lead singer of the band Queen?",
    answer: "Freddie Mercury",
    choices: ["David Bowie", "Elton John", "Freddie Mercury", "Mick Jagger"]
  },
  {
    question: "What is the largest organ in the human body?",
    answer: "Skin",
    choices: ["Heart", "Liver", "Lungs", "Skin"]
  },
  {
    question: "Which actor played Jack Dawson in Titanic?",
    answer: "Leonardo DiCaprio",
    choices: ["Johnny Depp", "Tom Cruise", "Leonardo DiCaprio", "Brad Pitt"]
  },
  {
    question: "What is the capital city of Australia?",
    answer: "Canberra",
    choices: ["Sydney", "Melbourne", "Canberra", "Brisbane"]
  },
  {
    question: "What does HTTP stand for?",
    answer: "HyperText Transfer Protocol",
    choices: ["HyperText Transfer Protocol", "HyperText Transmission Protocol", "HyperTool Transfer Protocol", "Hyperlink Transfer Protocol"]
  },
  {
    question: "Which country has won the most FIFA World Cup titles?",
    answer: "Brazil",
    choices: ["Germany", "Italy", "Brazil", "Argentina"]
  },
  {
    question: "What is the chemical symbol for gold?",
    answer: "Au",
    choices: ["Ag", "Au", "Fe", "Pb"]
  },
  {
    question: "Which artist painted 'The Persistence of Memory'?",
    answer: "Salvador Dalí",
    choices: ["Pablo Picasso", "Salvador Dalí", "Claude Monet", "Andy Warhol"]
  },
  {
    question: "Which metal is liquid at room temperature?",
    answer: "Mercury",
    choices: ["Lead", "Iron", "Mercury", "Zinc"]
  },
  {
    question: "What is the capital city of Canada?",
    answer: "Ottawa",
    choices: ["Toronto", "Vancouver", "Montreal", "Ottawa"]
  },
  {
    question: "Which planet is closest in size to Earth?",
    answer: "Venus",
    choices: ["Mars", "Venus", "Jupiter", "Mercury"]
  },
  {
    question: "Which artist is famous for cutting off his ear?",
    answer: "Vincent van Gogh",
    choices: ["Claude Monet", "Pablo Picasso", "Vincent van Gogh", "Jackson Pollock"]
  },
  {
    question: "Which country won the first FIFA World Cup in 1930?",
    answer: "Uruguay",
    choices: ["Brazil", "Germany", "Argentina", "Uruguay"]
  },
  {
    question: "What is the national language of Brazil?",
    answer: "Portuguese",
    choices: ["Spanish", "Portuguese", "French", "English"]
  },
  {
    question: "Who directed the movie 'Inception'?",
    answer: "Christopher Nolan",
    choices: ["Martin Scorsese", "Quentin Tarantino", "Christopher Nolan", "Steven Spielberg"]
  },
  {
    question: "What is the largest species of penguin?",
    answer: "Emperor Penguin",
    choices: ["King Penguin", "Emperor Penguin", "Gentoo Penguin", "Adélie Penguin"]
  },
  {
    question: "What is the national animal of China?",
    answer: "Giant Panda",
    choices: ["Red Panda", "Giant Panda", "Snow Leopard", "Golden Monkey"]
  },
  {
    question: "Which country is known as the Land of Fire and Ice?",
    answer: "Iceland",
    choices: ["Greenland", "Iceland", "Norway", "New Zealand"]
  },
  {
    question: "What is the largest species of bear?",
    answer: "Polar Bear",
    choices: ["Grizzly Bear", "Polar Bear", "Brown Bear", "Black Bear"]
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    answer: "Harper Lee",
    choices: ["J.D. Salinger", "Harper Lee", "John Steinbeck", "F. Scott Fitzgerald"]
  },
  {
    question: "What is the national sport of Japan?",
    answer: "Sumo",
    choices: ["Karate", "Judo", "Sumo", "Kendo"]
  },
  {
    question: "Which country is known as the Land of the Midnight Sun?",
    answer: "Norway",
    choices: ["Sweden", "Finland", "Norway", "Denmark"]
  },
  {
    question: "What is the largest species of deer?",
    answer: "Moose",
    choices: ["Reindeer", "Moose", "Elk", "Caribou"]
  },
  {
    question: "Who painted 'The Birth of Venus'?",
    answer: "Sandro Botticelli",
    choices: ["Leonardo da Vinci", "Michelangelo", "Sandro Botticelli", "Raphael"]
  },
  {
    question: "What is the national flower of the United States?",
    answer: "Rose",
    choices: ["Daisy", "Tulip", "Rose", "Sunflower"]
  },
  {
    question: "Which country is known as the Land of a Thousand Lakes?",
    answer: "Finland",
    choices: ["Sweden", "Norway", "Finland", "Denmark"]
  }
]);

// Adding and removing players
const addPlayer = () => {
  players.value.push({ name: '' });
};

const removePlayer = (index) => {
  players.value.splice(index, 1);
};

// Start the game
const startGame = () => {
  if (players.value.length < 2 || players.value.some(player => !player.name.trim())) {
    alert("Please enter valid player names!");
    return;
  }
  isGameStarted.value = true;
  currentPlayer.value = players.value[0].name;
  nextQuestion();
};

// Go to the next question
const nextQuestion = () => {
  isAnswerCorrect.value = null;
  const randomIndex = Math.floor(Math.random() * questions.value.length);
  const question = questions.value[randomIndex];
  currentQuestion.value = question.question;
  currentAnswer.value = question.answer;
  currentChoices.value = question.choices;

  // Switch to next player
  const currentIndex = players.value.findIndex(player => player.name === currentPlayer.value);
  currentPlayer.value = players.value[(currentIndex + 1) % players.value.length].name;
};

// Handle player's answer
const answerQuestion = (choice) => {
  if (choice === currentAnswer.value) {
    isAnswerCorrect.value = true;
  } else {
    isAnswerCorrect.value = false;
  }
  // After a delay, move to the next question
  setTimeout(() => {
    nextQuestion();
  }, 2000);
};
</script>

<template>
  <div class="h-full bg-gray-800 flex flex-col items-center justify-center text-white">
    <h1 class="text-4xl font-bold mb-10">Quiz Game</h1>

    <!-- Player Input -->
    <div v-if="!isGameStarted" class="w-full max-w-lg mb-8">
      <h2 class="text-2xl font-bold mb-4">Enter Players</h2>
      <div v-for="(player, index) in players" :key="index" class="mb-2 flex items-center">
        <input
            v-model="player.name"
            type="text"
            placeholder="Enter player name"
            class="bg-gray-200 text-black px-3 py-2 rounded-md w-full"
        />
        <button @click="removePlayer(index)" class="bg-red-500 text-white px-2 py-1 rounded-md ml-2">X</button>
      </div>
      <button @click="addPlayer" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
        Add Player
      </button>
      <button @click="startGame" class="bg-green-500 text-white px-6 py-2 mt-4 rounded-lg hover:bg-green-600 transition">
        Start Game
      </button>
    </div>

    <!-- Quiz Game -->
    <div v-if="isGameStarted" class="w-full max-w-lg text-center">
      <h2 class="text-2xl font-bold mb-4">Current Player: {{ currentPlayer }}</h2>
      <div v-if="currentQuestion" class="bg-white text-black p-4 rounded-lg mb-4">
        <p class="text-xl mb-4">{{ currentQuestion }}</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
              v-for="choice in currentChoices"
              :key="choice"
              @click="answerQuestion(choice)"
              class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {{ choice }}
          </button>
        </div>
      </div>

      <!-- Answer Feedback -->
      <div v-if="isAnswerCorrect !== null" class="mt-4">
        <p v-if="isAnswerCorrect" class="text-green-500 text-xl">Correct! 🎉</p>
        <p v-else class="text-red-500 text-xl">Wrong! Drink! 🍺</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* No additional styles needed since Tailwind handles the layout and styles */
</style>
