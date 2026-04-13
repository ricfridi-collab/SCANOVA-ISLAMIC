// بنك أسئلة دكتور شويدرة
const MASTER_DB = {
    quran: [
        {q:"ما معنى النبأ العظيم؟", o:["البعث بعد الموت","أخبار الناس","يوم الجمعة"], a:"البعث بعد الموت"},
        {q:"معنى ثجاجاً في سورة النبأ؟", o:["منصباً بكثرة","قليلاً","بارداً"], a:"منصباً بكثرة"},
        {q:"ما هي السورة التي تسمى عروس القرآن؟", o:["الرحمن","يس","الواقعة"], a:"الرحمن"},
        {q:"ما معنى (أوتاداً)؟", o:["تثبت الأرض كالأعمدة","الجبال الملونة","الأشجار"], a:"تثبت الأرض كالأعمدة"},
        {q:"كم عدد سجدات التلاوة في القرآن؟", o:["15 سجدة","10 سجدات","12 سجدة"], a:"15 سجدة"}
    ],
    aqida: [
        {q:"الإيمان باليوم الآخر هو الركن:", o:["الخامس","الرابع","السادس"], a:"الخامس"},
        {q:"ما هو الركن الأول من أركان الإيمان؟", o:["الإيمان بالله","الإيمان بالكتب","الإيمان بالرسل"], a:"الإيمان بالله"},
        {q:"من هو الملك الموكل بالوحي؟", o:["جبريل عليه السلام","ميكائيل","إسرافيل"], a:"جبريل عليه السلام"},
        {q:"ما معنى الإيمان بالقضاء والقدر؟", o:["التسليم بأمر الله","ترك العمل والاجتهاد","الخوف من المستقبل"], a:"التسليم بأمر الله"}
    ],
    fiqh: [
        {q:"نسبة زكاة الأموال هي:", o:["2.5%","10%","5%"], a:"2.5%"},
        {q:"الوقوف بعرفة هو ركن أساسي في:", o:["الحج","العمرة","الصلاة"], a:"الحج"},
        {q:"متى فرضت الصلوات الخمس؟", o:["في رحلة الإسراء والمعراج","في السنة الثانية للهجرة","بعد فتح مكة"], a:"في رحلة الإسراء والمعراج"},
        {q:"ما حكم صلاة الوتر؟", o:["سنة مؤكدة","فرض عين","مكروهة"], a:"سنة مؤكدة"}
    ],
    sira: [
        {q:"من هو الخليفة الراشد الرابع؟", o:["علي بن أبي طالب","عمر بن الخطاب","أبو بكر"], a:"علي بن أبي طالب"},
        {q:"أين ولد النبي صلى الله عليه وسلم؟", o:["مكة المكرمة","المدينة المنورة","الطائف"], a:"مكة المكرمة"},
        {q:"ما هي أول غزوة كبرى في الإسلام؟", o:["غزوة بدر","غزوة أحد","غزوة الخندق"], a:"غزوة بدر"},
        {q:"كم كان عمر النبي عند نزول الوحي؟", o:["40 سنة","25 سنة","33 سنة"], a:"40 سنة"}
    ]
};

let currentSet = [], qIdx = 0;

// دالة بدء الاختبار مع خلط عشوائي مكثف
function startQuiz(cat) {
    let originalQuestions = MASTER_DB[cat];
    currentSet = [];
    
    // توليد 50 سؤالاً عبر اختيار عشوائي مستمر من البنك
    for(let i=0; i<50; i++) {
        let randomQ = originalQuestions[Math.floor(Math.random() * originalQuestions.length)];
        // نأخذ نسخة عميقة من السؤال لخلط خياراته لاحقاً دون التأثير على الأصل
        currentSet.push(JSON.parse(JSON.stringify(randomQ))); 
    }

    qIdx = 0;
    document.getElementById('modal').style.display = 'flex';
    
    // رسم عداد الكرات الـ 50 بشكل متناسق
    const bar = document.getElementById('penaltyBar');
    bar.innerHTML = '';
    for(let i=0; i<50; i++) {
        let dot = document.createElement('div');
        dot.className = 'ball'; dot.id = 'ball-' + i;
        bar.appendChild(dot);
    }
    showQuestion();
}

// عرض السؤال مع خلط الخيارات
function showQuestion() {
    const q = currentSet[qIdx];
    document.getElementById('qCounter').innerText = `السؤال ${qIdx + 1} من 50`;
    document.getElementById('qText').innerText = q.q;
    const optDiv = document.getElementById('options');
    optDiv.innerHTML = '';
    
    // خلط ترتيب الخيارات (أ، ب، ج) في كل مرة
    let shuffledOptions = [...q.o].sort(() => Math.random() - 0.5);

    shuffledOptions.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'opt-btn'; btn.innerText = opt;
        btn.onclick = () => {
            const isCorrect = opt === q.a;
            document.getElementById('ball-' + qIdx).classList.add(isCorrect ? 'correct' : 'wrong');
            
            if(!isCorrect) {
                alert("إجابة خاطئة يا بطل. ركز في السؤال القادم!\nالجواب الصحيح: " + q.a);
            }
            
            qIdx++;
            if(qIdx < 50) {
                showQuestion();
            } else {
                alert("ممتاز دكتور شويدرة! لقد أنهيت التحدي بنجاح.");
                closeQuiz();
            }
        };
        optDiv.appendChild(btn);
    });
}

function closeQuiz() {
    document.getElementById('modal').style.display = 'none';
}
