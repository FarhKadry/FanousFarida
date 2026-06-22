import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';
import './trivia.css';
import './../animations.css';

import star from './../assets/goldstar.svg';
import bg from './../assets/menuBg.jpg';
import char from './../assets/questionchar.png';
import popSfx from './../assets/audio/pop.mp3';
import flapSfx from './../assets/audio/flap.mp3';
import pause from './../assets/pause.svg';
import collectSfx from './../assets/audio/collect.mp3';
import fanous from './../assets/fanous_empty.png';
import Timer from '../components/common/timer';
import IconBtn from '../components/common/iconbtn';
import Music from '../components/common/music';
import Progress from '../components/common/progress';
import { unlockNextLevel } from '../utils/progress';

const WIN_STARS = 4;
const GAME_DURATION = 50;
const QUESTIONS_PER_GAME = 4;

const ALL_QUESTIONS = [
  { q: 'في أي شهر يأتي رمضان؟', answers: ['التاسع', 'الثامن', 'العاشر'], correct: 0 },
  { q: 'كم عدد أركان الإسلام؟', answers: ['خمسة', 'ستة', 'أربعة'], correct: 0 },
  { q: 'ما هو أول ركن من أركان الإسلام؟', answers: ['الشهادة', 'الصلاة', 'الصوم'], correct: 0 },
  { q: 'كم عدد الصلوات المفروضة في اليوم؟', answers: ['خمس', 'ثلاث', 'سبع'], correct: 0 },
  { q: 'ما هو الكتاب المقدس للمسلمين؟', answers: ['القرآن الكريم', 'الإنجيل', 'التوراة'], correct: 0 },
  { q: 'من هو نبي الإسلام؟', answers: ['محمد ﷺ', 'موسى', 'عيسى'], correct: 0 },
  { q: 'في أي مدينة وُلد النبي محمد ﷺ؟', answers: ['مكة المكرمة', 'المدينة المنورة', 'الطائف'], correct: 0 },
  { q: 'ما هي القبلة التي يتجه إليها المسلمون في صلاتهم؟', answers: ['الكعبة المشرفة', 'المسجد النبوي', 'المسجد الأقصى'], correct: 0 },
  { q: 'ما اسم الليلة المباركة في رمضان؟', answers: ['ليلة القدر', 'ليلة النصف', 'ليلة الجمعة'], correct: 0 },
  { q: 'في أي العشر الأواخر تكون ليلة القدر؟', answers: ['الأخيرة من رمضان', 'الأولى من رمضان', 'وسط رمضان'], correct: 0 },
  { q: 'ما هو الأذان؟', answers: ['النداء للصلاة', 'دعاء الإفطار', 'قراءة القرآن'], correct: 0 },
  { q: 'ماذا يقول المسلم عند الإفطار؟', answers: ['اللهم لك صمت', 'الحمد لله', 'بسم الله'], correct: 0 },
  { q: 'ما هو السحور؟', answers: ['وجبة قبل الفجر في رمضان', 'وجبة الإفطار', 'صلاة التراويح'], correct: 0 },
  { q: 'ما صلاة التراويح؟', answers: ['صلاة مسنونة في رمضان', 'صلاة الفجر', 'صلاة مفروضة'], correct: 0 },
  { q: 'من أين نزل القرآن الكريم على النبي ﷺ؟', answers: ['غار حراء', 'المسجد الحرام', 'المدينة المنورة'], correct: 0 },
  { q: 'ما أول آية نزلت في القرآن الكريم؟', answers: ['اقرأ باسم ربك', 'الحمد لله', 'بسم الله'], correct: 0 },
  { q: 'كم عدد سور القرآن الكريم؟', answers: ['114 سورة', '100 سورة', '120 سورة'], correct: 0 },
  { q: 'ما أطول سورة في القرآن الكريم؟', answers: ['سورة البقرة', 'سورة آل عمران', 'سورة النساء'], correct: 0 },
  { q: 'ما أقصر سورة في القرآن الكريم؟', answers: ['سورة الكوثر', 'سورة الفاتحة', 'سورة الإخلاص'], correct: 0 },
  { q: 'ما عدد آيات سورة الفاتحة؟', answers: ['سبع آيات', 'خمس آيات', 'تسع آيات'], correct: 0 },
  { q: 'ما معنى كلمة "رمضان" في اللغة؟', answers: ['الحرارة الشديدة', 'الهدوء', 'الفرح'], correct: 0 },
  { q: 'ما الزكاة؟', answers: ['إخراج نسبة من المال للفقراء', 'صيام يوم كامل', 'صلاة مخصوصة'], correct: 0 },
  { q: 'ما الحج؟', answers: ['زيارة البيت الحرام في مكة', 'زيارة المدينة المنورة', 'زيارة القدس'], correct: 0 },
  { q: 'في أي شهر يكون الحج؟', answers: ['ذو الحجة', 'المحرم', 'رجب'], correct: 0 },
  { q: 'ما يوم عيد الفطر؟', answers: ['أول يوم بعد رمضان', 'آخر يوم رمضان', 'منتصف رمضان'], correct: 0 },
  { q: 'ما يوم عيد الأضحى؟', answers: ['اليوم العاشر من ذي الحجة', 'اليوم الأول من المحرم', 'اليوم الخامس عشر من شعبان'], correct: 0 },
  { q: 'ما اسم أم النبي محمد ﷺ؟', answers: ['آمنة', 'خديجة', 'فاطمة'], correct: 0 },
  { q: 'ما اسم أول زوجات النبي ﷺ؟', answers: ['خديجة بنت خويلد', 'عائشة', 'حفصة'], correct: 0 },
  { q: 'ما المسجد الذي بناه النبي ﷺ أول ما قدم المدينة؟', answers: ['مسجد قباء', 'المسجد النبوي', 'المسجد الحرام'], correct: 0 },
  { q: 'ما هي الهجرة في الإسلام؟', answers: ['انتقال النبي من مكة للمدينة', 'سفر المسلمين للحج', 'غزوة بدر'], correct: 0 },
  { q: 'ما أول صلاة في اليوم؟', answers: ['صلاة الفجر', 'صلاة الظهر', 'صلاة العصر'], correct: 0 },
  { q: 'ما آخر صلاة في اليوم؟', answers: ['صلاة العشاء', 'صلاة المغرب', 'صلاة العصر'], correct: 0 },
  { q: 'كم ركعة في صلاة الظهر؟', answers: ['أربع ركعات', 'ركعتان', 'ثلاث ركعات'], correct: 0 },
  { q: 'ما معنى "الصيام" في الإسلام؟', answers: ['الإمساك عن الطعام والشراب', 'قراءة القرآن', 'كثرة الدعاء'], correct: 0 },
  { q: 'ما المقصود بـ "الإفطار"؟', answers: ['أكل وجبة عند غروب الشمس', 'وجبة الفجر', 'الفطور اليومي'], correct: 0 },
  { q: 'بماذا يُستحب الإفطار؟', answers: ['على التمر', 'على الماء فقط', 'على الفاكهة'], correct: 0 },
  { q: 'في أي مدينة مصرية يشتهر التراث الإسلامي بالفانوس والزينة؟', answers: ['القاهرة', 'الإسكندرية', 'أسوان'], correct: 0 },
  { q: 'ما أقدم مسجد في مصر؟', answers: ['مسجد عمرو بن العاص', 'مسجد الأزهر', 'مسجد السيدة زينب'], correct: 0 },
  { q: 'من الذي فتح مصر في الإسلام؟', answers: ['عمرو بن العاص', 'خالد بن الوليد', 'سعد بن أبي وقاص'], correct: 0 },
  { q: 'في أي عام فُتحت مصر إسلامياً؟', answers: ['21 هجرياً', '10 هجرياً', '30 هجرياً'], correct: 0 },
  { q: 'ما اسم الجامعة الإسلامية الشهيرة في القاهرة؟', answers: ['الأزهر الشريف', 'جامعة القاهرة', 'جامعة عين شمس'], correct: 0 },
  { q: 'متى تأسس الأزهر الشريف؟', answers: ['عام 970 ميلادياً', 'عام 800 ميلادياً', 'عام 1100 ميلادياً'], correct: 0 },
  { q: 'ما الفانوس الرمضاني رمز لـ؟', answers: ['الاحتفال بقدوم رمضان', 'ليلة القدر فقط', 'العيد'], correct: 0 },
  { q: 'ما أول غزوة في الإسلام؟', answers: ['غزوة بدر', 'غزوة أحد', 'غزوة حنين'], correct: 0 },
  { q: 'في أي سنة كانت غزوة بدر؟', answers: ['السنة الثانية للهجرة', 'السنة الأولى للهجرة', 'السنة العاشرة للهجرة'], correct: 0 },
  { q: 'ما اسم صاحب النبي ﷺ في الهجرة؟', answers: ['أبو بكر الصديق', 'عمر بن الخطاب', 'علي بن أبي طالب'], correct: 0 },
  { q: 'ما اسم ابنة النبي ﷺ الوحيدة التي عاشت بعده؟', answers: ['فاطمة الزهراء', 'زينب', 'رقية'], correct: 0 },
  { q: 'ما عدد أبواب الجنة؟', answers: ['ثمانية أبواب', 'سبعة أبواب', 'عشرة أبواب'], correct: 0 },
  { q: 'ما الباب الذي يدخل منه الصائمون الجنة؟', answers: ['باب الريان', 'باب الصلاة', 'باب الكعبة'], correct: 0 },
  { q: 'ما معنى "الاعتكاف" في رمضان؟', answers: ['التفرغ للعبادة في المسجد', 'قيام الليل في البيت', 'ختم القرآن'], correct: 0 },
  { q: 'كم عدد أنبياء الله المذكورين في القرآن؟', answers: ['25 نبياً', '20 نبياً', '30 نبياً'], correct: 0 },
  { q: 'ما أول سورة في القرآن الكريم؟', answers: ['سورة الفاتحة', 'سورة البقرة', 'سورة الناس'], correct: 0 },
  { q: 'ما آخر سورة في القرآن الكريم؟', answers: ['سورة الناس', 'سورة الفلق', 'سورة الإخلاص'], correct: 0 },
  { q: 'ما هو "الوضوء"؟', answers: ['تطهير أعضاء مخصوصة قبل الصلاة', 'الاغتسال الكامل', 'الدعاء قبل النوم'], correct: 0 },
  { q: 'ما هو التيمم؟', answers: ['التطهر بالتراب عند عدم الماء', 'نوع من الصلاة', 'دعاء معين'], correct: 0 },
  { q: 'ما معنى "الصدقة"؟', answers: ['العطاء لوجه الله', 'صيام يوم عرفة', 'ختم القرآن'], correct: 0 },
  { q: 'ما ليلة النصف من شعبان؟', answers: ['ليلة مباركة قبل رمضان', 'ليلة القدر نفسها', 'أول ليلة في رمضان'], correct: 0 },
  { q: 'ما معنى "التكبير"؟', answers: ['قول الله أكبر', 'قول الحمد لله', 'قول سبحان الله'], correct: 0 },
  { q: 'ما هو "الاستغفار"؟', answers: ['طلب المغفرة من الله', 'الدعاء للآخرين', 'قراءة القرآن'], correct: 0 },
  { q: 'ما اسم ملك الوحي الذي نزل بالقرآن على النبي ﷺ؟', answers: ['جبريل', 'ميكائيل', 'إسرافيل'], correct: 0 },
  { q: 'ما اسم أبي النبي محمد ﷺ؟', answers: ['عبدالله', 'عبدالمطلب', 'أبو طالب'], correct: 0 },
  { q: 'ما يسمى المكان الذي يؤدي فيه المسلمون الصلاة؟', answers: ['المسجد', 'الكنيسة', 'المعبد'], correct: 0 },
  { q: 'كم مرة يُذكر اسم "الله" في الأذان؟', answers: ['ست مرات', 'أربع مرات', 'ثماني مرات'], correct: 0 },
  { q: 'ما أركان الصلاة الجوهرية؟', answers: ['النية والقيام والركوع والسجود', 'التكبير والسجود فقط', 'القراءة والدعاء'], correct: 0 },
  { q: 'ما هو شهر رجب مشهور به؟', answers: ['الإسراء والمعراج', 'نزول القرآن', 'غزوة بدر'], correct: 0 },
  { q: 'ما "الإسراء والمعراج"؟', answers: ['رحلة النبي ﷺ الليلية من مكة للقدس ثم للسماء', 'سفر النبي للمدينة', 'يوم الحج'], correct: 0 },
  { q: 'ما اسم الصلاة التي تُصلى بعد منتصف الليل في رمضان؟', answers: ['صلاة التهجد', 'صلاة الضحى', 'صلاة الوتر'], correct: 0 },
  { q: 'في أي مكان تأسست الدولة الإسلامية الأولى؟', answers: ['المدينة المنورة', 'مكة المكرمة', 'بغداد'], correct: 0 },
  { q: 'ما "زكاة الفطر"؟', answers: ['صدقة واجبة تُخرج في نهاية رمضان', 'صيام يوم العيد', 'صلاة العيد'], correct: 0 },
  { q: 'ما الحكمة من الصيام؟', answers: ['التقوى والضبط النفسي', 'إنقاص الوزن فقط', 'التفكر في الموت'], correct: 0 },
  { q: 'ما اسم أول مسلم من الرجال؟', answers: ['أبو بكر الصديق', 'علي بن أبي طالب', 'عمر بن الخطاب'], correct: 0 },
];

function pickRandom(arr, n) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

export default function Gameplay4() {
  const navigate = useNavigate();

  // Pick 4 random questions once on mount
  const QUESTIONS = useMemo(() => pickRandom(ALL_QUESTIONS, QUESTIONS_PER_GAME), []);

  const [currentQ, setCurrentQ] = useState(0);
  const [stars, setStars] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [shakeIndex, setShakeIndex] = useState(null);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [gameOver, setGameOver] = useState(false);
  const [lost, setLost] = useState(false);
  const [floatingStars, setFloatingStars] = useState([]);

  const popAudio = useRef(null);
  const flapAudio = useRef(null);
  const collectAudio = useRef(null);
  const timerRef = useRef(null);
  const starsRef = useRef(0); // track stars without stale closure issue

  useEffect(() => {
    popAudio.current = new Audio(popSfx);
    popAudio.current.preload = 'auto';
    flapAudio.current = new Audio(flapSfx);
    flapAudio.current.preload = 'auto';
    collectAudio.current = new Audio(collectSfx);
    collectAudio.current.preload = 'auto';
  }, []);

  // Timer
  useEffect(() => {
    if (gameOver) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setLost(true);
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [gameOver]);

  // Navigate on game over
  useEffect(() => {
    if (!gameOver) return;
    if (lost) {
      setTimeout(() => navigate('/lose'), 400);
    } else {
      unlockNextLevel(4);
      setTimeout(() => navigate('/prewin4'), 400);
    }
  }, [gameOver, lost]);

  const handleAnswer = useCallback((index) => {
    if (selectedAnswer !== null) return;
    const question = QUESTIONS[currentQ];
    const isCorrect = index === question.correct;

    setSelectedAnswer(index);
    setCorrectAnswer(question.correct);

    if (isCorrect) {
      if (collectAudio.current) {
        collectAudio.current.currentTime = 0;
        collectAudio.current.play().catch(() => {});
      }
      if (popAudio.current) {
        popAudio.current.currentTime = 0;
        popAudio.current.play().catch(() => {});
      }
      starsRef.current += 1;
      setStars(starsRef.current);
      // Spawn floating star at a random horizontal position
      const id = Date.now();
      setFloatingStars(prev => [...prev, { id, x: 30 + Math.random() * 60 }]);
      setTimeout(() => setFloatingStars(prev => prev.filter(s => s.id !== id)), 900);
    } else {
      if (flapAudio.current) {
        flapAudio.current.currentTime = 0;
        flapAudio.current.play().catch(() => {});
      }
      setShakeIndex(index);
      setTimeout(() => setShakeIndex(null), 500);
    }

    setTimeout(() => {
      setSelectedAnswer(null);
      setCorrectAnswer(null);
      setShakeIndex(null);
      if (isCorrect && starsRef.current >= WIN_STARS) {
        clearInterval(timerRef.current);
        setGameOver(true);
      } else {
        setCurrentQ(prev => (prev + 1) % QUESTIONS.length);
      }
    }, 900);
  }, [currentQ, selectedAnswer, QUESTIONS]);

  const question = QUESTIONS[currentQ];

  return (
    <div className="fixed-mobile-wrapper" style={{ position: 'relative', userSelect: 'none' }}>
      <header>
        <div className="flex2">
          <IconBtn icon={pause} style1="iconbtnmian" link="/pause" />
          <Music />
        </div>
        <Progress counter={stars} counter2={WIN_STARS} fanous={fanous} />
      </header>

      <Timer time={timeLeft} />
      <img className='splashBg' src={bg} alt="" />

      <div className="menuPanel questionBg">
        <img className='qChar' src={char} alt="" />
        <h4>{question.q}</h4>

        <div className="answersFlex">
          {question.answers.map((ans, i) => {
            const isSelected = selectedAnswer === i;
            const isCorrectAns = correctAnswer === i;
            const isWrong = isSelected && !isCorrectAns;
            const isRight = isCorrectAns && selectedAnswer !== null;

            return (
              <div
                key={`${currentQ}-${i}`}
                className={`answer${shakeIndex === i ? ' shake' : ''}`}
                style={{
                  filter: isRight
                    ? 'drop-shadow(0 0 12px #ffe066) brightness(1.15)'
                    : isWrong
                    ? 'drop-shadow(0 0 10px #ff4444) brightness(0.9)'
                    : undefined,
                  cursor: selectedAnswer !== null ? 'default' : 'pointer',
                  transition: 'filter 0.2s ease',
                }}
                onPointerDown={() => handleAnswer(i)}
              >
                {ans}
              </div>
            );
          })}
        </div>

        <p style={{
          textAlign: 'center',
          color: '#FFE6CB',
          fontFamily: 'Mirza',
          fontSize: 14,
          opacity: 0.6,
          margin: '6px 0 0',
        }}>
          {stars} / {WIN_STARS}
        </p>
      </div>

      {/* Floating stars on correct answer */}
      {floatingStars.map(s => (
        <img
          key={s.id}
          src={star}
          alt=""
          style={{
            position: 'absolute',
            bottom: '40%',
            left: `${s.x}%`,
            width: 40,
            height: 40,
            pointerEvents: 'none',
            animation: 'floatUp 0.85s ease-out forwards',
            zIndex: 99,
          }}
        />
      ))}
    </div>
  );
}