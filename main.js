// --- 데이터 영역 ---
// 데이터는 photographyData.js 파일에서 로드됩니다.

const calendarEvents = {
    9: [
        { day: 17, title: "테스트 프린트", color: "bg-green-500" },
        { day: 18, title: "테스트 프린트", color: "bg-green-500" },
        { day: 20, title: "경일대 면접", color: "bg-purple-500" },
        { day: 22, title: "1차 프린트(경일)", color: "bg-red-500" },
        { day: 26, title: "경일 실기/면접", color: "bg-purple-500" },
        { day: 27, title: "경일 실기/면접", color: "bg-purple-500" },
    ],  
    10: [
        { day: 3, title: "개천절", color: "bg-gray-500", isHoliday: true },
        { day: 5, title: "추석 연휴", color: "bg-gray-500", isHoliday: true },
        { day: 6, title: "추석", color: "bg-gray-500", isHoliday: true },
        { day: 7, title: "추석 연휴", color: "bg-gray-500", isHoliday: true },
        { day: 8, title: "대체공휴일", color: "bg-gray-500", isHoliday: true },
        { day: 9, title: "한글날", color: "bg-gray-500", isHoliday: true },
        { day: 18, title: "서울예대 실기(예정)", color: "bg-yellow-500" },
        { day: 20, title: "서울예대 면접(예정)", color: "bg-yellow-500" },
        { day: 21, title: "서울예대 면접(예정)", color: "bg-yellow-500" },
        { day: 22, title: "서울예대 면접(예정)", color: "bg-yellow-500" },
        { day: 23, title: "서울예대 면접(예정)", color: "bg-yellow-500" },
    ],
};
const visualizationData = {
    aperture: {
        fullStop: [
            { label: "f/1", value: 16, desc: "빛을 최대로 수용합니다. 극도로 얕은 피사계 심도로 특정 지점 외 모든 것을 흐리게 만들어 몽환적, 예술적 표현에 사용됩니다." },
            { label: "f/1.4", value: 15, desc: "매우 밝은 조리개 값으로, 어두운 환경에서도 셔터 속도를 확보하기 용이합니다. 배경을 크게 흐려 피사체를 극적으로 분리시킵니다." },
            { label: "f/2", value: 14, desc: "실내 인물 촬영의 표준. 배경 흐림이 아름답고, f/1.4보다 초점 맞는 범위가 넓어 안정적인 촬영이 가능합니다." },
            { label: "f/2.8", value: 13, desc: "고급 줌 렌즈의 상징적인 밝기. 배경을 적절히 흐리면서도 피사체의 입체감을 살려주는 실용적인 심도를 제공합니다." },
            { label: "f/4", value: 12, desc: "주광(Daylight)에서 풍경과 인물을 함께 담을 때 선명도와 심도를 모두 만족시키는 균형 잡힌 값입니다." },
            { label: "f/5.6", value: 11, desc: "2인 이상의 단체 사진에서 모든 인물의 얼굴에 초점을 맞출 수 있는 피사계 심도가 확보되기 시작합니다." },
            { label: "f/8", value: 10, desc: "풍경 사진의 교과서. 렌즈의 광학적 성능이 최상에 가까워지며, 화면 전체에 걸쳐 높은 선명도를 보여줍니다." },
            { label: "f/11", value: 9, desc: "매우 깊은 피사계 심도(팬 포커스)를 확보하여 사진의 전경부터 원경까지 모두 선명하게 표현하고자 할 때 사용됩니다." },
            { label: "f/16", value: 8, desc: "심도는 더욱 깊어지지만, 빛의 회절(Diffraction) 현상이 시작되어 이미지의 선명도가 미세하게 저하될 수 있습니다." },
            { label: "f/22", value: 7, desc: "장노출 촬영이나 접사(Macro) 촬영 등 특수한 목적을 위해 극단적으로 깊은 심도가 필요할 때 선택합니다." },
            { label: "f/32", value: 6, desc: "회절로 인한 화질 저하가 뚜렷해집니다. 대형 카메라나 과학 사진 분야에서 사용되며, 강한 빛 갈라짐 효과를 얻을 수 있습니다." },
            { label: "f/45", value: 5, desc: "모든 것이 초점에 맞는 듯한 극한의 심도를 제공하지만, 선명도는 크게 희생됩니다. 특수 목적용 조리개 값입니다." },
            { label: "f/64", value: 4, desc: "대형 포맷 카메라에서 사용되는 값으로, 일반적인 촬영에서는 거의 사용되지 않으며 회절 현상이 매우 심합니다." },
            { label: "f/90", value: 3, desc: "과학적, 기술적 촬영을 위한 값입니다. 극도의 심도 표현이 가능하나 일반 사진에서는 화질 저하가 극심합니다." },
            { label: "f/128", value: 2, desc: "핀홀 카메라와 유사한 효과를 내는 조리개 값으로, 사진이라기보다는 빛의 기록에 가까운 결과물을 만듭니다." },
        ],
        thirdStop: [
            { label: "f/1.0", value: 16, desc: "'야간 렌즈'의 시작. 극도로 얕은 심도로 몽환적이고 예술적인 사진을 만들며, 아주 적은 빛으로도 촬영이 가능합니다." },
            { label: "f/1.1", value: 15.66, desc: "f/1.0의 극단적인 심도를 미세하게 깊게 만들어 초점의 안정성을 조금 더 확보합니다." },
            { label: "f/1.2", value: 15.33, desc: "전문 인물 사진 작가들이 선호하는 값. 피사체의 눈에만 초점을 맞추고 나머지를 부드럽게 흐릴 수 있습니다." },
            { label: "f/1.4", value: 15, desc: "'꿈의 렌즈'라 불리는 밝기. 배경을 매우 부드럽게 압축하여 피사체를 극적으로 돋보이게 만듭니다." },
            { label: "f/1.6", value: 14.66, desc: "f/1.4의 배경 흐림을 유지하면서 초점 범위를 살짝 넓혀 더 안정적인 결과물을 만들어냅니다." },
            { label: "f/1.8", value: 14.33, desc: "'여친 렌즈'의 표준. 뛰어난 가성비로 아름다운 배경 흐림 효과를 누구나 쉽게 연출할 수 있습니다." },
            { label: "f/2.0", value: 14, desc: "어두운 실내나 카페에서 인물 촬영 시 셔터 속도 확보에 유리하며, 자연스러운 배경 흐림을 보여줍니다." },
            { label: "f/2.2", value: 13.66, desc: "f/2.0보다 심도를 약간 더 확보하여 피사체의 코와 귀가 모두 선명하게 나올 확률을 높여줍니다." },
            { label: "f/2.5", value: 13.33, desc: "배경을 적당히 흐리면서 피사체의 윤곽은 선명하게 유지하여 안정적인 인물 사진에 적합합니다." },
            { label: "f/2.8", value: 13, desc: "줌 렌즈의 '축복'. 전천후 스냅 및 행사 촬영에 가장 실용적인 밝기와 심도를 제공합니다." },
            { label: "f/3.2", value: 12.66, desc: "f/2.8의 실용성에 심도를 더해, 여러 사람이 있는 스냅 사진에서 초점 정확도를 높입니다." },
            { label: "f/3.5", value: 12.33, desc: "보급형 줌렌즈의 시작. 주간 야외 촬영에서 충분한 빛을 확보하며 배경도 어느 정도 정리됩니다." },
            { label: "f/4.0", value: 12, desc: "한낮의 야외에서 선명하고 쨍한 결과물을 원할 때. 풍경과 인물을 함께 담는 여행 사진에 좋습니다." },
            { label: "f/4.5", value: 11.66, desc: "f/4.0의 선명도를 유지하면서 더 넓은 영역에 초점을 맞추고 싶을 때 미세 조정하는 값입니다." },
            { label: "f/5.0", value: 11.33, desc: "피사체와 배경 모두 어느 정도의 선명도를 유지하기 시작하며, 전신 인물 사진에 활용됩니다." },
            { label: "f/5.6", value: 11, desc: "두 명 이상의 인물 사진, 단체 사진에서 모두의 얼굴에 초점을 맞추기 위한 시작점입니다." },
            { label: "f/6.3", value: 10.66, desc: "단체 사진에서 앞줄과 뒷줄의 인물 모두에게 선명한 초점을 맞추기 위해 심도를 더 확보합니다." },
            { label: "f/7.1", value: 10.33, desc: "풍경 사진에서 f/8.0에 가까운 선명도를 얻으면서, 셔터 속도를 조금 더 확보하고 싶을 때 사용합니다." },
            { label: "f/8.0", value: 10, desc: "풍경 사진의 교과서. 화면 전체에 걸쳐 가장 선명하고 깊은 심도의 이미지를 만들어냅니다." },
            { label: "f/9.0", value: 9.66, desc: "f/8.0보다 심도를 더 깊게 하여, 전경의 꽃부터 원경의 산까지 모두 선명하게 표현합니다." },
            { label: "f/10", value: 9.33, desc: "더 깊은 심도가 필요할 때 사용하며, 건축 사진이나 도시 풍경 촬영에 적합합니다." },
            { label: "f/11", value: 9, desc: "렌즈가 가진 최고의 해상력을 보여주는 구간. 피사계 심도를 극대화하여 팬 포커스 촬영에 유리합니다." },
            { label: "f/13", value: 8.66, desc: "f/11의 선명도를 최대한 유지하면서 빛 갈라짐 효과를 더 강하게 만들고 싶을 때 사용합니다." },
            { label: "f/14", value: 8.33, desc: "빛 갈라짐 효과가 나타나기 시작합니다. 야경 촬영 시 가로등을 아름다운 별처럼 표현할 수 있습니다." },
            { label: "f/16", value: 8, desc: "심도는 매우 깊어지지만, 빛의 회절 현상으로 화질이 미세하게 저하될 수 있습니다. 장노출 촬영에 활용됩니다." },
            { label: "f/18", value: 7.66, desc: "회절 현상에 유의해야 하지만, 태양처럼 강한 광원을 담을 때 더 선명한 빛 갈라짐을 만들 수 있습니다." },
            { label: "f/20", value: 7.33, desc: "대부분 렌즈에서 화질 저하가 눈에 띄게 나타날 수 있어 특수한 목적 외에는 잘 사용하지 않습니다." },
            { label: "f/22", value: 7, desc: "최소 조리개. 심도를 최대한 깊게 해야 하는 접사(Macro) 사진이나 특수 효과를 위해 사용됩니다." },
        ],
    },
    shutter: {
        fullStop: [
            { label: '30"', value: 18, desc: "삼각대 필수, 자동차 궤적이나 별 궤적 촬영에 사용됩니다." },
            { label: '15"', value: 17, desc: "긴 시간 노출로 구름이나 물의 흐름을 부드럽게 표현합니다." },
            { label: '8"', value: 16, desc: "사람의 움직임이 잔상으로 남아 신비로운 느낌을 줍니다." },
            { label: '4"', value: 15, desc: "야경 촬영 시 자동차 궤적을 짧게 담을 수 있습니다." },
            { label: '2"', value: 14, desc: "폭포수나 파도의 움직임을 부드럽게 표현하기 시작합니다." },
            { label: '1"', value: 13, desc: "삼각대 없이는 사진이 심하게 흔들리며 빛의 궤적을 담습니다." },
            { label: "1/2s", value: 12, desc: "의도적인 패닝샷으로 역동적인 흔들림을 표현할 수 있습니다." },
            { label: "1/4s", value: 11, desc: "손떨림 방지 기능이 있어도 핸드헬드 촬영이 매우 어렵습니다." },
            { label: "1/8s", value: 10, desc: "느리게 걷는 사람의 움직임에 약간의 블러가 생깁니다." },
            { label: "1/15s", value: 9, desc: "핸드헬드 촬영 시 안정적인 자세와 호흡 조절이 필요합니다." },
            { label: "1/30s", value: 8, desc: "광각 렌즈 사용 시 핸드헬드 촬영의 마지노선입니다." },
            { label: "1/60s", value: 7, desc: "일상적인 스냅 촬영 시 최소한으로 권장되는 속도입니다." },
            { label: "1/125s", value: 6, desc: "걷는 사람 정도의 움직임을 흔들림 없이 촬영할 수 있습니다." },
            { label: "1/250s", value: 5, desc: "가볍게 뛰는 아이나 반려동물을 선명하게 포착합니다." },
            { label: "1/500s", value: 4, desc: "스포츠 경기 등 빠른 움직임을 선명하게 정지시키기 시작합니다." },
            { label: "1/1000s", value: 3, desc: "빠르게 달리는 자동차나 운동선수를 선명하게 포착합니다." },
            { label: "1/2000s", value: 2, desc: "날아가는 새의 날갯짓을 정지시킬 수 있는 매우 빠른 속도입니다." },
            { label: "1/4000s", value: 1, desc: "프로펠러나 헬리콥터 날개를 정지시키는 전문가용 속도입니다." },
            { label: "1/8000s", value: 0, desc: "물방울이 터지는 순간 등 찰나를 포착하는 초고속 셔터입니다." },
        ],
        thirdStop: [
            { label: '1"', value: 13, desc: "삼각대 없이는 사진이 심하게 흔들리며 빛의 궤적을 담습니다." },
            { label: "1/1.3s", value: 12.66, desc: "장노출 패닝샷에서 배경의 흐름을 좀 더 부드럽게 표현합니다." },
            { label: "1/1.6s", value: 12.33, desc: "물의 흐름이나 움직임을 살짝 부드럽게 만들며 역동성을 조절합니다." },
            { label: "1/2s", value: 12, desc: "의도적인 패닝샷으로 역동적인 흔들림을 표현할 수 있습니다." },
            { label: "1/2.5s", value: 11.66, desc: "패닝샷 촬영 시 배경의 흐림 정도를 미세하게 조절합니다." },
            { label: "1/3s", value: 11.33, desc: "손떨림 방지 기능이 있어도 핸드헬드 촬영이 매우 어렵습니다." },
            { label: "1/4s", value: 11, desc: "느리게 움직이는 피사체에 블러 효과를 주기 좋습니다." },
            { label: "1/5s", value: 10.66, desc: "걷는 사람의 움직임을 의도적으로 흐리게 표현하여 속도감을 나타냅니다." },
            { label: "1/6s", value: 10.33, desc: "안정적인 자세와 호흡 조절이 필요합니다." },
            { label: "1/8s", value: 10, desc: "느리게 걷는 사람의 움직임에 약간의 블러가 생깁니다." },
            { label: "1/10s", value: 9.66, desc: "광각 렌즈로 핸드헬드 촬영 시 흔들림을 최소화하며 안정성을 높입니다." },
            { label: "1/13s", value: 9.33, desc: "핸드헬드 촬영 시 안정적인 자세가 필요합니다." },
            { label: "1/15s", value: 9, desc: "여전히 핸드헬드 촬영 시 주의가 필요한 속도입니다." },
            { label: "1/20s", value: 8.66, desc: "정적인 피사체를 핸드헬드로 촬영할 때 흔들림을 방지하는 안정적인 속도입니다." },
            { label: "1/25s", value: 8.33, desc: "광각 렌즈 사용 시 핸드헬드 촬영의 마지노선입니다." },
            { label: "1/30s", value: 8, desc: "표준 렌즈(50mm) 촬영 시 흔들림이 발생할 수 있는 최소 권장 속도입니다." },
            { label: "1/40s", value: 7.66, desc: "표준 렌즈로 정적인 피사체를 안정적으로 촬영할 수 있습니다." },
            { label: "1/50s", value: 7.33, desc: "일상적인 실내 스냅에서 흔들림을 방지하기 위한 실용적인 속도입니다." },
            { label: "1/60s", value: 7, desc: "일상적인 스냅 촬영 시 최소한으로 권장되는 속도입니다." },
            { label: "1/80s", value: 6.66, desc: "조금 더 활동적인 아이들의 움직임을 흔들림 없이 포착하기 시작합니다." },
            { label: "1/100s", value: 6.33, desc: "걷는 사람 정도의 움직임을 선명하고 안정적으로 촬영할 수 있습니다." },
            { label: "1/125s", value: 6, desc: "일반적인 움직임을 선명하게 포착하는 표준 속도입니다." },
            { label: "1/160s", value: 5.66, desc: "가볍게 뛰는 아이나 반려동물 촬영 시 실패 확률을 줄여줍니다." },
            { label: "1/200s", value: 5.33, desc: "움직임이 불규칙한 피사체를 선명하게 포착하기에 좋습니다." },
            { label: "1/250s", value: 5, desc: "대부분의 일상적인 움직임을 정지시킬 수 있습니다." },
            { label: "1/320s", value: 4.66, desc: "자전거 타는 아이 등, 조금 더 빠른 움직임을 선명하게 담아냅니다." },
            { label: "1/400s", value: 4.33, desc: "스포츠 경기 등 빠른 움직임을 선명하게 정지시키기 시작합니다." },
            { label: "1/500s", value: 4, desc: "빠른 움직임을 포착하기에 매우 안정적인 속도입니다." },
            { label: "1/640s", value: 3.66, desc: "달리는 자동차나 빠르게 움직이는 운동선수를 더 확실하게 정지시킵니다." },
            { label: "1/800s", value: 3.33, desc: "테니스나 배드민턴처럼 빠른 공의 움직임을 포착하기 시작합니다." },
            { label: "1/1000s", value: 3, desc: "순간적인 동작을 놓치지 않고 선명하게 담아냅니다." },
        ],
    },
};

const pickRandom = (arr, n) => {
    const copy = [...arr];
    const result = [];
    for (let i = 0; i < n && copy.length; i++) {
        const idx = Math.floor(Math.random() * copy.length);
        result.push(copy.splice(idx, 1)[0]);
    }
    return result;
};

const baseCount = Object.values(photographyData).reduce((acc, arr) => acc + arr.length, 0);
const sampleSize = Math.min(baseCount, 23);

const mainContent = document.getElementById("mainContent");
const searchInput = document.getElementById("searchInput");
const geminiModal = document.getElementById("geminiModal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const closeModalBtn = document.getElementById("closeModal");

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/service-worker.js").catch((err) => console.error("Service worker registration failed:", err));
    });
}

let charts = {};
let currentQuizData = null;
let currentQuestionIndex = 0;
let score = 0;
let quizTimer;
let timerStartTime;
let timeRemaining;
let isTimerPaused = false;
let quizTimeLimit;
let timerInterval;
let quizTotalMs;

function getPracticeMessage(percentage) {
    if (percentage >= 90) return "대단해요!";
    if (percentage >= 70) return "좋은 성과예요!";
    if (percentage >= 50) return "조금만 더 힘내요!";
    return "시작이 반이에요!";
}
window.getPracticeMessage = getPracticeMessage;
window.getEncouragementMessage = getPracticeMessage;

function createCalendar(year, month, events = {}) {
    const today = new Date();
    const isCurrentMonth = today.getFullYear() === year && today.getMonth() + 1 === month;
    const todayDate = isCurrentMonth ? today.getDate() : -1;
    const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const date = new Date(year, month - 1, 1);
    const firstDay = date.getDay();
    const daysInMonth = new Date(year, month, 0).getDate();
    let html = `<div class="content-card p-6 w-full max-w-4xl mx-auto mb-8"><h3 class="text-xl font-bold text-center mb-4">${year}년 ${monthNames[month - 1]}</h3><div class="grid grid-cols-7 gap-1 text-center text-sm font-semibold text-gray-600">${days.map((day) => `<div class="${day === "일" ? "text-red-500" : day === "토" ? "text-blue-500" : ""}">${day}</div>`).join("")}</div><div class="grid grid-cols-7 gap-1 mt-2">`;
    for (let i = 0; i < firstDay; i++) {
        html += `<div></div>`;
    }
    for (let day = 1; day <= daysInMonth; day++) {
        const currentDayOfWeek = new Date(year, month - 1, day).getDay();
        const dayEvents = events[day] || [];
        const isHoliday = dayEvents.some((e) => e.isHoliday);
        let eventHtml = dayEvents
            .map((e) => `<div class="text-white p-1 rounded-md ${e.color || "bg-blue-500"} mb-1 truncate" title="${e.title}">${e.title}</div>`)
            .join("");
        let dayClass = "";
        if (currentDayOfWeek === 0 || isHoliday) {
            dayClass = "text-red-500";
        } else if (currentDayOfWeek === 6) {
            dayClass = "text-blue-500";
        }
        if (day === todayDate) {
            dayClass += " today-text";
            html += `<div class="border p-2 h-28 flex flex-col ${dayEvents.length > 0 ? "bg-gray-50" : ""} today"><span class="font-bold ${dayClass}">${day}</span><div class="text-xs mt-1 text-left overflow-y-auto">${eventHtml}</div></div>`;
        } else {
            html += `<div class="border p-2 h-28 flex flex-col ${dayEvents.length > 0 ? "bg-gray-50" : ""}"><span class="font-bold ${dayClass}">${day}</span><div class="text-xs mt-1 text-left overflow-y-auto">${eventHtml}</div></div>`;
        }
    }
    html += `</div></div>`;
    return html;
}

const PROXY_URL = "/.netlify/functions/gemini-proxy";
let iconChangeInterval;

function showModal(title, contentHtml = '', showLoading = false, onCancel = null) {
    const icons = ["❓", "🤔", "💡", "😊","🙏🏻","🤪"];
    modalTitle.textContent = title;
    modalBody.innerHTML = contentHtml;

    if (showLoading) {
        const loadingMessages = [
            "촬영실기 준비 중... 📸",
            "포트폴리오 촬영 중... 🧑‍🎨",
            "친구랑 모의 면접 중... 🗣️",
            "중대 글 쓰는 중... ✍️",
            "촬실한다고 가놓고 폰하는 중... 📱",
            "향미각 가는 중... 🍜",
            "맘스터치 가는 중... 🍔",
        ];
        
        const loadingContainer = document.createElement("div");
        loadingContainer.className = "loading-container flex flex-col items-center";
        const loadingText = document.createElement("p");
        loadingText.className = "text-xl font-semibold text-gray-700 mb-4";
        const rotatingIcon = document.createElement("div");
        rotatingIcon.className = "rotating-icon-loader";
        loadingContainer.appendChild(loadingText);
        loadingContainer.appendChild(rotatingIcon);
        const cancelBtn = document.createElement("button");
        cancelBtn.textContent = "취소";
        cancelBtn.className = "mt-4 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800";
        cancelBtn.addEventListener("click", () => {
            if (onCancel) onCancel();
        });
        modalBody.innerHTML = '';
        modalBody.appendChild(loadingContainer);
        modalBody.appendChild(cancelBtn);
        const randomMessage = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
        loadingText.innerText = randomMessage;
        rotatingIcon.innerText = icons[Math.floor(Math.random() * icons.length)];
        iconChangeInterval = setInterval(() => {
            rotatingIcon.innerText = icons[Math.floor(Math.random() * icons.length)];
        }, 1000);
    }
    geminiModal.classList.remove("hidden");
    setTimeout(() => {
        geminiModal.classList.remove("opacity-0");
        geminiModal.querySelector(".modal-content").classList.remove("scale-95");
    }, 10);
}

function hideModal() {
    clearInterval(iconChangeInterval);
    geminiModal.classList.add("opacity-0");
    geminiModal.querySelector(".modal-content").classList.add("scale-95");
    setTimeout(() => {
        geminiModal.classList.add("hidden");
        modalBody.innerHTML = "";
    }, 300);
}

function callGemini(prompt, useSchema = false, title = "AI 응답 생성 중") {
    const MAX_RETRIES = 2;
    let attempt = 0;
    let controller = new AbortController();
    let abortedByUser = false;
    const abort = () => {
        abortedByUser = true;
        controller.abort();
        hideModal();
    };
    showModal(title, '', true, abort);

    const result = (async () => {
        while (attempt <= MAX_RETRIES) {
            abortedByUser = false;
            let didTimeout = false;
            try {
            const payload = {
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {},
            };
            if (useSchema) {
                payload.generationConfig.responseMimeType = "application/json";
                payload.generationConfig.responseSchema = {
                    type: "OBJECT",
                    properties: {
                        questions: {
                            type: "ARRAY",
                            items: {
                                type: "OBJECT",
                                properties: {
                                    question: { type: "STRING" },
                                    options: { type: "ARRAY", items: { type: "STRING" } },
                                    answer: { type: "STRING" },
                                    explanations: {
                                        type: "OBJECT",
                                        additionalProperties: { type: "STRING" },
                                    },
                                },
                                required: ["question", "options", "answer", "explanations"],
                            },
                        },
                    },
                };
            } else {
                payload.generationConfig.responseMimeType = "text/plain";
            }
            const timeoutId = setTimeout(() => {
                didTimeout = true;
                controller.abort();
            }, 30000);
            const response = await fetch(PROXY_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
                signal: controller.signal,
            });
            clearTimeout(timeoutId);
            if (!response.ok) {
                throw new Error(`프록시 호출 실패. 상태 코드: ${response.status}`);
            }
            const result = await response.json();
            let text = result.candidates?.[0]?.content?.parts?.[0]?.text;
            if (!text) {
                throw new Error("API에서 콘텐츠를 받지 못했습니다.");
            }
            text = text.trim();
            if (text.startsWith("```json") && text.endsWith("```")) {
                text = text.substring(7, text.length - 3).trim();
            }
                return text;
            } catch (error) {
                if (error.name === "AbortError" && abortedByUser) {
                    return null;
                }
                if (didTimeout) {
                    hideModal();
                    const retryBtn = `<button id="retry-btn" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">재시도</button>`;
                    showModal('오류', `<p class="text-red-500">요청이 시간 초과되었습니다. 잠시 후 다시 시도해 주세요.</p>${retryBtn}`, false);
                    document.getElementById('retry-btn').addEventListener('click', () => {
                        hideModal();
                        callGemini(prompt, useSchema, title);
                    });
                    return null;
                }
                attempt++;
                if (attempt <= MAX_RETRIES) {
                    controller = new AbortController();
                    clearInterval(iconChangeInterval);
                    showModal(title, `<p class="text-red-500">네트워크 오류가 발생했습니다. 재시도 중... (${attempt}/${MAX_RETRIES})</p>`, true, abort);
                    continue;
                }
                console.error("Gemini proxy call error:", error);
                clearInterval(iconChangeInterval);
                const retryBtn = `<button id="retry-btn" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">재시도</button>`;
                showModal('오류', `<p class="text-red-500">AI 기능을 호출하는 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.</p>${retryBtn}`, false);
                document.getElementById('retry-btn').addEventListener('click', () => {
                    hideModal();
                    callGemini(prompt, useSchema, title);
                });
                return null;
            }
        }
    })();

    return { abort, result };
}

function simplify(text) {
    if (!text) return "";
    const cleaned = text.replace(/\([^)]*\)/g, "").trim();
    const match = cleaned.match(/[^.?!]+[.?!]/);
    return match ? match[0].trim() : cleaned;
}

// 원본 설명을 AI에 제공할 때 사용할 정제 함수
function prepareForAI(text) {
    if (!text) return "";
    return text
        .replace(/\([^)]*\)/g, "") // 괄호 제거
        .replace(/[★☆]/g, "")       // 난이도 기호 제거
        .trim();
}

function ensureFullSentence(text) {
    if (!text) return "";
    const trimmed = text.trim();
    return /[.?!]$/.test(trimmed) ? trimmed : `${trimmed}?`;
}

// 일부 모델이 ```json 코드 블록 형태로 응답하는 경우를 대비해 JSON만 추출
function parseJsonResponse(text) {
    if (!text) return null;
    let cleaned = text.trim();
    const match = cleaned.match(/```(?:json)?\n([\s\S]*?)```/i);
    if (match) cleaned = match[1];
    try {
        return JSON.parse(cleaned);
    } catch (_) {
        return null;
    }
}

function escapeHtml(str) {
    if (!str) return "";
    return str.replace(/[&<>"']/g, c => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
    }[c] || c));
}

function createFallbackQuiz(pool, count = 5) {
    const byCat = pool.reduce((acc, item) => {
        (acc[item._category] = acc[item._category] || []).push(item);
        return acc;
    }, {});
    const validCats = Object.values(byCat).filter(arr => arr.length >= 5);
    const questions = [];
    while (questions.length < count && validCats.length) {
        const catItems = validCats[Math.floor(Math.random() * validCats.length)];
        const correct = catItems[Math.floor(Math.random() * catItems.length)];
        const wrongPool = catItems.filter(p => p !== correct);
        if (wrongPool.length < 4) continue;
        const wrong = [...wrongPool].sort(() => Math.random() - 0.5).slice(0, 4);
        const options = [correct, ...wrong].map(p => p.q).sort(() => Math.random() - 0.5);
        const explanations = {};
        [correct, ...wrong].forEach(p => {
            explanations[p.q] = simplify(p.a);
        });
        const desc = simplify(correct.a).replace(/[.?!]$/, "").trim();
        questions.push({
            question: ensureFullSentence(`${desc}에 관하여 알맞은 것은?`),
            options,
            answer: correct.q,
            explanations
        });
    }
    return { questions };
}

async function generateQuiz(quizCount) {
    const activeLink = document.querySelector(".nav-item.active");
    let category = activeLink ? activeLink.dataset.category : "all";
    if (category === "quiz") category = "all";
    let pool = [];
    if (["home", "visualization", "all", "cms"].includes(category)) {
        Object.entries(photographyData).forEach(([cat, arr]) => {
            const entries = arr.map(item => ({
                ...item,
                _category: cat,
                _difficulty: (item.a.match(/★/g) || []).length,
            }));
            pool.push(...entries);
            if (cat === "history") {
                // Give history items a higher weight by duplicating them
                pool.push(...arr.map(item => ({
                    ...item,
                    _category: cat,
                    _difficulty: (item.a.match(/★/g) || []).length,
                })));
            }
        });
    } else if (photographyData[category]) {
        const entries = photographyData[category].map(item => ({
            ...item,
            _category: category,
            _difficulty: (item.a.match(/★/g) || []).length,
        }));
        pool.push(...entries);
        if (category === "history") {
            pool.push(...photographyData[category].map(item => ({
                ...item,
                _category: category,
                _difficulty: (item.a.match(/★/g) || []).length,
            })));
        }
    } else {
        showModal('오류', `<p class="text-red-500">선택된 카테고리에 퀴즈를 만들 데이터가 없습니다.</p>`, false);
        return;
    }
    if (pool.length < 5) {
        showModal('오류', `<p class="text-red-500">퀴즈를 만들 데이터가 부족합니다.</p>`, false);
        return;
    }

    const highDifficulty = pool.filter(item => item._difficulty >= 2);
    if (highDifficulty.length >= 5) {
        pool = highDifficulty;
    }

    const sample = pickRandom(pool, Math.min(pool.length, sampleSize));
    const dataLines = sample
        .map(item => `- [${item._category}] ${item.q}: ${prepareForAI(item.a)}`)
        .join("\n");
    const prompt = `다음은 사진 관련 용어와 설명 목록입니다. 각 항목에는 [카테고리]가 포함되어 있습니다. 이 정보를 기반으로 고급 난이도의 객관식 퀴즈 ${quizCount}문제를 만들어줘. 각 문제는 단순 정의가 아니라 짧은 상황이나 응용 예시를 제시해야 하며, 보기에는 정답 1개와 같은 카테고리의 다른 용어 4개를 사용해 총 5개의 선택지를 제공해. 선택지는 모두 그럴듯해야 하며, 각 보기마다 왜 맞거나 틀렸는지를 한 문장으로 설명해 줘. question 필드는 물음표로 끝나는 완전한 질문 문장으로 작성해. 결과는 question, options, answer, explanations 필드를 가진 JSON으로만 응답해줘. explanations는 각 보기 텍스트를 키로 하고 그 이유를 값으로 하는 객체여야 해.\n\n${dataLines}`;

    const { result } = callGemini(prompt, true, "퀴즈 생성 중...");
    const responseText = await result;
    let parsed = parseJsonResponse(responseText);
    if (parsed && Array.isArray(parsed.questions)) {
        parsed.questions.forEach(q => {
            q.question = ensureFullSentence(q.question);
        });
    }
    if (!parsed || !Array.isArray(parsed.questions) || parsed.questions.length === 0) {
        parsed = createFallbackQuiz(pool, quizCount);
    }
    currentQuizData = parsed;
    currentQuestionIndex = 0;
    score = 0;
    displayQuizQuestion();
}

function generatePractice() {
    const categoryEl = document.getElementById("practiceCategory");
    const difficultyEl = document.getElementById("practiceDifficulty");
    const filters = {};
    if (categoryEl && categoryEl.value) filters.categories = [categoryEl.value];
    if (difficultyEl && difficultyEl.value) filters.difficulties = [difficultyEl.value];
    const questions = createPracticeQuestions(4, filters);
    showModal('실전 연습');
    const html = questions.map((q, idx) => {
        const difficultyMap = { easy: "🟢", medium: "🟡", hard: "🔴" };
        const metaParts = [`난이도: ${difficultyMap[q.difficulty] || q.difficulty}`];
        if (q.era) metaParts.push(`시대: ${q.era}`);
        return `
        <div class="mb-4 practice-question">
            <p class="font-semibold">${idx + 1}. ${q.question}</p>
            <input type="text" class="practice-input w-full p-2 mt-1 border rounded" data-answer="${q.answer.replace(/"/g, '&quot;')}">
            <p class="text-xs text-gray-500 mt-1">${metaParts.join(" | ")}</p>
            <p class="result text-sm mt-1 hidden"></p>
        </div>`;
    }).join("") + '<button id="gradePractice" class="w-full bg-gray-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-800 mt-2">채점하기</button>';
    modalBody.innerHTML = html;
    const gradeBtn = document.getElementById("gradePractice");
    gradeBtn.addEventListener("click", () => {
        if (gradeBtn.dataset.state === "graded") {
            hideModal();
            return;
        }
        const inputs = [...modalBody.querySelectorAll(".practice-input")];
        let total = 0;
        const wrong = [];
        inputs.forEach((input, idx) => {
            const userAnswer = input.value;
            const correctAnswer = input.dataset.answer;
            const score = typeof calculateScore === 'function'
                ? calculateScore(userAnswer, correctAnswer)
                : 1;
            total += score;
            if (score < 4) wrong.push(idx + 1);
            const resultEl = input.parentElement.querySelector(".result");
            resultEl.classList.remove("text-green-600", "text-red-600");
            const highScore = score >= 4;
            resultEl.innerHTML = `점수: <span class="${highScore ? "text-green-600" : "text-red-600"}">${score}/5</span><br>모범답안: <span class="text-green-600">${input.dataset.answer}</span>`;
            resultEl.classList.remove("hidden");
            input.classList.toggle("border-green-400", highScore);
            input.classList.toggle("border-red-400", !highScore);
        });
        const summary = document.createElement('div');
        summary.id = 'practiceSummary';
        summary.className = 'p-3 bg-gray-100 rounded mt-2 text-sm';
        const maxScore = inputs.length * 5;
const percentage = maxScore > 0 ? (total / maxScore) * 100 : 0;

// getPracticeMessage 가 통합 헬퍼라면 그대로, 구버전 호환 이름이 남아있다면 그쪽도 시도
const getMsg =
  typeof getPracticeMessage === 'function'
    ? getPracticeMessage
    : (typeof getEncouragementMessage === 'function'
        ? getEncouragementMessage
        : null);

const message = getMsg ? getMsg(percentage) : '';

summary.innerHTML =
  `<p>총점: ${total}/${maxScore}${maxScore ? ` (${Math.round(percentage)}%)` : ''}</p>` +
  (message ? `<p>${message}</p>` : '') +
  `<p>오답: ${wrong.length ? wrong.join(', ') : '없음'}</p>`;

gradeBtn.parentElement.insertBefore(summary, gradeBtn);

if (wrong.length) {
  const reviewBtn = document.createElement('button');
  reviewBtn.id = 'reviewPractice';
  reviewBtn.className = 'w-full bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600 mt-2';
  reviewBtn.textContent = '오답 복습';
  reviewBtn.addEventListener('click', () => {
    modalBody.querySelectorAll('.practice-question').forEach((el, idx) => {
      if (!wrong.includes(idx + 1)) el.classList.add('hidden');
    });
    reviewBtn.remove();
  });
  gradeBtn.parentElement.appendChild(reviewBtn);
}

gradeBtn.textContent = '닫기';
gradeBtn.dataset.state = 'graded';
    });
}

function createPracticeQuestions(count = 4, filters = {}) {
    const { categories = [], difficulties = [] } = filters;
    const flattened = Object.entries(photographyData)
        .flatMap(([category, arr]) =>
            arr.map(item => {
                const starCount = ((item.a || "").match(/★/g) || []).length;
                const difficulty = starCount >= 3 ? "hard" : starCount === 2 ? "medium" : "easy";
                return { ...item, category, difficulty };
            })
        )
        .filter(item =>
            (categories.length === 0 || categories.includes(item.category)) &&
            (difficulties.length === 0 || difficulties.includes(item.difficulty))
        );
    const pickRandom = (arr, n) => [...arr].sort(() => Math.random() - 0.5).slice(0, Math.min(n, arr.length));
    const selected = pickRandom(flattened, count);
    const endings = ["에 대해 설명하세요.", "에 대해 말해보세요."];
    return selected.map(item => ({
        question: `${item.q}${endings[Math.floor(Math.random() * endings.length)]}`,
        answer: (item.answer_short || item.a || "").replace(/\s*[★☆]+/g, "").trim(),
        difficulty: item.difficulty,
        ...(item.era ? { era: item.era } : {}),
    }));
}

function displayQuizQuestion() {
    const q = currentQuizData.questions[currentQuestionIndex];
    quizTimeLimit = currentQuestionIndex >= 3 ? 20 : 15;
    const optionsHtml = q.options
        .map(opt => {
            const safe = escapeHtml(opt);
            return `<div class="quiz-option p-4 rounded-lg cursor-pointer mb-2" data-option="${safe}">${safe}</div>`;
        })
        .join("");
    const questionHtml = `
        <div class="mb-4">
            <p class="text-sm text-gray-500">문제 ${currentQuestionIndex + 1} / ${currentQuizData.questions.length}</p>
            <p class="text-lg font-semibold mt-1">${q.question}</p>
        </div>
        <div class="relative pt-1 flex items-center mb-4">
            <div class="overflow-hidden h-2 text-xs flex rounded bg-blue-200 flex-1">
                <div id="quizTimerBar" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
            </div>
            <button id="timerToggleBtn" class="ml-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300">
                <i class="fas fa-pause" id="timerIcon"></i>
            </button>
        </div>
        <div id="quizOptions">${optionsHtml}</div>
        <div id="quizResult" class="mt-4"></div>
        <div class="flex justify-end mt-4">
            <button id="nextQuestionBtn" class="bg-gray-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-800 hidden">다음 문제</button>
        </div>`;
    showModal(`퀴즈`, questionHtml, false);
    timeRemaining = quizTimeLimit * 1000;
    startTimer();
    const quizOptionsContainer = document.getElementById("quizOptions");
    quizOptionsContainer.addEventListener("click", handleQuizOptionClick);
    document.getElementById("nextQuestionBtn").addEventListener("click", () => {
        quizOptionsContainer.removeEventListener("click", handleQuizOptionClick);
        currentQuestionIndex++;
        if (currentQuestionIndex < currentQuizData.questions.length) {
            displayQuizQuestion();
        } else {
            displayQuizFinalScore();
        }
    });
    document.getElementById("timerToggleBtn").addEventListener("click", toggleTimer);
}

function handleQuizOptionClick(e) {
    const selectedOptionEl = e.target.closest(".quiz-option");
    if (!selectedOptionEl) return;
    if (selectedOptionEl.classList.contains("selected")) return;
    modalBody.querySelectorAll(".quiz-option").forEach(opt => opt.classList.remove("selected"));
    selectedOptionEl.classList.add("selected");
    toggleTimer(true);
    checkQuizAnswer(false, selectedOptionEl);
}

function startTimer() {
    isTimerPaused = false;
    quizTotalMs = quizTimeLimit * 1000;
    timeRemaining = quizTotalMs;
    timerStartTime = Date.now();
    const timerBar = document.getElementById("quizTimerBar");
    timerBar.style.width = "100%";
    clearTimeout(quizTimer);
    clearInterval(timerInterval);
    quizTimer = setTimeout(() => {
        clearInterval(timerInterval);
        checkQuizAnswer(true, null);
    }, timeRemaining);
    timerInterval = setInterval(() => {
        const elapsed = Date.now() - timerStartTime;
        const remain = Math.max(timeRemaining - elapsed, 0);
        timerBar.style.width = `${(remain / quizTotalMs) * 100}%`;
        if (remain <= 0) {
            clearInterval(timerInterval);
        }
    }, 100);
}

function toggleTimer(forcePause = false) {
    const timerIcon = document.getElementById("timerIcon");
    const timerBar = document.getElementById("quizTimerBar");

    const pause = () => {
        const elapsed = Date.now() - timerStartTime;
        timeRemaining = Math.max(0, timeRemaining - elapsed);
        isTimerPaused = true;
        clearTimeout(quizTimer);
        clearInterval(timerInterval);
        timerIcon.classList.remove("fa-pause");
        timerIcon.classList.add("fa-play");
        timerBar.style.width = `${(timeRemaining / quizTotalMs) * 100}%`;
    };

    const resume = () => {
        if (timeRemaining <= 0) {
            checkQuizAnswer(true, null);
            return;
        }
        isTimerPaused = false;
        timerIcon.classList.remove("fa-play");
        timerIcon.classList.add("fa-pause");
        timerStartTime = Date.now();
        clearTimeout(quizTimer);
        clearInterval(timerInterval);
        quizTimer = setTimeout(() => {
            clearInterval(timerInterval);
            checkQuizAnswer(true, null);
        }, timeRemaining);
        timerInterval = setInterval(() => {
            const elapsed = Date.now() - timerStartTime;
            const remain = Math.max(timeRemaining - elapsed, 0);
            timerBar.style.width = `${(remain / quizTotalMs) * 100}%`;
            if (remain <= 0) {
                clearInterval(timerInterval);
            }
        }, 100);
    };

    if (forcePause) {
        if (!isTimerPaused) pause();
        return;
    }

    if (isTimerPaused) {
        resume();
    } else {
        pause();
    }
}


function checkQuizAnswer(isTimeUp = false, selectedOptionEl) {
    clearTimeout(quizTimer);
    clearInterval(timerInterval);
    const q = currentQuizData.questions[currentQuestionIndex];
    const correctAnswer = q.answer;
    let isCorrect = false;
    modalBody.querySelectorAll(".quiz-option").forEach(opt => {
        opt.style.pointerEvents = "none";
        opt.classList.remove("selected");
    });
    const quizResultEl = modalBody.querySelector("#quizResult");
    if (isTimeUp) {
        quizResultEl.innerHTML = `<p class="text-red-600 font-semibold">시간 초과! 😔 정답은 "<span class="font-bold">${correctAnswer}</span>" 입니다.</p>`;
    } else {
        selectedOptionEl.classList.add("selected");
        const selectedAnswer = selectedOptionEl.dataset.option;
        if (selectedAnswer === correctAnswer) {
            score++;
            isCorrect = true;
            quizResultEl.innerHTML = `<p class="text-green-600 font-semibold">정답입니다! 🎉</p>`;
        } else {
            quizResultEl.innerHTML = `<p class="text-red-600 font-semibold">오답입니다. 😔</p><p class="text-gray-700 mt-2">정답은 "<span class="font-bold">${correctAnswer}</span>" 입니다.</p>`;
        }
    }
    const explanations = q.explanations || {};
    const expList = q.options.map(option => {
        const safeOpt = escapeHtml(option);
        const reason = explanations[option] || "";
        return `<li><span class="font-bold">${safeOpt}</span>: ${reason}</li>`;
    }).join("");
    quizResultEl.innerHTML += `<ul class="mt-2 text-sm text-gray-700 space-y-1">${expList}</ul>`;
    modalBody.querySelectorAll(".quiz-option").forEach(opt => {
        if (opt.dataset.option === correctAnswer) {
            opt.classList.add("correct");
        } else if (opt.classList.contains("selected")) {
            opt.classList.add("incorrect");
        }
    });
    if (isCorrect) {
        setTimeout(() => {
            document.getElementById("quizOptions").removeEventListener("click", handleQuizOptionClick);
            currentQuestionIndex++;
            if (currentQuestionIndex < currentQuizData.questions.length) {
                displayQuizQuestion();
            } else {
                displayQuizFinalScore();
            }
        }, 1000);
    } else {
        document.getElementById("nextQuestionBtn").classList.remove("hidden");
    }
}

function setupEventListeners() {
    document.querySelectorAll(".question").forEach((q) => {
        q.addEventListener("click", (e) => {
            const questionDiv = e.currentTarget;
            const answer = questionDiv.nextElementSibling;
            const isAlreadyOpen = answer.classList.contains("open");
            document.querySelectorAll(".answer.open").forEach((openAnswer) => {
                if (openAnswer !== answer) {
                    openAnswer.classList.remove("open");
                    openAnswer.previousElementSibling.classList.remove("open");
                }
            });
            if (!isAlreadyOpen) {
                questionDiv.classList.add("open");
                answer.classList.add("open");
            } else {
                questionDiv.classList.remove("open");
                answer.classList.remove("open");
            }
        });
    });
}

function createChart(canvasId, label, data, backgroundColor, borderColor) {
    const ctx = document.getElementById(canvasId)?.getContext("2d");
    if (!ctx) return;
    if (charts[canvasId]) {
        charts[canvasId].destroy();
    }
    charts[canvasId] = new Chart(ctx, {
        type: "bar",
        data: {
            labels: data.map((item) => item.label),
            datasets: [{
                label: label,
                data: data.map((item) => item.value),
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 1,
            }, ],
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                y: { display: false },
                x: {
                    grid: { display: false },
                    ticks: { font: { size: 10 }, autoSkip: true, maxTicksLimit: 15 },
                },
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    displayColors: false,
                    callbacks: { label: (context) => data[context.dataIndex].desc || "" },
                },
            },
        },
    });
}

function setupCardFlipListeners() {
    const cards = document.querySelectorAll(".quiz-card");
    cards.forEach((card) => {
        card.addEventListener("click", (e) => {
            if (e.target.closest(".gemini-btn")) {
                return;
            }
            const wasFlipped = card.classList.contains("is-flipped");
            cards.forEach((c) => c.classList.remove("is-flipped"));
            if (!wasFlipped) {
                card.classList.add("is-flipped");
            }
        });
    });
}

function renderContent(category, searchTerm = "") {
    let html = "";
    if (category === "home") {
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth() + 1;
        const eventsForSept = {};
        (calendarEvents[9] || []).forEach((e) => {
            (eventsForSept[e.day] = eventsForSept[e.day] || []).push({ ...e });
        });
        const eventsForOct = {};
        (calendarEvents[10] || []).forEach((e) => {
            (eventsForOct[e.day] = eventsForOct[e.day] || []).push({ ...e });
        });
        html = `<div class="content-card p-6 md:p-8 mb-6 text-center"><h2 class="text-3xl font-bold text-gray-800 mb-2">주요 학사 일정 ✨</h2><p class="text-gray-600">중요 입시 일정</p></div>`;
        html += createCalendar(currentYear, 9, eventsForSept);
        html += createCalendar(currentYear, 10, eventsForOct);
    } else if (category === "visualization") {
        const visualizationContent = [{
            q: "노출의 이해: 조리개와 셔터 속도",
            a: `<p class="text-sm text-gray-600 mb-6">노출의 세 가지 요소 중 조리개와 셔터 속도의 관계를 시각적으로 확인해 보세요. 각 막대 위로 마우스를 올리면 해당 설정 값에 대한 설명을 볼 수 있습니다.</p><div class="grid grid-cols-1 lg:grid-cols-2 gap-8"><div><div class="flex justify-center items-center mb-4"><h3 class="text-xl font-bold text-center mr-4">조리개 (Aperture)</h3><div class="flex rounded-lg bg-gray-200 p-1 text-sm"><button class="stop-btn active px-3 py-1 rounded-md" data-chart="aperture" data-stop="fullStop">1 스톱</button><button class="stop-btn px-3 py-1 rounded-md" data-chart="aperture" data-stop="thirdStop">1/3 스톱</button></div></div><div class="chart-container"><canvas id="apertureChart"></canvas></div><div class="text-xs text-gray-500 mt-4 p-2 bg-gray-50 rounded-md"><p>• <strong>심도와 빛의 양:</strong> 조리개 값(f-number)이 낮을수록 배경이 흐려지고(얕은 심도), 빛을 많이 받아들입니다.</p><p>• <strong>회절:</strong> 일반적으로 f/16 이상으로 조이면 심도는 깊어지지만, 빛의 회절 현상으로 이미지의 선명도가 저하될 수 있습니다.</p></div></div><div><div class="flex justify-center items-center mb-4"><h3 class="text-xl font-bold text-center mr-4">셔터 속도 (Shutter Speed)</h3><div class="flex rounded-lg bg-gray-200 p-1 text-sm"><button class="stop-btn active px-3 py-1 rounded-md" data-chart="shutter" data-stop="fullStop">1 스톱</button><button class="stop-btn px-3 py-1 rounded-md" data-chart="shutter" data-stop="thirdStop">1/3 스톱</button></div></div><div class="chart-container"><canvas id="shutterChart"></canvas></div><div class="text-xs text-gray-500 mt-4 p-2 bg-gray-50 rounded-md"><p>• <strong>움직임 표현:</strong> 셔터 속도가 느릴수록 움직임이 흐릿하게(Motion Blur) 표현되고, 빠를수록 움직임이 정지됩니다.</p><p>• <strong>카메라 흔들림:</strong> 일반적으로 '1/초점거리'초 보다 느린 속도에서는 삼각대 없이는 사진이 흔들리기 쉽습니다.</p></div></div></div>`,
        }, {
            q: "필름 특성곡선 (Characteristic Curve)",
            a: `<div class="relative w-full max-w-4xl mx-auto mb-4" style="height: 450px;"><svg class="absolute w-full h-full" viewBox="0 0 450 300"><rect x="260" y="10" width="20" height="2" fill="#059669"></rect><text x="285" y="15" font-size="10">저감도 (ISO 100) 필름 (고대비)</text><rect x="260" y="20" width="20" height="2" fill="#DB2777"></rect><text x="285" y="25" font-size="10">고감도 (ISO 400) 필름 (저대비)</text><line x1="60" y1="250" x2="420" y2="250" stroke="#cbd5e1" stroke-width="1"></line><line x1="60" y1="50" x2="60" y2="250" stroke="#cbd5e1" stroke-width="1"></line><text x="50" y="255" font-size="10" text-anchor="end">0.0</text><line x1="55" y1="250" x2="60" y2="250" stroke="#9ca3af" stroke-width="1"></line><text x="50" y="205" font-size="10" text-anchor="end">0.5</text><line x1="55" y1="200" x2="420" y2="200" stroke="#e5e7eb" stroke-width="0.5"></line><text x="50" y="155" font-size="10" text-anchor="end">1.0</text><line x1="55" y1="150" x2="420" y2="150" stroke="#e5e7eb" stroke-width="0.5"></line><text x="50" y="105" font-size="10" text-anchor="end">1.5</text><line x1="55" y1="100" x2="420" y2="100" stroke="#e5e7eb" stroke-width="0.5"></line><text x="50" y="55" font-size="10" text-anchor="end">2.0</text><line x1="55" y1="50" x2="60" y2="50" stroke="#9ca3af" stroke-width="1"></line><text x="120" y="265" font-size="10" text-anchor="middle">-2.0</text><line x1="120" y1="250" x2="120" y2="245" stroke="#9ca3af" stroke-width="1"></line><text x="195" y="265" font-size="10" text-anchor="middle">-1.0</text><line x1="195" y1="250" x2="195" y2="245" stroke="#9ca3af" stroke-width="1"></line><text x="270" y="265" font-size="10" text-anchor="middle">0.0</text><line x1="270" y1="250" x2="270" y2="245" stroke="#9ca3af" stroke-width="1"></line><text x="345" y="265" font-size="10" text-anchor="middle">1.0</text><line x1="345" y1="250" x2="345" y2="245" stroke="#9ca3af" stroke-width="1"></line><text x="420" y="290" font-size="10" text-anchor="end">노광량 (Log Exposure) →</text><text x="20" y="50" font-size="10" text-anchor="middle" transform="rotate(-90 20,50)">농도 (Density) →</text><path d="M 120 240 Q 150 230, 190 180 T 320 70 L 360 60" stroke="#DB2777" stroke-width="2.5" fill="none"></path><path d="M 190 240 Q 220 230, 250 150 T 340 55 L 380 50" stroke="#059669" stroke-width="2.5" fill="none"></path></svg></div><div class="mt-6 space-y-4 text-sm text-gray-700 leading-relaxed"><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="bg-pink-50 p-3 rounded-lg border border-pink-200"><h4 class="font-bold text-pink-800">고감도 필름 (예: ISO 400)</h4><p class="mt-1 text-xs">적은 빛(낮은 노광량)에도 빠르게 반응하여 곡선이 왼쪽에 위치합니다. 일반적으로 관용도가 넓고 입자가 거칠며, 콘트라스트가 부드러운(낮은 감마) 특성을 가집니다.</p></div><div class="bg-green-50 p-3 rounded-lg border border-green-200"><h4 class="font-bold text-green-800">저감도 필름 (예: ISO 100)</h4><p class="mt-1 text-xs">많은 빛(높은 노광량)이 필요하므로 곡선이 오른쪽에 위치합니다. 일반적으로 입자가 곱고 해상력이 높으며, 콘트라스트가 강한(높은 감마) 특성을 보입니다.</p></div></div><div class="pt-4 border-t"><div class="space-y-3"><div><h4 class="font-semibold text-gray-800">① 베이스+포그 농도 (Base+Fog)</h4><p class="mt-1">빛에 전혀 노출되지 않아도 필름 자체의 지지체(Base)가 가진 최소한의 농도와, 현상 과정에서 화학적으로 발생하는 포그(Fog)가 더해진 초기 농도입니다. 그래프에서 곡선이 시작되는 가장 낮은 높이에 해당합니다.</p></div><div><h4 class="font-semibold text-gray-800">② 발끝 부분 (Toe)</h4><p class="mt-1">이미지의 가장 어두운 영역(섀도우)의 정보를 담는 부분입니다. 곡선이 누워있어 노광량이 변해도 농도 변화가 적기 때문에, 이 영역의 계조 표현은 압축되어 콘트라스트가 낮습니다.</p></div><div><h4 class="font-semibold text-gray-800">③ 직선부 (Straight-line)</h4><p class="mt-1">이미지의 중간 톤(Mid-tone)을 담당하는 가장 중요한 영역입니다. 노광량의 변화와 농도의 변화가 정비례 관계를 가져, 가장 풍부하고 정확한 계조를 표현합니다. 이 직선의 기울기가 사진의 콘트라스트를 결정합니다.</p></div><div><h4 class="font-semibold text-gray-800">④ 어깨 부분 (Shoulder)</h4><p class="mt-1">이미지의 가장 밝은 영역(하이라이트) 정보를 담습니다. 곡선이 다시 눕기 시작하며 노광량이 증가해도 농도 변화가 둔해집니다. 하이라이트의 계조가 압축되어 표현됩니다.</p></div><div><h4 class="font-semibold text-gray-800">⑤ 최대 농도 (D-max)</h4><p class="mt-1">해당 필름과 현상 조건에서 얻을 수 있는 가장 높은 농도값입니다. 이 이상 노광을 주어도 농도는 더 이상 증가하지 않습니다.</p></div><div><h4 class="font-semibold text-gray-800">⑥ 솔라리제이션 (Solarization)</h4><p class="mt-1">극심한 과다 노광이 발생했을 때 오히려 농도가 다시 감소하는 현상입니다. 이로 인해 이미지의 밝고 어두움이 반전되어 독특한 시각 효과를 만들어냅니다.</p></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t mt-4"><div><h4 class="font-semibold text-gray-800">감마 (Gamma, γ)</h4><p class="mt-1">특성곡선의 직선부 기울기만을 측정한 값으로, 필름의 순수한 콘트라스트 특성을 나타냅니다. 일반적인 흑백 필름의 **표준 감마는 약 0.6**이며, 감마값이 높을수록 고대비(High Contrast) 필름입니다.</p></div><div><h4 class="font-semibold text-gray-800">콘트라스트 인덱스 (Contrast Index, C.I)</h4><p class="mt-1">발끝 부분(Toe)과 직선부 일부를 포함한, 실제 사진에서 유효하게 사용되는 영역의 평균 기울기입니다. 감마보다 더 실용적인 콘트라스트 지표로 활용됩니다.</p></div></div></div></div></div>`,
        }, {
            q: "존 시스템 (Zone System)",
            a: `<p class="text-sm text-gray-600 mb-6 text-center max-w-2xl mx-auto">안셀 아담스가 창시한 톤 재현 이론으로, 장면의 밝기를 순수한 검정(Zone 0)부터 순수한 흰색(Zone X)까지 11단계로 나누어 예측하고 제어하는 시스템입니다. 이를 통해 촬영자는 최종 결과물을 미리 상상하고 정확한 노출을 결정할 수 있습니다.</p><div class="grid grid-cols-6 md:grid-cols-11 gap-2 text-xs font-medium"><div class="zone-block flex flex-col items-center justify-between p-2 rounded-lg bg-[#1a1a1a] text-white"><div class="text-2xl font-bold">0</div><div class="border-t border-gray-600 pt-1 mt-1 text-center leading-tight w-full">순수 검정<br>무질감</div></div><div class="zone-block flex flex-col items-center justify-between p-2 rounded-lg bg-[#2d2d2d] text-white"><div class="text-2xl font-bold">I</div><div class="border-t border-gray-500 pt-1 mt-1 text-center leading-tight w-full">거의 검정<br>최소 질감</div></div><div class="zone-block flex flex-col items-center justify-between p-2 rounded-lg bg-[#404040] text-white"><div class="text-2xl font-bold">II</div><div class="border-t border-gray-400 pt-1 mt-1 text-center leading-tight w-full">어두운 섀도우<br>질감 시작</div></div><div class="zone-block flex flex-col items-center justify-between p-2 rounded-lg bg-[#535353] text-white"><div class="text-2xl font-bold">III</div><div class="border-t border-gray-300 pt-1 mt-1 text-center leading-tight w-full">평균 어두운 톤<br>디테일 있음</div></div><div class="zone-block flex flex-col items-center justify-between p-2 rounded-lg bg-[#666666] text-white"><div class="text-2xl font-bold">IV</div><div class="border-t border-gray-200 pt-1 mt-1 text-center leading-tight w-full">어두운 피부톤<br>짙은 그림자</div></div><div class="zone-block flex flex-col items-center justify-between p-2 rounded-lg bg-[#7a7a7a] text-white"><div class="text-2xl font-bold">V</div><div class="border-t border-gray-100 pt-1 mt-1 text-center leading-tight w-full">18% 중간 회색<br>평균 피부톤</div></div><div class="zone-block flex flex-col items-center justify-between p-2 rounded-lg bg-[#8d8d8d] text-gray-800"><div class="text-2xl font-bold">VI</div><div class="border-t border-gray-400 pt-1 mt-1 text-center leading-tight w-full">밝은 피부톤<br>하늘 질감</div></div><div class="zone-block flex flex-col items-center justify-between p-2 rounded-lg bg-[#a0a0a0] text-gray-800"><div class="text-2xl font-bold">VII</div><div class="border-t border-gray-500 pt-1 mt-1 text-center leading-tight w-full">밝은 톤<br>질감 표현 한계</div></div><div class="zone-block flex flex-col items-center justify-between p-2 rounded-lg bg-[#b3b3b3] text-gray-800"><div class="text-2xl font-bold">VIII</div><div class="border-t border-gray-600 pt-1 mt-1 text-center leading-tight w-full">흰색에 가까움<br>약한 디테일</div></div><div class="zone-block flex flex-col items-center justify-between p-2 rounded-lg bg-[#c6c6c6] text-gray-800"><div class="text-2xl font-bold">IX</div><div class="border-t border-gray-700 pt-1 mt-1 text-center leading-tight w-full">순백색 질감<br>디테일 없음</div></div><div class="zone-block flex flex-col items-center justify-between p-2 rounded-lg bg-[#e0e0e0] text-gray-800"><div class="text-2xl font-bold">X</div><div class="border-t border-gray-700 pt-1 mt-1 text-center leading-tight w-full">순수 흰색<br>무질감</div></div></div>`,
        }, ];
        html = visualizationContent.map((item) => `<div class="content-card mb-4"><div class="question p-6 flex justify-between items-center"><h3 class="text-lg font-bold text-gray-800">${item.q}</h3><i class="fas fa-chevron-down"></i></div><div class="answer border-t border-gray-200"><div class="p-6">${item.a}</div></div></div>`).join("");
            } else if (category === "quiz") {

        html = `

          <div class="max-w-md mx-auto space-y-4">

            <button id="quizBtn" class="w-full bg-pink-400 text-white font-bold py-3 px-4 rounded-full shadow-lg hover:bg-pink-500 transition transform hover:scale-105">🌸 AI 퀴즈 생성</button>

            <button id="practiceBtn" class="w-full bg-green-700 text-white font-bold py-3 px-4 rounded-full shadow-lg hover:bg-green-800 transition transform hover:scale-105">🏃‍♂️ 실전 연습</button>

            <details id="practiceFilters" class="bg-white p-4 rounded-lg shadow">

              <summary class="cursor-pointer font-semibold text-gray-700">⚙️ 실전 연습 필터</summary>

              <div class="mt-2">

                <label for="practiceCategory" class="block text-sm mb-1">카테고리</label>

                <select id="practiceCategory" class="w-full p-2 border rounded mb-2">

                  <option value="">전체</option>

                  <option value="structure">카메라 구조와 원리</option>

                  <option value="exposure">노출</option>

                  <option value="lens">렌즈와 광학</option>

                  <option value="digital">디지털</option>

                  <option value="film">필름 현상 인화</option>

                  <option value="lighting">조명과 필터</option>

                  <option value="history">사진사 & 사조</option>

                </select>

                <label for="practiceDifficulty" class="block text-sm mb-1">난이도</label>

                <select id="practiceDifficulty" class="w-full p-2 border rounded">

                  <option value="">전체</option>

                  <option value="easy">쉬움</option>

                  <option value="medium">보통</option>

                  <option value="hard">어려움</option>

                </select>

              </div>

            </details>

          </div>`

} else if (category === "cms") {
        html = `<div class="max-w-4xl mx-auto"><header class="text-center mb-8"><h1 class="text-3xl md:text-4xl font-bold text-gray-800">디지털 색 관리 시스템(CMS) 이해하기</h1><p class="text-gray-600 mt-2">카메라부터 모니터, 프린터까지 모든 장비에서 일관된 색상을 유지하는 방법</p></header><div class="content-card mb-4"><div class="question p-6 flex justify-between items-center"><h3 class="text-lg font-bold text-gray-800">1. 색 관리 시스템(CMS)이란?</h3><i class="fas fa-chevron-down"></i></div><div class="answer border-t border-gray-200"><div class="p-6"><div class="text-center text-sm text-gray-600 mb-6">카메라, 모니터, 프린터 등 서로 다른 장비들이 각자의 방식으로 색을 표현하기 때문에 발생하는 색상 차이를 최소화하고, 원본의 색을 모든 장비에서 일관되게 보이도록 관리하는 과정입니다.</div><div class="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-4 text-center"><div class="diagram-item"><div class="w-24 h-24 bg-gradient-to-br from-red-500 to-yellow-400 rounded-full flex items-center justify-center text-white font-bold mb-2 shadow-lg">현실</div><p class="text-sm font-semibold">원본 색상</p><p class="text-xs text-gray-500">실제 세상의 색</p></div><i class="fas fa-arrow-right text-2xl text-gray-400 hidden md:block"></i><i class="fas fa-arrow-down text-2xl text-gray-400 md:hidden"></i><div class="diagram-item"><div class="diagram-icon-box"><i class="fas fa-camera text-4xl text-blue-600"></i><div class=" bg-blue-100 text-blue-800">입력 프로파일</div></div><p class="text-sm font-semibold">촬영 (색상 정의)</p><p class="text-xs text-gray-500">(sRGB, AdobeRGB)</p></div><i class="fas fa-arrow-right text-2xl text-gray-400 hidden md:block"></i><i class="fas fa-arrow-down text-2xl text-gray-400 md:hidden"></i><div class="diagram-item"><div class="diagram-icon-box"><i class="fas fa-desktop text-4xl text-green-600"></i><div class=" bg-green-100 text-green-800">작업/모니터 프로파일</div></div><p class="text-sm font-semibold">편집 (색상 확인)</p><p class="text-xs text-gray-500">(모니터 프로파일)</p></div><i class="fas fa-arrow-right text-2xl text-gray-400 hidden md:block"></i><i class="fas fa-arrow-down text-2xl text-gray-400 md:hidden"></i><div class="diagram-item"><div class="diagram-icon-box"><i class="fas fa-print text-4xl text-purple-600"></i><div class=" bg-purple-100 text-purple-800">출력 프로파일</div></div><p class="text-sm font-semibold">출력 (색상 재현)</p><p class="text-xs text-gray-500">(프린터/용지 프로파일)</p></div></div></div></div></div><div class="content-card mb-4"><div class="question p-6 flex justify-between items-center"><h3 class="text-lg font-bold text-gray-800">2. 색 공간(Color Space)의 종류</h3><i class="fas fa-chevron-down"></i></div><div class="answer border-t border-gray-200"><div class="p-6 space-y-6"><p class="text-sm text-gray-600">색 공간은 색상을 수학적으로 표현하는 모델입니다. CMS에서는 이들을 크게 '장치 독립적인 공간'과 '장치 의존적인 공간'으로 나눕니다.</p><div class="grid md:grid-cols-2 gap-6"><div class="bg-gray-50 p-4 rounded-lg border"><h4 class="font-bold text-gray-700 flex items-center"><i class="fas fa-globe mr-2 text-sky-500"></i>장치 독립 색 공간 (PCS)</h4><p class="text-sm text-gray-600 mt-2">특정 장비에 구애받지 않는 절대적인 기준 색 공간입니다. 모든 색상 변환의 '중간 다리' 또는 '번역기' 역할을 합니다. 대표적으로 CIELAB, CIEXYZ가 있습니다.</p></div><div class="bg-gray-50 p-4 rounded-lg border"><h4 class="font-bold text-gray-700 flex items-center"><i class="fas fa-cogs mr-2 text-amber-500"></i>장치 의존 색 공간 (ICC Profile)</h4><p class="text-sm text-gray-600 mt-2">카메라, 모니터, 프린터 등 특정 장비가 표현할 수 있는 색상의 범위(Gamut)와 특징을 정의한 데이터 파일입니다.</p></div></div><div><h5 class="font-semibold text-md text-gray-800 mb-2">ICC 프로파일의 세부 종류</h5><div class="space-y-3"><div class="bg-blue-50 p-3 rounded-md border border-blue-200"><p class="font-semibold text-blue-800">범용 (Standard)</p><p class="text-xs text-blue-700">sRGB, Adobe RGB (1998) 처럼 국제 표준으로 널리 사용되는 프로파일입니다. 웹, 일반 사진 등 대부분의 작업에서 기준으로 사용됩니다.<br><span class="font-medium text-gray-600">예: sRGB IEC61966-2.1, AdobeRGB1998.icc</span></p></div><div class="bg-green-50 p-3 rounded-md border border-green-200"><p class="font-semibold text-green-800">제네릭 (Generic)</p><p class="text-xs text-green-700">모니터나 프린터 제조사에서 특정 모델을 위해 제공하는 기본 프로파일입니다. 어느 정도 정확하지만, 개별 장비의 미세한 차이나 노후화는 반영하지 못합니다.<br><span class="font-medium text-gray-600">예: DELL U2723QE.icc, EPSON Stylus Pro 7900 Premium Luster.icc</span></p></div><div class="bg-yellow-50 p-3 rounded-md border border-yellow-200"><p class="font-semibold text-yellow-800">커스텀 (Custom)</p><p class="text-xs text-yellow-700">캘리브레이션 장비(계측기)를 사용하여 현재 내가 사용하는 장비의 상태를 직접 측정하여 생성한, 가장 정확한 맞춤형 프로파일입니다.<br><span class="font-medium text-gray-600">예: My_U2723QE_D65_120cd_231026.icc</span></p></div></div></div></div></div></div><div class="content-card mb-4"><div class="question p-6 flex justify-between items-center"><h3 class="text-lg font-bold text-gray-800">3. 캘리브레이션 vs. 프로파일링</h3><i class="fas fa-chevron-down"></i></div><div class="answer border-t border-gray-200"><div class="p-6 space-y-4"><p class="text-sm text-gray-600">두 용어는 자주 혼용되지만 의미가 다릅니다. 캘리브레이션이 선행되어야 정확한 프로파일링이 가능합니다.</p><div class="flex flex-col md:flex-row items-stretch justify-center gap-6"><div class="w-full md:w-1/2 bg-indigo-50 p-4 rounded-lg border border-indigo-200 text-center"><i class="fas fa-sliders-h text-3xl text-indigo-500 mb-2"></i><h4 class="font-bold text-indigo-800">캘리브레이션 (Calibration)</h4><p class="text-sm text-indigo-700 mt-2">장비를 미리 정해진 <span class="font-semibold">표준 상태(밝기, 색온도, 감마 등)로 조정</span>하는 과정입니다. 일관된 결과물을 얻기 위한 사전 준비 작업입니다.</p></div><div class="w-full md:w-1/2 bg-teal-50 p-4 rounded-lg border border-teal-200 text-center"><i class="fas fa-ruler-combined text-3xl text-teal-500 mb-2"></i><h4 class="font-bold text-teal-800">프로파일링 (Profiling)</h4><p class="text-sm text-teal-700 mt-2">캘리브레이션 된 장비가 색상을 어떻게 표현하는지 <span class="font-semibold">정확히 측정하여 그 특성을 파일(ICC Profile)로 기록</span>하는 과정입니다.</p></div></div><div class="mt-4 pt-4 border-t"><h5 class="font-semibold text-md text-gray-800 mb-2">각 장비의 캘리브레이션 & 프로파일링</h5><p class="text-sm text-gray-600 mb-2"><span class="font-semibold text-gray-700">모니터:</span> 전용 센서(계측기)를 모니터에 부착하여 목표한 밝기(Luminance), 백색점(White Point), 감마(Gamma) 값에 맞도록 조정한 후, 측정된 색상 표현 특성을 모니터 프로파일로 저장합니다.</p><p class="text-sm text-gray-600"><span class="font-semibold text-gray-700">프린터:</span> 특정 프린터, 잉크, 용지 조합으로 정해진 색상 패치를 인쇄하고, 분광측색계(Spectrophotometer)로 각 패치의 색상을 정밀하게 측정하여 해당 조합에 맞는 프린터 프로파일을 생성합니다.</p></div></div></div></div><div class="content-card mb-4"><div class="question p-6 flex justify-between items-center"><h3 class="text-lg font-bold text-gray-800">4. sRGB와 Display P3 색 공간 비교</h3><i class="fas fa-chevron-down"></i></div><div class="answer border-t border-gray-200"><div class="p-6"><p class="mb-4 text-gray-700">같은 이미지라도 색 공간에 따라 다르게 보일 수 있습니다. 아래 예시는 sRGB와 Display P3 색 공간으로 표현된 동일한 그래픽을 비교합니다.</p><div class="flex flex-col md:flex-row items-center justify-center gap-4"><figure class="text-center"><svg viewBox="0 0 100 100" class="w-48 h-48 rounded-md border"><rect width="100" height="100" fill="rgb(255,0,0)"></rect><polygon points="50,20 61,39 82,39 65,54 71,75 50,63 29,75 35,54 18,39 39,39" fill="rgba(0,0,0,0.2)"></polygon></svg><figcaption class="mt-2 text-sm text-gray-600">sRGB</figcaption></figure><figure class="text-center"><svg viewBox="0 0 100 100" class="w-48 h-48 rounded-md border"><rect width="100" height="100" fill="color(display-p3 1 0 0)"></rect><polygon points="50,20 61,39 82,39 65,54 71,75 50,63 29,75 35,54 18,39 39,39" fill="rgba(0,0,0,0.2)"></polygon></svg><figcaption class="mt-2 text-sm text-gray-600">Display P3</figcaption></figure></div></div></div></div></div>`;
    } else {
        let itemsToRender = [];
        if (searchTerm) {
            const jamoSearch = typeof Jamo !== "undefined" ? Jamo.jamo(searchTerm.toLowerCase()) : "";
            const allData = Object.values(photographyData).flat();
            itemsToRender = allData.filter((item) => item && item.q && (item.q.toLowerCase().includes(searchTerm.toLowerCase()) || item.a.toLowerCase().includes(searchTerm.toLowerCase()) || (item.keywords && item.keywords.toLowerCase().includes(searchTerm.toLowerCase())) || (jamoSearch && (Jamo.jamo(item.q.toLowerCase()).includes(jamoSearch) || (item.keywords && Jamo.jamo(item.keywords.toLowerCase()).includes(jamoSearch))))));
        } else {
            itemsToRender = photographyData[category] || [];
        }
        if (itemsToRender.length > 0) {
            const cardsHtml = itemsToRender.map((item) => `
                <div class="quiz-card">
                    <div class="quiz-card-inner">
                        <div class="quiz-card-front">
                            <h3 class="quiz-card-question">${item.q}</h3>
                        </div>
                        <div class="quiz-card-back">
                            <div class="quiz-card-answer-text">
                                <p>${item.a.replace(/\n/g, "<br>")}</p>
                            </div>
                            <div class="mt-4 flex flex-wrap gap-2 justify-center">
                                <button class="gemini-btn text-xs font-semibold py-1 px-3 rounded-full" data-action="explain" data-q="${item.q.replace(/"/g, "&quot;")}" data-a="${item.a.replace(/"/g, "&quot;")}">✨ 쉽게 설명</button>
                                <button class="gemini-btn text-xs font-semibold py-1 px-3 rounded-full" data-action="deepen" data-q="${item.q.replace(/"/g, "&quot;")}" data-a="${item.a.replace(/"/g, "&quot;")}">✨ 깊이 알아보기</button>
                            </div>
                        </div>
                    </div>
                </div>
            `).join("");
            html = `<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">${cardsHtml}</div>`;
        } else {
            const categoryTitle = document.querySelector(`[data-category="${category}"]`)?.textContent || "콘텐츠";
            html = `<div class="content-card p-8 text-center"><h2 class="text-2xl font-bold text-gray-800 mb-4">검색 결과 없음 😢</h2><p class="text-gray-600">'<span id="search-term">${searchTerm}</span>'에 대한 검색 결과를 찾을 수 없습니다.</p><p class="mt-4 text-sm text-gray-500">오타를 확인하시거나 다른 검색어로 다시 시도해 보세요.</p></div>`;
        }
    }
    mainContent.innerHTML = html;
    if (category === "visualization" || category === "cms") {
        setupEventListeners();
    } else if (category === "quiz") {
        initQuizPage();
    } else if (category !== "home") {
        setupCardFlipListeners();
    }
    setupGeminiButtons();
    if (category === "visualization") {
        setTimeout(() => {
            const updateChart = (chartName, stopType) => {
                const data = visualizationData[chartName][stopType];
                const color = chartName === "aperture" ? ["rgba(75, 192, 192, 0.6)", "rgba(75, 192, 192, 1)"] : ["rgba(255, 159, 64, 0.6)", "rgba(255, 159, 64, 1)"];
                createChart(`${chartName}Chart`, chartName, data, color[0], color[1]);
            };
            updateChart("aperture", "fullStop");
            updateChart("shutter", "fullStop");
            document.querySelectorAll(".stop-btn").forEach((button) => {
                button.addEventListener("click", (e) => {
                    const chart = e.target.dataset.chart;
                    const stop = e.target.dataset.stop;
                    document.querySelectorAll(`[data-chart="${chart}"]`).forEach((btn) => btn.classList.remove("active"));
                    e.target.classList.add("active");
                    updateChart(chart, stop);
                });
            });
        }, 0);
    }
}
function handleNavClick(e) {
    e.preventDefault();
    const targetLink = e.target.closest("a");
    if (!targetLink) return;
    const category = targetLink.dataset.category;
    searchInput.value = "";
    document.querySelectorAll("nav a").forEach((link) => link.classList.remove("active"));
    targetLink.classList.add("active");
    renderContent(category);
}
document.querySelectorAll("nav a").forEach((link) => link.addEventListener("click", handleNavClick));
searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value;
    if (searchTerm.length > 0) {
        document.querySelectorAll("nav a").forEach((link) => link.classList.remove("active"));
        renderContent(null, searchTerm);
    } else {
        const activeOrHomeLink = document.querySelector(".nav-item.active") || document.querySelector('[data-category="home"]');
        if (activeOrHomeLink) {
            activeOrHomeLink.click();
        }
    }
});
function displayQuizFinalScore() {
    const total = currentQuizData.questions.length;
    const percentage = total ? (score / total) * 100 : 0;
    const message = typeof getPracticeMessage === 'function'
        ? getPracticeMessage(percentage)
        : '';
    showModal('퀴즈 완료', `
        <div class="p-6 text-center">
            <h2 class="text-2xl font-bold mb-4">🎉 퀴즈 완료! 🎉</h2>
            <p class="text-xl">당신의 점수는 <span class="text-blue-600 font-bold">${score}</span>/${total}점 입니다!</p>
            ${message ? `<p class="text-lg font-semibold mt-4">${message}</p>` : ''}
            ${score === total ? '<p class="text-lg font-semibold mt-4 text-green-600">축하합니다! 모든 문제를 맞히셨어요! 🏆</p>' : ''}
            <button id="closeModalBtn" class="mt-8 bg-gray-700 text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-800">닫기</button>
        </div>
    `, false);
    document.getElementById("closeModalBtn").addEventListener("click", hideModal);
}
function setupGeminiButtons() {
    document.querySelectorAll(".gemini-btn").forEach((btn) => {
        btn.addEventListener("click", async (e) => {
            e.stopPropagation();
            const { action, q: question, a: answer } = e.currentTarget.dataset;
            if (!question || !answer) {
                console.error("Missing data on Gemini button", e.currentTarget);
                showModal("오류", `<p class="text-red-500">해당 항목의 데이터를 불러오지 못했습니다.</p>`, false);
                return;
            }
            const cacheKey = `${action}-${question}`;
            const resultTitle = `"${question}" ${action === "explain" ? "쉽게 이해하기" : "깊이 알아보기"}`;
            const cachedResponse = localStorage.getItem(cacheKey);
            if (cachedResponse) {
                showModal(resultTitle, `<p>${cachedResponse.replace(/\n/g, "<br>")}</p>`, false);
                return;
            }
            let prompt = "";
            let loadingTitle = "";
            if (action === "explain") {
                loadingTitle = "쉽게 설명 중... 💡";
                prompt = `사진학 용어인 "${question}"에 대해 입시생의 암기하기 쉽게 이해하기 쉽고 간결하게 설명해줘. 다음 설명을 참고하여, 중요한 개념을 놓치지 않으면서도 면접에서 자연스럽게 활용할 수 있도록 정리해줘 최대 300자 내외. 참고 설명: ${answer}`;
            } else if (action === "deepen") {
                loadingTitle = "깊이 알아보기 중... 🧐";
                prompt = `사진학 개념인 "${question}"을(를) 위키 스타일로 정리해줘. 인사말이나 질문 언급 없이,기본 설명을 바탕으로 '개요', '역사', '전공자를 위한 정보', '관련 사진가' 순서로 간결하게 서술해. 단, 역사 외 질문은 작가를 안넣어도 돼. 작가가 들어갈 경우 대표작·대표 사진집·전시 제목만 알려줘. 기본 설명: ${answer}`;
            }
            if (prompt) {
                const { result } = callGemini(prompt, false, loadingTitle);
                const responseText = await result;
                if (responseText) {
                    showModal(resultTitle, `<p>${responseText.replace(/\n/g, "<br>")}</p>`, false);
                    localStorage.setItem(cacheKey, responseText);
                }
            }
        });
    });
}
function initQuizPage() {
    const quizBtn = document.getElementById("quizBtn");
    const practiceBtn = document.getElementById("practiceBtn");
    if (quizBtn) {
        quizBtn.addEventListener("click", () => {
            const content = `
                <div class="text-center">
                    <p class="mb-4">몇 문제로 퀴즈를 풀어볼까요?</p>
                    <div class="flex justify-center space-x-4">
                        <button id="quiz5Btn" class="bg-pink-300 hover:bg-pink-400 text-white font-bold py-2 px-4 rounded-full shadow transform transition hover:scale-105">🐣 5문제</button>
                        <button id="quiz20Btn" class="bg-yellow-300 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded-full shadow transform transition hover:scale-105">🐥 20문제</button>
                    </div>
                </div>`;
            showModal('퀴즈 문제 수 선택', content, false);
            document.getElementById('quiz5Btn').addEventListener('click', () => generateQuiz(5));
            document.getElementById('quiz20Btn').addEventListener('click', () => generateQuiz(20));
        });
    }
    if (practiceBtn) {
        practiceBtn.addEventListener("click", generatePractice);
    }
}
closeModalBtn.addEventListener("click", hideModal);
geminiModal.addEventListener("click", (e) => {
    if (e.target === geminiModal) hideModal();
});
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !geminiModal.classList.contains("hidden")) hideModal();
});
renderContent("home");
