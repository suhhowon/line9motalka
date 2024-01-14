function isUpbound()
{
    let start = +form.start.value;
    let end = +form.end.value;
                    
    if (start < end)
    {
        return true;
    }
    else
    {
        return false;
    }
}
        
function getStationName(stationNumber)
{
    return stations[stationNumber].name;
}

function isExp(stationNumber)
{
    return stations[stationNumber].exp;
}

function isEvacuate(stationNumber)
{
    return stations[stationNumber].evacuate;
}

function getCurrentDay()
{
    let now = new Date();
    let day = now.getDay();

    if(day <= 1)
    {
        return "holiday"
    }
    else
    {
        return "weekday"
    }
}

function getCurrentTimespan()
{
	let now = new Date();

//	let day = now.getDay();
	let hour = now.getHours();
	let minute = now.getMinutes();

/* 	if(day <= 1)
	{
		return "allday";
	} */
	
	if (isUpbound())
	{
		switch(hour)
		{
			case 2:					//2:00부터
			case 3:					//
			case 4:					//
			case 5:					//
				return "0530u";		//
			case 6:					//
				if(minute < 35)		//
				{							//
					return "0530u";	//6:34까지 05:30~
				}
				else
				{
					return "0635";	//6:35부터
				}							//
			case 7:					//
				return "0635";		//
			case 8:					//
				if(minute < 41)		//
				{							//
					return "0635";	//8:40까지 06:35~
				}
				else
				{
					return "0841";	//8:41부터
				}							//
			case 9:					//
			case 10:					//
			case 11:					//
			case 12:					//
			case 13:					//
			case 14:					//
			case 15:					//
				return "0841";		//
			case 16:					//
				if(minute < 38)		//
				{							//
					return "0841";	//16:37까지 08:41~
				}
				else
				{
					return "1638";	//16:38부터
				}							//
			case 17:					//
			case 18:					//
			case 19:					//
			case 20:					//
				return "1638";		//
			case 21:					//
				if(minute < 52)		//
				{							//
					return "1638";	//21:51까지 16:38~
				}
				else
				{
					return "2152";	//21:52부터
				}							//
			case 22:					//
				if(minute < 23)		//
				{							//
					return "2152";	//22:22까지 21:52~
				}
				else
				{
					return "2223";	//22:23부터
				}							//
			case 23:					//
			case 0:					//
			case 1:					//
				return "2223";		//1:59까지 22:23~
		}
	}
	else
	{
		switch(hour)
		{
			case 2:					//2:00부터
			case 3:					//
			case 4:					//
			case 5:					//
				return "0530d";		//
			case 6:					//
				if(minute < 54)		//
				{							//
					return "0530d";	//6:53까지 05:30~
				}
				else
				{
					return "0654";	//6:54부터
				}							//
			case 7:					//
				if(minute < 41)		//
				{							//
					return "0654";	//7:40까지 06:54~
				}
				else
				{
					return "0741";	//07:41부터
				}							//
			case 8:					//
				return "0741";		//
			case 9:					//
				if(minute < 48)		//
				{							//
					return "0741";	//09:47까지 07:41~
				}
				else
				{
					return "0948";	//09:48부터
				}							//
			case 10:					//
			case 11:					//
			case 12:					//
			case 13:					//
			case 14:					//
			case 15:					//
			case 16:					//
				return "0948";		//
			case 17:					//
				if(minute < 45)		//
				{							//
					return "0948";	//17:44까지 09:48~
				}
				else
				{
					return "1745";	//17:45부터
				}							//
			case 18:					//
			case 19:					//
			case 20:					//
			case 21:					//
				return "1745";		//
			case 22:					//
				if(minute < 48)		//
				{							//
					return "1745";	//22:47까지 17:45~
				}
				else
				{
					return "2248";	//22:48부터
				}							//
			case 23:					//
			case 0:					//
			case 1:					//
				return "2248";		//1:59까지 22:48~
		}
	}
}

function changeImage(timespan)
{
	let newDiv = document.createElement('div');
	newDiv.id = "img";

	let htmlContent = "";
	
	if(form.day.value == "holiday")
	{
		htmlContent = getSpanBlack("휴일") + "의 대피역은 ";
	}
	else
	{
        htmlContent = getSpanBlack("평일") + " ";
        if(isUpbound())
        {
            htmlContent = htmlContent + getSpanBlack("상행") + " ";
        }
        else
        {
            htmlContent = htmlContent + getSpanBlack("하행") + " ";
        }
		htmlContent = htmlContent + getSpanBlack(form.time.options[form.time.selectedIndex].text) + " 시간대의 대피역은 ";
	}
	let evacuations;
	if(isUpbound())
	{
		evacuations = getEvacuations(1, stations.length - 1);
	}
	else
	{
		evacuations = getEvacuations(stations.length - 1, 1);
	}
	if(evacuations.length)
	{
		htmlContent = htmlContent + getEvacuationText(evacuations) + "입니다.<br>";
	}
	else
	{
		htmlContent = htmlContent + "없습니다.<br>";
	}
	
	htmlContent = htmlContent + `<img src="` + timespan + `.jpg" width=100% height=auto">`;
	newDiv.innerHTML = htmlContent;
    img.replaceWith(newDiv);
}
	
function timespanChanged()
{
    setTimeOptions();
//    setEvacuate();

    let newDiv = document.createElement('div');
    newDiv.id = "description"
    let htmlContent = "상황에 따라 대피역은 변경될 수 있으니 안내방송을 경청해주시면 감사하겠습니다.<br>";
    htmlContent = htmlContent + "시간대별 대피역 확인일자: 2024/01/02<p>";
    htmlContent = htmlContent + `©<a href="mailto:suhhowon@gmail.com">suhhowon@gmail.com</a><br>`;
    htmlContent = htmlContent + `©<a href="https://www.metro9.co.kr/kor/sub01_04.do" target="_blank" 
        rel="noopener noreferrer">서울시메트로9호선(주)/이용안내/열차이용안내</a><br>`;
    htmlContent = htmlContent + `©<a href="https://namu.wiki/w/서울%20지하철%209호선#s-11.1.1" target="_blank" 
        rel="noopener noreferrer">나무위키/서울 지하철 9호선/급행열차 탑승 여부 정리</a>`;

    if(form.day.value == "weekday")
    {
        if(isUpbound())
        {
            htmlContent = "김포공항역 상행 출발시각 기준이며 개별역마다 시간대는 변경될 수 있습니다.<br>" + htmlContent;
        }
        else
        {
            htmlContent = "중앙보훈병원역 하행 출발시각 기준이며 개별역마다 시간대는 변경될 수 있습니다.<br>" + htmlContent;
        }
    }
    
    newDiv.innerHTML = htmlContent;
    description.replaceWith(newDiv);
}

function setTimeOptions()
{
    let time = form.time;
    
    while (time.options.length > 0)
    {
        time.remove(0);
    }

    if(form.day.value == "holiday")
    {
        time.append(new Option("종일", "allday"));
        return;
    }

    if(isUpbound())
    {
        time.append(new Option("05:30~06:34", "0530u"));
        time.append(new Option("06:35~08:40", "0635"));
        time.append(new Option("08:41~16:37", "0841"));
        time.append(new Option("16:38~21:52", "1638"));
        time.append(new Option("21:52~22:22", "2152"));
        time.append(new Option("22:23~", "2223"));
    }
    else
    {
        time.append(new Option("05:30~06:53", "0530d"));
        time.append(new Option("06:54~07:40", "0654"));
        time.append(new Option("07:41~09:47", "0741"));
        time.append(new Option("09:48~17:44", "0948"));
        time.append(new Option("17:45~22:47", "1745"));
        time.append(new Option("22:48~", "2248"));
    }
	time.value = getCurrentTimespan();
}	

function setEvacuate()
{
    for(let station of stations)
    {
        station.evacuate = false;
    }

    switch(form.time.value)
    {
        case "0530u":
        case "0841":
        case "2152":
        case "0654":
        case "0948":
        case "allday":
            stations[7].evacuate = true;
            stations[20].evacuate = true;
            stations[34].evacuate = true;
            break;
        case "0635":
        case "1638":
        case "0741":
        case "1745":
            stations[7].evacuate = true;
            stations[16].evacuate = true;
            stations[24].evacuate = true;
            stations[34].evacuate = true;
            break;
        case "0530d":
            stations[7].evacuate = true;
            stations[24].evacuate = true;
            break;
        case "2248":
            stations[20].evacuate = true;
            stations[34].evacuate = true;
            break;
    }
}

function getSpanLine9(str)
{
    return `<span class="line9">` + str + `</span>`;
}

function getSpanExp(str)
{
    return `<span class="exp">` + str + `</span>`;
}

function getSpanAllstop(str)
{
    return `<span class="allstop">` + str + `</span>`;
}

function getSpanBlack(str)
{
    return `<span class="black">` + str + `</span>`;
}

function getNextExp(start, end)
	{
		if(isUpbound())
		{
			for(let i = start + 1; i < end; i++)
			{
				if(isExp(i))
				{
					return i;
				}
			}
		}
		else
		{
			for(let i = start - 1; i > end; i--)
			{
				if(isExp(i))
				{
					return i;
				}
			}
		}
		return null;
	}
	
function getLastExp(start, end)
{
    if(isUpbound())
    {
        for(let i = end - 1; i > start; i--)
        {
            if(isExp(i))
            {
                return i;
            }
        }
    }
    else
    {
        for(let i = end + 1; i < start; i++)
        {
            if(isExp(i))
            {
                return i;
            }
        }
    }
    return null;
}

function getEvacuations(start, end)
{
	let evacuations = [];

    if(isUpbound())
    {
        for(let i = start + 1; i < end; i++)
        {
            if(isEvacuate(i))
            {
				evacuations.push(i);
            }
        }
    }
    else
    {
        for(let i = start - 1; i > end; i--)
        {
            if(isEvacuate(i))
            {
				evacuations.push(i);
            }
        }
    }
	
	return evacuations;
}

function getEvacuationText(evacuations)
{
	let evacuationText = "";
	
	if(evacuations.length == 0)
	{
		return "";
	}
	
	for(let evacuation of evacuations)
	{
		evacuationText = evacuationText + getSpanLine9(getStationName(evacuation)) + ", ";
	}
     evacuationText = evacuationText.slice(0, evacuationText.length - 2);
	 
	 return evacuationText;
}

function calculate()
{
    let start = +form.start.value;
    let end = +form.end.value;

    let newDiv = document.createElement('div');
    newDiv.id = "result";

    let htmlContent = getSpanLine9(getStationName(start)) + "역 출발 " + getSpanLine9(getStationName(end)) + "역 도착은 ";
    if(isUpbound())
    {
        htmlContent = htmlContent + getSpanBlack("상행") + ", " + getSpanLine9("중앙보훈병원") + "행입니다.<br>";
    }
    else
    {
        htmlContent = htmlContent + getSpanBlack("하행") + ", " + getSpanLine9("개화") + "행입니다.<br>";
    }

    htmlContent = htmlContent + getSpanLine9(getStationName(start)) + "역은 ";
    if(isExp(start))
    {
        htmlContent = htmlContent + getSpanExp("급행 정차") + "역입니다.<br>";
    }
    else
    {
        htmlContent = htmlContent + getSpanAllstop("급행 통과") + "역입니다.<br>";
    }

    htmlContent = htmlContent + getSpanLine9(getStationName(end)) + "역은 ";
    if(isExp(end))
    {
        htmlContent = htmlContent + getSpanExp("급행 정차") + "역입니다.<br>";
    }
    else
    {
        htmlContent = htmlContent + getSpanAllstop("급행 통과") + "역입니다.<br>";
    }

	let evacuations = getEvacuations(start, end);
	if(evacuations.length == 0)
	{
		htmlContent = htmlContent + "경로 중 통과하는 대피역은 " + getSpanBlack("없습니다") + ".<p>";
	}
	else
	{
		htmlContent = htmlContent + "경로 중 통과하는 대피역의 수는 " + getSpanBlack("&nbsp;" + evacuations.length + "&nbsp;") + "역입니다. (";
		htmlContent = htmlContent + getEvacuationText(evacuations) + ")<p>";
    }
	
    if(isExp(start) && isExp(end))
    {
        if(evacuations.length == 0)
        {
            htmlContent = htmlContent + getSpanBlack("먼저 오는 열차") + "를 타세요.";
        }
        else
        {
            htmlContent = htmlContent + getSpanExp("급행 열차") + "를 타세요.";
        }
    }
    else if(isExp(start) && !isExp(end))
    {
        if(evacuations.length == 0)
        {
            htmlContent = htmlContent + getSpanAllstop("일반 열차") + "를 타세요.";
        }
        else if(evacuations.length == 1)
        {
            htmlContent = htmlContent + "1. " + getSpanBlack("먼저 오는 열차") + "를 타세요.<br>";
            htmlContent = htmlContent + "2. 급행 열차를 탔다면 목적지 직전의 급행 정차역인 " + getSpanLine9(getStationName(getLastExp(start, end))) + "역에서 " + getSpanAllstop("일반 열차") + "로 갈아타세요.";
        }
        else
        {
            htmlContent = htmlContent + "1. " + getSpanExp("급행 열차") + "를 타세요.<br>";
            htmlContent = htmlContent + "2. 목적지 직전의 급행 정차역인 " + getSpanLine9(getStationName(getLastExp(start, end))) + "역에서 " + getSpanAllstop("일반 열차") + "로 갈아타세요.";
        }
    }
    else if(!isExp(start) && isExp(end))
    {
        if(evacuations.length == 0)
        {
            htmlContent = htmlContent + getSpanAllstop("일반 열차") + "를 타세요.";
        }
        else
        {
            htmlContent = htmlContent + "1. " + getSpanAllstop("일반 열차") + "를 타세요.<br>";
            htmlContent = htmlContent + "2. 가장 가까운 급행 정차역인 " + getSpanLine9(getStationName(getNextExp(start, end))) + "역에서 " + getSpanExp("급행 열차") + "로 갈아타세요.";
        }
    }
    else
    {
        if(evacuations.length <= 1)
        {
            htmlContent = htmlContent + getSpanAllstop("일반 열차") + "를 타세요.";
        }
        else
        {
            htmlContent = htmlContent + "1. " + getSpanAllstop("일반 열차") + "를 타세요.<br>";
            htmlContent = htmlContent + "2. 가장 가까운 급행 정차역인 " + getSpanLine9(getStationName(getNextExp(start, end))) + "역에서 " + getSpanExp("급행 열차") + "로 갈아타세요.<br>";
            htmlContent = htmlContent + "3. 목적지 직전의 급행 정차역인 " + getSpanLine9(getStationName(getLastExp(start, end))) + "역에서 " + getSpanAllstop("일반 열차") + "로 갈아타세요.";
        }
    }

    newDiv.innerHTML = htmlContent;
    result.replaceWith(newDiv);
}

function stationChange()
{
    let start = +form.start.value;
    let end = +form.end.value;
	
	localStorage.setItem("start", start);
	localStorage.setItem("end", end);

    if (start == end)
    {
        let newDiv = document.createElement('div');
        newDiv.id = "result"

        let htmlContent = "출발역과 도착역이 같습니다.";
        newDiv.innerHTML = htmlContent;
        result.replaceWith(newDiv);

        return;
    }
    
    let upbound = isUpbound();

    if(upbound != wasUpbound)
    {
        timespanChanged();
        timeChange();
        wasUpbound = upbound;
    }

    calculate();
}

function switchStations()
{
	let wasStart = form.start.value;
	form.start.value = form.end.value;
	form.end.value = wasStart;
	stationChange();
}

function dayChange()
{
    timespanChanged();
	timeChange();
}

function timeChange()
{
	setEvacuate();
	changeImage(form.time.value);
	calculate();
}

let form = document.forms.selector;
let wasUpbound = isUpbound();

let stations = [	{name: "역명", 				exp: false,	evacuate: false}];
stations.push(  {name: "개화", 				exp: false,	evacuate: false});
stations.push(  {name: "김포공항", 		exp: true, 	evacuate: false});
stations.push(  {name: "공항시장", 		exp: false,	evacuate: false});
stations.push(  {name: "신방화", 			exp: false,	evacuate: false});
stations.push(  {name: "마곡나루", 		exp: true,		evacuate: false});
stations.push(  {name: "양천향교", 		exp: false,	evacuate: false});
stations.push(  {name: "가양",				exp: true,		evacuate: false});
stations.push(  {name: "증미", 				exp: false,	evacuate: false});
stations.push(  {name: "등촌", 				exp: false,	evacuate: false});
stations.push(  {name: "염창", 				exp: true,		evacuate: false});
stations.push(  {name: "신목동", 			exp: false,	evacuate: false});
stations.push(  {name: "선유도", 			exp: false,	evacuate: false});
stations.push(  {name: "당산", 				exp: true,		evacuate: false});
stations.push(  {name: "국회의사당", 	exp: false,	evacuate: false});
stations.push(  {name: "여의도", 			exp: true,		evacuate: false});
stations.push(  {name: "샛강", 				exp: false,	evacuate: false});
stations.push(  {name: "노량진", 			exp: true,		evacuate: false});
stations.push(  {name: "노들", 				exp: false,	evacuate: false});
stations.push(  {name: "흑석", 				exp: false,	evacuate: false});
stations.push(  {name: "동작", 				exp: true,		evacuate: false});
stations.push(  {name: "구반포", 			exp: false,	evacuate: false});
stations.push(  {name: "신반포", 			exp: false,	evacuate: false});
stations.push(  {name: "고속터미널", 	exp: true,		evacuate: false});
stations.push(  {name: "사평", 				exp: false,	evacuate: false});
stations.push(  {name: "신논현", 			exp: true,		evacuate: false});
stations.push(  {name: "언주", 				exp: false,	evacuate: false});
stations.push(  {name: "선정릉", 			exp: true,		evacuate: false});
stations.push(  {name: "삼성중앙", 		exp: false,	evacuate: false});
stations.push(  {name: "봉은사", 			exp: true,		evacuate: false});
stations.push(  {name: "종합운동장", 	exp: true,		evacuate: false});
stations.push(  {name: "삼전",  				exp: false,	evacuate: false});
stations.push(  {name: "석촌고분", 		exp: false,	evacuate: false});
stations.push(  {name: "석촌", 				exp: true,		evacuate: false});
stations.push(  {name: "송파나루", 		exp: false,	evacuate: false});
stations.push(  {name: "한성백제", 		exp: false,	evacuate: false});
stations.push(  {name: "올림픽공원", 	exp: true,		evacuate: false});
stations.push(  {name: "둔촌오륜", 		exp: false,	evacuate: false});
stations.push(  {name: "중앙보훈병원",	exp: true,		evacuate: false});

let storedStart = localStorage.getItem("start");
if(storedStart)
{
	start.value = storedStart;
}
let storedEnd = localStorage.getItem("end");
if(storedEnd)
{
	end.value = storedEnd;
}

form.day.value = getCurrentDay();
dayChange();