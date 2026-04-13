// بنك الأسئلة
const MASTER_DB = {
    quran: [
        {q:"ما معنى النبأ العظيم؟", o:["البعث بعد الموت","أخبار الناس","يوم الجمعة"], a:"البعث بعد الموت"},
        {q:"معنى ثجاجاً؟", o:["منصباً بكثرة","قليلاً","بارداً"], a:"منصباً بكثرة"},
        {q:"ما هي السورة التي تسمى عروس القرآن؟", o:["الرحمن","يس","الواقعة"], a:"الرحمن"},
        {q:"ما معنى (أوتاداً) في سورة النبأ؟", o:["تثبت الأرض","الجبال العالية","الأشجار"], a:"تثبت الأرض"},
        {q:"كم عدد سجدات التلاوة في القرآن؟", o:["15 سجدة","10 سجدات","12 سجدة"], a:"15 سجدة"}
    ],
    aqida: [
        {q:"الإيمان باليوم الآخر هو الركن:", o:["الخامس","الرابع","السادس"], a:"الخامس"},
        {q:"ما هو الركن الأول من أركان الإيمان؟", o:["الإيمان بالله","الإيمان بالكتب","الإيمان بالرسل"], a:"الإيمان بالله"},
        {q:"من هو الملك الموكل بالوحي؟", o:["جبريل عليه السلام","ميكائيل","إسرافيل"], a:"جبريل عليه السلام"},
        {q:"ما معنى الإيمان بالقضاء والقدر؟", o:["التسليم بأمر الله","ترك العمل","الخوف"], a:"التسليم بأمر الله"}
    ],
    fiqh: [
        {q:"نسبة زكاة الأموال هي:", o:["2.5%","10%","5%"], a:"2.5%"},
        {q:"الوقوف بعرفة هو ركن:", o:["الحج","الصوم","الصلاة"], a:"الحج"},
        {q:"متى فرضت الصلاة؟", o:["في الإسراء والمعراج","في السنة الثانية للهجرة","قبل البعثة"], a:"في الإسراء والمعراج"},
        {q:"ما حكم صلاة الوتر؟", o:["سنة مؤكدة","فرض عين","مكروهة"], a:"سنة مؤكدة"}
    ],
    sira: [
        {q:"من هو الخليفة الراشد الرابع؟", o:["علي بن أبي طالب","عمر بن الخطاب","أبو بكر"], a:"علي بن أبي طالب"},
        {q:"أين ولد النبي صلى الله عليه وسلم؟", o:["مكة المكرمة","المدينة المنورة","الطائف"], a:"مكة المكرمة"},
        {q:"ما هي أول غزوة في الإسلام؟", o:["غزوة بدر","غزوة أحد","غزوة الخندق"], a:"غزوة بدر"},
        {q:"كم كان عمر النبي عند البعثة؟", o:["40 سنة","25 سنة","35 سنة"], a:"40 سنة"}
    ]
};

let currentSet = [], qIdx = 0;

// بدء الاختبار
function startQuiz(cat) {
    let originalQuestions = MASTER_DB[cat];
    currentSet = [];
    
    // خلط واختيار 50 سؤالاً
    for(let i=0; i<50; i++) {
        let randomQ = originalQuestions[Math.floor(Math.random() * originalQuestions.length)];
        currentSet.push(JSON.parse(JSON.stringify(randomQ))); 
    }

    qIdx = 0;
    document.getElementById('modal').style.display = 'flex';
    
    // إنشاء عداد الكرات
    const bar = document.getElementById('penaltyBar');
    bar.innerHTML = '';
    for(let i=0; i<50; i++) {
        let dot = document.createElement('div');
        dot.className = 'ball'; dot.id = 'ball-' + i;
        bar.appendChild(dot);
    }
    showQuestion();
}

// عرض السؤال
function showQuestion() {
    const q = currentSet[qIdx];
    document.getElementById('qCounter').innerText = `السؤال ${qIdx + 1} / 50`;
    document.getElementById('qText').innerText = q.q;
    const optDiv = document.getElementById('options');
    optDiv.innerHTML = '';
    
    // خلط الخيارات
    let shuffledOptions = [...q.o].sort(() => Math.random() - 0.5);

    shuffledOptions.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'opt-btn'; btn.innerText = opt;
        btn.onclick = () => {
            const isCorrect = opt === q.a;
            document.getElementById('ball-' + qIdx).classList.add(isCorrect ? 'correct' : 'wrong');
            
            if(!isCorrect) alert("إجابة غير صحيحة، ركز يا بطل! \nالجواب هو: " + q.a);
            
            qIdx++;
            if(qIdx < 50) showQuestion();
            else {
                alert("هنيئاً لك! لقد أتممت التحدي بنجاح.");
                closeQuiz();
            }
        };
        optDiv.appendChild(btn);
    });
}

function closeQuiz() { document.getElementById('modal').style.display = 'none'; }
