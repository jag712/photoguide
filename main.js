// --- 데이터 영역 ---
// 데이터는 photographyData.js 파일에서 로드됩니다.

function getUpcomingMonthsUntilNextJanuary() {
    const today = new Date();
    const months = [];
    const endYear = today.getFullYear() + 1;
    const endMonth = 1; // January of next year
    const cursor = new Date(today.getFullYear(), today.getMonth(), 1);
    const endDate = new Date(endYear, endMonth - 1, 1);

    while (cursor <= endDate) {
        months.push({ year: cursor.getFullYear(), month: cursor.getMonth() + 1 });
        cursor.setMonth(cursor.getMonth() + 1);
    }

    return months;
}

function getKoreanHolidays(year) {
    return [
        { start: new Date(year, 0, 1), title: "신정", color: "bg-gray-500", isHoliday: true },
        { start: new Date(year, 2, 1), title: "삼일절", color: "bg-gray-500", isHoliday: true },
        { start: new Date(year, 4, 5), title: "어린이날", color: "bg-gray-500", isHoliday: true },
        { start: new Date(year, 5, 6), title: "현충일", color: "bg-gray-500", isHoliday: true },
        { start: new Date(year, 7, 15), title: "광복절", color: "bg-gray-500", isHoliday: true },
        { start: new Date(year, 9, 3), title: "개천절", color: "bg-gray-500", isHoliday: true },
        { start: new Date(year, 9, 9), title: "한글날", color: "bg-gray-500", isHoliday: true },
        { start: new Date(year, 11, 25), title: "성탄절", color: "bg-gray-500", isHoliday: true },
    ];
}

function getAdmissionEventDefinitions(currentYear, nextYear) {
    return [
        {
            start: new Date(currentYear, 11, 29),
            end: new Date(currentYear, 11, 31),
            title: "경일 원서접수",
            color: "bg-purple-600",
        },
        {
            start: new Date(currentYear, 11, 29),
            end: new Date(nextYear, 0, 14),
            title: "서울예대 원서접수",
            color: "bg-yellow-500",
        },
        {
            start: new Date(nextYear, 0, 13),
            end: new Date(nextYear, 0, 13),
            title: "경일 정시 면접",
            color: "bg-purple-700",
        },
        {
            start: new Date(nextYear, 0, 19),
            end: new Date(nextYear, 0, 23),
            title: "예대 정시 주간",
            color: "bg-yellow-600",
        },
    ];
}

function buildMonthlyEvents(monthsToShow) {
    const today = new Date();
    const currentYear = today.getFullYear();
    const nextYear = currentYear + 1;
    const monthKey = (year, month) => `${year}-${month}`;

    const base = {};
    monthsToShow.forEach(({ year, month }) => {
        base[monthKey(year, month)] = {};
    });

    const allEvents = [
        ...getKoreanHolidays(currentYear),
        ...getKoreanHolidays(nextYear),
        ...getAdmissionEventDefinitions(currentYear, nextYear),
    ];

    allEvents.forEach((event) => {
        const start = new Date(event.start);
        const end = new Date(event.end || event.start);
        for (
            let cursor = new Date(start.getFullYear(), start.getMonth(), start.getDate());
            cursor <= end;
            cursor.setDate(cursor.getDate() + 1)
        ) {
            const key = monthKey(cursor.getFullYear(), cursor.getMonth() + 1);
            if (!base[key]) continue;
            const day = cursor.getDate();
            (base[key][day] = base[key][day] || []).push({
                title: event.title,
                color: event.color,
                isHoliday: event.isHoliday,
            });
        }
    });

    return base;
}
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

const studyNoteChapters = [
    {
        title: "Chapter 1. 카메라 기본 & 노출",
        subtitle: "기초 구조에서 사진사까지 한눈에 정리",
        parts: [
            {
                title: "Part 1. 카메라 기본",
                summary: "DSLR/RF 구조, 셔터와 조리개, 무브먼트, 노출 개념을 묶어 놓은 기본 가이드",
                content: `
                    <div class="space-y-4 text-sm leading-relaxed text-gray-800">
                        <ul class="list-disc pl-5 space-y-1">
                            <li><strong>카메라 유형:</strong> DSLR은 미러·펜타프리즘을 통해 광학 뷰파인더로 확인하며, RF는 렌즈와 뷰파인더가 분리되어 시차가 생깁니다.</li>
                            <li><strong>미러/펜타프리즘 역할:</strong> 미러는 상하를 반전하고, 펜타프리즘은 좌우를 바로잡아 올바른 상을 제공합니다.</li>
                            <li><strong>포맷별 특징:</strong> 소형(35mm)·중형(6×4.5~6×9cm)·대형(4×5인치 이상)으로 나뉘며, 대형일수록 화질과 무브먼트 여유가 큽니다.</li>
                            <li><strong>무브먼트 종류:</strong> 라이즈/폴(상하), 쉬프트(좌우), 틸트(앞뒤 기울임), 스윙(좌우 기울임)으로 초점면과 왜곡을 제어합니다.</li>
                            <li><strong>이미지 서클과 비네팅:</strong> 센서보다 이미지 서클이 작으면 모서리가 어두워지고 잘립니다.</li>
                            <li><strong>셔터:</strong> 포컬 플레인(고속, 동조 제한), 렌즈 셔터(플래시 유리), 전자 셔터(무소음, 롤링 왜곡 가능).</li>
                            <li><strong>셔터 모드:</strong> i=설정 시간, b=누르는 동안 개방, t=한 번 열고 한 번 닫음.</li>
                            <li><strong>속도 스텝:</strong> 1스톱(1s→1/2→...→1/8000)과 1/3스톱(1s→0.8→0.6→...→1/8000) 값을 함께 기억합니다.</li>
                            <li><strong>조리개와 회절:</strong> f/5.6~f/11 구간이 해상도가 높으며, f/16 이후 회절로 선명도가 감소합니다.</li>
                            <li><strong>조리개 스텝:</strong> f/1→1.4→2→2.8→...→128(1스톱), f/1~22까지 1/3스톱 값(1.1,1.2,1.4,...,22).</li>
                            <li><strong>스톱과 노출:</strong> 빛의 양을 두 배/절반으로 조절하는 단위. 노출은 센서·필름에 도달하는 빛의 총량이며, 적정 노출은 의도와 중간회색 기준의 균형입니다.</li>
                        </ul>
                        <div class="bg-gray-50 border rounded-lg p-3 text-xs leading-relaxed">
                            <p class="font-semibold">시차와 시야율 요약</p>
                            <p class="mt-1">RF·TLR·콤팩트·스마트폰에서 시차가 발생하며, 시야율이 100%에 가까울수록 뷰파인더와 결과가 일치합니다.</p>
                        </div>
                    </div>
                `,
            },
            {
                title: "Part 2. 디지털 파트",
                summary: "센서 방식, 포맷, 파일 포맷의 차이를 빠르게 비교",
                content: `
                    <div class="space-y-4 text-sm leading-relaxed text-gray-800">
                        <table class="w-full text-left text-xs border border-gray-200">
                            <thead class="bg-gray-100"><tr><th class="p-2">구분</th><th class="p-2">CCD</th><th class="p-2">CMOS</th></tr></thead>
                            <tbody>
                                <tr class="border-t"><td class="p-2">방식</td><td class="p-2">외부 회로 증폭</td><td class="p-2">픽셀 자체 증폭</td></tr>
                                <tr class="border-t"><td class="p-2">장점</td><td class="p-2">고화질, 균일성</td><td class="p-2">저전력, 빠른 처리</td></tr>
                                <tr class="border-t"><td class="p-2">단점</td><td class="p-2">고가, 전력 소모</td><td class="p-2">초기엔 노이즈</td></tr>
                            </tbody>
                        </table>
                        <ul class="list-disc pl-5 space-y-1">
                            <li><strong>센서 크기 영향:</strong> 크면 노이즈가 적고 배경 흐림이 크며 저조도 성능이 좋습니다.</li>
                            <li><strong>RAW·TIFF·JPEG:</strong> RAW는 12~14bit 원본(25~40MB), TIFF는 보정 완료 8/16bit(30~180MB), JPEG는 손실 8bit(5~10MB).</li>
                            <li><strong>화이트 밸런스:</strong> 광원 색온도와 카메라 색온도를 맞춰 흰색을 중립으로 보정.</li>
                            <li><strong>노이즈 감소 팁:</strong> ISO를 낮게, 적정 노출 확보, 밝은 렌즈와 조명 활용, 센서 발열 관리.</li>
                            <li><strong>디지털 오류:</strong> 스미어(세로 번짐), 블루밍(빛 넘침), 계단 현상, 무아레 등은 노출·필터·각도 조정으로 완화.</li>
                        </ul>
                    </div>
                `,
            },
            {
                title: "Part 3. 사진 역사 & 작가",
                summary: "사진 발명과 대표 작가 흐름을 표와 함께 정리",
                content: `
                    <div class="space-y-4 text-sm leading-relaxed text-gray-800">
                        <table class="w-full text-left text-xs border border-gray-200">
                            <thead class="bg-gray-100"><tr><th class="p-2">기법</th><th class="p-2">발명자/연도</th><th class="p-2">특징</th></tr></thead>
                            <tbody>
                                <tr class="border-t"><td class="p-2">헬리오그래피</td><td class="p-2">니엡스 · 1826</td><td class="p-2">역청 도포 금속판, 최초 사진</td></tr>
                                <tr class="border-t"><td class="p-2">다게레오타입</td><td class="p-2">다게르 · 1839</td><td class="p-2">은판 직접 양화, 복제 불가</td></tr>
                                <tr class="border-t"><td class="p-2">칼로타입</td><td class="p-2">탈보트 · 1841</td><td class="p-2">종이 네거티브→양화, 복제 가능</td></tr>
                            </tbody>
                        </table>
                        <ul class="list-disc pl-5 space-y-1">
                            <li><strong>습판/건판:</strong> 아처의 콜로디온 습판(고화질, 현장 현상 필요)과 매덕스의 젤라틴 건판(운반·고감도)로 발전.</li>
                            <li><strong>사진 대중화:</strong> 1890년대 이스트만의 코닥과 "You press the button" 슬로건으로 보급.</li>
                            <li><strong>회화주의 vs 자연주의:</strong> 합성·소프트포커스로 회화적 표현(레일랜더, 로빈슨)과 자연광 사실 표현(에머슨)으로 대비.</li>
                            <li><strong>머이브릿지:</strong> 다중 카메라 고속 연속촬영(Animal Locomotion)으로 영화의 기초 마련.</li>
                        </ul>
                    </div>
                `,
            },
        ],
    },
    {
        title: "Chapter 2. 장비와 촬영 이론",
        subtitle: "렌즈 특성과 촬영 방식, 두 번째 디지털 기초",
        parts: [
            {
                title: "Part 1. 장비 & 촬영 기본",
                summary: "렌즈 종류, 피사계심도, 수차, 비네팅 등 촬영 핵심",
                content: `
                    <div class="space-y-4 text-sm leading-relaxed text-gray-800">
                        <ul class="list-disc pl-5 space-y-1">
                            <li><strong>렌즈 사례:</strong> Canon EF 24-70mm f/2.8L II는 전 구간 f/2.8 고정, 실전 기동성 높음.</li>
                            <li><strong>초점거리:</strong> 길수록 화각이 좁고 배경 압축, 짧을수록 원근감이 강조됩니다.</li>
                            <li><strong>표준렌즈:</strong> 포맷 대각선 길이와 유사(35mm=50mm, 4×5=150mm 등).</li>
                            <li><strong>광각 vs 망원:</strong> 광각은 깊은 심도·강한 원근감, 망원은 얕은 심도·배경 압축.</li>
                            <li><strong>수차 종류:</strong> 구면, 코마, 비점, 상면만곡, 왜곡, 색수차를 비구면·ED 유리·조리개로 보정.</li>
                            <li><strong>특수 렌즈:</strong> 시프트(수직 유지), 매크로(1:1), 어안(극광각), 연초점(소프트), 시프트/틸트로 무브먼트 구현.</li>
                            <li><strong>피사계심도:</strong> 조리개 조임, 짧은 초점거리, 피사체와 거리 확보로 깊게 확보.</li>
                            <li><strong>비네팅/플레어:</strong> 이미지 서클 부족, 필터 중첩, 후드 간섭 등이 원인. 후드·조리개 조이기·보정으로 완화.</li>
                        </ul>
                    </div>
                `,
            },
            {
                title: "Part 2. 디지털 카메라 II",
                summary: "노이즈, 화소, 센서 크기, 히스토그램 활용",
                content: `
                    <div class="space-y-3 text-sm leading-relaxed text-gray-800">
                        <ul class="list-disc pl-5 space-y-1">
                            <li><strong>노이즈:</strong> 고감도·저조도·언더 보정 시 증가. 센서 크기와 적정 노출 확보가 핵심.</li>
                            <li><strong>화소수:</strong> 디테일과 크롭에 유리하지만 센서 대비 과도하면 노이즈 증가.</li>
                            <li><strong>다이내믹 레인지:</strong> 동시에 표현 가능한 명암 범위. 히스토그램으로 노출·톤 분포를 확인.</li>
                            <li><strong>DSLR vs 미러리스:</strong> 미러 유무, EVF 실시간 확인 vs 광학 뷰파인더, 휴대성/배터리 차이.</li>
                            <li><strong>포맷:</strong> 풀프레임(36×24mm) vs 크롭(APS-C, 1.5/1.6배 환산). 크롭 렌즈를 풀프레임에 사용 시 비네팅.</li>
                            <li><strong>무아레:</strong> 촘촘한 패턴과 센서 배열 간 간섭. 저역통과 필터나 각도 변경으로 완화.</li>
                        </ul>
                    </div>
                `,
            },
            {
                title: "Part 3. 사진사 & 역사",
                summary: "자콥 리스부터 f/64 그룹까지 핵심 인물 정리",
                content: `
                    <div class="space-y-3 text-sm leading-relaxed text-gray-800">
                        <ul class="list-disc pl-5 space-y-1">
                            <li><strong>자콥 리스/루이스 하인:</strong> 사회 개혁과 아동노동 고발 사진.</li>
                            <li><strong>스티글리츠:</strong> 사진분리파, 스트레이트 포토그래피, 『카메라 워크』와 291 갤러리.</li>
                            <li><strong>으젠느 앗제/스타이켄:</strong> 파리 기록과 『인간 가족전』으로 사진 보편성 확장.</li>
                            <li><strong>즉물주의 & f/64 그룹:</strong> 기계적 기록성(폴 스트랜드)과 고해상 풍경(아담스, 웨스턴, 커닝험).</li>
                            <li><strong>스냅 사진:</strong> 에리히 잘로몬 등 준비되지 않은 순간을 포착하는 캔디드 포토.</li>
                        </ul>
                    </div>
                `,
            },
        ],
    },
    {
        title: "Chapter 3. 노출 심화",
        subtitle: "존 시스템과 디지털 비트, 포토저널리즘 흐름",
        parts: [
            {
                title: "Part 1. 노출 원리",
                summary: "상반법칙, TTL 측광, 존 시스템까지 실전 노출 정리",
                content: `
                    <div class="space-y-3 text-sm leading-relaxed text-gray-800">
                        <ul class="list-disc pl-5 space-y-1">
                            <li><strong>E.I:</strong> 촬영자가 정하는 실효 감도. 필름 특성/현상 조건에 맞춰 조정.</li>
                            <li><strong>우선식 모드:</strong> 조리개 우선=심도 제어, 셔터 우선=움직임 제어.</li>
                            <li><strong>상반법칙:</strong> 조리개와 셔터 속도 교환으로 동일 노출 확보. 극단적 시간에서는 불궤 가능.</li>
                            <li><strong>TTL 측광:</strong> 평가·중앙중점·부분·스팟 모드. 그레이카드 18%, 화이트카드 +2 1/3스톱 보정.</li>
                            <li><strong>존 시스템:</strong> 존0~X, 존3(암부 디테일)~존7(명부 디테일) 활용. 디테일 영역은 존2~8.</li>
                            <li><strong>노출/노광:</strong> 촬영 시 빛 주기 vs 인화 시 인화지에 주는 빛.</li>
                        </ul>
                    </div>
                `,
            },
            {
                title: "Part 2. 디지털 카메라 III",
                summary: "비트심도, 해상도, 출력 단위 정리",
                content: `
                    <div class="space-y-3 text-sm leading-relaxed text-gray-800">
                        <ul class="list-disc pl-5 space-y-1">
                            <li><strong>비트심도:</strong> 8bit=256단계, 16bit=65,536단계. 16bit가 후보정에 유리.</li>
                            <li><strong>메모리 단위:</strong> 8bit=1Byte → KB→MB→GB→TB→PB→EB→ZB→YB.</li>
                            <li><strong>해상도와 해상력:</strong> 픽셀 밀도(PPI/DPI/LPI) vs 표현 가능한 세부(선/mm).</li>
                            <li><strong>300DPI:</strong> 인쇄 표준(1인치당 300×300=90,000점).</li>
                            <li><strong>색공간:</strong> 8bit RGB 총 16,777,216색. 비트가 높을수록 다이내믹 레인지 확보.</li>
                            <li><strong>포맷:</strong> TIFF/PSD는 레이어·16bit 지원, JPEG는 8bit 손실, PNG는 투명·비손실, HEIF는 고효율 10~12bit.</li>
                        </ul>
                    </div>
                `,
            },
            {
                title: "Part 3. 포토저널리즘 & 아방가르드",
                summary: "유럽·미국 보도사진 흐름과 실험사진가",
                content: `
                    <div class="space-y-3 text-sm leading-relaxed text-gray-800">
                        <ul class="list-disc pl-5 space-y-1">
                            <li><strong>케르테츠·브라사이:</strong> 파리 거리·야경의 감성적 기록.</li>
                            <li><strong>아이젠슈테트·LIFE:</strong> 사진 에세이 정착으로 스토리텔링 강화.</li>
                            <li><strong>다다이즘·뉴 비전:</strong> 포토몽타주(존 하트필드), 포토그램(만 레이), 급진적 구도(로드첸코).</li>
                            <li><strong>FSA 다큐:</strong> 에반스(구조적 기록), 랭(『Migrant Mother』), 버크 화이트(산업·전쟁).</li>
                            <li><strong>매그넘:</strong> 1947년 카파·브레송 등이 설립, 사진가의 편집권 존중.</li>
                            <li><strong>결정적 순간:</strong> 브레송이 정의한 빛·구도·감정이 일치하는 찰나.</li>
                        </ul>
                    </div>
                `,
            },
        ],
    },
    {
        title: "Chapter 4. 필름 & 디지털 기초",
        subtitle: "필름 재료, 색온도, 기본 파일 포맷 정리",
        parts: [
            {
                title: "Part 1. 필름 기본",
                summary: "필름 구성 요소와 기초 용어",
                content: `
                    <div class="space-y-3 text-sm leading-relaxed text-gray-800">
                        <ul class="list-disc pl-5 space-y-1">
                            <li><strong>필름:</strong> 감광유제를 기재 위에 도포한 재료. 흑백/컬러, 네거티브/포지티브로 구분.</li>
                            <li><strong>감광유제:</strong> 젤라틴+은염. 감도는 빛 민감도, 관용도는 허용 노출 범위, 입상성과 해상력은 입자 크기·정렬 정도.</li>
                            <li><strong>감색성:</strong> 청감성(짧은 파장), 정색성(파랑~노랑), 전정색성(가시광 전체).</li>
                        </ul>
                    </div>
                `,
            },
            {
                title: "Part 2. 필름 종류와 색온도",
                summary: "네거티브/포지티브, 현상 공정, 색온도와 필터",
                content: `
                    <div class="space-y-3 text-sm leading-relaxed text-gray-800">
                        <ul class="list-disc pl-5 space-y-1">
                            <li><strong>컬러 네거티브 vs 포지티브:</strong> 네거티브는 관용도 넓고 C-41, 포지티브는 관용도 좁고 E-6.</li>
                            <li><strong>C-41/E-6 단계:</strong> C-41(발색→표백→정착→수세→안정), E-6(1차 흑백→반전→발색→표백→정착).</li>
                            <li><strong>색온도:</strong> 촛불 1,000~2,000K, 텅스텐 2,800~3,200K, 주광 5,500K, 흐린 날 7,500K+. 색온도계로 측정.</li>
                            <li><strong>필름 감도:</strong> 400필름은 100필름보다 2스톱 빠르며 관용도는 넓지만 입상이 거칠고 해상력 낮음.</li>
                            <li><strong>특성곡선:</strong> 베이스+포그→발부→직선부→어깨→솔라리제이션. 감마(직선부 기울기)와 C.I(평균 기울기)로 콘트라스트 판단.</li>
                        </ul>
                    </div>
                `,
            },
            {
                title: "Part 3. 디지털 기본 이론",
                summary: "JPEG/TIFF/PSD, 벡터와 비트맵, 저장장치 역할",
                content: `
                    <div class="space-y-3 text-sm leading-relaxed text-gray-800">
                        <ul class="list-disc pl-5 space-y-1">
                            <li><strong>JPEG:</strong> 손실 압축 8bit, 용량 작고 호환성 높음.</li>
                            <li><strong>TIFF:</strong> 비손실/무압축, 8/16bit, 인쇄·아카이브용.</li>
                            <li><strong>PSD:</strong> 포토샵 전용, 레이어·마스크 유지, 16/32bit 지원.</li>
                            <li><strong>EPS/AI/PDF:</strong> 벡터 기반. EPS는 레거시, AI는 편집용, PDF는 배포·출력 표준.</li>
                            <li><strong>비트맵 vs 벡터:</strong> 픽셀 기반(확대 시 계단) vs 수학적 좌표(확대에도 선명).</li>
                            <li><strong>컴퓨터 자원:</strong> CPU=연산, RAM=작업 메모리, GPU=그래픽 가속, SSD/HDD=저장/속도 차이.</li>
                        </ul>
                    </div>
                `,
            },
        ],
    },
    {
        title: "Chapter 5. 필름 II & CMS",
        subtitle: "상반칙 불궤 보정부터 색 관리까지",
        parts: [
            {
                title: "Part 1. 필름 II",
                summary: "형광등 색편차, 텅스텐 필름, DX코드 등 심화",
                content: `
                    <div class="space-y-3 text-sm leading-relaxed text-gray-800">
                        <ul class="list-disc pl-5 space-y-1">
                            <li><strong>형광등 촬영:</strong> 녹색끼 발생 → FL/CC 마젠타 필터 또는 RAW 틴트 보정.</li>
                            <li><strong>D/T 타입:</strong> D타입 필름은 텅스텐에서 붉게, T타입 필름은 주광에서 푸르게 → 80/85계열 필터로 보정.</li>
                            <li><strong>보조 층:</strong> 할레이션 방지층(재반사 차단), 옐로우 방지층(블루 차단), 오렌지 마스킹(정확한 색 분리).</li>
                            <li><strong>식별 요소:</strong> DX코드(ISO/매수), 유제번호(생산 배치), 유제/베이스 면 구분.</li>
                            <li><strong>상반칙불궤:</strong> 장노출 부족·고속 과다. L타입(장노출 보정)·S타입(고속 보정) 필름 존재.</li>
                            <li><strong>필름 형태:</strong> 시트필름(4×5, 8×10 등, 개별 현상) vs 롤필름(120/220/135, 연속 촬영).</li>
                        </ul>
                    </div>
                `,
            },
            {
                title: "Part 2. CMS & 색공간",
                summary: "캘리브레이션, sRGB/Adobe RGB/P3, ICC 프로파일",
                content: `
                    <div class="space-y-3 text-sm leading-relaxed text-gray-800">
                        <ul class="list-disc pl-5 space-y-1">
                            <li><strong>CMS:</strong> 장비 간 색 일치를 위한 시스템. 모니터·프린터·카메라의 색차를 줄여 예측 가능성 향상.</li>
                            <li><strong>캘리브레이션:</strong> 컬러미터(Spyder, i1 Display) vs 분광측색계(i1 Pro)로 색 편차 교정.</li>
                            <li><strong>색공간:</strong> sRGB(웹), Adobe RGB(인쇄), Display P3(영상/HDR), Rec.709/2020(영상), ProPhoto RGB(가장 넓은 장치 의존형).</li>
                            <li><strong>색역:</strong> 색공간 설계도 안에서 실제 장치가 구현하는 범위. 모니터 스펙 확인 필요.</li>
                            <li><strong>감마:</strong> 2.2(표준), 1.8(구 macOS), 2.6(DCI-P3 투사). 비선형 보정으로 자연스러운 계조 확보.</li>
                            <li><strong>ICC 프로파일:</strong> 장치 색 특성 파일(Process/Generic/Custom). Adobe RGB를 워킹 스페이스로 사용.</li>
                            <li><strong>스풀:</strong> 출력 데이터를 임시 저장해 프린터 대기열을 관리, 대용량 인쇄 효율 개선.</li>
                        </ul>
                    </div>
                `,
            },
            {
                title: "Part 3. 유형학 & 현대 사진가",
                summary: "타이포로지, 구르스키, 제프 월, 노부요시까지",
                content: `
                    <div class="space-y-3 text-sm leading-relaxed text-gray-800">
                        <ul class="list-disc pl-5 space-y-1">
                            <li><strong>유형학적 사진:</strong> 동일 조건 반복 촬영 배열. 베허 부부(산업 건축물), 구르스키(고공·합성), 스트루스·루프·회퍼 등.</li>
                            <li><strong>제프 월 vs 베르나르 포콩:</strong> 월은 영화적 세트·라이트박스의 사회적 서사, 포콩은 인형·세트로 유년기의 환상 표현.</li>
                            <li><strong>마틴 파/샌디 스코글룬:</strong> 소비문화 풍자, 설치·반복 색채 연출.</li>
                            <li><strong>바바라 크루거/잰 그루버:</strong> 광고 언어 차용으로 권력·소비 비판.</li>
                            <li><strong>로버트 메이플소프 & 아라키 노부요시:</strong> 금기 소재를 고전적 조형미와 일상/타나토스 서사로 결합.</li>
                            <li><strong>낸 골딘 & 신디 셔먼:</strong> 자전적 스냅 vs 분장 셀프 포트레이트로 정체성 탐구.</li>
                            <li><strong>포스트모더니즘 개념:</strong> 패러디·차용, 아우라 붕괴(벤야민), 스투디움/푼크툼(바르트), 바우하우스·미니멀리즘 영향.</li>
                        </ul>
                    </div>
                `,
            },
        ],
    },
    {
        title: "Chapter 6. 필터 & 컬러",
        subtitle: "필터 원리와 디지털 색 이론",
        parts: [
            {
                title: "Part 1. 필터 기본",
                summary: "필터 계수, ND/PL/UV, 가변 ND와 편광 사용법",
                content: `
                    <div class="space-y-3 text-sm leading-relaxed text-gray-800">
                        <ul class="list-disc pl-5 space-y-1">
                            <li><strong>원리:</strong> 같은 색은 통과, 보색은 흡수. 오렌지 필터로 오렌지를 밝게 표현.</li>
                            <li><strong>필터 계수:</strong> 필터 사용으로 줄어드는 노출량. TTL 측광이면 자동 보정.</li>
                            <li><strong>ND:</strong> Neutral Density, 색 변화 없이 광량 감소(ND400≈8⅔스톱). 장노출·개방 심도에 사용.</li>
                            <li><strong>PL/CPL:</strong> 난반사 제거·채도 향상. 태양 90° 방향 하늘, 유리/물 50° 전후에서 효과적.</li>
                            <li><strong>가변 ND:</strong> 편광 2장으로 광량 조절, X자 밴딩·색 틀어짐 유의.</li>
                            <li><strong>UV/스카이라이트:</strong> 자외선·푸른 기운 완화, 렌즈 보호용으로 사용.</li>
                        </ul>
                    </div>
                `,
            },
            {
                title: "Part 2. 필터별 효과",
                summary: "색온도·헤이즈·다계조 필터까지 실습용 표",
                content: `
                    <div class="space-y-3 text-sm leading-relaxed text-gray-800">
                        <ul class="list-disc pl-5 space-y-1">
                            <li><strong>색온도 필터:</strong> CC(대조정, 80A/85B 등) vs LB(미세 조정, 81A/82A 등). 형광등 보정은 FL/CC 마젠타.</li>
                            <li><strong>헤이즈 대응:</strong> 헤이즈 컷/PL/SL로 산란광 감소, ND는 표현적 흐림.</li>
                            <li><strong>흑백 대비:</strong> 보색 흡수 원리. 옐로→기본 대비, 오렌지→강한 대비, 레드→극적 하늘.</li>
                            <li><strong>다계조 인화 필터:</strong> 인화지 한 장으로 콘트라스트 조절. 4호 이상은 노광을 두 배.</li>
                            <li><strong>공용 필터:</strong> UV, 스카이라이트, ND, PL, 클로즈업 필터는 흑백/컬러 모두 사용 가능.</li>
                        </ul>
                    </div>
                `,
            },
            {
                title: "Part 3. 디지털 컬러 II",
                summary: "RGB/CMYK 혼합, 채널·색 속성, 톤 개념",
                content: `
                    <div class="space-y-3 text-sm leading-relaxed text-gray-800">
                        <ul class="list-disc pl-5 space-y-1">
                            <li><strong>RGB vs CMYK:</strong> RGB는 가산혼합(빛, 화면), CMYK는 감산혼합(잉크, 인쇄).</li>
                            <li><strong>보색 관계:</strong> R↔C, G↔M, B↔Y. RGB 합성으로 노랑/시안/마젠타, 모두 합치면 흰색.</li>
                            <li><strong>컬러 모드:</strong> RGB(모니터), CMYK(인쇄), Grayscale(무채색).</li>
                            <li><strong>채널:</strong> 각 색상/명도 정보 단위. RGB=3채널, CMYK=4채널.</li>
                            <li><strong>색의 3속성:</strong> 색상·채도·명도. 밝기는 광량, 명도는 지각 밝음.</li>
                            <li><strong>조도/휘도:</strong> 조도=비추는 빛 양, 휘도=반사되어 들어오는 빛 양.</li>
                            <li><strong>톤과 톤 앤 매너:</strong> 채도+명도의 분위기, 작품 전체의 일관된 스타일을 의미.</li>
                        </ul>
                    </div>
                `,
            },
        ],
    },
    {
        title: "Chapter 7. 현상·인화·조명",
        subtitle: "암실부터 플래시 조명까지 수업용 압축 노트",
        parts: [
            {
                title: "Part 1. 현상",
                summary: "흑백 필름 현상 단계와 증감현상, 컬러 프로세스",
                content: `
                    <div class="space-y-3 text-sm leading-relaxed text-gray-800">
                        <ul class="list-disc pl-5 space-y-1">
                            <li><strong>흑백 현상 순서:</strong> 현상→중간정지→정착→수세→포토플로→건조.</li>
                            <li><strong>과·부족 현상:</strong> 과다=콘트라스트↑·입자 거침, 부족=밀도↓·암부 손실.</li>
                            <li><strong>증감현상:</strong> 감도 올려 촬영 후 현상 시간을 늘려 노출 보충(콘트라스트↑).</li>
                            <li><strong>C-41 vs E-6:</strong> 네거티브 발색/표백/정착/안정 vs 1차흑백→반전→발색→표백→정착.</li>
                        </ul>
                    </div>
                `,
            },
            {
                title: "Part 2. 인화",
                summary: "RC/FB 인화지, 다계조·호수지, 버닝/닷징",
                content: `
                    <div class="space-y-3 text-sm leading-relaxed text-gray-800">
                        <ul class="list-disc pl-5 space-y-1">
                            <li><strong>RC vs FB:</strong> RC=수지 코팅, 빠른 처리·편리. FB=섬유 베이스, 계조 풍부·보존성 우수.</li>
                            <li><strong>다계조 인화지:</strong> 필터로 콘트라스트 조절(기본 2.5호). 4호 이상은 노광 두 배.</li>
                            <li><strong>호수지:</strong> 인화지 자체가 콘트라스트 등급을 가짐(1호 저대비~5호 고대비).</li>
                            <li><strong>버닝/닷징:</strong> 부분 노광 가감으로 하이라이트·섀도우 디테일 살리기.</li>
                            <li><strong>사바티에/솔라리제이션:</strong> 현상 중 재노광에 의한 부분 반전 vs 과다 노광으로 인한 전체 반전.</li>
                            <li><strong>포토그램:</strong> 카메라 없이 물체를 인화지 위에 두고 빛을 주는 기법(만 레이·모홀리 나기).</li>
                            <li><strong>마무리:</strong> 스팟팅(흰 점 보정), 엣칭(검은 점 긁기).</li>
                        </ul>
                    </div>
                `,
            },
            {
                title: "Part 3. 출력 장치 & 조명",
                summary: "프린터와 플래시 조명비, 광질, 동조까지",
                content: `
                    <div class="space-y-3 text-sm leading-relaxed text-gray-800">
                        <ul class="list-disc pl-5 space-y-1">
                            <li><strong>프린터:</strong> 디지털 은염(C)·잉크젯·염료승화·레이저. 안료=보존성·정확성, 염료=색역 넓음.</li>
                            <li><strong>스캐너:</strong> 평판·필름·드럼·가상 드럼으로 아날로그를 디지털 변환.</li>
                            <li><strong>조명 기본:</strong> 주조명과 보조조명, 조명비 2:1(1스톱)~16:1(4스톱)으로 대비 조절.</li>
                            <li><strong>광질:</strong> 직사광=강한 그림자, 확산광=부드러운 그림자. 역광/순광/측광/사광으로 표현 변주.</li>
                            <li><strong>플래시:</strong> 가이드 넘버 GN=f값×거리, 역제곱 법칙으로 광량 감소. 5D Mark IV 동조 한계 1/200s.</li>
                            <li><strong>동조:</strong> 선막/후막 동조, 롤링셔터 왜곡 vs 글로벌셔터 동시 노출.</li>
                            <li><strong>광 확산/집중:</strong> 소프트박스·엄브렐라·디퓨저(부드럽게) vs 리플렉터·그리드·스누트(집중).</li>
                            <li><strong>패턴 라이팅:</strong> 램브란트, 버터플라이, 바운스, 캐치라이트, 적목 방지 팁 포함.</li>
                        </ul>
                    </div>
                `,
            },
        ],
    },
];

let activeStudyNoteChapter = 0;

const mainContent = document.getElementById("mainContent");
const searchInput = document.getElementById("searchInput");
const geminiModal = document.getElementById("geminiModal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const closeModalBtn = document.getElementById("closeModal");

let geminiCache = (() => {
    if (typeof window === "undefined") {
        return null;
    }
    try {
        const storage = window.localStorage;
        if (!storage) {
            return null;
        }
        const testKey = "__photoguide_gemini_cache_test__";
        storage.setItem(testKey, "1");
        storage.removeItem(testKey);
        return storage;
    } catch (error) {
        console.warn("로컬 스토리지를 사용할 수 없어 Gemini 응답 캐시를 비활성화합니다.", error);
        return null;
    }
})();

function readGeminiCache(key) {
    if (!geminiCache) return null;
    try {
        return geminiCache.getItem(key);
    } catch (error) {
        console.warn("Gemini 캐시를 읽는 중 오류가 발생했습니다. 캐시를 비활성화합니다.", error);
        geminiCache = null;
        return null;
    }
}

function writeGeminiCache(key, value) {
    if (!geminiCache) return;
    try {
        geminiCache.setItem(key, value);
    } catch (error) {
        console.warn("Gemini 캐시를 저장하는 중 오류가 발생했습니다. 캐시를 비활성화합니다.", error);
        geminiCache = null;
    }
}

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
const INTERVIEW_TIME_LIMIT_SECONDS = 240;
const INTERVIEW_SESSION_SIZE = 10;
let interviewPool = [];
let interviewIndex = 0;
let interviewResponses = [];
let interviewTimerInterval = null;
let interviewTimeRemaining = INTERVIEW_TIME_LIMIT_SECONDS;
let isRecordingInterviewStep = false;

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
    const currentWeekStart = new Date(today);
    currentWeekStart.setHours(0, 0, 0, 0);
    currentWeekStart.setDate(today.getDate() - today.getDay());

    const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const date = new Date(year, month - 1, 1);
    const firstDay = date.getDay();
    const daysInMonth = new Date(year, month, 0).getDate();

    const monthEnd = new Date(year, month - 1, daysInMonth);
    monthEnd.setHours(23, 59, 59, 999);

    if (monthEnd < currentWeekStart) {
        return "";
    }

    let startDay = 1;
    if (isCurrentMonth) {
        startDay = Math.max(1, todayDate - today.getDay());
    } else if (currentWeekStart.getFullYear() === year && currentWeekStart.getMonth() + 1 === month) {
        startDay = currentWeekStart.getDate();
    }

    const cells = [];
    for (let i = 0; i < firstDay; i++) {
        cells.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
        const currentDayOfWeek = new Date(year, month - 1, day).getDay();
        const dayEvents = events[day] || [];
        const isHoliday = dayEvents.some((e) => e.isHoliday);
        cells.push({
            day,
            dayEvents,
            currentDayOfWeek,
            isHoliday,
            isToday: day === todayDate,
        });
    }
    while (cells.length % 7 !== 0) {
        cells.push(null);
    }

    const weeks = [];
    for (let i = 0; i < cells.length; i += 7) {
        weeks.push(cells.slice(i, i + 7));
    }

    let startWeekIndex = 0;
    if (startDay > 1) {
        startWeekIndex = weeks.findIndex((week) => week.some((cell) => cell && cell.day >= startDay));
        if (startWeekIndex === -1) {
            return "";
        }
    }

    let html = `<div class="content-card p-6 w-full max-w-4xl mx-auto mb-8"><h3 class="text-xl font-bold text-center mb-4">${year}년 ${monthNames[month - 1]}</h3><div class="grid grid-cols-7 gap-1 text-center text-sm font-semibold text-gray-600">${days
        .map((dayName) => `<div class="${dayName === "일" ? "text-red-500" : dayName === "토" ? "text-blue-500" : ""}">${dayName}</div>`)
        .join("")}</div><div class="grid grid-cols-7 gap-1 mt-2">`;

    for (let i = startWeekIndex; i < weeks.length; i++) {
        weeks[i].forEach((cell) => {
            if (!cell) {
                html += `<div></div>`;
                return;
            }

            const { day, dayEvents, currentDayOfWeek, isHoliday, isToday } = cell;
            const eventHtml = dayEvents
                .map((e) => `<div class="text-white p-1 rounded-md ${e.color || "bg-blue-500"} mb-1 truncate" title="${e.title}">${e.title}</div>`)
                .join("");

            const labelClasses = ["font-bold"];
            if (currentDayOfWeek === 0 || isHoliday) {
                labelClasses.push("text-red-500");
            } else if (currentDayOfWeek === 6) {
                labelClasses.push("text-blue-500");
            }
            if (isToday && isCurrentMonth) {
                labelClasses.push("today-text");
            }

            const containerClasses = ["border", "p-2", "h-28", "flex", "flex-col"];
            if (dayEvents.length > 0) {
                containerClasses.push("bg-gray-50");
            }
            if (isToday && isCurrentMonth) {
                containerClasses.push("today");
            }

            html += `<div class="${containerClasses.join(" ")}"><span class="${labelClasses.join(" ")}">${day}</span><div class="text-xs mt-1 text-left overflow-y-auto">${eventHtml}</div></div>`;
        });
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
                contents: [{ role: "user", parts: [{ text: prompt }] }],
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

function shuffleArray(items) {
    const arr = Array.isArray(items) ? [...items] : [];
    for (let i = arr.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function buildInterviewProgressMarkup() {
    if (!interviewPool.length) return "";
    const total = interviewPool.length;
    const completedCount = interviewResponses.filter(Boolean).length;
    const answeredCount = interviewResponses.filter(
        (item) => item && item.answer && item.answer.trim().length > 0,
    ).length;
    const badges = interviewPool
        .map((_, idx) => {
            const response = interviewResponses[idx];
            if (response && response.answer && response.answer.trim().length > 0) {
                return `<span class="inline-flex items-center gap-1 rounded-full border border-green-200 bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">✅ <span>${idx + 1}번 작성</span></span>`;
            }
            if (response && response.timedOut) {
                return `<span class="inline-flex items-center gap-1 rounded-full border border-red-200 bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">⏰ <span>${idx + 1}번 시간 종료</span></span>`;
            }
            if (response) {
                return `<span class="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-600">🗒️ <span>${idx + 1}번 미작성</span></span>`;
            }
            if (idx === interviewIndex) {
                return `<span class="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">📝 <span>${idx + 1}번 진행 중</span></span>`;
            }
            return `<span class="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">⏳ <span>${idx + 1}번 대기</span></span>`;
        })
        .join("");
    return `
        <div class="rounded-lg bg-gray-50 p-4">
            <div class="flex items-center justify-between text-sm font-semibold text-gray-700">
                <span>답변 현황</span>
                <span>작성 ${answeredCount} · 완료 ${completedCount}/${total}</span>
            </div>
            <div class="mt-3 flex flex-wrap gap-2">${badges}</div>
        </div>
    `;
}

function updateInterviewProgress() {
    const container = document.getElementById("interviewProgress");
    if (!container) return;
    container.innerHTML = buildInterviewProgressMarkup();
}

function getInterviewGradeStats() {
    return interviewResponses.reduce(
        (acc, response) => {
            if (!response || !response.grade) {
                return acc;
            }
            if (response.grade === "pass") {
                acc.pass += 1;
            } else if (response.grade === "review") {
                acc.review += 1;
            }
            return acc;
        },
        { pass: 0, review: 0 },
    );
}

function updateInterviewGradeSummary() {
    const summaryEl = document.getElementById("interviewGradeSummary");
    if (!summaryEl) return;
    const { pass, review } = getInterviewGradeStats();
    const total = interviewPool.length;
    const graded = pass + review;
    const waiting = Math.max(0, total - graded);
    summaryEl.textContent = `셀프 채점: 합격 ${pass} · 복습 ${review}${total ? ` · 미평가 ${waiting}` : ""}`;
}

function refreshInterviewGradeUI(index) {
    const container = getInterviewContainer();
    if (!container) return;
    const response = interviewResponses[index];
    const grade = response ? response.grade : undefined;
    const badge = container.querySelector(`#interviewGradeBadge-${index}`);
    if (badge) {
        badge.classList.remove(
            "bg-green-100",
            "border-green-400",
            "text-green-700",
            "bg-amber-100",
            "border-amber-400",
            "text-amber-700",
            "bg-gray-100",
            "border-gray-200",
            "text-gray-600",
        );
        if (grade === "pass") {
            badge.textContent = "⭕ 합격";
            badge.classList.add("bg-green-100", "border-green-400", "text-green-700");
        } else if (grade === "review") {
            badge.textContent = "🔄 복습";
            badge.classList.add("bg-amber-100", "border-amber-400", "text-amber-700");
        } else {
            badge.textContent = "셀프 채점 대기";
            badge.classList.add("bg-gray-100", "border-gray-200", "text-gray-600");
        }
    }
    const buttons = container.querySelectorAll(`[data-grade-group="${index}"]`);
    buttons.forEach((btn) => {
        btn.classList.remove(
            "bg-green-100",
            "border-green-400",
            "text-green-700",
            "bg-amber-100",
            "border-amber-400",
            "text-amber-700",
        );
        btn.classList.add("bg-white", "border-gray-300", "text-gray-600");
        const targetGrade = btn.dataset.grade;
        if (grade && targetGrade === grade) {
            btn.classList.remove("bg-white", "border-gray-300", "text-gray-600");
            if (grade === "pass") {
                btn.classList.add("bg-green-100", "border-green-400", "text-green-700");
            } else if (grade === "review") {
                btn.classList.add("bg-amber-100", "border-amber-400", "text-amber-700");
            }
        }
    });
}

function setupInterviewSummaryInteractions() {
    const container = getInterviewContainer();
    if (!container) return;
    container.querySelectorAll(".interview-grade-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const idx = Number(btn.dataset.index);
            if (Number.isNaN(idx)) return;
            const selectedGrade = btn.dataset.grade;
            const poolItem = interviewPool[idx] || {};
            const current = interviewResponses[idx] || {
                question: poolItem.question || "",
                category: poolItem.category || "기타",
                answer: "",
                timedOut: false,
            };
            const nextGrade = current.grade === selectedGrade ? null : selectedGrade;
            const updated = {
                ...current,
                question: current.question || poolItem.question || "",
                category: current.category || poolItem.category || "기타",
            };
            if (nextGrade) {
                updated.grade = nextGrade;
            } else {
                delete updated.grade;
            }
            interviewResponses[idx] = updated;
            refreshInterviewGradeUI(idx);
            updateInterviewGradeSummary();
        });
    });
    container.querySelectorAll(".interview-data-link").forEach((btn) => {
        btn.addEventListener("click", () => {
            const term = btn.dataset.search;
            if (!term || !searchInput) return;
            searchInput.value = term;
            const event = new Event("input", { bubbles: true });
            searchInput.dispatchEvent(event);
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    });
    updateInterviewGradeSummary();
    interviewPool.forEach((_, idx) => refreshInterviewGradeUI(idx));
}

function clearInterviewTimer() {
    if (interviewTimerInterval) {
        clearInterval(interviewTimerInterval);
        interviewTimerInterval = null;
    }
}

function updateInterviewTimerDisplay() {
    const seconds = Math.max(0, interviewTimeRemaining);
    const timerDisplay = document.getElementById("interviewTimerDisplay");
    if (timerDisplay) {
        const minutesPart = String(Math.floor(seconds / 60)).padStart(2, "0");
        const secondsPart = String(seconds % 60).padStart(2, "0");
        timerDisplay.textContent = `${minutesPart}:${secondsPart}`;
    }
    const timerBar = document.getElementById("interviewTimerBar");
    if (timerBar) {
        const percent = (seconds / INTERVIEW_TIME_LIMIT_SECONDS) * 100;
        timerBar.style.width = `${Math.max(0, Math.min(100, percent))}%`;
    }
}

function startInterviewTimer({ reset = false } = {}) {
    if (
        reset ||
        typeof interviewTimeRemaining !== "number" ||
        interviewTimeRemaining > INTERVIEW_TIME_LIMIT_SECONDS
    ) {
        interviewTimeRemaining = INTERVIEW_TIME_LIMIT_SECONDS;
    }
    clearInterviewTimer();
    updateInterviewTimerDisplay();
    if (interviewTimeRemaining <= 0) {
        interviewTimeRemaining = 0;
        updateInterviewTimerDisplay();
        handleInterviewSessionTimeout();
        return;
    }
    interviewTimerInterval = setInterval(() => {
        interviewTimeRemaining -= 1;
        if (interviewTimeRemaining <= 0) {
            interviewTimeRemaining = 0;
            updateInterviewTimerDisplay();
            clearInterviewTimer();
            handleInterviewSessionTimeout();
        } else {
            updateInterviewTimerDisplay();
        }
    }, 1000);
}

function handleInterviewSessionTimeout() {
    if (!interviewPool.length) {
        return;
    }
    if (interviewIndex >= interviewPool.length) {
        showInterviewSummary();
        return;
    }
    const container = getInterviewContainer();
    const answerField = container ? container.querySelector("#interviewAnswer") : null;
    const answerText = answerField ? answerField.value.trim() : "";
    const current = interviewPool[interviewIndex];
    interviewResponses[interviewIndex] = {
        question: current.question,
        category: current.category || "기타",
        answer: answerText,
        timedOut: true,
    };
    interviewIndex += 1;
    showInterviewSummary();
}

function getInterviewContainer() {
    return document.getElementById("interviewSession");
}

function buildInterviewPool() {
    const source = Array.isArray(window.interviewQuestionBank) ? window.interviewQuestionBank : [];
    const valid = source.filter((item) => item && typeof item.question === "string");
    if (!valid.length) return [];
    const byCategory = valid.reduce((acc, item) => {
        const key = item.category || "기타";
        (acc[key] = acc[key] || []).push(item);
        return acc;
    }, {});
    let categoryEntries = Object.entries(byCategory)
        .map(([category, items]) => [category, shuffleArray(items)])
        .filter(([, items]) => items.length > 0);
    if (!categoryEntries.length) return [];
    categoryEntries = shuffleArray(categoryEntries);
    const pool = [];
    let index = 0;
    while (pool.length < INTERVIEW_SESSION_SIZE && categoryEntries.length) {
        const entryIndex = index % categoryEntries.length;
        const [, items] = categoryEntries[entryIndex];
        const next = items.shift();
        if (next) {
            pool.push(next);
        }
        if (!items.length) {
            categoryEntries.splice(entryIndex, 1);
            continue;
        }
        index += 1;
    }
    if (pool.length) {
        return pool;
    }
    const fallback = shuffleArray(valid);
    return fallback.slice(0, Math.min(fallback.length, INTERVIEW_SESSION_SIZE));
}

function renderInterviewQuestion() {
    const container = getInterviewContainer();
    if (!container) return;
    clearInterviewTimer();
    if (!interviewPool.length || interviewIndex >= interviewPool.length) {
        showInterviewSummary();
        return;
    }
    const total = interviewPool.length;
    const current = interviewPool[interviewIndex];
    container.classList.remove("hidden");
    container.innerHTML = `
        <div class="rounded-lg border border-gray-100 bg-white p-6 shadow-lg">
            <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                    <p class="text-sm text-gray-500">${escapeHtml(current.category || "기타")}</p>
                    <h3 class="mt-1 text-xl font-bold text-gray-800">질문 ${interviewIndex + 1} / ${total}</h3>
                </div>
                <div class="w-full md:w-56">
                    <div class="flex items-center justify-between text-sm font-semibold text-gray-700">
                        <span>⏳ 남은 시간 (10문항 총 4분)</span>
                        <span id="interviewTimerDisplay" class="font-mono text-lg text-blue-600">04:00</span>
                    </div>
                    <div class="mt-2 h-2 overflow-hidden rounded-full bg-gray-200">
                        <div id="interviewTimerBar" class="h-full bg-blue-500" style="width: 100%;"></div>
                    </div>
                </div>
            </div>
            <p class="mt-6 whitespace-pre-wrap text-lg leading-relaxed text-gray-800">${escapeHtml(current.question)}</p>
            <div id="interviewProgress" class="mt-6"></div>
            <label class="mt-6 block text-sm font-semibold text-gray-700" for="interviewAnswer">나의 답변</label>
            <textarea id="interviewAnswer" class="mt-2 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-400" rows="6" placeholder="생각을 정리해 보세요..."></textarea>
            <div class="mt-6 flex flex-col-reverse gap-3 md:flex-row md:justify-end">
                <button id="interviewFinishBtn" class="w-full rounded-full border border-gray-300 px-4 py-2 text-gray-600 transition hover:bg-gray-100 md:w-auto">연습 종료</button>
                <button id="interviewNextBtn" class="w-full rounded-full bg-blue-500 px-4 py-2 font-semibold text-white transition hover:bg-blue-600 md:w-auto">${interviewIndex === total - 1 ? "결과 보기" : "다음 질문"}</button>
            </div>
        </div>
    `;
    container.scrollIntoView({ behavior: "smooth", block: "start" });
    const nextBtn = container.querySelector("#interviewNextBtn");
    const finishBtn = container.querySelector("#interviewFinishBtn");
    if (nextBtn) {
        nextBtn.addEventListener("click", () => recordInterviewAnswer());
    }
    if (finishBtn) {
        finishBtn.addEventListener("click", () => recordInterviewAnswer({ endSession: true }));
    }
    updateInterviewProgress();
    updateInterviewTimerDisplay();
    startInterviewTimer({ reset: interviewIndex === 0 });
}

function recordInterviewAnswer({ autoAdvance = false, endSession = false } = {}) {
    if (isRecordingInterviewStep) return;
    if (!interviewPool.length || interviewIndex >= interviewPool.length) {
        if (endSession) showInterviewSummary();
        return;
    }
    const container = getInterviewContainer();
    if (!container) return;
    const current = interviewPool[interviewIndex];
    const answerField = container.querySelector("#interviewAnswer");
    const answerText = answerField ? answerField.value.trim() : "";
    isRecordingInterviewStep = true;
    clearInterviewTimer();
    interviewResponses[interviewIndex] = {
        question: current.question,
        category: current.category || "기타",
        answer: answerText,
        timedOut: autoAdvance,
    };
    interviewIndex += 1;
    if (endSession || interviewIndex >= interviewPool.length) {
        showInterviewSummary();
    } else {
        renderInterviewQuestion();
    }
    isRecordingInterviewStep = false;
}

function showInterviewSummary() {
    const container = getInterviewContainer();
    if (!container) return;
    clearInterviewTimer();
    const total = interviewPool.length;
    const completedCount = interviewResponses.filter(Boolean).length;
    const answeredCount = interviewResponses.filter(
        (item) => item && item.answer && item.answer.trim().length > 0,
    ).length;
    const timedOutCount = interviewResponses.filter((item) => item && item.timedOut).length;
    const summaryItems = interviewPool.length
        ? interviewPool
              .map((question, idx) => {
                  let response = interviewResponses[idx];
                  if (!response) {
                      response = {
                          question: question.question,
                          category: question.category || "기타",
                          answer: "",
                          timedOut: false,
                      };
                      interviewResponses[idx] = response;
                  }
                  const hasAnswer = response && response.answer && response.answer.trim().length > 0;
                  const timedOut = response?.timedOut;
                  const statusBadge = response
                      ? timedOut
                          ? `<span class="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600">⏰ 시간 종료</span>`
                          : hasAnswer
                              ? `<span class="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">✅ 작성 완료</span>`
                              : `<span class="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">🗒️ 답변 미작성</span>`
                      : `<span class="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-600">⏳ 진행 전</span>`;
                  const grade = response.grade;
                  const gradeBadgeText = grade === "pass" ? "⭕ 합격" : grade === "review" ? "🔄 복습" : "셀프 채점 대기";
                  const gradeBadgeClass = grade === "pass"
                      ? "bg-green-100 border-green-400 text-green-700"
                      : grade === "review"
                          ? "bg-amber-100 border-amber-400 text-amber-700"
                          : "bg-gray-100 border-gray-200 text-gray-600";
                  const answerContent = hasAnswer
                      ? `<p class="mt-2 whitespace-pre-wrap text-gray-800">${escapeHtml(response.answer)}</p>`
                      : `<p class="mt-2 italic text-gray-500">${response
                          ? timedOut
                              ? "시간 종료로 답변하지 못했습니다."
                              : "기록된 답변이 없습니다."
                          : "이 문항은 진행하지 않았습니다."}</p>`;
                  return `
                <li class="rounded-lg border border-gray-200 p-4 shadow-sm">
                    <div class="flex flex-wrap items-center gap-2">
                        <h4 class="text-base font-semibold text-gray-800">문항 ${idx + 1}</h4>
                        <span class="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-600">${escapeHtml(question.category || "기타")}</span>
                        ${statusBadge}
                        <span id="interviewGradeBadge-${idx}" class="rounded-full border px-2 py-0.5 text-xs font-semibold ${gradeBadgeClass}">${gradeBadgeText}</span>
                    </div>
                    <p class="mt-2 whitespace-pre-wrap text-sm font-medium text-gray-700">${escapeHtml(question.question)}</p>
                    ${answerContent}
                    <div class="mt-4 flex flex-wrap gap-2">
                        <button class="interview-grade-btn rounded-full border border-gray-300 bg-white px-3 py-1 text-sm font-semibold text-gray-600 transition hover:bg-gray-50" data-index="${idx}" data-grade="pass" data-grade-group="${idx}">⭕ 합격</button>
                        <button class="interview-grade-btn rounded-full border border-gray-300 bg-white px-3 py-1 text-sm font-semibold text-gray-600 transition hover:bg-gray-50" data-index="${idx}" data-grade="review" data-grade-group="${idx}">🔄 복습</button>
                        <button class="interview-data-link rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-100" data-search="${escapeHtml(question.question)}">📚 데이터에서 찾아보기</button>
                    </div>
                </li>
            `;
              })
              .join("")
        : `<p class="text-gray-600">기록된 답변이 없습니다.</p>`;
    container.classList.remove("hidden");
    container.innerHTML = `
        <div class="rounded-lg border border-gray-100 bg-white p-6 shadow-lg">
            <h3 class="text-2xl font-bold text-gray-800">면접 연습 결과</h3>
            <p class="mt-2 text-gray-600">총 ${total}문항 중 ${completedCount}문항을 진행했고, ${answeredCount}문항에 답변을 작성했습니다.${timedOutCount ? ` <span class="text-red-500">(${timedOutCount}문항은 시간 종료)</span>` : ""}</p>
            <div id="interviewGradeSummary" class="mt-3 rounded-lg border border-indigo-100 bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-700"></div>
            <ul class="mt-6 space-y-4">${summaryItems}</ul>
            <div class="mt-6 flex flex-col gap-3 md:flex-row md:justify-end">
                <button id="restartInterviewBtn" class="w-full rounded-full bg-green-600 px-4 py-2 font-semibold text-white transition hover:bg-green-700 md:w-auto">다시 연습하기</button>
            </div>
        </div>
    `;
    const restartBtn = container.querySelector("#restartInterviewBtn");
    if (restartBtn) {
        restartBtn.addEventListener("click", startInterviewPractice);
    }
    setupInterviewSummaryInteractions();
    container.scrollIntoView({ behavior: "smooth", block: "start" });
}

function startInterviewPractice() {
    const container = getInterviewContainer();
    if (!container) return;
    const pool = buildInterviewPool();
    if (!pool.length) {
        showModal(
            "면접 질문을 불러오지 못했습니다.",
            '<p class="text-gray-700">면접 질문 데이터가 비어 있어요. 관리자에게 문의해 주세요.</p>',
            false,
        );
        return;
    }
    interviewPool = pool;
    interviewIndex = 0;
    interviewResponses = Array(pool.length).fill(null);
    clearInterviewTimer();
    interviewTimeRemaining = INTERVIEW_TIME_LIMIT_SECONDS;
    renderInterviewQuestion();
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

function renderStudyNoteParts(chapter) {
    return chapter.parts
        .map(
            (part, idx) => `
        <div class="content-card">
            <div class="flex items-start gap-3 mb-3">
                <div class="h-10 w-10 rounded-full bg-gray-800 text-white flex items-center justify-center text-sm font-bold">${idx + 1}</div>
                <div>
                    <p class="text-xs uppercase tracking-wide text-gray-500">${chapter.title}</p>
                    <h3 class="text-lg font-bold text-gray-900">${part.title}</h3>
                    <p class="text-sm text-gray-600">${part.summary}</p>
                </div>
            </div>
            <div class="prose prose-sm max-w-none text-gray-800 leading-relaxed">${part.content}</div>
        </div>
    `
        )
        .join("");
}

function renderStudyNotesView() {
    const chapterButtons = studyNoteChapters
        .map(
            (chapter, index) => `
        <button
            class="study-chapter-btn px-4 py-2 rounded-lg border border-gray-300 text-sm font-semibold transition-all ${
                index === activeStudyNoteChapter
                    ? "bg-gray-800 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-50"
            }"
            data-index="${index}"
        >
            ${chapter.title}
        </button>
    `
        )
        .join("");

    const currentChapter = studyNoteChapters[activeStudyNoteChapter];

    return `
        <div class="content-card p-6 md:p-8 mb-6">
            <h2 class="text-3xl font-bold text-gray-800 mb-2 text-center">학습 노트</h2>
            <p class="text-gray-600 text-center mb-4">외부 링크 없이 바로 수업에 쓸 수 있는 정리본입니다. 각 챕터는 3개의 파트로 나누어 교사용 화면으로 꾸몄습니다.</p>
            <div class="flex flex-wrap items-center justify-center gap-3 mb-4">
                ${chapterButtons}
            </div>
            <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                <p class="text-sm text-gray-700"><span class="font-semibold">${currentChapter.title}</span> · ${currentChapter.subtitle}</p>
                <p class="text-xs text-gray-500 mt-1">파트별 핵심 bullet과 표로 요약되어 있어, 바로 화면을 띄워 설명하기 좋습니다.</p>
            </div>
            <div class="space-y-4" id="study-note-parts">${renderStudyNoteParts(currentChapter)}</div>
        </div>
    `;
}

function setupStudyNoteListeners() {
    const buttons = document.querySelectorAll(".study-chapter-btn");
    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const idx = Number(btn.dataset.index);
            if (!Number.isNaN(idx)) {
                activeStudyNoteChapter = idx;
                renderContent("studyNotes");
            }
        });
    });
}

function renderContent(category, searchTerm = "") {
    if (category !== "quiz") {
        clearInterviewTimer();
        interviewPool = [];
        interviewResponses = [];
        interviewIndex = 0;
    }
    let html = "";
    if (category === "home") {
        const monthsToShow = getUpcomingMonthsUntilNextJanuary();
        const monthlyEvents = buildMonthlyEvents(monthsToShow);
        html = `<div class="content-card p-6 md:p-8 mb-6 text-center"><h2 class="text-3xl font-bold text-gray-800 mb-2">주요 학사 일정 ✨</h2><p class="text-gray-600">오늘부터 내년 1월까지 입시 일정과 공휴일</p></div>`;
        monthsToShow.forEach(({ year, month }) => {
            const key = `${year}-${month}`;
            html += createCalendar(year, month, monthlyEvents[key] || {});
        });
} else if (category === "studyNotes") {
        html = renderStudyNotesView();

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
        <div class="mx-auto max-w-4xl">
            <div class="grid grid-cols-1 gap-4 md:grid-cols-3 md:items-start">
                <button id="quizBtn" class="w-full md:col-span-1 bg-pink-400 text-white font-bold py-3 px-4 rounded-full shadow-lg hover:bg-pink-500 transition transform hover:scale-105">🌸 AI 퀴즈 생성</button>
                <div class="w-full md:col-span-1 space-y-4">
                    <button id="practiceBtn" class="w-full bg-green-700 text-white font-bold py-3 px-4 rounded-full shadow-lg hover:bg-green-800 transition transform hover:scale-105">🏃‍♂️ 실전 연습</button>
                    <details id="practiceFilters" class="w-full rounded-lg bg-white p-4 shadow">
                        <summary class="cursor-pointer font-semibold text-gray-700">⚙️ 실전 연습 필터</summary>
                        <div class="mt-2 space-y-4">
                            <div>
                                <label for="practiceCategory" class="mb-1 block text-sm">카테고리</label>
                                <select id="practiceCategory" class="w-full rounded border p-2">
                                    <option value="">전체</option>
                                    <option value="structure">카메라 구조와 원리</option>
                                    <option value="exposure">노출</option>
                                    <option value="lens">렌즈와 광학</option>
                                    <option value="digital">디지털</option>
                                    <option value="film">필름 현상 인화</option>
                                    <option value="lighting">조명과 필터</option>
                                    <option value="history">사진사 & 사조</option>
                                </select>
                            </div>
                            <div>
                                <label for="practiceDifficulty" class="mb-1 block text-sm">난이도</label>
                                <select id="practiceDifficulty" class="w-full rounded border p-2">
                                    <option value="">전체</option>
                                    <option value="easy">쉬움</option>
                                    <option value="medium">보통</option>
                                    <option value="hard">어려움</option>
                                </select>
                            </div>
                        </div>
                    </details>
                </div>
                <button id="interviewBtn" class="w-full md:col-span-1 bg-indigo-500 text-white font-bold py-3 px-4 rounded-full shadow-lg hover:bg-indigo-600 transition transform hover:scale-105">📝 면접 시뮬레이션</button>
            </div>
            <div id="interviewSession" class="mt-6 hidden"></div>
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
    } else if (category === "studyNotes") {
        setupStudyNoteListeners();
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
            const cachedResponse = readGeminiCache(cacheKey);
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
                    writeGeminiCache(cacheKey, responseText);
                }
            }
        });
    });
}
function initQuizPage() {
    const quizBtn = document.getElementById("quizBtn");
    const practiceBtn = document.getElementById("practiceBtn");
    const interviewBtn = document.getElementById("interviewBtn");
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
    if (interviewBtn) {
        interviewBtn.addEventListener("click", startInterviewPractice);
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
