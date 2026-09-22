// ==================================================
// GLOBAL BIRTHDAY CONFIGURATION
// ==================================================
// You can easily replace the name, creator, song, and photos here
// without touching any application code!

export const birthdayConfig = {
  name: "Jiaa",
  creator: "Anshu",

  // Audio track located in /public/music/
  song: "/music/birthday-song.mp3",
  songTitle: "Pehle Bhi Main (Birthday Acoustic)",

  // Photo memories located in /public/images/
  // Supports both simple string paths or objects with custom captions!
  memories: [
    {
      url: "/images/memory1.jpg",
      caption: "Two trouble-makers, one frame! Forever laughing together 😂❤️"
    },
    {
      url: "/images/memory2.jpg",
      caption: "Just another unforgettable day ❤️"
    },
    {
      url: "/images/memory3.jpg",
      caption: "Too cute with the heart crown filter ✨"
    },
    {
      url: "/images/memory4.jpg",
      caption: "That genuine, radiant smile of yours 🌸"
    },
    {
      url: "/images/memory5.jpg",
      caption: "Somehow we survived this adventure 😂"
    },
    {
      url: "/images/memory6.jpg",
      caption: "Memories that deserve an endless replay ✨"
    },
    {
      url: "/images/memory7.jpg",
      caption: "The undisputed queen of cute expressions 👑❤️"
    },
    {
      url: "/images/memory8.jpg",
      caption: "Too many laughs, never enough pictures ❤️"
    },
    {
      url: "/images/memory9.jpg",
      caption: "Years may pass, but this bond stays forever 💫"
    }
  ],

  // Quiz questions for the friendship game
  quizQuestions: [
    {
      id: 1,
      question: "Who is more likely to cause unnecessary chaos? 😂",
      options: [
        { text: "Jiaa 😇", commentary: "Wait, angels cause chaos?! Definitely true! 😂" },
        { text: "Anshu 😎", commentary: "Anshu tries to be innocent, but we know the truth! 😏" },
        { text: "Both of us 💀", commentary: "1000% CORRECT! Double trouble whenever we are together! 💀💥", isBest: true }
      ]
    },
    {
      id: 2,
      question: "Who usually wins an argument?",
      options: [
        { text: "Anshu", commentary: "Anshu wishes! That only happens in alternate universes 😂" },
        { text: "Jiaa 👑", commentary: "Bow down to Her Majesty Jiaa! Queen of winning arguments! 👑✨", isBest: true },
        { text: "Nobody survives 😂", commentary: "A devastating victory where everyone is exhausted! 😂" }
      ]
    },
    {
      id: 3,
      question: "What is Jiaa's most dangerous superpower?",
      options: [
        { text: "Her smile 😍", commentary: "Instant killer! Impossible to stay mad at that smile! 😍" },
        { text: "Her attitude 😎", commentary: "Boss mode: Activated! No one can handle the swag! 😎" },
        { text: "Her ability to annoy Anshu 😂", commentary: "LEGENDARY LEVEL! A specialized art form mastered over years! 🎯😂", isBest: true }
      ]
    },
    {
      id: 4,
      question: "If Jiaa says ‘I'm not angry’... what does it mean?",
      options: [
        { text: "She's actually not angry", commentary: "ERROR 404: Never happens! Rookie mistake! 😂" },
        { text: "RUN. 😂", commentary: "Pack your bags, flee the continent immediately! 🏃‍♂️💨", isBest: true },
        { text: "Apologize immediately ❤️", commentary: "Wise survival choice! Plus chocolate helps! 🍫❤️" }
      ]
    },
    {
      id: 5,
      question: "What does Anshu owe Jiaa?",
      options: [
        { text: "A birthday gift 🎁", commentary: "Of course, this very surprise! 🎁" },
        { text: "Unlimited friendship ♾️", commentary: "Lifetime subscription granted, no refunds! ♾️❤️" },
        { text: "Snacks forever 🍫", commentary: "Never-ending food delivery on demand! 🍕" },
        { text: "ALL OF THE ABOVE 😂", commentary: "BINGO! 100/100! All of the above, forever and always! 🎉🥳", isBest: true }
      ]
    }
  ]
};
