const continueBtn=document.getElementById('continue-btn');
const currentQuestion=document.getElementById('currentQuestion');
const progressBar=document.getElementById('progressBar');
const questionNumber=document.getElementById('question-number');
const input=document.getElementById('input');
const para=document.getElementById('para');
const placeHolder=document.querySelector('[placeholder="Enter budget"]');
let questions=[
    {   id:1,
        Question:"Total Trip For Budget?",
        type:"number"
    },
    {   id:2,
        Question:"How did You Come To know About Us?",
        type:"text"
    }

]
let currentQuestionIndex=0;
function showQuestion()
{
    currentQuestion.textContent=questions[currentQuestionIndex].Question;
    
}


continueBtn.addEventListener('click',
()=>
{
     if (!validateInput()) {
        return; 
    }   
     if (currentQuestionIndex === 0) {
        saveBudgetValue();
    }

    input.value="" ;
    currentQuestionIndex++;
    progressBar.style.width="100%";
    questionNumber.textContent='Question 2 of 2';
    para.textContent="";
    placeHolder.value=" ";
    
    if(currentQuestionIndex<questions.length)
    {
        showQuestion();
    }
    if(currentQuestionIndex>questions.length-1)
    {
        window.location.replace("loadingScreen.html");
    }
    
}
)

function validateInput() {
    let value = input.value.trim();
    let type = questions[currentQuestionIndex].type;

    if (value === "") {
        alert("Please fill this field.");
        return false;
    }

    if (type === "number" && Number.isNaN(Number(value))) {
        alert("Please enter numbers only.");
        return false;
    }

    return true;
}
function saveBudgetValue()
{
    let budget=input.value.trim();
    localStorage.setItem("Budget",budget);
}