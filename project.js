console.log("Flashcard Words Quiz")
let words = [] // เก็บคำและความหมายที่พิมพ์เข้ามา
let currentWordIndex = 0 //คำที่เท่าไหร่
let incorrectWords = [] // เก็บคำที่ผู้เล่นตอบผิด
const form = document.getElementById("flashcard-form")
const gameContainer = document.getElementById("game-container")
let table = document.getElementById("flashcard-table")
const button = document.getElementById("start-btn")

//----------------------------------------------
function startGame() {
    button.textContent = "End"
    form.style.display = "none"
    gameContainer.style.display = "block"
    table.style.display = "none" // ซ่อนตาราง

    shuffle(words); // สุ่มคำก่อน
    currentWordIndex = 0
    incorrectWords = []

    if (words.length > 0) {
        showNextWord(); // แสดงคำแรก
    } else {
        endGame()
    }
}
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // ใช้ const หรือ let ที่นี่
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}
function endGame() {
    button.textContent = "Start"
    form.style.display = "block"
    gameContainer.style.display = "none"
    incorrectWords = []
    currentWordIndex = 0
    table.style.display = "block"
}
//----------------------------------------------
function checkAnswer() {
    const answer = document.getElementById("answer-input").value.trim().toLowerCase()
    const currentWord = document.getElementById("question-word").textContent.trim().toLowerCase()

    const foundWord = words.find((w) => w.word.toLowerCase() === currentWord)

    console.log(`Your answer: ${answer}`)
    console.log(`Question word: ${currentWord}`)

    if (foundWord) {
        console.log("Found word:", foundWord) // ตรวจสอบคำที่เจอ

        if (foundWord.meaning.toLowerCase() === answer) { //ถ้า meaning ตรงกับ คำตอบ
            document.getElementById("result-message").textContent = "Correct! :)"
        } else {
            document.getElementById("result-message").textContent = "Incorrect!,:/ Try again"
            incorrectWords.push(foundWord); // เก็บคำที่ผิด
            console.log(`Incorrect answer for word: ${currentWord}`)
            console.log("Incorrect words:", incorrectWords)
        }
    } else {
        console.log("Word not found in words array")
    }

    setTimeout(showNextWord, 1000)
}
//----------------------------------------------
function showNextWord() {
    const questionElement = document.getElementById("question-word");

    if (incorrectWords.length > 0) {
        const currentWord = incorrectWords.shift();
        questionElement.innerText = currentWord.word;
    } else if (currentWordIndex < words.length) {
        const currentWord = words[currentWordIndex];
        questionElement.innerText = currentWord.word;
        currentWordIndex++;
    } else {
        alert("Game complete! All words answered correctly.");
        endGame();
        return; // หยุดการทำงานถ้าคำหมดแล้ว
    }

    document.getElementById("answer-input").value = ""; // รีเซ็ต input
    document.getElementById("result-message").textContent = ""; // รีเซ็ตข้อความผลลัพธ์

    console.log("Next word displayed:", questionElement.innerText); // Debug ตรวจสอบคำที่แสดง
}
//----------------------------------------------
function start_btn() {
    if (button.textContent === "Start") {
        // ตรวจสอบว่ามีคำในตารางหรือไม่
        if (words.length === 0) {
            alert("Please add some words first.")
            return // ไม่เริ่มเกมถ้าไม่มีคำ
        }
        // ซ่อนฟอร์มและตาราง, แสดงเกม
        startGame() // เริ่มเกม
    } else {
        // แสดงฟอร์มและตาราง, ซ่อนเกม
        endGame() // จบดเกม
    }
}
//----------------------------------------------
function start_btn() {
    if (button.textContent === "Start") {
        // ตรวจสอบว่ามีคำในตารางหรือไม่
        if (words.length === 0) {
            alert("Please add some words first.")
            return // ไม่เริ่มเกมถ้าไม่มีคำ
        }
        // ซ่อนฟอร์มและตาราง, แสดงเกม
        startGame() // เริ่มเกม
    } else {
        // แสดงฟอร์มและตาราง, ซ่อนเกม
        endGame() // จบดเกม
    }
}
//----------------------------------------------
function table_list(event) {
    event.preventDefault() // ห้าม refresh
    console.log("table_list function is called")

    // สร้าง เอาข้อมูลจาก form
    let word = document.getElementById("word").value.trim()
    let meaning = document.getElementById("meaning").value.trim()

    if (!word || !meaning) {
        alert("Please fill in both the word and meaning!") // แจ้งเตือนกรอกข้อมูลไม่ครบ
        return // หยุดการทำงานถ้าไม่มีข้อมูลครบ
    }

    console.log("word: ", word, " meaning: ", meaning); // ดูคำที่กรอก
    words.push({ word, meaning }) // เพิ่มคำที่กรอกใน form ไปยัง array
    console.log("words array: ", words)

    // เรียก shuffle หลังจากเพิ่มคำใหม่เสร็จแล้ว
    shuffle(words); 

    // สร้างแถวในตาราง
    let table = document.getElementById("flashcard-table") // กำหนดค่า table
    let tbody = table.getElementsByTagName("tbody")[0]

    let newRow = tbody.insertRow()
    let cell1 = newRow.insertCell(0)
    let cell2 = newRow.insertCell(1)
    cell1.textContent = word
    cell2.textContent = meaning

    newRow.addEventListener("click", function () {
        // ลบแถวจากตาราง
        tbody.deleteRow(newRow.rowIndex - 1)

        // ลบคำที่ถูกเลือกจาก array
        words = words.filter((item) => item.word !== word) // ลบคำออกจาก array
        console.log("Updated words array after deletion: ", words) // ตรวจสอบผลการลบคำ
    })

    // เคลียร์ช่องกรอกข้อมูลหลังจากเพิ่ม
    document.getElementById("word").value = ""
    document.getElementById("meaning").value = ""
}
//----------------------------------------------
