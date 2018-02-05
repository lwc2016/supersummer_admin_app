/*------------格式化科目-------------*/
export const formatSubject = (subject) => {
    switch (subject) {
        case "kuaiji":
            return "会计";
        case "shenji":
            return "审计";
        case "caiwu":
            return "财务管理";
        case "jingji":
            return "经济法";
        case "shuifa":
            return "税法";
        case "fengkong":
            return "风险控制";
        default:
            return subject;
    }
};

/*-----------格式化时间----------------*/
export const formatDateTime = (timestamp, template) => {
    if (!timestamp) return "";
    let newDate = new Date(timestamp * 1000);
    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    let date = newDate.getDate();
	date = date < 10 ? "0" + date: date;

    let hours = newDate.getHours();
	hours = hours < 10 ? "0" + hours : hours;

    let minutes = newDate.getMinutes();
	minutes = minutes < 10 ? "0" + minutes: minutes;

    let seconds = newDate.getSeconds();
    seconds = seconds < 10 ? "0" + seconds: seconds;

    return template
        .replace("YYYY", year)
        .replace("MM", month)
        .replace("DD", date)
        .replace("h", hours)
        .replace("m", minutes)
        .replace("s", seconds);
};


/*--------格式化题目类型-------------*/
export const questionType = (type)=>{
    switch(type){
        case "single":
            return "单选题";
        case "double":
            return "多选题";
        default:
            return type;
    }
};